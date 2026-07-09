import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { tool } from "@langchain/core/tools";
import { createReactAgent } from "langchain/agents";
import { z } from "zod";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

const generate_plan = tool(
  async ({ risk_summary, need_type, lang }) => {
    return lang === "ms"
      ? `Anda adalah pakar pendidikan khas. Berdasarkan ringkasan risiko berikut: "${risk_summary}" dan jenis keperluan: "${need_type}", hasilkan pelan intervensi berstruktur 5 langkah dalam Bahasa Melayu. Setiap langkah mesti jelas, boleh dilaksanakan, dan disesuaikan dengan keperluan pelajar. Sertakan matlamat, strategi, tempoh masa, dan petunjuk kejayaan bagi setiap langkah.`
      : `You are a special education expert. Based on the following risk summary: "${risk_summary}" and need type: "${need_type}", generate a structured 5-step intervention plan in English. Each step must be clear, actionable, and tailored to the learner's needs. Include goals, strategies, timeframe, and success indicators for each step.`;
  },
  {
    name: "generate_plan",
    description: "Generates a structured 5-step personalised intervention plan based on a risk summary and need type. Use this when the task is to create an intervention plan for a learner.",
    schema: z.object({
      risk_summary: z.string().describe("A brief description of the learner's identified risks or challenges"),
      need_type: z.enum(["dyslexia", "adhd", "visual", "general"]).describe("The type of learning need: dyslexia, adhd, visual, or general"),
      lang: z.enum(["en", "ms"]).describe("Output language: en for English, ms for Bahasa Melayu"),
    }),
  }
);

const personalise_activities = tool(
  async ({ need_type, level, lang }) => {
    return lang === "ms"
      ? `Anda adalah pakar terapi pendidikan. Untuk pelajar dengan keperluan "${need_type}" pada tahap "${level}", cadangkan 3 aktiviti pembelajaran yang spesifik dan disesuaikan dalam Bahasa Melayu. Setiap aktiviti mesti: (1) sesuai dengan tahap pelajar, (2) menarik dan bermakna, (3) menyertakan bahan atau alat yang diperlukan, (4) menyatakan tempoh masa yang dicadangkan, dan (5) menerangkan cara memantau kemajuan.`
      : `You are an educational therapy expert. For a learner with "${need_type}" needs at the "${level}" level, suggest 3 specific and tailored learning activities in English. Each activity must: (1) be appropriate for the learner's level, (2) be engaging and meaningful, (3) include required materials or tools, (4) state the recommended duration, and (5) explain how to monitor progress.`;
  },
  {
    name: "personalise_activities",
    description: "Returns 3 specific learning activities tailored to the learner's need type and proficiency level. Use this when the task is to suggest personalised activities.",
    schema: z.object({
      need_type: z.enum(["dyslexia", "adhd", "visual", "general"]).describe("The type of learning need: dyslexia, adhd, visual, or general"),
      level: z.enum(["beginner", "intermediate", "advanced"]).describe("The learner's current proficiency level"),
      lang: z.enum(["en", "ms"]).describe("Output language: en for English, ms for Bahasa Melayu"),
    }),
  }
);

const progress_check = tool(
  async ({ previous_plan_summary, current_performance, lang }) => {
    return lang === "ms"
      ? `Anda adalah pakar penilaian intervensi pendidikan. Berdasarkan pelan intervensi sebelumnya: "${previous_plan_summary}" dan prestasi semasa pelajar: "${current_performance}", berikan penilaian kemajuan dalam Bahasa Melayu. Tentukan sama ada intervensi perlu: DIPERTINGKATKAN (escalate), DIKEKALKAN (maintain), atau DIKURANGKAN (reduce). Berikan justifikasi yang jelas, petunjuk khusus yang menyokong keputusan anda, dan cadangan langkah seterusnya yang konkrit.`
      : `You are an educational intervention assessment expert. Based on the previous intervention plan: "${previous_plan_summary}" and the learner's current performance: "${current_performance}", provide a progress assessment in English. Determine whether the intervention should be ESCALATED, MAINTAINED, or REDUCED in intensity. Provide clear justification, specific indicators supporting your decision, and concrete recommendations for next steps.`;
  },
  {
    name: "progress_check",
    description: "Assesses learner progress against a previous intervention plan and recommends whether to escalate, maintain, or reduce intervention intensity. Use this when the task is to evaluate progress.",
    schema: z.object({
      previous_plan_summary: z.string().describe("A summary of the previous intervention plan that was implemented"),
      current_performance: z.string().describe("A description of the learner's current performance and observable behaviours"),
      lang: z.enum(["en", "ms"]).describe("Output language: en for English, ms for Bahasa Melayu"),
    }),
  }
);

export default async function handler(req, res) {
  if (req.method === "OPTIONS") { res.writeHead(204, CORS).end(); return; }
  if (req.method !== "POST") { res.writeHead(405, CORS).end(JSON.stringify({ error: "Method not allowed" })); return; }

  const {
    risk_data,
    profile,
    need_type = "general",
    task = "plan",
    lang = "ms",
    apiKey: bodyKey,
    risk_summary,
    level = "beginner",
    previous_plan_summary,
    current_performance,
  } = req.body || {};

  const apiKey = bodyKey || process.env.GEMINI_API_KEY;
  if (!apiKey) { res.writeHead(500, CORS).end(JSON.stringify({ error: "GEMINI_API_KEY not configured" })); return; }

  const resolvedRiskSummary = risk_summary || (risk_data ? JSON.stringify(risk_data) : null);

  if (task === "plan" && !resolvedRiskSummary) {
    res.writeHead(400, CORS).end(JSON.stringify({ error: "risk_summary or risk_data is required for task: plan" })); return;
  }
  if (task === "activities" && !need_type) {
    res.writeHead(400, CORS).end(JSON.stringify({ error: "need_type is required for task: activities" })); return;
  }
  if (task === "progress" && (!previous_plan_summary || !current_performance)) {
    res.writeHead(400, CORS).end(JSON.stringify({ error: "previous_plan_summary and current_performance are required for task: progress" })); return;
  }

  try {
    const llm = new ChatGoogleGenerativeAI({ model: "gemini-2.0-flash-thinking-exp-01-21", apiKey, temperature: 0.4 });
    const tools = [generate_plan, personalise_activities, progress_check];
    const agent = await createReactAgent({ llm, tools });

    const taskMap = {
      plan: `Use the generate_plan tool. risk_summary: "${resolvedRiskSummary || "general risk identified"}". need_type: "${need_type}". lang: "${lang}"`,
      activities: `Use the personalise_activities tool. need_type: "${need_type}". level: "${level}". lang: "${lang}"`,
      progress: `Use the progress_check tool. previous_plan_summary: "${previous_plan_summary}". current_performance: "${current_performance}". lang: "${lang}"`,
    };

    const userMessage = taskMap[task] || taskMap.plan;

    const result = await agent.invoke({ messages: [{ role: "user", content: userMessage }] });
    const output = result.messages?.[result.messages.length - 1]?.content || result.output || "";

    res.writeHead(200, CORS).end(JSON.stringify({ ok: true, task, lang, output }));
  } catch (err) {
    console.error("[intervention-agent]", err);
    res.writeHead(500, CORS).end(JSON.stringify({ ok: false, error: err.message }));
  }
}

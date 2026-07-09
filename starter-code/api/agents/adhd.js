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

const generate_strategy = tool(
  async ({ profile_summary, lang }) => {
    return lang === "ms"
      ? `Anda adalah pakar sokongan pembelajaran ADHD. Berdasarkan profil pelajar berikut: "${profile_summary}", hasilkan strategi fokus ADHD yang diperibadikan, praktikal, dan berstruktur. Sertakan teknik pengurusan masa, kaedah pecahan tugas, dan cara mengekalkan tumpuan. Gunakan bahasa yang mudah difahami dan memberangsangkan semangat.`
      : `You are an ADHD learning support specialist. Based on the following student profile: "${profile_summary}", generate a personalized, practical, and structured ADHD focus strategy. Include time management techniques, task-chunking methods, and ways to maintain concentration. Use encouraging and easy-to-understand language.`;
  },
  {
    name: "generate_strategy",
    description: "Generates a personalized ADHD focus strategy based on the student's profile summary, session count, and focus score. Use this tool when the task is 'strategy'.",
    schema: z.object({
      profile_summary: z.string().min(3).describe("A string describing the student's ADHD profile, session count, and focus score"),
      lang: z.enum(["en", "ms"]).describe("Output language: 'en' for English, 'ms' for Bahasa Melayu"),
    }),
  }
);

const session_intervention = tool(
  async ({ session_count, time_elapsed_mins, lang }) => {
    return lang === "ms"
      ? `Anda adalah jurulatih pembelajaran yang penyayang dan memahami keperluan pelajar ADHD. Pelajar ini telah menyelesaikan ${session_count} sesi dan telah belajar selama ${time_elapsed_mins} minit. Berikan galakan yang tulus, puji usaha mereka, dan cadangkan langkah seterusnya yang realistik dan bermotivasi untuk sesi akan datang. Pastikan mesej anda ringkas, positif, dan membina keyakinan diri.`
      : `You are a caring learning coach who understands the needs of students with ADHD. This student has completed ${session_count} session(s) and has been studying for ${time_elapsed_mins} minutes. Provide sincere encouragement, praise their effort, and suggest realistic and motivating next steps for the upcoming session. Keep your message concise, positive, and confidence-building.`;
  },
  {
    name: "session_intervention",
    description: "Returns post-session encouragement and next steps advice based on session count and time elapsed. Use this tool when the task is 'intervention'.",
    schema: z.object({
      session_count: z.number().describe("The number of sessions the student has completed"),
      time_elapsed_mins: z.number().describe("The number of minutes elapsed in the current or most recent session"),
      lang: z.enum(["en", "ms"]).describe("Output language: 'en' for English, 'ms' for Bahasa Melayu"),
    }),
  }
);

const focus_assessment = tool(
  async ({ time_of_day, session_count, lang }) => {
    return lang === "ms"
      ? `Anda adalah pakar penilaian fokus untuk pelajar ADHD. Berdasarkan masa semasa (${time_of_day}) dan bilangan sesi yang telah diselesaikan (${session_count}), nilaikan tahap kesediaan fokus pelajar ini. Berikan skor fokus yang diramalkan (antara 1-10), terangkan faktor yang mempengaruhinya, dan berikan 3 tip khusus untuk meningkatkan tumpuan sebelum memulakan sesi pembelajaran. Gunakan nada yang menyokong dan membina.`
      : `You are a focus assessment specialist for students with ADHD. Based on the current time of day (${time_of_day}) and the number of sessions completed (${session_count}), assess this student's focus readiness level. Provide a predicted focus score (between 1-10), explain the influencing factors, and give 3 specific tips to improve concentration before starting a study session. Use a supportive and constructive tone.`;
  },
  {
    name: "focus_assessment",
    description: "Assesses focus readiness based on time of day and session count, and provides a predicted score with tips. Use this tool when the task is 'assessment'.",
    schema: z.object({
      time_of_day: z.string().describe("The current time of day (e.g., 'morning', 'afternoon', 'evening', or a specific time like '10:30 AM')"),
      session_count: z.number().describe("The number of sessions the student has completed so far today"),
      lang: z.enum(["en", "ms"]).describe("Output language: 'en' for English, 'ms' for Bahasa Melayu"),
    }),
  }
);

const break_activity = tool(
  async ({ stress_level, lang }) => {
    return lang === "ms"
      ? `Anda adalah jurulatih kesejahteraan yang pakar dalam aktiviti rehat untuk pelajar ADHD. Tahap tekanan pelajar ini adalah "${stress_level}". Cadangkan satu aktiviti rehat 5 minit yang sesuai — sama ada menenangkan atau memberi tenaga semula — bergantung kepada tahap tekanan mereka. Terangkan langkah-langkah aktiviti dengan jelas, nyatakan faedahnya untuk fokus dan kesejahteraan mental, dan galakkan mereka untuk kembali belajar dengan lebih segar.`
      : `You are a wellbeing coach who specializes in break activities for students with ADHD. This student's stress level is "${stress_level}". Suggest one appropriate 5-minute break activity — either calming or re-energizing — based on their stress level. Explain the activity steps clearly, state its benefits for focus and mental wellbeing, and encourage them to return to studying feeling refreshed.`;
  },
  {
    name: "break_activity",
    description: "Suggests a 5-minute calming or energizing break activity based on the student's stress level. Use this tool when the task is 'break'.",
    schema: z.object({
      stress_level: z.string().describe("The student's current stress level (e.g., 'low', 'medium', 'high', or a descriptive phrase)"),
      lang: z.enum(["en", "ms"]).describe("Output language: 'en' for English, 'ms' for Bahasa Melayu"),
    }),
  }
);

export default async function handler(req, res) {
  if (req.method === "OPTIONS") { res.writeHead(204, CORS).end(); return; }
  if (req.method !== "POST") { res.writeHead(405, CORS).end(JSON.stringify({ error: "Method not allowed" })); return; }

  const {
    profile,
    focus_score = 5,
    session_count = 1,
    task = "strategy",
    lang = "ms",
    apiKey: bodyKey,
  } = req.body || {};

  const profile_summary = profile;

  if (!profile_summary || String(profile_summary).trim().length < 3) {
    res.writeHead(400, CORS).end(JSON.stringify({ error: "profile is required (min 3 characters)" }));
    return;
  }

  const apiKey = bodyKey || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.writeHead(500, CORS).end(JSON.stringify({ error: "GEMINI_API_KEY not configured" }));
    return;
  }

  try {
    const llm = new ChatGoogleGenerativeAI({
      model: "gemini-2.0-flash-thinking-exp-01-21",
      apiKey,
      temperature: 0.4,
    });

    const tools = [generate_strategy, session_intervention, focus_assessment, break_activity];
    const agent = await createReactAgent({ llm, tools });

    const profileStr = `${profile_summary} | Sessions: ${session_count} | Focus score: ${focus_score}`;
    const now = new Date();
    const timeOfDay = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    const taskMap = {
      strategy: `Use the generate_strategy tool. profile_summary: "${profileStr}". lang: "${lang}". Generate a personalized ADHD focus strategy.`,
      intervention: `Use the session_intervention tool. session_count: ${session_count}. time_elapsed_mins: ${Math.round(session_count * 25)}. lang: "${lang}". Provide post-session encouragement and next steps.`,
      assessment: `Use the focus_assessment tool. time_of_day: "${timeOfDay}". session_count: ${session_count}. lang: "${lang}". Assess focus readiness and provide a predicted score with tips.`,
      break: `Use the break_activity tool. stress_level: "${focus_score < 4 ? "high" : focus_score < 7 ? "medium" : "low"}". lang: "${lang}". Suggest a 5-minute break activity.`,
    };

    const userMessage = taskMap[task] || taskMap.strategy;

    const result = await agent.invoke({
      messages: [{ role: "user", content: userMessage }],
    });

    const output = result.messages?.[result.messages.length - 1]?.content || result.output || "";

    res.writeHead(200, CORS).end(JSON.stringify({ ok: true, task, lang, output }));
  } catch (err) {
    console.error("[adhd-agent]", err);
    res.writeHead(500, CORS).end(JSON.stringify({ ok: false, error: err.message }));
  }
}

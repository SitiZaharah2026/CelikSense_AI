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

const build_insights = tool(
  async ({ profile_json, risk_summary, session_count, lang }) => {
    return lang === "ms"
      ? `Anda adalah pakar pendidikan inklusif AI. Berdasarkan profil pelajar berikut: ${profile_json}, ringkasan risiko: ${risk_summary}, dan bilangan sesi: ${session_count}, hasilkan 3-5 pandangan peribadi tentang corak pembelajaran pelajar ini. Fokus pada kekuatan, cabaran, dan peluang pertumbuhan. Jawab dalam Bahasa Melayu.`
      : `You are an AI inclusive education expert. Based on the following learner profile: ${profile_json}, risk summary: ${risk_summary}, and session count: ${session_count}, generate 3-5 personalized insights about this learner's patterns. Focus on strengths, challenges, and growth opportunities. Answer in English.`;
  },
  {
    name: "build_insights",
    description: "Generates 3-5 personalized AI insights about a learner's patterns based on their profile, risk data, and session history.",
    schema: z.object({
      profile_json: z.string().describe("JSON string of the user profile containing learner details"),
      risk_summary: z.string().describe("Summary of risk data or risk indicators for the learner"),
      session_count: z.string().describe("Number of sessions the learner has completed"),
      lang: z.enum(["en", "ms"]).describe("Output language: en for English, ms for Bahasa Melayu"),
    }),
  }
);

const recommend_next_steps = tool(
  async ({ profile_json, completed_agents, lang }) => {
    return lang === "ms"
      ? `Anda adalah pemandu pembelajaran AI yang pakar dalam pendidikan inklusif. Berdasarkan profil pelajar: ${profile_json}, dan agen yang telah digunakan: ${completed_agents}, cadangkan 3 tindakan seterusnya yang disyorkan untuk pelajar ini bagi meneruskan perjalanan pembelajaran mereka. Berikan cadangan yang praktikal dan boleh dilaksanakan. Jawab dalam Bahasa Melayu.`
      : `You are an AI learning guide expert in inclusive education. Based on the learner profile: ${profile_json}, and agents already used: ${completed_agents}, recommend 3 next actions for this learner to continue their learning journey. Provide practical and actionable recommendations. Answer in English.`;
  },
  {
    name: "recommend_next_steps",
    description: "Returns 3 recommended next actions for the learner based on their profile and the agents they have already completed.",
    schema: z.object({
      profile_json: z.string().describe("JSON string of the user profile containing learner details"),
      completed_agents: z.string().describe("Comma-separated list of agent names the learner has already used"),
      lang: z.enum(["en", "ms"]).describe("Output language: en for English, ms for Bahasa Melayu"),
    }),
  }
);

const learning_style_analysis = tool(
  async ({ behavior_summary, lang }) => {
    return lang === "ms"
      ? `Anda adalah pakar analisis gaya pembelajaran AI. Berdasarkan ringkasan tingkah laku pelajar berikut: ${behavior_summary} (termasuk alat yang digunakan, masa yang dihabiskan, dan markah yang dicapai), kenal pasti gaya pembelajaran dominan pelajar ini (contoh: visual, auditori, kinestetik, membaca/menulis) dan berikan 2 cadangan khusus untuk mengoptimumkan pengalaman pembelajaran mereka. Jawab dalam Bahasa Melayu.`
      : `You are an AI learning style analysis expert. Based on the following learner behavior summary: ${behavior_summary} (including tools used, time spent, and scores achieved), identify this learner's dominant learning style (e.g., visual, auditory, kinesthetic, reading/writing) and provide 2 specific recommendations to optimize their learning experience. Answer in English.`;
  },
  {
    name: "learning_style_analysis",
    description: "Identifies the learner's dominant learning style and provides 2 recommendations based on their interaction behavior summary.",
    schema: z.object({
      behavior_summary: z.string().describe("Description of how the student has been interacting, including tools used, time spent, and scores"),
      lang: z.enum(["en", "ms"]).describe("Output language: en for English, ms for Bahasa Melayu"),
    }),
  }
);

export default async function handler(req, res) {
  if (req.method === "OPTIONS") { res.writeHead(204, CORS).end(); return; }
  if (req.method !== "POST") { res.writeHead(405, CORS).end(JSON.stringify({ error: "Method not allowed" })); return; }

  const { profile, risk_data, sessions, task = "insights", lang = "ms", apiKey: bodyKey } = req.body || {};

  if (!profile) { res.writeHead(400, CORS).end(JSON.stringify({ error: "profile is required" })); return; }

  const apiKey = bodyKey || process.env.GEMINI_API_KEY;
  if (!apiKey) { res.writeHead(500, CORS).end(JSON.stringify({ error: "GEMINI_API_KEY not configured" })); return; }

  try {
    const llm = new ChatGoogleGenerativeAI({ model: "gemini-2.0-flash-thinking-exp-01-21", apiKey, temperature: 0.4 });
    const tools = [build_insights, recommend_next_steps, learning_style_analysis];
    const agent = await createReactAgent({ llm, tools });

    const profileStr = typeof profile === "object" ? JSON.stringify(profile) : profile;
    const riskStr = risk_data ? (typeof risk_data === "object" ? JSON.stringify(risk_data) : risk_data) : "No risk data provided";
    const sessionCount = sessions !== undefined ? String(sessions) : "0";

    const taskMap = {
      insights: `Use build_insights tool. profile_json: ${profileStr}. risk_summary: ${riskStr}. session_count: ${sessionCount}. lang: ${lang}`,
      recommendations: `Use recommend_next_steps tool. profile_json: ${profileStr}. completed_agents: ${riskStr}. lang: ${lang}`,
      style: `Use learning_style_analysis tool. behavior_summary: ${profileStr}. lang: ${lang}`,
    };

    const result = await agent.invoke({ messages: [{ role: "user", content: taskMap[task] || taskMap.insights }] });
    const output = result.messages?.[result.messages.length - 1]?.content || result.output || "";

    res.writeHead(200, CORS).end(JSON.stringify({ ok: true, task, lang, output }));
  } catch (err) {
    console.error("[personalisation-agent]", err);
    res.writeHead(500, CORS).end(JSON.stringify({ ok: false, error: err.message }));
  }
}

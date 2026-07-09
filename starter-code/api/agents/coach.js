/**
 * CelikSense AI — Learning Coach Agent (LangChain.js)
 *
 * A multi-tool agent that adapts content and creates personalised
 * learning exercises for students with special needs (ADHD, dyslexia,
 * visual impairment, autism).
 *
 * Tools:
 *   adapt_content    — rewrite text to suit a specific learning need
 *   create_exercise  — generate a tailored learning activity
 *   give_feedback    — provide encouraging, constructive feedback on student work
 *   learning_plan    — create a short personalised learning plan
 *
 * POST /api/agents/coach
 * Body: { text: string, task: "adapt"|"exercise"|"feedback"|"plan", need: string, lang: "en"|"ms" }
 */

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

const NEED_GUIDES = {
  dyslexia: "Use very short sentences (max 10 words). Avoid double negatives. Use bullet points. Break text into small chunks. Use simple, common words.",
  adhd: "Use bold for key points. Keep paragraphs to 2 sentences max. Add a quick action item at the end. Use an engaging, energetic tone.",
  visual: "Describe everything verbally. Avoid phrases like 'as shown above' or 'see diagram'. Use rich, descriptive language. Structure with clear headings.",
  autism: "Use literal, precise language. Avoid idioms and metaphors. Give step-by-step instructions. Be explicit about expectations.",
  general: "Use clear, simple language suitable for school-age learners in Malaysia.",
};

// ── Tools ────────────────────────────────────────────────────────────────────

const adaptContentTool = tool(
  async ({ text, need, lang }) => {
    const guide = NEED_GUIDES[need] || NEED_GUIDES.general;
    return lang === "ms"
      ? `Tulis semula teks berikut dalam Bahasa Melayu yang lebih mudah untuk pelajar dengan keperluan ${need}. Panduan: ${guide}\n\nTeks asal:\n${text}`
      : `Rewrite the following text in simpler English for a learner with ${need}. Guidelines: ${guide}\n\nOriginal text:\n${text}`;
  },
  {
    name: "adapt_content",
    description: "Rewrite or simplify text to make it accessible for a specific special learning need (dyslexia, ADHD, visual impairment, autism).",
    schema: z.object({
      text: z.string().describe("The content to adapt"),
      need: z.enum(["dyslexia", "adhd", "visual", "autism", "general"]).describe("The learner's special need"),
      lang: z.enum(["en", "ms"]).describe("Output language"),
    }),
  }
);

const createExerciseTool = tool(
  async ({ topic, need, lang }) => {
    const formats = {
      dyslexia: "a word-matching or fill-in-the-blank activity with large clear fonts in mind",
      adhd: "a short timed challenge (5 minutes max) with a clear reward at the end",
      visual: "an audio-based or verbal description activity",
      autism: "a structured step-by-step sorting or sequencing activity",
      general: "a fun interactive activity",
    };
    const format = formats[need] || formats.general;
    return lang === "ms"
      ? `Cipta ${format} tentang topik "${topic}" untuk pelajar dengan keperluan ${need}. Berikan arahan yang jelas dan contoh jawapan.`
      : `Create ${format} about the topic "${topic}" for a learner with ${need}. Include clear instructions and sample answers.`;
  },
  {
    name: "create_exercise",
    description: "Generate a tailored learning exercise or activity on a topic, adapted to the learner's special need.",
    schema: z.object({
      topic: z.string().describe("The topic or subject for the exercise"),
      need: z.enum(["dyslexia", "adhd", "visual", "autism", "general"]).describe("Learner's special need"),
      lang: z.enum(["en", "ms"]).describe("Output language"),
    }),
  }
);

const giveFeedbackTool = tool(
  async ({ work, need, lang }) => {
    return lang === "ms"
      ? `Berikan maklum balas yang membina dan menggalakkan untuk kerja pelajar dengan keperluan ${need} berikut. Mulakan dengan pujian, kemudian satu cadangan penambahbaikan, dan akhiri dengan motivasi.\n\nKerja pelajar:\n${work}`
      : `Give encouraging, constructive feedback for the following student work from a learner with ${need}. Start with praise, give one improvement suggestion, end with motivation.\n\nStudent work:\n${work}`;
  },
  {
    name: "give_feedback",
    description: "Provide positive, constructive feedback on a student's work, tailored to their learning need.",
    schema: z.object({
      work: z.string().describe("The student's written work or answer to give feedback on"),
      need: z.enum(["dyslexia", "adhd", "visual", "autism", "general"]).describe("Learner's special need"),
      lang: z.enum(["en", "ms"]).describe("Language for feedback"),
    }),
  }
);

const learningPlanTool = tool(
  async ({ goal, need, lang }) => {
    return lang === "ms"
      ? `Cipta pelan pembelajaran 1 minggu (5 hari) yang ringkas untuk pelajar dengan keperluan ${need} yang ingin mencapai matlamat: "${goal}". Setiap hari: 1 aktiviti utama (30 minit), 1 aktiviti rehat (5 minit).`
      : `Create a simple 1-week (5-day) learning plan for a learner with ${need} aiming to: "${goal}". Each day: 1 main activity (30 min), 1 break activity (5 min).`;
  },
  {
    name: "learning_plan",
    description: "Create a short personalised weekly learning plan based on the learner's goal and special need.",
    schema: z.object({
      goal: z.string().describe("The learner's learning goal"),
      need: z.enum(["dyslexia", "adhd", "visual", "autism", "general"]).describe("Learner's special need"),
      lang: z.enum(["en", "ms"]).describe("Output language"),
    }),
  }
);

// ── Handler ──────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.writeHead(204, CORS).end();
    return;
  }
  if (req.method !== "POST") {
    res.writeHead(405, CORS).end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  const { text, task = "adapt", need = "general", lang = "en" } = req.body || {};

  if (!text || text.trim().length < 5) {
    res.writeHead(400, CORS).end(JSON.stringify({ error: "text is required" }));
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.writeHead(500, CORS).end(JSON.stringify({ error: "GEMINI_API_KEY not configured" }));
    return;
  }

  try {
    const llm = new ChatGoogleGenerativeAI({
      model: "gemini-1.5-flash",
      apiKey,
      temperature: 0.4,
    });

    const tools = [adaptContentTool, createExerciseTool, giveFeedbackTool, learningPlanTool];
    const agent = await createReactAgent({ llm, tools });

    const taskPrompts = {
      adapt: `Use the adapt_content tool. Need: ${need}, lang: ${lang}. Text: ${text.slice(0, 2000)}`,
      exercise: `Use the create_exercise tool. Topic: "${text.slice(0, 200)}", need: ${need}, lang: ${lang}.`,
      feedback: `Use the give_feedback tool. Need: ${need}, lang: ${lang}. Student work: ${text.slice(0, 2000)}`,
      plan: `Use the learning_plan tool. Goal: "${text.slice(0, 300)}", need: ${need}, lang: ${lang}.`,
    };

    const input = taskPrompts[task] || taskPrompts.adapt;
    const result = await agent.invoke({ messages: [{ role: "user", content: input }] });
    const output = result.messages?.[result.messages.length - 1]?.content || result.output || "";

    res.writeHead(200, CORS).end(JSON.stringify({ ok: true, task, need, lang, output }));
  } catch (err) {
    console.error("[coach-agent]", err);
    res.writeHead(500, CORS).end(JSON.stringify({ ok: false, error: err.message }));
  }
}

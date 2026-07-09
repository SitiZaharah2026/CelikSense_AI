/**
 * CelikSense AI — AI Librarian Agent (LangChain.js)
 *
 * Tools:
 *   recommend_books  — suggest books by topic/level/need
 *   explain_topic    — explain a topic simply for special-needs learners
 *   find_resources   — suggest learning resources (videos, activities)
 *
 * POST /api/agents/librarian
 * Body: { query: string, need: "dyslexia"|"adhd"|"visual"|"general", lang: "en"|"ms" }
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

// ── Tools ────────────────────────────────────────────────────────────────────

const recommendBooksTool = tool(
  async ({ query, need, lang }) => {
    const needLabel = { dyslexia: "disleksia", adhd: "ADHD", visual: "cacat penglihatan", general: "umum" };
    return lang === "ms"
      ? `Cadangkan 5 buku atau bahan bacaan sesuai untuk pelajar dengan keperluan ${needLabel[need] || need} berkaitan topik "${query}". Sertakan tajuk, penulis, dan sebab ia sesuai.`
      : `Suggest 5 books or reading materials suitable for learners with ${need} needs on the topic "${query}". Include title, author, and why it suits this learner.`;
  },
  {
    name: "recommend_books",
    description: "Recommend books or reading materials tailored to a learner's special need and topic interest.",
    schema: z.object({
      query: z.string().describe("Topic or subject the learner is interested in"),
      need: z.enum(["dyslexia", "adhd", "visual", "general"]).describe("Learner's special need"),
      lang: z.enum(["en", "ms"]).describe("Output language"),
    }),
  }
);

const explainTopicTool = tool(
  async ({ topic, need, lang }) => {
    const adaptations = {
      dyslexia: "Use short sentences, avoid complex words, use bullet points.",
      adhd: "Keep it very brief, use bold key words, add one fun fact.",
      visual: "Describe things verbally with vivid detail, no visual references.",
      general: "Use simple, clear language suitable for school-age learners.",
    };
    return lang === "ms"
      ? `Terangkan topik "${topic}" dalam Bahasa Melayu yang mudah untuk pelajar sekolah. ${adaptations[need] || adaptations.general}`
      : `Explain the topic "${topic}" in simple English for a school-age learner. ${adaptations[need] || adaptations.general}`;
  },
  {
    name: "explain_topic",
    description: "Explain a topic in simple, accessible language adapted for the learner's special need.",
    schema: z.object({
      topic: z.string().describe("The topic to explain"),
      need: z.enum(["dyslexia", "adhd", "visual", "general"]).describe("Learner's special need for adaptation"),
      lang: z.enum(["en", "ms"]).describe("Output language"),
    }),
  }
);

const findResourcesTool = tool(
  async ({ topic, need, lang }) => {
    return lang === "ms"
      ? `Cadangkan 4 jenis aktiviti atau sumber pembelajaran (bukan buku) untuk pelajar dengan keperluan ${need} yang ingin belajar tentang "${topic}". Contoh: video, permainan, lembaran kerja, podcast.`
      : `Suggest 4 learning activities or resources (non-book) for a learner with ${need} needs wanting to learn about "${topic}". Examples: videos, games, worksheets, podcasts.`;
  },
  {
    name: "find_resources",
    description: "Find learning activities and resources beyond books — videos, games, worksheets — for a given topic and learner need.",
    schema: z.object({
      topic: z.string().describe("Topic the learner wants to explore"),
      need: z.enum(["dyslexia", "adhd", "visual", "general"]).describe("Learner's special need"),
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

  const { query, need = "general", lang = "en" } = req.body || {};

  if (!query || query.trim().length < 3) {
    res.writeHead(400, CORS).end(JSON.stringify({ error: "query is required" }));
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.writeHead(500, CORS).end(JSON.stringify({ error: "GEMINI_API_KEY not configured" }));
    return;
  }

  try {
    const llm = new ChatGoogleGenerativeAI({
      model: "gemini-2.0-flash-thinking-exp-01-21",
      apiKey,
      temperature: 0.5,
    });

    const tools = [recommendBooksTool, explainTopicTool, findResourcesTool];
    const agent = await createReactAgent({ llm, tools });

    const input =
      lang === "ms"
        ? `Saya pelajar dengan keperluan ${need}. Saya ingin belajar tentang "${query}". Tolong gunakan alat yang sesuai untuk membantu saya.`
        : `I am a learner with ${need} needs. I want to learn about "${query}". Please use the appropriate tool to help me.`;

    const result = await agent.invoke({ messages: [{ role: "user", content: input }] });
    const output = result.messages?.[result.messages.length - 1]?.content || result.output || "";

    res.writeHead(200, CORS).end(JSON.stringify({ ok: true, query, need, lang, output }));
  } catch (err) {
    console.error("[librarian-agent]", err);
    res.writeHead(500, CORS).end(JSON.stringify({ ok: false, error: err.message }));
  }
}

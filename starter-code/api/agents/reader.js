/**
 * CelikSense AI — Reader Agent (LangChain.js)
 *
 * A ReAct-style agent with 4 tools:
 *   summarise     — plain-language summary of the text
 *   generate_quiz — 5-question MCQ JSON for interactive quiz
 *   extract_vocab — key vocabulary with BM translations
 *   suggest_questions — curiosity questions to deepen understanding
 *
 * POST /api/agents/reader
 * Body: { text: string, task: "summarise"|"quiz"|"vocab"|"questions", lang: "en"|"ms" }
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

const summariseTool = tool(
  async ({ text, lang }) => {
    const prompt =
      lang === "ms"
        ? `Tulis ringkasan mudah faham (150-200 patah perkataan) dalam Bahasa Melayu untuk teks berikut:\n\n${text}`
        : `Write a clear, easy-to-understand summary (150-200 words) in English for the following text:\n\n${text}`;
    return prompt; // returned to agent as context; agent uses LLM to fulfil
  },
  {
    name: "summarise",
    description:
      "Summarise the given reading text into simple language suitable for special-needs learners. Use this when the user requests a summary.",
    schema: z.object({
      text: z.string().describe("The full reading text to summarise"),
      lang: z.enum(["en", "ms"]).describe("Output language"),
    }),
  }
);

const quizTool = tool(
  async ({ text, lang }) => {
    const prompt =
      lang === "ms"
        ? `Cipta 5 soalan aneka pilihan berdasarkan teks berikut. Kembalikan HANYA JSON array yang sah:\n[{"q":"soalan","options":["A","B","C","D"],"answer":0}]\n\nTeks:\n${text}`
        : `Create 5 multiple-choice questions based on the following text. Return ONLY a valid JSON array:\n[{"q":"question","options":["A","B","C","D"],"answer":0}]\n\nText:\n${text}`;
    return prompt;
  },
  {
    name: "generate_quiz",
    description:
      "Generate 5 multiple-choice quiz questions from the reading text. Returns a JSON array. Use this when the user requests a quiz.",
    schema: z.object({
      text: z.string().describe("The reading text to base questions on"),
      lang: z.enum(["en", "ms"]).describe("Language for questions"),
    }),
  }
);

const vocabTool = tool(
  async ({ text, lang }) => {
    const prompt =
      lang === "ms"
        ? `Senaraikan 8-10 perkataan penting daripada teks berikut. Bagi setiap perkataan sediakan: perkataan (Bahasa Inggeris), terjemahan (Bahasa Melayu), dan definisi mudah. Format: JSON array [{"word":"","translation":"","definition":""}].\n\nTeks:\n${text}`
        : `List 8-10 key vocabulary words from the text below. For each word provide: word (English), translation (Bahasa Melayu), and a simple definition. Format: JSON array [{"word":"","translation":"","definition":""}].\n\nText:\n${text}`;
    return prompt;
  },
  {
    name: "extract_vocab",
    description:
      "Extract key vocabulary words with BM translations and simple definitions. Use this when the user requests vocabulary help.",
    schema: z.object({
      text: z.string().describe("The text to extract vocabulary from"),
      lang: z.enum(["en", "ms"]).describe("Primary output language"),
    }),
  }
);

const questionsTool = tool(
  async ({ text, lang }) => {
    const prompt =
      lang === "ms"
        ? `Cadangkan 5 soalan menarik yang boleh ditanya tentang teks ini untuk menggalakkan pemikiran kritis pelajar:\n\n${text}`
        : `Suggest 5 thought-provoking questions a learner could explore about this text to deepen understanding:\n\n${text}`;
    return prompt;
  },
  {
    name: "suggest_questions",
    description:
      "Suggest curiosity-driven questions about the text to deepen comprehension. Use this when the user wants discussion questions.",
    schema: z.object({
      text: z.string().describe("The reading text"),
      lang: z.enum(["en", "ms"]).describe("Language for questions"),
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

  const { text, task = "summarise", lang = "en" } = req.body || {};

  if (!text || text.trim().length < 20) {
    res.writeHead(400, CORS).end(JSON.stringify({ error: "text is required (min 20 chars)" }));
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
      temperature: 0.4,
    });

    const tools = [summariseTool, quizTool, vocabTool, questionsTool];
    const agent = await createReactAgent({ llm, tools });

    const taskMap = {
      summarise: `Use the summarise tool to summarise this text in ${lang === "ms" ? "Bahasa Melayu" : "English"}. Text: ${text.slice(0, 3000)}`,
      quiz: `Use the generate_quiz tool to create a quiz from this text in ${lang === "ms" ? "Bahasa Melayu" : "English"}. Text: ${text.slice(0, 3000)}`,
      vocab: `Use the extract_vocab tool to extract vocabulary from this text. Lang: ${lang}. Text: ${text.slice(0, 3000)}`,
      questions: `Use the suggest_questions tool to generate discussion questions from this text in ${lang === "ms" ? "Bahasa Melayu" : "English"}. Text: ${text.slice(0, 3000)}`,
    };

    const input = taskMap[task] || taskMap.summarise;
    const result = await agent.invoke({ messages: [{ role: "user", content: input }] });

    const output =
      result.messages?.[result.messages.length - 1]?.content ||
      result.output ||
      "";

    res.writeHead(200, CORS).end(JSON.stringify({ ok: true, task, lang, output }));
  } catch (err) {
    console.error("[reader-agent]", err);
    res.writeHead(500, CORS).end(JSON.stringify({ ok: false, error: err.message }));
  }
}

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

const processText = tool(
  async ({ raw_text, lang }) => {
    return lang === "ms"
      ? `Anda adalah pembantu OCR. Bersihkan teks OCR berikut: betulkan ralat OCR biasa (huruf yang salah eja, jarak yang tidak betul, tanda baca yang hilang), normalkan jarak, dan nilai kualiti teks sebagai "baik", "sederhana", atau "lemah". Kembalikan teks yang dibersihkan diikuti dengan penilaian kualiti dalam bahasa Melayu.\n\nTeks OCR: ${raw_text}`
      : `You are an OCR post-processing assistant. Clean the following OCR output: fix common OCR errors (misread characters, incorrect spacing, missing punctuation), normalize spacing, and assess text quality as "good", "fair", or "poor". Return the cleaned text followed by the quality assessment in English.\n\nOCR Text: ${raw_text}`;
  },
  {
    name: "process_text",
    description: "Cleans OCR output — fixes common OCR errors, normalizes spacing, assesses text quality (good/fair/poor).",
    schema: z.object({
      raw_text: z.string().describe("The raw OCR text to process and clean"),
      lang: z.enum(["en", "ms"]).describe("Output language"),
    }),
  }
);

const summariseContent = tool(
  async ({ text, lang }) => {
    return lang === "ms"
      ? `Anda adalah pembantu ringkasan dokumen. Baca teks berikut dan: (1) tulis ringkasan 3-4 ayat tentang kandungannya, (2) kenal pasti jenis dokumen (lembaran kerja, artikel, buku teks, borang, surat, laporan, atau lain-lain). Balas dalam bahasa Melayu.\n\nTeks: ${text}`
      : `You are a document summarisation assistant. Read the following text and: (1) write a 3-4 sentence summary of its content, (2) identify the document type (worksheet, article, textbook, form, letter, report, or other). Reply in English.\n\nText: ${text}`;
  },
  {
    name: "summarise_content",
    description: "Summarizes the OCR text content in 3-4 sentences, identifies document type (worksheet, article, textbook, form, etc).",
    schema: z.object({
      text: z.string().describe("The OCR text to summarise"),
      lang: z.enum(["en", "ms"]).describe("Output language"),
    }),
  }
);

const suggestTool = tool(
  async ({ content_summary, lang }) => {
    return lang === "ms"
      ? `Anda adalah pembantu cadangan alat CelikSense. Berdasarkan ringkasan kandungan berikut, cadangkan alat CelikSense yang paling sesuai untuk digunakan seterusnya. Pilihan alat yang tersedia: reading-companion (pembantu bacaan umum), dyslexia-agent (untuk pengguna disleksia), adhd-agent (untuk pengguna ADHD), ai-librarian (untuk cadangan buku dan penyelidikan), sign-language (untuk kandungan bahasa isyarat). Kembalikan jawapan sebagai rentetan JSON dalam format: {"tool": "namafail.html", "reason": "sebab dalam bahasa Melayu"}.\n\nRingkasan kandungan: ${content_summary}`
      : `You are a CelikSense tool recommendation assistant. Based on the following content summary, suggest the most appropriate CelikSense tool to use next. Available tool options: reading-companion (general reading assistant), dyslexia-agent (for dyslexic users), adhd-agent (for ADHD users), ai-librarian (for book recommendations and research), sign-language (for sign language content). Return your answer as a JSON string in the format: {"tool": "filename.html", "reason": "reason in English"}.\n\nContent summary: ${content_summary}`;
  },
  {
    name: "suggest_tool",
    description: "Based on the content summary, suggests which CelikSense tool to use next. Options: reading-companion, dyslexia-agent, adhd-agent, ai-librarian, sign-language. Returns {tool: 'filename.html', reason: 'why'} as JSON string.",
    schema: z.object({
      content_summary: z.string().describe("A summary of the OCR content to base the tool suggestion on"),
      lang: z.enum(["en", "ms"]).describe("Output language"),
    }),
  }
);

const extractKeywords = tool(
  async ({ text, lang }) => {
    return lang === "ms"
      ? `Anda adalah pembantu pengekstrakan kata kunci. Daripada teks berikut, ekstrak 5-8 istilah atau konsep utama. Untuk setiap istilah, berikan definisi ringkas dan mudah difahami dalam bahasa Melayu. Format jawapan sebagai senarai dengan setiap istilah pada baris baharu dalam format: "Istilah: Definisi".\n\nTeks: ${text}`
      : `You are a keyword extraction assistant. From the following text, extract 5-8 key terms or concepts. For each term, provide a simple and easy-to-understand definition in English. Format the answer as a list with each term on a new line in the format: "Term: Definition".\n\nText: ${text}`;
  },
  {
    name: "extract_keywords",
    description: "Extracts 5-8 key terms/concepts from the OCR text with simple definitions.",
    schema: z.object({
      text: z.string().describe("The OCR text to extract keywords from"),
      lang: z.enum(["en", "ms"]).describe("Output language"),
    }),
  }
);

export default async function handler(req, res) {
  if (req.method === "OPTIONS") { res.writeHead(204, CORS).end(); return; }
  if (req.method !== "POST") { res.writeHead(405, CORS).end(JSON.stringify({ error: "Method not allowed" })); return; }

  const { raw_text, task = "summarise", lang = "ms", apiKey: bodyKey } = req.body || {};

  if (!raw_text || raw_text.length < 20) {
    res.writeHead(400, CORS).end(JSON.stringify({ ok: false, error: "raw_text is required and must be at least 20 characters" }));
    return;
  }

  const apiKey = bodyKey || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.writeHead(500, CORS).end(JSON.stringify({ ok: false, error: "GEMINI_API_KEY not configured" }));
    return;
  }

  try {
    const llm = new ChatGoogleGenerativeAI({ model: "gemini-2.0-flash-thinking-exp-01-21", apiKey, temperature: 0.4 });
    const tools = [processText, summariseContent, suggestTool, extractKeywords];
    const agent = await createReactAgent({ llm, tools });

    const taskMap = {
      process: `Use the process_text tool to clean and assess the following OCR text. raw_text: ${raw_text}. lang: ${lang}`,
      summarise: `Use the summarise_content tool to summarise the following OCR text and identify its document type. text: ${raw_text}. lang: ${lang}`,
      suggest: `First use the summarise_content tool to get a summary of this OCR text: ${raw_text}. lang: ${lang}. Then use the suggest_tool tool with that summary to recommend the best CelikSense tool. lang: ${lang}`,
      keywords: `Use the extract_keywords tool to extract 5-8 key terms from the following OCR text and provide simple definitions. text: ${raw_text}. lang: ${lang}`,
    };

    const prompt = taskMap[task] || taskMap.summarise;
    const result = await agent.invoke({ messages: [{ role: "user", content: prompt }] });
    const output = result.messages?.[result.messages.length - 1]?.content || result.output || "";

    res.writeHead(200, CORS).end(JSON.stringify({ ok: true, task, lang, output }));
  } catch (err) {
    console.error("[ocr-agent]", err);
    res.writeHead(500, CORS).end(JSON.stringify({ ok: false, error: err.message }));
  }
}

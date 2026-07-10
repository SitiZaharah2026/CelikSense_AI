import { getLLM } from "./_llm.js";
import { tool } from "@langchain/core/tools";
import { createReactAgent } from "langchain/agents";
import { z } from "zod";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

const skim_guide = tool(
  async ({ text, lang }) => {
    return lang === "ms"
      ? `Baca teks berikut dan bantu pelajar disleksia memahaminya dengan cara berikut:\n1. Pilih SATU ayat paling penting daripada teks.\n2. Terangkan idea utama dalam perkataan yang mudah dan ringkas.\n3. Senaraikan 3 hingga 5 perkataan kosa kata penting dengan definisi mudah.\nFormat jawapan dalam teks berstruktur yang jelas.\n\nTeks:\n${text}`
      : `Read the following text and help a dyslexic learner understand it by:\n1. Identifying ONE key sentence from the text.\n2. Explaining the main idea in simple, clear words.\n3. Listing 3 to 5 key vocabulary words with easy definitions.\nFormat the answer as clear structured text.\n\nText:\n${text}`;
  },
  {
    name: "skim_guide",
    description: "Extracts one key sentence, explains the main idea in simple words, and lists 3-5 key vocabulary words from a text to support dyslexic learners.",
    schema: z.object({
      text: z.string().describe("The text to skim and summarize for the dyslexic learner"),
      lang: z.enum(["en", "ms"]).describe("Output language: 'en' for English, 'ms' for Bahasa Melayu"),
    }),
  }
);

const generate_mindmap = tool(
  async ({ text, lang }) => {
    return lang === "ms"
      ? `Baca teks berikut dan hasilkan peta minda dalam format JSON seperti ini:\n{"topic": "tajuk utama", "branches": [{"label": "cawangan", "items": ["perkara 1", "perkara 2"]}]}\nPastikan peta minda ringkas, jelas, dan sesuai untuk pelajar disleksia. Kembalikan JSON sahaja, tiada teks lain.\n\nTeks:\n${text}`
      : `Read the following text and generate a mind map in this exact JSON format:\n{"topic": "main topic", "branches": [{"label": "branch label", "items": ["item 1", "item 2"]}]}\nKeep the mind map concise, clear, and suitable for a dyslexic learner. Return JSON only, no other text.\n\nText:\n${text}`;
  },
  {
    name: "generate_mindmap",
    description: "Generates a structured JSON mind map {topic, branches:[{label, items:[]}]} from a text to help dyslexic learners visualize information.",
    schema: z.object({
      text: z.string().describe("The text to convert into a mind map"),
      lang: z.enum(["en", "ms"]).describe("Output language: 'en' for English, 'ms' for Bahasa Melayu"),
    }),
  }
);

const reading_intervention = tool(
  async ({ difficulty_level, lang }) => {
    return lang === "ms"
      ? `Berikan 3 tips membaca yang khusus dan praktikal untuk pelajar disleksia yang berada pada tahap kesukaran "${difficulty_level}" (low = rendah, medium = sederhana, high = tinggi).\nSetiap tip mestilah:\n- Mudah difahami\n- Boleh dilaksanakan segera\n- Disesuaikan dengan tahap kesukaran tersebut\nFormat sebagai senarai bernombor.`
      : `Provide 3 specific and practical reading tips for a dyslexic learner at the "${difficulty_level}" difficulty level (low, medium, or high).\nEach tip must be:\n- Easy to understand\n- Immediately actionable\n- Tailored to that difficulty level\nFormat as a numbered list.`;
  },
  {
    name: "reading_intervention",
    description: "Returns 3 specific reading intervention tips for a dyslexic learner based on difficulty level: 'low', 'medium', or 'high'.",
    schema: z.object({
      difficulty_level: z.enum(["low", "medium", "high"]).describe("The learner's reading difficulty level: 'low', 'medium', or 'high'"),
      lang: z.enum(["en", "ms"]).describe("Output language: 'en' for English, 'ms' for Bahasa Melayu"),
    }),
  }
);

const simplify_text = tool(
  async ({ text, lang }) => {
    return lang === "ms"
      ? `Tulis semula teks berikut untuk pelajar disleksia menggunakan peraturan ini:\n- Maksimum 8 perkataan setiap ayat\n- Tiada kosa kata yang rumit atau sukar\n- Gunakan perkataan harian yang mudah\n- Kekalkan makna asal teks\nKembalikan teks yang telah dipermudahkan sahaja.\n\nTeks asal:\n${text}`
      : `Rewrite the following text for a dyslexic learner using these rules:\n- Maximum 8 words per sentence\n- No complex or difficult vocabulary\n- Use simple, everyday words\n- Keep the original meaning of the text\nReturn only the simplified text.\n\nOriginal text:\n${text}`;
  },
  {
    name: "simplify_text",
    description: "Rewrites text in simple words with max 8 words per sentence and no complex vocabulary, suitable for dyslexic learners.",
    schema: z.object({
      text: z.string().describe("The text to simplify for the dyslexic learner"),
      lang: z.enum(["en", "ms"]).describe("Output language: 'en' for English, 'ms' for Bahasa Melayu"),
    }),
  }
);

export default async function handler(req, res) {
  if (req.method === "OPTIONS") { res.writeHead(204, CORS).end(); return; }
  if (req.method !== "POST") { res.writeHead(405, CORS).end(JSON.stringify({ error: "Method not allowed" })); return; }

  const { text, task = "skim", difficulty_level = "medium", lang = "ms", apiKey: bodyKey } = req.body || {};

  if (task !== "intervention" && (!text || text.length < 10)) {
    res.writeHead(400, CORS).end(JSON.stringify({ error: "text is required and must be at least 10 characters" }));
    return;
  }
  if (task === "intervention" && !difficulty_level) {
    res.writeHead(400, CORS).end(JSON.stringify({ error: "difficulty_level is required for intervention task" }));
    return;
  }

  const apiKey = bodyKey || process.env.GEMINI_API_KEY;
  const groqKey = req.body?.groqKey || process.env.GROQ_API_KEY;
try {
    const llm = getLLM({ geminiKey: apiKey, groqKey });
    const tools = [skim_guide, generate_mindmap, reading_intervention, simplify_text];
    const agent = await createReactAgent({ llm, tools });

    const taskMap = {
      skim: `Use the skim_guide tool with this text and lang="${lang}": ${text}`,
      mindmap: `Use the generate_mindmap tool with this text and lang="${lang}": ${text}`,
      intervention: `Use the reading_intervention tool with difficulty_level="${difficulty_level}" and lang="${lang}".`,
      simplify: `Use the simplify_text tool with this text and lang="${lang}": ${text}`,
    };

    const userMessage = taskMap[task] || taskMap.skim;
    const result = await agent.invoke({ messages: [{ role: "user", content: userMessage }] });
    const output = result.messages?.[result.messages.length - 1]?.content || result.output || "";

    res.writeHead(200, CORS).end(JSON.stringify({ ok: true, task, lang, output }));
  } catch (err) {
    console.error("[dyslexia-agent]", err);
    res.writeHead(500, CORS).end(JSON.stringify({ ok: false, error: err.message }));
  }
}

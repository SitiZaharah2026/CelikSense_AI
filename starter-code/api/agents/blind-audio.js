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

const routeCommand = tool(
  async ({ raw_command, page_map_json, lang }) => {
    return lang === "ms"
      ? `Anda adalah pembantu navigasi suara untuk aplikasi CelikSense AI. Pengguna telah memberikan arahan suara: "${raw_command}". Peta halaman yang tersedia dalam format JSON: ${page_map_json}. Analisis arahan pengguna dan padankan dengan halaman yang paling sesuai berdasarkan kata kunci. Kembalikan respons dalam format JSON yang tepat: {"page": "nama-fail.html", "reply": "mesej pengesahan dalam Bahasa Melayu yang sesuai untuk dibaca dengan pembaca skrin"}. Pastikan "reply" adalah mesej yang jelas, ringkas, dan mesra pengguna yang mengesahkan destinasi navigasi. Jika tiada padanan, kembalikan {"page": null, "reply": "Maaf, saya tidak faham arahan anda. Sila cuba lagi."}`
      : `You are a voice navigation assistant for the CelikSense AI application. The user has given a voice command: "${raw_command}". The available page map in JSON format: ${page_map_json}. Analyze the user command and match it to the most suitable page based on keywords. Return a response in exact JSON format: {"page": "filename.html", "reply": "spoken confirmation message suitable for screen reader"}. Ensure "reply" is a clear, concise, and user-friendly message confirming the navigation destination. If no match is found, return {"page": null, "reply": "Sorry, I did not understand your command. Please try again."}`;
  },
  {
    name: "route_command",
    description: "Processes a user voice command and maps it to the correct page in the application. Returns a JSON object with the target page filename and a spoken confirmation reply.",
    schema: z.object({
      raw_command: z.string().describe("The raw voice command input from the user"),
      page_map_json: z.string().describe("JSON string containing available pages and their associated keywords"),
      lang: z.enum(["en", "ms"]).describe("Output language: 'en' for English, 'ms' for Bahasa Melayu"),
    }),
  }
);

const describePage = tool(
  async ({ page_name, lang }) => {
    return lang === "ms"
      ? `Anda adalah pembantu audio untuk pengguna buta atau cacat penglihatan menggunakan aplikasi CelikSense AI. Berikan penerangan audio yang terperinci dan berguna tentang halaman "${page_name}". Penerangan mestilah sesuai untuk pembaca skrin atau sistem teks-ke-suara. Nyatakan dengan jelas: (1) Apakah tujuan halaman ini, (2) Apakah ciri-ciri atau fungsi utama yang ada, (3) Bagaimana pengguna boleh berinteraksi dengan halaman ini, (4) Sebarang maklumat penting yang perlu diketahui pengguna sebelum menggunakan halaman ini. Gunakan ayat yang pendek, jelas, dan mudah difahami. Elakkan simbol atau jargon teknikal. Tulis dalam Bahasa Melayu yang sopan dan mesra.`
      : `You are an audio assistant for blind or visually impaired users of the CelikSense AI application. Provide a detailed and helpful audio description of the page "${page_name}". The description must be suitable for screen readers or text-to-speech systems. Clearly state: (1) What is the purpose of this page, (2) What are the main features or functions available, (3) How the user can interact with this page, (4) Any important information the user should know before using this page. Use short, clear, and easy-to-understand sentences. Avoid symbols or technical jargon. Write in friendly and accessible English.`;
  },
  {
    name: "describe_page",
    description: "Generates a verbal audio description of a named application page, suitable for screen readers and TTS systems. Helps blind or visually impaired users understand what a page does before navigating to it.",
    schema: z.object({
      page_name: z.string().describe("The name of the page to describe, e.g. 'dashboard', 'adhd-agent', 'settings'"),
      lang: z.enum(["en", "ms"]).describe("Output language: 'en' for English, 'ms' for Bahasa Melayu"),
    }),
  }
);

const audioFormatText = tool(
  async ({ text, lang }) => {
    return lang === "ms"
      ? `Anda adalah juruformat teks audio untuk pengguna buta atau cacat penglihatan. Tulis semula teks berikut agar sesuai untuk bacaan audio dan sistem teks-ke-suara. Teks asal: "${text}". Peraturan pemformatan: (1) Gunakan ayat yang pendek, maksimum 15 patah perkataan setiap ayat, (2) Ejakan semua nombor dalam perkataan, contohnya "3" menjadi "tiga", (3) Buang semua simbol khas seperti *, #, @, &, /, \\ dan gantikan dengan perkataan yang sesuai atau buangnya, (4) Gantikan singkatan dengan perkataan penuh, (5) Gunakan tanda baca yang sesuai untuk jeda semula jadi dalam bacaan suara, (6) Elakkan penggunaan huruf besar semua kecuali untuk nama khas, (7) Pastikan teks mudah difahami apabila dibaca dengan kuat. Kembalikan hanya teks yang telah diformat semula dalam Bahasa Melayu.`
      : `You are an audio text formatter for blind or visually impaired users. Rewrite the following text to be suitable for audio playback and text-to-speech systems. Original text: "${text}". Formatting rules: (1) Use short sentences, maximum 15 words per sentence, (2) Spell out all numbers in words, e.g. "3" becomes "three", (3) Remove all special symbols such as *, #, @, &, /, \\ and replace with appropriate words or remove them, (4) Expand abbreviations to full words, (5) Use appropriate punctuation for natural pauses in voice reading, (6) Avoid all-caps except for proper nouns, (7) Ensure text is easy to understand when read aloud. Return only the reformatted text in English.`;
  },
  {
    name: "audio_format_text",
    description: "Takes any text and reformats it for audio playback by using short sentences, spelling out numbers, removing symbols, and making it reading-friendly for screen readers and TTS systems.",
    schema: z.object({
      text: z.string().describe("The text to reformat for audio playback"),
      lang: z.enum(["en", "ms"]).describe("Output language: 'en' for English, 'ms' for Bahasa Melayu"),
    }),
  }
);

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.writeHead(204, CORS).end();
    return;
  }
  if (req.method !== "POST") {
    res.writeHead(405, CORS).end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  const {
    command,
    page_name,
    text,
    task = "route",
    lang = "ms",
    apiKey: bodyKey,
  } = req.body || {};

  const apiKey = bodyKey || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.writeHead(500, CORS).end(JSON.stringify({ error: "GEMINI_API_KEY not configured" }));
    return;
  }

  const defaultPageMap = JSON.stringify({
    dashboard: ["dashboard", "home", "utama", "papan pemuka", "main"],
    "adhd-agent": ["adhd", "focus", "attention", "fokus", "perhatian", "tumpuan"],
    "dyslexia-agent": ["dyslexia", "reading", "disleksia", "bacaan", "baca"],
    "blind-audio": ["blind", "audio", "buta", "suara", "voice", "navigation", "navigasi"],
    "sign-sense": ["sign", "tanda", "isyarat", "sign language", "bahasa isyarat"],
    settings: ["settings", "tetapan", "preferences", "pilihan", "config"],
  });

  const taskMap = {
    route: `Use the route_command tool. Raw command: "${command || ""}". Page map JSON: ${defaultPageMap}. Lang: ${lang}`,
    describe: `Use the describe_page tool. Page name: "${page_name || "dashboard"}". Lang: ${lang}`,
    format: `Use the audio_format_text tool. Text to format: "${text || ""}". Lang: ${lang}`,
  };

  if (task === "route" && !command) {
    res.writeHead(400, CORS).end(JSON.stringify({ error: "command is required for route task" }));
    return;
  }
  if (task === "describe" && !page_name) {
    res.writeHead(400, CORS).end(JSON.stringify({ error: "page_name is required for describe task" }));
    return;
  }
  if (task === "format" && !text) {
    res.writeHead(400, CORS).end(JSON.stringify({ error: "text is required for format task" }));
    return;
  }

  try {
    const llm = new ChatGoogleGenerativeAI({
      model: "gemini-2.0-flash-thinking-exp-01-21",
      apiKey,
      temperature: 0.4,
    });

    const tools = [routeCommand, describePage, audioFormatText];
    const agent = await createReactAgent({ llm, tools });

    const prompt = taskMap[task] || taskMap.route;
    const result = await agent.invoke({
      messages: [{ role: "user", content: prompt }],
    });

    const output =
      result.messages?.[result.messages.length - 1]?.content ||
      result.output ||
      "";

    res.writeHead(200, CORS).end(JSON.stringify({ ok: true, task, lang, output }));
  } catch (err) {
    console.error("[blind-audio]", err);
    res.writeHead(500, CORS).end(JSON.stringify({ ok: false, error: err.message }));
  }
}

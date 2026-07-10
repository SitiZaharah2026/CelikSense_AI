import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatGroq } from "@langchain/groq";

/**
 * Returns an LLM instance.
 * Priority: Gemini (if key available) → Groq (fallback, free tier)
 */
export function getLLM({ geminiKey, groqKey } = {}) {
  const gKey  = geminiKey || process.env.GEMINI_API_KEY;
  const grKey = groqKey   || process.env.GROQ_API_KEY;

  if (gKey) {
    return new ChatGoogleGenerativeAI({
      model: "gemini-2.0-flash-thinking-exp-01-21",
      apiKey: gKey,
      temperature: 0.4,
    });
  }
  if (grKey) {
    return new ChatGroq({
      model: "llama-3.3-70b-versatile",
      apiKey: grKey,
      temperature: 0.4,
    });
  }
  throw new Error("Tiada API key. Sila masukkan Gemini atau Groq API key dalam Tetapan.");
}

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

const analyseRisk = tool(
  async ({ scores_json, lang }) => {
    return lang === "ms"
      ? `Analisis data skor pelajar berikut dan tentukan tahap risiko (rendah/sederhana/tinggi/kritikal) dengan penjelasan yang jelas dalam Bahasa Melayu. Skor pelajar (0-100): ${scores_json}. Nilaikan setiap domain (kehadiran, tingkah laku, akademik, penglibatan) dan berikan tahap risiko keseluruhan beserta sebab-sebabnya. Format: Tahap Risiko: [tahap] | Penjelasan: [huraian terperinci]`
      : `Analyse the following student score data and determine the risk level (low/medium/high/critical) with a clear explanation in English. Student scores (0-100): ${scores_json}. Evaluate each domain (attendance, behaviour, academic, engagement) and provide an overall risk level with reasoning. Format: Risk Level: [level] | Explanation: [detailed description]`;
  },
  {
    name: "analyse_risk",
    description: "Analyses student scores across attendance, behaviour, academic, and engagement domains to determine overall risk level (low/medium/high/critical) with explanation.",
    schema: z.object({
      scores_json: z.string().describe("JSON string with keys: attendance, behaviour, academic, engagement (values 0-100)"),
      lang: z.enum(["en", "ms"]).describe("Output language: en for English, ms for Bahasa Melayu"),
    }),
  }
);

const interpretWithContext = tool(
  async ({ risk_summary, adhd_context, lang }) => {
    return lang === "ms"
      ? `Berikan interpretasi holistik yang menggabungkan maklumat risiko pelajar dan data sesi ADHD mereka dalam Bahasa Melayu. Ringkasan risiko: ${risk_summary}. Data konteks ADHD: ${adhd_context}. Analisis bagaimana faktor ADHD mempengaruhi profil risiko pelajar ini, kenalpasti corak yang berkaitan, dan berikan pandangan menyeluruh yang membantu guru memahami situasi pelajar secara holistik. Sertakan cadangan awal berdasarkan kedua-dua sumber data ini.`
      : `Provide a holistic AI interpretation combining the student's risk information and their ADHD session data in English. Risk summary: ${risk_summary}. ADHD context data: ${adhd_context}. Analyse how ADHD factors influence this student's risk profile, identify relevant patterns, and offer a comprehensive insight that helps the teacher understand the student's situation holistically. Include preliminary suggestions based on both data sources.`;
  },
  {
    name: "interpret_with_context",
    description: "Provides holistic AI interpretation combining risk summary with ADHD session context data to give a comprehensive understanding of the student's situation.",
    schema: z.object({
      risk_summary: z.string().describe("Brief risk description or risk level summary for the student"),
      adhd_context: z.string().describe("ADHD session data string containing session metrics, focus scores, or behavioural observations"),
      lang: z.enum(["en", "ms"]).describe("Output language: en for English, ms for Bahasa Melayu"),
    }),
  }
);

const suggestActions = tool(
  async ({ risk_level, student_profile, lang }) => {
    return lang === "ms"
      ? `Berikan TEPAT 3 langkah tindakan konkrit untuk guru berdasarkan tahap risiko pelajar ini dalam Bahasa Melayu. Tahap risiko: ${risk_level}. Profil pelajar: ${student_profile}. Setiap langkah tindakan mesti: (1) spesifik dan boleh dilaksanakan, (2) disesuaikan dengan tahap risiko yang dinyatakan, (3) mengambil kira konteks pelajar. Format respons: Tindakan 1: [huraian] | Tindakan 2: [huraian] | Tindakan 3: [huraian]`
      : `Provide EXACTLY 3 concrete action steps for the teacher based on this student's risk level in English. Risk level: ${risk_level}. Student profile: ${student_profile}. Each action step must be: (1) specific and actionable, (2) tailored to the stated risk level, (3) considerate of the student's context. Response format: Action 1: [description] | Action 2: [description] | Action 3: [description]`;
  },
  {
    name: "suggest_actions",
    description: "Generates exactly 3 concrete, actionable steps for the teacher based on the student's risk level and profile.",
    schema: z.object({
      risk_level: z.enum(["low", "medium", "high", "critical"]).describe("The student's assessed risk level"),
      student_profile: z.string().describe("Student profile information including grade, age, learning needs, or other relevant context"),
      lang: z.enum(["en", "ms"]).describe("Output language: en for English, ms for Bahasa Melayu"),
    }),
  }
);

const generateReport = tool(
  async ({ student_data, lang }) => {
    return lang === "ms"
      ? `Hasilkan satu perenggan laporan profesional yang sedia untuk dibaca oleh guru tentang pelajar ini dalam Bahasa Melayu. Data pelajar: ${student_data}. Laporan mesti: (1) ditulis dalam nada profesional dan empati, (2) merangkumi semua domain penilaian yang relevan, (3) menyatakan tahap risiko dengan jelas, (4) memberikan konteks yang mencukupi untuk tindakan susulan, (5) sesuai untuk dimasukkan ke dalam rekod rasmi pelajar. Tulis sebagai perenggan yang koheren dan lengkap.`
      : `Generate a single professional teacher-ready report paragraph about this student in English. Student data: ${student_data}. The report must: (1) be written in a professional and empathetic tone, (2) cover all relevant assessment domains, (3) clearly state the risk level, (4) provide sufficient context for follow-up action, (5) be suitable for inclusion in official student records. Write as a coherent and complete paragraph.`;
  },
  {
    name: "generate_report",
    description: "Generates a professional teacher-ready report paragraph summarising the student's early warning assessment across all domains.",
    schema: z.object({
      student_data: z.string().describe("JSON string containing student data including scores, profile, risk level, and any relevant context"),
      lang: z.enum(["en", "ms"]).describe("Output language: en for English, ms for Bahasa Melayu"),
    }),
  }
);

export default async function handler(req, res) {
  if (req.method === "OPTIONS") { res.writeHead(204, CORS).end(); return; }
  if (req.method !== "POST") { res.writeHead(405, CORS).end(JSON.stringify({ error: "Method not allowed" })); return; }

  const {
    scores,
    adhd_context,
    profile,
    task = "interpret",
    lang = "ms",
    apiKey: bodyKey,
    risk_summary,
  } = req.body || {};

  const apiKey = bodyKey || process.env.GEMINI_API_KEY;
  const groqKey = req.body?.groqKey || process.env.GROQ_API_KEY;
const scoresStr = scores ? (typeof scores === "string" ? scores : JSON.stringify(scores)) : "{}";
  const profileStr = profile ? (typeof profile === "string" ? profile : JSON.stringify(profile)) : "{}";
  const studentDataStr = JSON.stringify({ scores, profile, adhd_context, lang });
  const riskSummaryStr = risk_summary || `Scores: ${scoresStr}`;
  const adhdContextStr = adhd_context || "No ADHD context provided";

  const taskMap = {
    analyse: `Use the analyse_risk tool. scores_json: ${scoresStr}. lang: ${lang}`,
    interpret: `Use the interpret_with_context tool. risk_summary: ${riskSummaryStr}. adhd_context: ${adhdContextStr}. lang: ${lang}`,
    actions: `Use the suggest_actions tool. risk_level: ${risk_summary || "medium"}. student_profile: ${profileStr}. lang: ${lang}`,
    report: `Use the generate_report tool. student_data: ${studentDataStr}. lang: ${lang}`,
  };

  try {
    const llm = getLLM({ geminiKey: apiKey, groqKey });
    const tools = [analyseRisk, interpretWithContext, suggestActions, generateReport];
    const agent = await createReactAgent({ llm, tools });
    const result = await agent.invoke({ messages: [{ role: "user", content: taskMap[task] || taskMap.interpret }] });
    const output = result.messages?.[result.messages.length - 1]?.content || result.output || "";
    res.writeHead(200, CORS).end(JSON.stringify({ ok: true, task, lang, output }));
  } catch (err) {
    console.error("[early-warning]", err);
    res.writeHead(500, CORS).end(JSON.stringify({ ok: false, error: err.message }));
  }
}

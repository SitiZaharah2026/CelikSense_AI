/**
 * CelikSense Agent Test Suite
 * Runs each agent with a mock request and checks for a valid response.
 * Usage: node test-agents.mjs [GEMINI_API_KEY]
 */

const API_KEY = process.argv[2] || process.env.GEMINI_API_KEY || '';

if (!API_KEY) {
  console.error('ERROR: Sila berikan Gemini API key sebagai argumen pertama:');
  console.error('  node test-agents.mjs YOUR_API_KEY');
  process.exit(1);
}

// Mock Vercel request/response
function mockReq(body) {
  return {
    method: 'POST',
    body,
    headers: { 'content-type': 'application/json' },
    json: async () => body,
  };
}

function mockRes() {
  const r = { status: 200, body: null, headers: {} };
  r.setHeader = (k, v) => { r.headers[k] = v; };
  r.status = (code) => { r._status = code; return r; };
  r.json = (data) => { r.body = data; };
  r.end = () => {};
  return r;
}

const TESTS = [
  {
    name: 'adhd',
    file: './api/agents/adhd.js',
    payload: { task: 'strategy', lang: 'ms', profile_summary: 'Murid ADHD gred 4, 5 sesi, skor fokus 60%', apiKey: API_KEY },
  },
  {
    name: 'dyslexia',
    file: './api/agents/dyslexia.js',
    payload: { task: 'simplify', lang: 'ms', text: 'Fotosintesis adalah proses tumbuhan membuat makanan menggunakan cahaya matahari.', apiKey: API_KEY },
  },
  {
    name: 'early-warning',
    file: './api/agents/early-warning.js',
    payload: { task: 'analyse', lang: 'ms', student_data: JSON.stringify({ name: 'Ali', focus: 40, sessions: 3, errors: 12 }), apiKey: API_KEY },
  },
  {
    name: 'blind-audio',
    file: './api/agents/blind-audio.js',
    payload: { task: 'describe', lang: 'ms', page_context: 'Halaman utama CelikSense dengan 10 butang ejen', apiKey: API_KEY },
  },
  {
    name: 'intervention',
    file: './api/agents/intervention.js',
    payload: { task: 'plan', lang: 'ms', student_profile: 'Pelajar disleksia gred 3, lemah membaca', apiKey: API_KEY },
  },
  {
    name: 'personalisation',
    file: './api/agents/personalisation.js',
    payload: { task: 'insights', lang: 'ms', usage_data: JSON.stringify({ agent: 'adhd', sessions: 5, avg_focus: 65 }), apiKey: API_KEY },
  },
  {
    name: 'ocr',
    file: './api/agents/ocr.js',
    payload: { task: 'process', lang: 'ms', extracted_text: 'Bumi mengelilingi matahari dalam masa 365 hari.', apiKey: API_KEY },
  },
  {
    name: 'reader (coach)',
    file: './api/agents/reader.js',
    payload: { task: 'guide', lang: 'ms', text: 'Hujan turun apabila titisan air di awan menjadi berat.', apiKey: API_KEY },
  },
  {
    name: 'librarian',
    file: './api/agents/librarian.js',
    payload: { task: 'search', lang: 'ms', query: 'buku cerita kanak-kanak disleksia', apiKey: API_KEY },
  },
  {
    name: 'coach',
    file: './api/agents/coach.js',
    payload: { task: 'motivate', lang: 'ms', student_name: 'Siti', progress: 'Berjaya habiskan 3 sesi membaca minggu ini', apiKey: API_KEY },
  },
];

let passed = 0, failed = 0;

for (const test of TESTS) {
  process.stdout.write(`\n[${test.name}] Menguji... `);
  try {
    const mod = await import(test.file);
    const handler = mod.default;

    const req = mockReq(test.payload);
    const res = mockRes();

    await handler(req, res);

    if (res.body && res.body.ok) {
      const preview = String(res.body.output || '').slice(0, 80).replace(/\n/g, ' ');
      console.log(`✓ OK`);
      console.log(`   Output: "${preview}..."`);
      passed++;
    } else {
      console.log(`✗ GAGAL — ok=false`);
      console.log(`   Error: ${res.body?.error || JSON.stringify(res.body)}`);
      failed++;
    }
  } catch (err) {
    console.log(`✗ EXCEPTION`);
    console.log(`   ${err.message}`);
    failed++;
  }
}

console.log(`\n${'─'.repeat(50)}`);
console.log(`Keputusan: ${passed} lulus / ${failed} gagal / ${TESTS.length} jumlah`);
if (failed === 0) {
  console.log('Semua ejen berfungsi dengan baik!');
} else {
  console.log('Ada ejen yang perlu diperiksa — semak ralat di atas.');
}

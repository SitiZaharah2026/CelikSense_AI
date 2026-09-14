const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 8080;

const MIME = {
  '.html': 'text/html',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff2':'font/woff2',
  '.woff': 'font/woff',
  '.ttf':  'font/ttf',
};

// Each entry: {host, path, key (env var name), model}
const MODEL_CHAIN = [
  { host: 'api.groq.com',    path: '/openai/v1/chat/completions', keyVar: 'GROQ_API_KEY',     model: 'groq/compound-mini' },
  { host: 'api.groq.com',    path: '/openai/v1/chat/completions', keyVar: 'GROQ_API_KEY',     model: 'qwen/qwen3.8-27b' },
  { host: 'api.groq.com',    path: '/openai/v1/chat/completions', keyVar: 'GROQ_API_KEY',     model: 'openai/gpt-oss-20b' },
  { host: 'openrouter.ai',   path: '/api/v1/chat/completions',    keyVar: 'OPENROUTER_API_KEY', model: 'meta-llama/llama-3.2-3b-instruct:free' },
  { host: 'openrouter.ai',   path: '/api/v1/chat/completions',    keyVar: 'OPENROUTER_API_KEY', model: 'qwen/qwen-2.5-7b-instruct:free' },
];

function callApi(host, path, apiKey, model, messages, callback) {
  const body = JSON.stringify({ model, messages, max_tokens: 800 });
  const extraHeaders = host === 'openrouter.ai' ? {
    'HTTP-Referer': 'https://celiksense-ai-116242246073.asia-southeast1.run.app',
    'X-Title': 'CelikSense AI',
  } : {};
  const opts = {
    hostname: host,
    port: 443,
    path: path,
    method: 'POST',
    headers: Object.assign({
      'Authorization': 'Bearer ' + apiKey,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
    }, extraHeaders),
  };
  let done = false;
  const req = https.request(opts, res2 => {
    let data = '';
    res2.on('data', d => data += d);
    res2.on('end', () => { if (!done) { done = true; callback(null, res2.statusCode, data); } });
  });
  req.on('error', e => { if (!done) { done = true; callback(e); } });
  req.setTimeout(10000, () => {
    if (!done) { done = true; req.destroy(); callback(new Error('timeout')); }
  });
  req.write(body);
  req.end();
}

function tryModels(clientKey, messages, chain, idx, res) {
  if (idx >= chain.length) {
    res.writeHead(503, {'Content-Type':'application/json'});
    res.end(JSON.stringify({error:'all_models_unavailable'}));
    return;
  }
  const entry = chain[idx];
  const apiKey = process.env[entry.keyVar] || clientKey || '';
  if (!apiKey) { tryModels(clientKey, messages, chain, idx + 1, res); return; }

  callApi(entry.host, entry.path, apiKey, entry.model, messages, (err, status, data) => {
    if (err) { tryModels(clientKey, messages, chain, idx + 1, res); return; }
    try {
      const json = JSON.parse(data);
      // Skip on any error status or API error response
      if (status >= 400 || json.error) {
        tryModels(clientKey, messages, chain, idx + 1, res);
        return;
      }
      const content = json?.choices?.[0]?.message?.content || '';
      if (!content) { tryModels(clientKey, messages, chain, idx + 1, res); return; }
      const match = content.match(/\{[\s\S]*\}/);
      if (match) {
        try {
          const result = JSON.parse(match[0]);
          res.writeHead(200, {'Content-Type':'application/json'});
          res.end(JSON.stringify(result));
          return;
        } catch(e) {}
      }
      res.writeHead(200, {'Content-Type':'application/json'});
      res.end(JSON.stringify({ raw: content }));
    } catch(e) {
      tryModels(clientKey, messages, chain, idx + 1, res);
    }
  });
}

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  // Health check
  if (req.url === '/api/test') {
    res.writeHead(200, {'Content-Type':'application/json'});
    res.end(JSON.stringify({ok:true, server:'celiksense-node-v19', groq: !!process.env.GROQ_API_KEY, or: !!process.env.OPENROUTER_API_KEY}));
    return;
  }

  // Debug: test Groq key directly
  if (req.url === '/api/debug-groq') {
    const gk = process.env.GROQ_API_KEY || '';
    if (!gk) { res.writeHead(200); res.end(JSON.stringify({error:'no GROQ_API_KEY env var'})); return; }
    // List available models
    const opts2 = { hostname:'api.groq.com', port:443, path:'/openai/v1/models', method:'GET',
      headers:{'Authorization':'Bearer '+gk,'Content-Type':'application/json'} };
    const req2 = https.request(opts2, r2 => {
      let d=''; r2.on('data',c=>d+=c); r2.on('end',()=>{
        res.writeHead(200,{'Content-Type':'application/json'});
        try { const j=JSON.parse(d); const ids=j.data.filter(m=>m.object==='model'&&(m.input_modalities||['text']).includes('text')&&(m.output_modalities||['text']).includes('text')).map(m=>m.id); res.end(JSON.stringify(ids)); } catch(e) { res.end(d.substring(0,3000)); }
      });
    });
    req2.on('error',e=>{ res.writeHead(200); res.end(JSON.stringify({err:e.message})); });
    req2.end();
    return;
  }

  // Agent endpoints — auto-retry across free models
  if (req.url.startsWith('/api/agents/') && req.method === 'POST') {
    let body = '';
    req.on('data', d => body += d);
    req.on('end', () => {
      let parsed;
      try { parsed = JSON.parse(body); } catch(e) {
        res.writeHead(400, {'Content-Type':'application/json'});
        res.end(JSON.stringify({error:'bad_request'}));
        return;
      }

      const serverKey = process.env.OPENROUTER_API_KEY || '';
      const apiKey = serverKey || parsed.apiKey || parsed.groqKey || '';
      const task = parsed.task || 'summarise';
      const text = parsed.text || '';
      const lang = parsed.lang || 'en';

      let prompt = '';
      if (task === 'questions') {
        prompt = `Read the text and generate exactly 5 multiple choice questions. Reply with ONLY valid JSON, no markdown, no explanation. Format: {"questions":[{"question":"...","options":["A) ...","B) ...","C) ...","D) ..."],"answer":"A) ..."}]}\n\nText:\n${text.slice(0,1500)}`;
      } else if (task === 'summarise') {
        prompt = `Summarise this text. Reply with ONLY valid JSON: {"summary":"one paragraph summary","keyPoints":["point1","point2","point3"],"difficulty":"easy"}\n\nText:\n${text.slice(0,1500)}`;
      } else {
        prompt = text.slice(0, 2000);
      }

      if (!apiKey) {
        res.writeHead(400, {'Content-Type':'application/json'});
        res.end(JSON.stringify({error:'no_key'}));
        return;
      }

      const messages = [{ role: 'user', content: prompt }];
      tryModels(apiKey, messages, MODEL_CHAIN, 0, res);
    });
    return;
  }

  // Proxy endpoint — passes through any OpenRouter request with server-side key
  if (req.url === '/api/proxy' && req.method === 'POST') {
    let body = '';
    req.on('data', d => body += d);
    req.on('end', () => {
      let parsed;
      try { parsed = JSON.parse(body); } catch(e) {
        res.writeHead(400, {'Content-Type':'application/json'});
        res.end(JSON.stringify({error:'bad_request'}));
        return;
      }

      const serverKey = process.env.OPENROUTER_API_KEY || '';
      const apiKey  = serverKey || parsed.apiKey  || '';
      const target  = parsed.target  || 'chat';
      const payload = parsed.payload || null;

      if (!apiKey) {
        res.writeHead(400, {'Content-Type':'application/json'});
        res.end(JSON.stringify({error:'no_key'}));
        return;
      }

      // If payload specifies a model — still use model fallback for chat requests
      if (target === 'chat' && payload) {
        const messages = payload.messages || [];
        tryModels(apiKey, messages, MODEL_CHAIN, 0, res);
        return;
      }

      const orPath = target === 'models' ? '/api/v1/models' : '/api/v1/chat/completions';
      const reqBody = payload ? JSON.stringify(payload) : null;
      const opts = {
        hostname: 'openrouter.ai',
        port: 443,
        path: orPath,
        method: reqBody ? 'POST' : 'GET',
        headers: {
          'Authorization': 'Bearer ' + apiKey,
          'Content-Type':  'application/json',
          'HTTP-Referer':  'https://celiksense-ai-116242246073.asia-southeast1.run.app',
          'X-Title':       'CelikSense AI',
        },
      };
      if (reqBody) opts.headers['Content-Length'] = Buffer.byteLength(reqBody);

      const proxyReq = https.request(opts, proxyRes => {
        let data = '';
        proxyRes.on('data', d => data += d);
        proxyRes.on('end', () => {
          res.writeHead(proxyRes.statusCode, {'Content-Type':'application/json'});
          res.end(data);
        });
      });
      proxyReq.on('error', e => {
        res.writeHead(502, {'Content-Type':'application/json'});
        res.end(JSON.stringify({error: e.message}));
      });
      if (reqBody) proxyReq.write(reqBody);
      proxyReq.end();
    });
    return;
  }

  // Static file serving
  let filePath = path.join(__dirname, url.parse(req.url).pathname);
  if (filePath.endsWith('/') || !path.extname(filePath)) {
    filePath = path.join(filePath.replace(/\/$/, ''), 'index.html');
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      fs.readFile(path.join(__dirname, 'index.html'), (err2, data2) => {
        if (err2) { res.writeHead(404); res.end('Not found'); return; }
        res.writeHead(200, {'Content-Type':'text/html', 'Cache-Control':'no-store'});
        res.end(data2);
      });
      return;
    }
    const ext = path.extname(filePath);
    const noCache = ext === '.html' || ext === '.js';
    const headers = {'Content-Type': MIME[ext] || 'application/octet-stream'};
    if (noCache) headers['Cache-Control'] = 'no-store';
    res.writeHead(200, headers);
    res.end(data);
  });
});

server.listen(PORT, () => console.log('CelikSense AI server on port ' + PORT));

/**
 * AI-Driven Dashboard Server
 * 
 * Servidor HTTP em Node.js puro (zero dependências) que serve o dashboard
 * de acompanhamento do projeto e expõe APIs para leitura de artefatos e
 * registro de feedback do usuário.
 * 
 * Uso: node dashboard-server.js <caminho-para-docs> [porta]
 * Exemplo: node dashboard-server.js ./docs 3333
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const DOCS_DIR = process.argv[2];
const PORT = parseInt(process.argv[3] || '3333', 10);

if (!DOCS_DIR) {
  console.error('Uso: node dashboard-server.js <caminho-para-docs> [porta]');
  console.error('Exemplo: node dashboard-server.js ./docs 3333');
  process.exit(1);
}

const docsPath = path.resolve(DOCS_DIR);

if (!fs.existsSync(docsPath)) {
  console.error(`Erro: diretório "${docsPath}" não encontrado.`);
  process.exit(1);
}

// --- Helpers ---

function readJSON(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (e) {
    return null;
  }
}

function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

function scanArtifacts(dir, basePath = '') {
  const artifacts = [];
  
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const relativePath = path.join(basePath, entry.name);
      const fullPath = path.join(dir, entry.name);
      
      if (entry.name === 'feedback.json' || entry.name === '.git') continue;
      
      if (entry.isDirectory()) {
        artifacts.push({
          type: 'directory',
          name: entry.name,
          path: relativePath,
          children: scanArtifacts(fullPath, relativePath)
        });
      } else {
        const stats = fs.statSync(fullPath);
        artifacts.push({
          type: 'file',
          name: entry.name,
          path: relativePath,
          size: stats.size,
          modified: stats.mtime.toISOString(),
          extension: path.extname(entry.name)
        });
      }
    }
  } catch (e) {
    // ignore read errors
  }
  
  return artifacts;
}

function getFlightPlanProgress(dir) {
  try {
    const files = [];
    
    function findPlanos(d) {
      const entries = fs.readdirSync(d, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isFile() && entry.name.includes('plano-de-voo')) {
          files.push(path.join(d, entry.name));
        } else if (entry.isDirectory() && !entry.name.startsWith('.')) {
          findPlanos(path.join(d, entry.name));
        }
      }
    }
    
    findPlanos(dir);
    
    let total = 0;
    let done = 0;
    
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8');
      const checked = (content.match(/- \[x\]/gi) || []).length;
      const unchecked = (content.match(/- \[ \]/gi) || []).length;
      total += checked + unchecked;
      done += checked;
    }
    
    return { total, done, percentage: total > 0 ? Math.round((done / total) * 100) : 0 };
  } catch (e) {
    return { total: 0, done: 0, percentage: 0 };
  }
}

function getDashboardHTML() {
  const htmlPath = path.join(__dirname, '..', 'assets', 'dashboard.html');
  try {
    return fs.readFileSync(htmlPath, 'utf-8');
  } catch (e) {
    return '<html><body><h1>Erro: dashboard.html não encontrado</h1><p>Esperado em: ' + htmlPath + '</p></body></html>';
  }
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(new Error('JSON inválido'));
      }
    });
    req.on('error', reject);
  });
}

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function sendJSON(res, data, status = 200) {
  cors(res);
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data, null, 2));
}

function sendHTML(res, html) {
  cors(res);
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
}

// --- Rotas ---

const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;

  // CORS preflight
  if (req.method === 'OPTIONS') {
    cors(res);
    res.writeHead(204);
    res.end();
    return;
  }

  try {
    // Página principal
    if (pathname === '/' && req.method === 'GET') {
      sendHTML(res, getDashboardHTML());
      return;
    }

    // API: context.json
    if (pathname === '/api/context' && req.method === 'GET') {
      const contextPath = path.join(docsPath, 'context.json');
      const context = readJSON(contextPath);
      if (context) {
        sendJSON(res, context);
      } else {
        sendJSON(res, { error: 'context.json não encontrado ou inválido' }, 404);
      }
      return;
    }

    // API: artefatos
    if (pathname === '/api/artifacts' && req.method === 'GET') {
      const artifacts = scanArtifacts(docsPath);
      sendJSON(res, { artifacts, scanned_at: new Date().toISOString() });
      return;
    }

    // API: progresso do plano de voo
    if (pathname === '/api/progress' && req.method === 'GET') {
      const progress = getFlightPlanProgress(docsPath);
      sendJSON(res, progress);
      return;
    }

    // API: ler feedback existente
    if (pathname === '/api/feedback' && req.method === 'GET') {
      const feedbackPath = path.join(docsPath, 'feedback.json');
      const feedback = readJSON(feedbackPath);
      sendJSON(res, feedback || { feedbacks: [] });
      return;
    }

    // API: registrar feedback
    if (pathname === '/api/feedback' && req.method === 'POST') {
      const body = await parseBody(req);
      
      if (!body.text || body.text.trim().length === 0) {
        sendJSON(res, { error: 'Campo "text" é obrigatório' }, 400);
        return;
      }

      const feedbackPath = path.join(docsPath, 'feedback.json');
      const existing = readJSON(feedbackPath) || { feedbacks: [] };
      
      existing.feedbacks.push({
        id: Date.now(),
        text: body.text.trim(),
        type: body.type || 'geral',
        phase: body.phase || null,
        timestamp: new Date().toISOString()
      });

      writeJSON(feedbackPath, existing);
      sendJSON(res, { success: true, total: existing.feedbacks.length });
      return;
    }

    // API: leitura de arquivo específico
    if (pathname === '/api/file' && req.method === 'GET') {
      const filePath = parsed.query.path;
      if (!filePath) {
        sendJSON(res, { error: 'Parâmetro "path" é obrigatório' }, 400);
        return;
      }

      const fullPath = path.join(docsPath, filePath);
      
      // Segurança: impedir traversal
      if (!fullPath.startsWith(docsPath)) {
        sendJSON(res, { error: 'Acesso negado' }, 403);
        return;
      }

      try {
        const content = fs.readFileSync(fullPath, 'utf-8');
        sendJSON(res, { path: filePath, content });
      } catch (e) {
        sendJSON(res, { error: 'Arquivo não encontrado' }, 404);
      }
      return;
    }

    // 404
    sendJSON(res, { error: 'Rota não encontrada' }, 404);

  } catch (e) {
    console.error('Erro no servidor:', e.message);
    sendJSON(res, { error: 'Erro interno do servidor' }, 500);
  }
});

server.listen(PORT, () => {
  console.log(`\n🚀 AI-Driven Dashboard`);
  console.log(`   Docs: ${docsPath}`);
  console.log(`   URL:  http://localhost:${PORT}`);
  console.log(`\n   Endpoints:`);
  console.log(`     GET  /              → Dashboard HTML`);
  console.log(`     GET  /api/context   → context.json do projeto`);
  console.log(`     GET  /api/artifacts → lista de artefatos`);
  console.log(`     GET  /api/progress  → progresso do plano de voo`);
  console.log(`     GET  /api/feedback  → feedbacks registrados`);
  console.log(`     POST /api/feedback  → registrar novo feedback`);
  console.log(`     GET  /api/file?path=<path> → ler arquivo específico`);
  console.log(`\n   Ctrl+C para encerrar\n`);
});

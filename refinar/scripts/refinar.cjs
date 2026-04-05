#!/usr/bin/env node

// Este script ajuda a inicializar o diretório de ideias para a skill refinar-ideia.

const fs = require('fs');
const path = require('path');

const IDEAS_DIR = path.join('docs', '01-ideias');

if (!fs.existsSync(IDEAS_DIR)) {
  fs.mkdirSync(IDEAS_DIR, { recursive: true });
  process.stderr.write(`Created directory: ${IDEAS_DIR}\n`);
} else {
  process.stderr.write(`Directory already exists: ${IDEAS_DIR}\n`);
}

console.log(JSON.stringify({ status: 'ready', directory: IDEAS_DIR }));

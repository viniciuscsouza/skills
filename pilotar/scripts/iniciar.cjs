#!/usr/bin/env node
/**
 * Inicializa a estrutura de documentação para um projeto pilotar.
 * Cria o diretório docs/ com subpastas numeradas e o context.json inicial.
 *
 * Uso: node pilotar/scripts/iniciar.cjs [nome-do-projeto]
 */

const fs = require('fs');
const path = require('path');

const projectName = process.argv[2] || 'meu-projeto';
const docsDir = path.join(process.cwd(), 'docs');

const dirs = [
  'docs',
  'docs/01-ideias',
  'docs/02-especificacoes',
  'docs/03-planos',
  'docs/04-tarefas',
  'docs/05-decisoes',
  'docs/07-debug',
  'docs/feedback',
];

const contextJson = {
  projeto: projectName,
  fase_atual: 'contextualizar',
  status: 'em_andamento',
  tipo_trabalho: 'projeto_novo',
  artefatos: {
    visao: 'docs/00-visao.md',
    ideias_refinadas: null,
    especificacao: null,
    plano_tecnico: null,
    tarefas: null,
    decisoes_dir: 'docs/05-decisoes/',
    aprendizados: 'docs/06-aprendizados.md',
    debug_dir: 'docs/07-debug/',
  },
  progresso: {
    tarefas_concluidas: 0,
    tarefas_total: 0,
    ultima_tarefa: null,
    ultimo_commit: null,
  },
  historico_fases: [],
  metadata: {
    criado_em: new Date().toISOString().split('T')[0],
    ultima_atualizacao: new Date().toISOString().split('T')[0],
    stack: [],
    repositorio: null,
  },
};

const visaoMd = `# Visão Geral: ${projectName}

## Problema
[Qual problema este projeto resolve?]

## Público-Alvo
[Para quem estamos construindo?]

## Objetivos
[O que define sucesso para este projeto?]

## Restrições
[Limitações de tempo, tecnologia, recursos?]
`;

const aprendizadosMd = `# Aprendizados

## [Data] - [Tema]
[O que aprendemos?]
`;

// Create directories
dirs.forEach((dir) => {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✓ Criado: ${dir}`);
  } else {
    console.log(`  Existe: ${dir}`);
  }
});

// Create context.json
const contextPath = path.join(docsDir, 'context.json');
if (!fs.existsSync(contextPath)) {
  fs.writeFileSync(contextPath, JSON.stringify(contextJson, null, 2) + '\n');
  console.log('✓ Criado: docs/context.json');
} else {
  console.log('  Existe: docs/context.json');
}

// Create markdown files
const files = {
  'docs/00-visao.md': visaoMd,
  'docs/06-aprendizados.md': aprendizadosMd,
};

Object.entries(files).forEach(([filePath, content]) => {
  const fullPath = path.join(process.cwd(), filePath);
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, content);
    console.log(`✓ Criado: ${filePath}`);
  } else {
    console.log(`  Existe: ${filePath}`);
  }
});

console.log(`\nEstrutura inicializada para "${projectName}".`);
console.log('Próximo passo: Inicie pela Fase 1 (Contextualizar).');

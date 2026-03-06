# 🧠 Compendium — Second Brain para Desenvolvimento com IA

Repositório de recursos curados para potencializar o desenvolvimento de software com agentes de IA. Contém prompts, skills, agents, hooks, plugins e referências prontos para uso.

## 📊 Visão Geral

| Recurso | Quantidade | Status |
|---------|:----------:|:------:|
| Prompts | 77 | ✅ Ativo |
| Skills | 5 | ✅ Ativo |
| Agents | — | 🚧 Em construção |
| MCP Servers | — | 🚧 Em construção |
| Hooks | — | 🚧 Em construção |
| Plugins | — | 🚧 Em construção |

---

## 📁 Estrutura do Repositório

```
├── prompts/          # Prompt templates (.prompt.md)
├── skills/           # Agent skills reutilizáveis
├── agents/           # Configurações de agentes
├── MCP/              # Model Context Protocol servers
├── Hooks/            # Git hooks e automações
├── Plugins/          # Extensões e plugins
├── REFERENCES.md     # Links de referência
└── README.md
```

---

## 💬 Prompts

Todos os prompts seguem um template padronizado com as seções: **Contexto/Papel**, **Tarefa**, **Regras e Restrições**, **Variáveis** e **Formato de Saída**. Escritos em **Português do Brasil (PT-BR)**.

Use o prompt utilitário `/format-prompt` para formatar e traduzir novos prompts automaticamente.

### 📖 Compreensão de Código

| Prompt | Descrição |
|--------|-----------|
| `understand-code-before-changes` | Analisa dependências e impactos antes de modificar código |
| `trace-function-usage` | Localiza todos os locais de chamada de uma função |
| `explain-code-or-mr` | Explica código complexo ou MRs de forma clara |
| `explain-complex-code` | Explicação passo a passo de algoritmos e código legado |
| `find-function-calls` | Navega grafos de chamadas entre funções |
| `summarize-recent-changes` | Resume mudanças recentes em MRs/Issues |
| `navigate-large-codebase` | Encontra código relevante em projetos desconhecidos |
| `understand-class-hierarchy` | Mapeia hierarquias de classes e métodos sobrescritos |
| `find-code-patterns` | Descobre padrões implementados na base de código |
| `understand-data-flow` | Rastreia fluxo de dados entre componentes |
| `analyze-database-schema` | Analisa schemas, relacionamentos e otimizações de BD |
| `map-component-dependencies` | Mapeia dependências e raio de impacto de mudanças |
| `understand-config-setup` | Decodifica configuração e requisitos de ambiente |
| `analyze-api-contracts` | Documenta integrações e contratos de API |
| `identify-code-duplication` | Encontra padrões de código que podem ser consolidados |
| `understand-error-handling` | Analisa padrões de tratamento de erros |
| `trace-auth-flow` | Mapeia fluxos de autenticação e autorização |
| `understand-async-concurrency` | Analisa código assíncrono e race conditions |

### 🔍 Revisão de Código (Code Review)

| Prompt | Descrição |
|--------|-----------|
| `review-logic-errors` | Busca erros lógicos, edge cases e bugs potenciais |
| `review-suggest-code-improvements` | Sugere melhorias de legibilidade, performance e manutenibilidade |
| `review-against-coding-standards` | Verifica conformidade com padrões de codificação |
| `review-security` | Identifica vulnerabilidades de segurança no código |
| `review-explaing-impact-performance` | Avalia impacto de performance de um MR/PR |
| `review-breaking-changes` | Detecta breaking changes em APIs e contratos |
| `review-suggestions-mr-pr` | Sugere os melhores revisores para um MR/PR |
| `review-compare-alternatives` | Compara abordagens de implementação com trade-offs |
| `review-discussion` | Ajuda a entender decisões de design em MRs |
| `review-prioritize-comments` | Categoriza comentários de revisão por severidade |

### 📋 Planejamento e Gestão

| Prompt | Descrição |
|--------|-----------|
| `breaking-down-epic` | Decompõe épicos em issues implementáveis |
| `create-issue-from-ticket` | Converte tickets de suporte em issues formatadas |
| `generate-issue-templates` | Cria templates padronizados de issues |
| `estimate-implementation-effort` | Estima esforço de implementação |
| `generate-mr-pr-description` | Gera descrições detalhadas de MR/PR |

### 🏗️ Arquitetura e Design

| Prompt | Descrição |
|--------|-----------|
| `design-feature-architecture` | Define arquitetura para novas features |
| `create-technical-design-doc` | Cria documentos de design técnico |
| `evaluate-technology-options` | Compara tecnologias com análise de trade-offs |
| `plan-database-schema-changes` | Projeta migrações de BD com plano de rollback |
| `design-api-endpoints` | Define APIs RESTful/GraphQL com contratos |
| `implement-design-pattern` | Aplica padrões de design com implementação completa |

### 🔧 Refatoração

| Prompt | Descrição |
|--------|-----------|
| `refactor-readability` | Melhora legibilidade com nomes e lógica claros |
| `modernize-legacy-code` | Atualiza código legado com práticas modernas |
| `reduce-code-complexity` | Divide funções complexas em componentes testáveis |
| `remove-dead-code` | Remove código não utilizado com segurança |
| `optimize-algorithm` | Melhora eficiência algorítmica |
| `consolidate-duplicate-code` | Consolida duplicações em componentes reutilizáveis |

### 📝 Documentação

| Prompt | Descrição |
|--------|-----------|
| `doc-change-code` | Identifica quais docs precisam de atualização após mudanças |
| `doc-release-notes` | Gera Release Notes a partir de MRs mesclados |
| `convert-docs-to-comments` | Transforma documentação externa em comentários inline |

### 🧪 Testes

| Prompt | Descrição |
|--------|-----------|
| `generate-unit-tests` | Gera suítes completas de testes unitários |
| `analyze-tests-coverage` | Analisa cobertura de testes e identifica lacunas |
| `create-integration-tests` | Projeta cenários de testes de integração |
| `generate-test-data` | Cria datasets de teste realistas |
| `explain-test-failures` | Analisa e explica falhas de testes |

### 🐛 Debugging

| Prompt | Descrição |
|--------|-----------|
| `debug-pipeline-fails` | Diagnostica falhas em pipelines CI/CD |
| `troubleshoot-production-issue` | Diagnostica incidentes de produção |
| `analyze-stack-trace` | Analisa stack traces complexas |
| `find-root-cause-bug` | Rastreia bugs até a causa raiz |
| `debug-race-conditions` | Identifica race conditions em código assíncrono |
| `investigate-performance-bottleneck` | Localiza gargalos de performance |
| `debug-memory-leak` | Encontra vazamentos de memória |
| `understand-third-party-error` | Interpreta erros de bibliotecas externas |

### 🔒 Segurança e Compliance

| Prompt | Descrição |
|--------|-----------|
| `analyze-security-results` | Triagem de resultados de scans de segurança |
| `ensure-compliance` | Verifica conformidade regulatória (SOC2, HIPAA, GDPR) |
| `generate-security-docs` | Documenta controles de segurança para auditoria |
| `assess-dependency-risks` | Avalia riscos de dependências externas |
| `create-security-test-cases` | Gera casos de teste focados em segurança |

### ⚙️ DevOps e Infraestrutura

| Prompt | Descrição |
|--------|-----------|
| `automate-repetitive-tasks` | Automatiza tarefas repetitivas de desenvolvimento |
| `optimize-database-queries` | Otimiza queries lentas com índices e reescrita |
| `framework-upgrade-analysis` | Avalia impacto de upgrade de framework |
| `implement-cicd-best-practices` | Otimiza pipelines CI/CD |
| `migrate-legacy-framework` | Migra código entre frameworks |

### 🤖 Colaboração com IA

| Prompt | Descrição |
|--------|-----------|
| `ai-pairing-partner` | Parceiro de pair programming para explorar abordagens |
| `rubber-duck-debugging` | Rubber duck debugging assistido por IA |

### 💬 Suporte e Comunicação

| Prompt | Descrição |
|--------|-----------|
| `diagnose-customer-issue` | Diagnostica problemas de clientes via logs |
| `generate-error-messages` | Transforma erros técnicos em mensagens amigáveis |
| `create-troubleshooting-guide` | Cria guias de troubleshooting de auto-atendimento |
| `explain-technical-to-non-technical` | Explica conceitos técnicos para não-técnicos |

### 🛠️ Utilitários

| Prompt | Descrição |
|--------|-----------|
| `format-prompt` | Formata e traduz prompts para o template padrão PT-BR |
| `template` | Template base para criação de novos prompts |

---

## 🧩 Skills

| Skill | Descrição |
|-------|-----------|
| `canvas-design` | Design de canvas para interfaces |
| `find-skills` | Busca e descoberta de skills |
| `mcp-builder` | Construtor de MCP servers |
| `skill-creator` | Criador de novas skills |
| `template-skill` | Template base para skills |

---

## 📚 Referências

Consulte o arquivo [REFERENCES.md](REFERENCES.md) para links de recursos sobre prompts, skills, MCP, hooks e plugins.

---

## 🚀 Como Usar

### Prompts
1. Copie o arquivo `.prompt.md` desejado para a pasta `prompts/` do seu projeto.
2. No chat, use `/nome-do-prompt` para ativá-lo.
3. Siga o `argument-hint` no campo para fornecer os dados necessários.

### Criando Novos Prompts
1. Use o prompt `/format-prompt` para padronizar automaticamente.
2. Ou use `template.prompt.md` como base e preencha as seções.

---

## 📄 Licença

Este repositório é um compêndio pessoal de recursos para desenvolvimento com IA.

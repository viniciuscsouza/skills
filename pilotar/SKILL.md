---
name: pilotar
description: >
  Orquestra o ciclo completo de desenvolvimento de software guiado por IA — do zero à entrega.
  Use esta skill SEMPRE que o usuário quiser iniciar um projeto novo, retomar um projeto existente,
  planejar uma feature, organizar documentação de desenvolvimento, ou quando mencionar 'pilotar',
  'ai-driven', 'copiloto', 'documentação viva', 'plano de voo', 'fase do projeto', 'context.json'
  ou quiser que a IA assuma uma postura proativa na gestão do desenvolvimento. Também use quando
  o usuário parecer perdido sobre próximos passos, quando iniciar uma sessão de trabalho sem
  contexto claro, ou quando quiser estrutura de projeto profissional mesmo sendo iniciante.
  Esta skill funciona tanto para projetos verdes quanto para codebases legados, bugs, refatorações
  e features novas. Se o usuário pedir para "começar um projeto", "organizar o desenvolvimento",
  "ter um plano", "seguir um processo", "desenvolver com qualidade" — use esta skill.
---

# Pilotar: Desenvolvimento Guiado por IA

## Visão Geral

Esta skill transforma o agente de IA em um **copiloto proativo de desenvolvimento de software**. Ela identifica o tipo de solicitação do usuário e roteia para o fluxo de trabalho adequado, orquestrando as skills especializadas conforme necessário.

O sistema se apoia em dois pilares:

1. **Roteamento por Tipo de Trabalho** — cada tipo de solicitação aciona um fluxo diferente com as skills apropriadas
2. **Documentação Viva** — arquivos markdown com prefixos numéricos + um `context.json` leve que mantém o estado do projeto persistido entre sessões

A skill não substitui as skills especializadas — ela as **orquestra**. Dependendo da complexidade, chama essas skills como subagentes para tarefas pesadas ou referencia seus guias diretamente para consultas rápidas.

## Quando Usar

- Iniciar um projeto do zero e precisar de estrutura desde o dia 1
- Retomar um projeto parado e entender onde parou
- Planejar uma feature grande que exige coordenação entre múltiplas etapas
- Organizar a documentação de desenvolvimento de forma viva e atualizada
- Ter um parceiro de desenvolvimento que antecipa próximos passos
- Trabalhar com codebase legado e precisar de disciplina para não quebrar o existente
- Corrigir bugs complexos que exigem investigação antes da solução
- Refatorar código com segurança e rastreabilidade

**Quando NÃO usar:** Tarefas triviais de arquivo único, perguntas rápidas sobre sintaxe, ou quando o usuário já tem um plano claro e só quer ajuda pontual com um trecho de código. Para debug urgente ou simplificação isolada, use as skills diretas (`debugar`, `simplificar`).

## Estrutura de Pastas do Projeto

Quando a skill é ativada, ela organiza o projeto assim:

```
projeto/
├── docs/
│   ├── context.json                          ← Estado leve (pilotar)
│   ├── 00-visao.md                           ← Visão geral (pilotar)
│   ├── 01-ideias/                            ← Ideias refinadas (refinar)
│   │   └── [nome-da-ideia].md
│   ├── 02-especificacoes/                    ← Especificações rigorosas (especificar)
│   │   └── [nome-da-spec].md
│   ├── 03-planos/                            ← Planos técnicos (especificar)
│   │   └── [nome-do-plano].md
│   ├── 04-tarefas/                           ← Checklists executáveis (especificar)
│   │   └── [nome-do-checklist].md
│   ├── 05-decisoes/                          ← ADRs (documentar)
│   │   └── ADR-NNN-[tema].md
│   ├── 06-aprendizados.md                    ← Lições aprendidas (pilotar)
│   ├── 07-debug/                             ← Relatórios de debug (debugar)
│   │   └── [YYYY-MM-DD]-[tema].md
│   └── feedback/
│       └── feedback.json                     ← Feedback por iteração
├── src/                                      ← Código do projeto
└── tests/                                    ← Testes
```

**Regra de prefixos numéricos:** Cada diretório tem um dono claro. A skill que gera o artefato é responsável por criá-lo e mantê-lo. A `pilotar` apenas referencia os caminhos no `context.json`.

## O Context.json

```json
{
  "projeto": "nome-do-projeto",
  "fase_atual": "contextualizar | refinar | especificar | implementar | revisar",
  "status": "em_andamento | pausado | concluido",
  "tipo_trabalho": "projeto_novo | feature | bug | refatoracao | debug | documentacao | simplificacao",
  "artefatos": {
    "visao": "docs/00-visao.md",
    "ideias_refinadas": "docs/01-ideias/app-delivery.md",
    "especificacao": "docs/02-especificacoes/auth-module.md",
    "plano_tecnico": "docs/03-planos/auth-module.md",
    "tarefas": "docs/04-tarefas/auth-module.md",
    "decisoes_dir": "docs/05-decisoes/",
    "aprendizados": "docs/06-aprendizados.md",
    "debug_dir": "docs/07-debug/"
  },
  "progresso": {
    "tarefas_concluidas": 12,
    "tarefas_total": 20,
    "ultima_tarefa": "Implementar autenticação JWT",
    "ultimo_commit": "abc1234"
  },
  "historico_fases": [
    { "fase": "refinar", "concluida_em": "2025-01-15", "artefato": "docs/01-ideias/app-delivery.md" }
  ],
  "metadata": {
    "criado_em": "2025-01-10",
    "ultima_atualizacao": "2025-01-20",
    "stack": ["node", "typescript", "postgres"],
    "repositorio": "https://github.com/user/repo"
  }
}
```

**Regra de ouro:** Atualize o `context.json` SEMPRE que completar uma fase ou mudar de tarefa.

## Fluxos por Tipo de Solicitação

A `pilotar` identifica o tipo de trabalho e roteia para o fluxo correto:

### 1. Projeto Novo

```
contextualizar → refinar → especificar → implementar (+testar) → revisar → documentar
```

| Etapa | Skill | Artefato Gerado |
|-------|-------|-----------------|
| Entender o terreno | `contextualizar` | `docs/00-visao.md`, `context.json` |
| Afiar a ideia | `refinar` | `docs/01-ideias/[nome].md` |
| Definir o que e como | `especificar` | `docs/02-especificacoes/`, `docs/03-planos/`, `docs/04-tarefas/` |
| Construir com testes | `implementar` + `testar` | Código + testes |
| Validar e entregar | `revisar` | Relatório de revisão |
| Registrar memória | `documentar` | `docs/05-decisoes/ADR-NNN-*.md`, README |

**Gates:** Revisão humana entre cada etapa. Sem aprovação, não avance.

### 2. Feature em Projeto Existente

```
contextualizar → [refinar] → especificar → implementar (+testar) → revisar
```

- `refinar` é opcional — só use se a abordagem não está clara
- `contextualizar` mapeia a área afetada, dependências e padrões existentes
- `especificar` cria spec focada na feature (não no projeto todo)
- `implementar` com testes integrados, fatias verticais
- `revisar` inclui verificar que não quebrou o existente

### 3. Bug Fix

```
debugar → testar → implementar → revisar
```

| Etapa | Skill | Artefato Gerado |
|-------|-------|-----------------|
| Triagem e causa-raiz | `debugar` | `docs/07-debug/[data]-[tema].md` |
| Blindar com teste | `testar` | Teste que reproduz o bug (Prove First) |
| Corrigir | `implementar` | Código corrigido |
| Verificar regressão | `revisar` | Relatório de revisão |

**Atalho:** Se o bug é simples e óbvio, pule `debugar` formal e vá direto para `testar` → `implementar`.

### 4. Refatoração

```
contextualizar → especificar → implementar (+testar) → simplificar → revisar
```

| Etapa | Skill | Nota |
|-------|-------|------|
| Entender código atual | `contextualizar` | Mapear dependências |
| Definir escopo | `especificar` | O que muda, o que permanece, critérios de equivalência |
| Refatorar com rede de segurança | `implementar` + `testar` | Testes existentes como rede |
| Limpar complexidade | `simplificar` | Após funcional, antes de revisar |
| Validar | `revisar` | Legibilidade, arquitetura, desempenho |

### 5. Debug Urgente (Atalho)

```
debugar → testar → implementar
```

- Sem gate de revisão humana — priorize restaurar funcionalidade
- Registre o debug em `docs/07-debug/` para rastreabilidade posterior
- Após resolver, volte ao fluxo normal para revisão

### 6. Documentar (Atalho)

```
contextualizar → documentar
```

- Use para criar ADRs, READMEs, documentação de APIs
- `contextualizar` coleta o contexto necessário
- `documentar` produz os artefatos em `docs/05-decisoes/`

### 7. Simplificar Código (Atalho)

```
simplificar → testar
```

- Use para limpar código existente sem mudar comportamento
- `simplificar` aplica os 5 princípios e o processo de 4 passos
- `testar` garante que nenhum comportamento foi alterado

## Mapa de Skills

```
pilotar (orquestrador / roteador)
│
├── contextualizar  → Mindset contínuo + Fase 1 de fluxos completos
├── refinar         → Ideação (projeto novo, feature ambígua)
├── especificar     → Spec + Plano + Tarefas (fluxos formais)
├── implementar     → Construção incremental (todos os fluxos que tocam código)
├── testar          → TDD + Prove First (integrado em implementar, debugar)
├── revisar         → Validação final (todos os fluxos formais)
├── debugar         → Triagem de erros (bug fix, debug urgente)
├── documentar      → ADRs, READMEs, contratos (projeto novo, atalho documentar)
└── simplificar     → Limpeza de complexidade (refatoração, atalho simplificar)
```

## Orquestração: Subagente vs Referência

Consulte `references/orquestracao.md` para o guia completo. Resumo:

**Chame como subagente** quando a tarefa é pesada e independente (refinar ideação completa, spec grande, revisão de PR, debug complexo).

**Referencie diretamente** quando a consulta é rápida ou contínua (contextualizar como mindset, testar durante cada fatia, regras de implementar durante o trabalho).

## Protocolos de Sessão

### Protocolo de Início de Sessão

1. **Verificar se existe `docs/context.json`**
   - Se existe: Ler e apresentar estado atual — fase, progresso, última tarefa
   - Se não existe: Perguntar se é projeto novo ou existente e iniciar pelo fluxo apropriado

2. **Identificar o tipo de trabalho** — use a tabela de fluxos acima para rotear

3. **Aplicar engenharia de contexto** — carregar apenas documentos relevantes

### Protocolo de Fechamento de Tarefa

1. Atualizar `context.json`
2. Commit com mensagem descritiva
3. Registrar aprendizados em `docs/06-aprendizados.md` se relevante
4. Comunicar ao usuário: tarefa concluída, próximo passo sugerido

### Protocolo de Transição de Fase

1. Atualizar `context.json` (nova fase, histórico)
2. Garantir que artefatos estão salvos nos caminhos corretos
3. Apresentar resumo ao usuário
4. Pedir aprovação explícita antes de avançar

## Gestão de Contexto

1. **Nunca carregue tudo** — Só o necessário para a fase atual
2. **Exemplos vivos valem mais que regras** — Mostre código existente
3. **Recortes de log, não logs inteiros** — Apenas o trace do erro
4. **Limpe entre tarefas complexas** — Resuma o estado atual antes de começar algo novo
5. **Eleve ambiguidades, não assuma** — Se há conflito, pare e pergunte

## Anti-Padrões

- **Pular fases** — Não vá direto para implementação sem especificar (em fluxos formais)
- **Context flooding** — Não carregue toda a documentação de uma vez
- **Escopo creeping** — Registre melhorias fora do escopo, não as execute
- **Spec morta** — Se o código divergir da spec, atualize a spec primeiro
- **Commit gigante** — Cada fatia = um commit atômico
- **Teste depois** — Teste é parte da implementação, não etapa posterior
- **Assunção silenciosa** — Nunca assuma o que não sabe. Pergunte.
- **Sobrescrever artefatos** — Nunca copie ou sobrescreva documentos de outras skills. Referencie caminhos.
- **Caminhos inconsistentes** — Sempre use os caminhos padronizados com prefixos numéricos

## Verificação Final

- [ ] `context.json` está atualizado com fase e progresso corretos
- [ ] Todos os artefatos estão nos diretórios com prefixos numéricos corretos
- [ ] Último commit está limpo e descritivo
- [ ] Testes estão passando
- [ ] Usuário foi informado do estado e próximos passos
- [ ] Feedback foi registrado se houve

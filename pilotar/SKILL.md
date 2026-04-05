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

Esta skill transforma o agente de IA em um **copiloto proativo de desenvolvimento de software**. Ela orquestra um fluxo estruturado em 5 fases — **Contextualizar → Refinar → Especificar → Implementar → Revisar** — com testes integrados em cada etapa de implementação.

O sistema se apoia em dois pilares:

1. **Ciclo de Desenvolvimento** — fases com gates de revisão humana entre cada transição
2. **Documentação Viva** — arquivos markdown + um `context.json` leve que mantém o estado do projeto persistido entre sessões

A skill não substitui as skills especializadas (`refinar`, `contextualizar`, `especificar`, `implementar`, `testar`, `revisar`) — ela as **orquestra**. Dependendo da complexidade, chama essas skills como subagentes para tarefas pesadas ou referencia seus guias diretamente para consultas rápidas.

## Quando Usar

- Iniciar um projeto do zero e precisar de estrutura desde o dia 1
- Retomar um projeto parado e entender onde parou
- Planejar uma feature grande que exige coordenação entre múltiplas etapas
- Organizar a documentação de desenvolvimento de forma viva e atualizada
- Ter um parceiro de desenvolvimento que antecipa próximos passos
- Trabalhar com codebase legado e precisar de disciplina para não quebrar o existente
- Corrigir bugs complexos que exigem investigação antes da solução
- Refatorar código com segurança e rastreabilidade

**Quando NÃO usar:** Tarefas triviais de arquivo único, perguntas rápidas sobre sintaxe, ou quando o usuário já tem um plano claro e só quer ajuda pontual com um trecho de código.

## Estrutura de Pastas do Projeto

Quando a skill é ativada, ela organiza o projeto assim:

```
projeto/
├── docs/
│   ├── context.json              ← Estado leve do projeto (sempre atualizado)
│   ├── 00-visao.md               ← Visão geral, problema, público, objetivos
│   ├── ideas/                    ← Artefatos gerados pela skill refinar
│   │   └── [nome-da-ideia].md    ← One-pager de ideação (refinar)
│   ├── specs/                    ← Artefatos gerados pela skill especificar
│   │   └── [nome-da-spec].md     ← Especificação rigorosa (especificar)
│   ├── plans/
│   │   └── [nome-do-plano].md    ← Plano técnico (especificar)
│   ├── tasks/
│   │   └── [nome-do-checklist].md ← Checklist de tarefas (especificar)
│   ├── 05-decisoes.md            ← Registro de decisões arquiteturais (ADRs)
│   ├── 06-aprendizados.md        ← Lições aprendidas durante o desenvolvimento
│   └── feedback/
│       └── feedback.json         ← Feedback do usuário por iteração
├── src/                          ← Código do projeto (estrutura varia)
└── tests/                        ← Testes (estrutura varia)
```

A pasta `docs/` é o cérebro do projeto. O `context.json` é o índice que diz em que fase estamos, o que já foi feito e o que vem a seguir. Os artefatos de `refinar` e `especificar` vivem em seus próprios subdiretórios — a `pilotar` **referencia, nunca copia**.

## O Context.json

Este é o único arquivo de estado. Mantê-lo leve é intencional — ele não registra cada micro-decisão, apenas o suficiente para retomar o trabalho de qualquer ponto:

```json
{
  "projeto": "nome-do-projeto",
  "fase_atual": "contextualizar | refinar | especificar | implementar | revisar",
  "status": "em_andamento | pausado | concluido",
  "tipo_trabalho": "projeto_novo | feature | bug | refatoracao",
  "artefatos": {
    "visao": "docs/00-visao.md",
    "ideias_refinadas": "docs/ideas/app-delivery.md",
    "especificacao": "docs/specs/auth-module.md",
    "plano_tecnico": "docs/plans/auth-module.md",
    "tarefas": "docs/tasks/auth-module.md",
    "decisoes": "docs/05-decisoes.md",
    "aprendizados": "docs/06-aprendizados.md"
  },
  "progresso": {
    "tarefas_concluidas": 12,
    "tarefas_total": 20,
    "ultima_tarefa": "Implementar autenticação JWT",
    "ultimo_commit": "abc1234"
  },
  "historico_fases": [
    { "fase": "refinar", "concluida_em": "2025-01-15", "artefato": "docs/ideas/app-delivery.md" }
  ],
  "metadata": {
    "criado_em": "2025-01-10",
    "ultima_atualizacao": "2025-01-20",
    "stack": ["node", "typescript", "postgres"],
    "repositorio": "https://github.com/user/repo"
  }
}
```

**Regra de ouro:** Atualize o `context.json` SEMPRE que completar uma fase ou mudar de tarefa. Ele é a fonte da verdade para retomar sessões.

## O Fluxo de Desenvolvimento

O fluxo segue 5 fases sequenciais, cada uma com um gate de revisão humana antes de avançar:

```
CONTEXTUALIZAR ──→ REFINAR ──→ ESPECIFICAR ──→ IMPLEMENTAR ──→ REVISAR
      │              │             │               │              │
      ▼              ▼             ▼               ▼              ▼
   Entender      Afiar a       Definir o       Construir     Validar e
   o terreno     ideia         que e como      com testes    entregar
```

### Fase 1: Contextualizar

**Objetivo:** Entender o terreno antes de pisar.

- **Projeto novo:** Coletar requisitos iniciais, stack preferida, restrições, público-alvo, objetivos de negócio. Criar `docs/00-visao.md` e `context.json`.
- **Projeto existente:** Escanear o codebase para mapear estrutura, stack, padrões existentes, dívidas técnicas visíveis. Atualizar `context.json` com o estado encontrado.
- **Bug ou refatoração:** Localizar a área afetada, entender o contexto do código existente, identificar dependências e riscos.

**Skill utilizada:** `contextualizar` — use os conceitos de hierarquia de memória, selective include e tratamento de ambiguidade.

**Gate de revisão:** Apresentar ao usuário o mapeamento inicial e confirmar: "É isso que entendi. Posso avançar?"

**Transição:** Após confirmação, atualizar `context.json` → fase = "refinar".

### Fase 2: Refinar

**Objetivo:** Transformar a ideia bruta em algo que vale a pena construir.

- Reapresentar a ideia como "Como Poderíamos" (How Might We)
- Fazer perguntas afiadas sobre público, sucesso, restrições
- Gerar variações e explorar alternativas
- Avaliar direções contra valor, viabilidade e diferenciação
- Revelar suposições ocultas explicitamente

**Skill utilizada:** `refinar` — siga o processo divergente/convergente de 3 fases. Para projetos novos, use frameworks de ideação. Para features em projeto existente, foque em validar a direção contra a arquitetura atual.

**Artefato gerado:** A skill `refinar` salva o one-pager em `docs/ideas/[nome-da-ideia].md`. A `pilotar` **referencia esse caminho** no `context.json` — nunca copia ou sobrescreve.

**Gate de revisão:** O usuário valida a direção. Sem validação, não avance.

**Transição:** Após confirmação, atualizar `context.json` → fase = "especificar".

### Fase 3: Especificar

**Objetivo:** Definir rigorosamente o que será construído antes de escrever código.

Siga o fluxo gated da skill `especificar`:

1. **Especificar** — Escrever a spec com objetivo, ambiente, estrutura de arquivos, acordos práticos e critérios de sucesso mensuráveis. Explicitar suposições.
2. **Planejar** — Gerar o plano técnico: ordem de camadas, paralelizações, riscos.
3. **Tarefas** — Quebrar em tarefas executáveis com aceite, verificação e limite de escopo.
4. **Implementar** — (Esta etapa é a Fase 4 — não implemente ainda, apenas prepare o terreno.)

**Skills utilizadas:** `especificar` para o fluxo gated, `contextualizar` para gerenciar o escopo de contexto durante a escrita.

**Artefatos gerados:** A skill `especificar` cria os documentos em seus próprios caminhos (spec, plano técnico, tarefas). A `pilotar` **referencia esses caminhos** no `context.json` — nunca copia ou sobrescreve.

**Gate de revisão:** O usuário revisa spec, plano e tarefas. Cada um precisa de aprovação explícita.

**Transição:** Após aprovação de todos os artefatos, atualizar `context.json` → fase = "implementar".

### Fase 4: Implementar (com Testes Integrados)

**Objetivo:** Construir em fatias finas, verificando cada pedaço antes de avançar.

Esta é a fase mais longa. Siga o ciclo incremental:

```
Implementar ──→ Verificar (testar) ──→ Confirmar ──→ Próxima fatia
```

Para **cada tarefa** do checklist de tarefas:

1. **Carregar contexto seletivo** — Leia apenas os arquivos relevantes para esta tarefa (regra do `contextualizar`).
2. **Implementar a fatia mínima** — Siga a skill `implementar`: fatias verticais, risco primeiro, simplicidade.
3. **Testar** — Antes de considerar pronto, aplique TDD com a skill `testar`:
   - Para lógica nova: Red → Green → Refactor
   - Para bug: Reproduza com teste primeiro (Prove First)
   - Pirâmide: 80% unitários, 15% integração, 5% E2E
4. **Verificar** — Compile, rode testes, confirme que o sistema funciona.
5. **Confirmar** — Commit atômico com mensagem descritiva.
6. **Atualizar progresso** — Atualize `context.json` com a tarefa concluída.

**Skills utilizadas:** `implementar` como guia principal, `testar` integrado em cada fatia, `contextualizar` para gerenciar contexto por tarefa.

**Durante a implementação:**
- Se encontrar algo que diverge da spec, **pare** e atualize a spec primeiro.
- Se encontrar um bug não relacionado, **registre** em `docs/06-aprendizados.md` mas não desvie do escopo.
- Se ficar bloqueado, **escale** para o usuário com opções claras.

**Gate de revisão:** Ao completar todas as tarefas, apresente um resumo do que foi construído e peça confirmação para avançar à revisão final.

**Transição:** Após confirmação, atualizar `context.json` → fase = "revisar".

### Fase 5: Revisar

**Objetivo:** Validar a qualidade antes de considerar entregue.

Aplique os 5 eixos da skill `revisar`:

1. **Correção** — O código cumpre a spec? Edge cases tratados?
2. **Legibilidade** — Nomes claros? Fluxo simples? Sem abstrações prematuras?
3. **Arquitetura** — Respeita padrões do projeto? Coesão? Dependências na direção certa?
4. **Segurança** — Input validation? Sem vazamento de dados?
5. **Desempenho** — Sem N+1? Cache onde importa?

**Skill utilizada:** `revisar` — siga os 5 eixos e o processo prático de revisão.

**Saída:** Relatório de revisão com achados categorizados (obrigatório, sugestão, opcional).

**Gate de revisão:** Apresentar o relatório ao usuário. Se houver itens obrigatórios, voltar para implementação. Se tudo estiver aprovado, marcar como concluído.

**Transição:** Atualizar `context.json` → status = "concluido", registrar no histórico de fases.

## Protocolos de Sessão

### Protocolo de Início de Sessão

Sempre que o usuário iniciar uma sessão de trabalho:

1. **Verificar se existe `docs/context.json`**
   - Se existe: Ler e apresentar o estado atual — fase, progresso, última tarefa
   - Se não existe: Perguntar se é um projeto novo ou existente e iniciar pela Fase 1

2. **Perguntar o objetivo da sessão**
   - "O que vamos fazer hoje?" — O usuário pode continuar de onde parou ou mudar de direção

3. **Aplicar engenharia de contexto**
   - Carregar apenas os documentos relevantes para a fase atual
   - Não inundar o contexto com toda a documentação

### Protocolo de Fechamento de Tarefa

Ao completar cada tarefa:

1. Atualizar `context.json` (progresso, última tarefa, timestamp)
2. Fazer commit com mensagem descritiva
3. Registrar aprendizados em `docs/06-aprendizados.md` se relevante
4. Comunicar ao usuário: tarefa concluída, próximo passo sugerido

### Protocolo de Transição de Fase

Ao completar uma fase inteira:

1. Atualizar `context.json` (nova fase, histórico)
2. Garantir que todos os artefatos da fase estão salvos
3. Apresentar resumo da fase ao usuário
4. Pedir aprovação explícita antes de avançar
5. Se aprovado, iniciar a próxima fase
6. Se não, iterar na fase atual

## Orquestração das Skills

Esta skill não executa tudo diretamente — ela orquestra. A decisão de como usar cada skill depende da complexidade. Consulte `references/orquestracao.md` para o guia completo.

### Mapa Rápido

```
pilotar (orquestrador)
├── contextualizar  → Mindset contínuo (referência)
├── refinar         → Fase 2 (subagente para ideação completa)
├── especificar     → Fase 3 (subagente para specs grandes)
├── implementar     → Fase 4 (referência + subagente para fatias complexas)
├── testar          → Integrado na Fase 4 (referência em cada fatia)
└── revisar         → Fase 5 (subagente para revisão completa)
```

## Gestão de Contexto

A maior alavanca de qualidade é alimentar o agente com a informação certa no momento certo. Siga estes princípios:

1. **Nunca carregue tudo** — Se está implementando autenticação, não carregue a spec de pagamentos.
2. **Exemplos vivos valem mais que regras** — Mostre um componente existente em vez de descrever o padrão.
3. **Recortes de log, não logs inteiros** — Se um teste falhou, traga apenas o trace do erro.
4. **Limpe o contexto entre tarefas complexas** — Peça um resumo do estado atual antes de começar algo novo.
5. **Eleve ambiguidades, não assuma** — Se a spec diz V2 mas o código usa V1, pare e pergunte.

## Tipos de Trabalho

A skill se adapta ao tipo de trabalho. O fluxo muda levemente:

### Projeto Novo

Fluxo completo: Contextualizar → Refinar → Especificar → Implementar → Revisar

### Feature em Projeto Existente

Fluxo adaptado:
1. **Contextualizar** — Mapear área afetada, dependências, padrões existentes
2. **Refinar** — Validar a abordagem contra a arquitetura atual
3. **Especificar** — Spec focada na feature (não no projeto todo)
4. **Implementar** — Fatias verticais com testes
5. **Revisar** — 5 eixos + verificar que não quebrou o existente

### Bug Fix

Fluxo enxuto:
1. **Contextualizar** — Localizar o bug, entender o contexto
2. **Especificar** — Reprodução do bug + critério de correção (spec leve)
3. **Implementar** — Teste que reproduz o bug (Prove First) → Correção → Verificar
4. **Revisar** — Correção + regressão

### Refatoração

Fluxo com rede de segurança:
1. **Contextualizar** — Entender o código atual, mapear dependências
2. **Especificar** — O que muda, o que permanece, critérios de equivalência
3. **Implementar** — Testes existentes como rede de segurança → Refatorar em fatias → Verificar após cada fatia
4. **Revisar** — Legibilidade, arquitetura, desempenho

## Anti-Padrões

- **Pular fases** — Não vá direto para implementação sem especificar. A spec é o que separa construção de adivinhação.
- **Context flooding** — Não carregue toda a documentação no contexto de uma vez.
- **Escopo creeping** — Se notar algo que vale melhorar fora do escopo, registre e continue.
- **Spec morta** — Se o código divergir da spec, atualize a spec primeiro. Spec desatualizada é pior que spec inexistente.
- **Commit gigante** — Cada fatia deve ser um commit atômico. Se o commit tem 50 arquivos, está errado.
- **Teste depois** — Teste é parte da implementação, não uma etapa posterior. Sem teste, a fatia não está completa.
- **Assunção silenciosa** — Nunca assuma o que não sabe. Pergunte.
- **Sobrescrever artefatos** — Nunca copie ou sobrescreva documentos gerados pelo `refinar` ou `especificar`. Apenas referencie seus caminhos no `context.json`.

## Verificação Final

Ao concluir qualquer trabalho, verifique:

- [ ] `context.json` está atualizado com a fase e progresso corretos
- [ ] Todos os artefatos de documentação estão salvos em seus diretórios originais
- [ ] Último commit está limpo e descritivo
- [ ] Testes estão passando
- [ ] Usuário foi informado do estado e próximos passos
- [ ] Feedback foi registrado se houve

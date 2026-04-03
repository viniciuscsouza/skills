# Guia de Subagentes — AI-Driven

> Como o orquestrador despacha e gerencia subagentes durante o ciclo de desenvolvimento.
> Leia este guia quando precisar entender o papel de cada subagente, como construir
> os prompts, e como tratar os retornos.

---

## Índice

1. [Visão Geral](#visão-geral)
2. [Os 4 Subagentes](#os-4-subagentes)
3. [Quando Usar Cada Um](#quando-usar-cada-um)
4. [Como Construir o Prompt](#como-construir-o-prompt)
5. [Como Tratar os Retornos](#como-tratar-os-retornos)
6. [Limites e Escalação](#limites-e-escalação)

---

## Visão Geral

O orquestrador (a IA principal que conversa com o usuário) **não deve executar tarefas
pesadas diretamente** — isso polui a janela de contexto, reduz a qualidade das respostas
e torna sessões longas progressivamente piores.

Em vez disso, o orquestrador **despacha subagentes** — instâncias isoladas com contexto
cirurgicamente preparado para uma missão específica. Cada subagente:
- Recebe apenas o contexto necessário para sua tarefa
- Opera de forma independente
- Retorna um relatório estruturado
- Nunca herda o histórico de conversa do orquestrador

**Princípio fundamental:** O orquestrador coordena; os subagentes executam.

---

## Os 4 Subagentes

| Subagente | Fase | Missão | Prompt |
|-----------|------|--------|--------|
| 🔍 **Explorador** | Descoberta | Investigar codebase, mapear estrutura, identificar padrões | `agents/explorer-prompt.md` |
| 🔨 **Implementador** | Implementação | Escrever código, testes, fazer commits | `agents/implementer-prompt.md` |
| 🧪 **Validador** | Validação | Executar testes, verificar critérios, encontrar bugs | `agents/validator-prompt.md` |
| 📝 **Documentador** | Entrega | Atualizar docs, changelog, context.json | `agents/documenter-prompt.md` |

---

## Quando Usar Cada Um

### Explorador
- **Usar:** Ao iniciar projeto, explorar codebase desconhecido, mapear dependências
- **Não usar:** Para investigações triviais que o orquestrador resolve em 1-2 leituras

### Implementador
- **Usar:** Para cada tarefa do plano de voo (1 subagente por tarefa)
- **Não usar:** Para ajustes rápidos de 1-2 linhas que o orquestrador pode fazer inline

### Validador
- **Usar:** Após a implementação de um bloco de tarefas ou feature completa
- **Não usar:** Para cada micro-tarefa (acumule tarefas e valide blocos semânticos)

### Documentador
- **Usar:** Ao final de cada feature/bloco concluído e validado
- **Não usar:** Para atualizações triviais do context.json (o orquestrador faz direto)

---

## Como Construir o Prompt

O prompt de um subagente segue a estrutura:

```
1. IDENTIDADE — Quem é o subagente (papel e missão)
2. TAREFA — O que fazer (texto completo, nunca referências a arquivos externos)
3. CONTEXTO — Onde se encaixa (projeto, fase, dependências, padrões)
4. FERRAMENTAS — O que pode usar (CLI, git, leitura de arquivos, etc.)
5. LIMITES — O que NÃO fazer (escopo, restrições)
6. FORMATO — Como reportar (template de relatório)
```

### Regras de Ouro

1. **Nunca peça ao subagente para ler o plano sozinho** — cole o texto completo da
   tarefa no prompt. Subagentes com contexto autossuficiente são mais confiáveis.

2. **Forneça contexto de cena** — o subagente precisa entender onde a tarefa dele
   se encaixa no quadro geral. 2-3 frases de contexto bastam.

3. **Seja explícito sobre padrões** — convenções de nomenclatura, estrutura de
   pastas, estilo de código. Subagentes não herdam seu conhecimento tácito.

4. **Especifique o formato de saída** — subagentes que sabem COMO reportar produzem
   relatórios mais úteis e parseáveis.

---

## Como Tratar os Retornos

### Implementador — 4 Status

| Status | Significado | Ação do Orquestrador |
|--------|------------|----------------------|
| `FEITO` | Tarefa concluída conforme spec | Avançar para validação |
| `FEITO_COM_RESSALVAS` | Concluída mas com dúvidas | Ler as ressalvas. Se forem sobre corretude, resolver antes. Se forem observações, anotar e avançar |
| `PRECISA_CONTEXTO` | Falta informação | Fornecer contexto e redespachar |
| `BLOQUEADO` | Não consegue completar | Ver "Limites e Escalação" |

### Validador — 3 Resultados

| Resultado | Ação |
|-----------|------|
| ✅ APROVADO | Seguir para Entrega |
| ⚠️ APROVADO COM RESSALVAS | Registrar ressalvas e seguir se não forem bloqueantes |
| ❌ REPROVADO | Voltar à Implementação com a issue list do validador |

### Explorador e Documentador

Retornam briefings/relatórios que o orquestrador consome. Não têm status de
erro estruturado — se o relatório vier incompleto, redespachar com escopo mais
específico.

---

## Limites e Escalação

### Quando escalar para o humano

1. **Subagente bloqueado pela segunda vez** na mesma tarefa → a tarefa precisa
   de redesign, escale para o usuário.

2. **Decisão arquitetural com trade-offs ambíguos** → o subagente não deve decidir
   sozinho. Apresente as opções ao usuário.

3. **Validador reprovou 3x** → há um problema sistêmico (spec ambígua, design
   incompleto). Volte à Descoberta com o usuário.

4. **Subagente reportou preocupação de segurança** → sempre escale para o humano.
   Nunca ignore.

### Quando trocar de estratégia

- Se o subagente implementador está consistentemente com `FEITO_COM_RESSALVAS`,
  o plano pode estar ambíguo. Refine o plano antes de continuar.

- Se o validador encontra os mesmos tipos de bug repetidamente, adicione uma
  regra ao prompt do implementador para prevenir.

---

## Fluxo Visual

```
Orquestrador (conversa com o usuário)
    │
    ├─── [Fase 1] ──→ 🔍 Explorador ──→ Briefing
    │                                       │
    │ ←─────────────────────────────────────┘
    │
    ├─── [Fase 2] ──→ (orquestrador faz direto — planejamento é colaborativo)
    │
    ├─── [Fase 3] ──→ 🔨 Implementador (tarefa 1) ──→ Relatório
    │                 🔨 Implementador (tarefa 2) ──→ Relatório
    │                 🔨 Implementador (tarefa N) ──→ Relatório
    │
    ├─── [Fase 4] ──→ 🧪 Validador ──→ Aprovado/Reprovado
    │                                    │
    │     (se reprovado) ←───────────────┘
    │                 🔨 Implementador (correções) ──→ Relatório
    │                 🧪 Validador (reval) ──→ Aprovado
    │
    └─── [Fase 5] ──→ 📝 Documentador ──→ Docs atualizados
```

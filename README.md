# Skills de Desenvolvimento Guiado por IA

Coleção de skills em português (PT-BR) para transformar agentes de IA em copilotos proativos de desenvolvimento de software. Cada skill cobre uma etapa do ciclo de vida — da ideação à entrega — e pode ser usada individualmente ou orquestrada pela skill **pilotar**.

## Skills Disponíveis

### Orquestrador

| Skill | Descrição |
|-------|-----------|
| **[pilotar](pilotar/SKILL.md)** | Orquestra o ciclo completo de desenvolvimento. Identifica o tipo de solicitação e roteia para o fluxo correto, coordenando todas as outras skills. |

### Skills Especializadas

| Skill | Descrição | Quando usar |
|-------|-----------|-------------|
| **[contextualizar](contextualizar/SKILL.md)** | Engenharia de contexto para o agente. Hierarquia de memória, selective include, tratamento de ambiguidade. | Sempre — é um mindset contínuo aplicado durante todo o trabalho. |
| **[refinar](refinar/SKILL.md)** | Refina ideias brutas em conceitos acionáveis. Processo divergente/convergente de 3 fases. | Ideaçao, brainstorm, validar direção de produto ou feature. |
| **[especificar](especificar/SKILL.md)** | Spec-Driven Development. Cria especificações rigorosas com gates de revisão humana. | Antes de codificar features, projetos ou refatorações grandes. |
| **[implementar](implementar/SKILL.md)** | Implementação incremental em fatias verticais. Ciclo implementar → verificar → confirmar. | Construir funcionalidades, corrigir bugs complexos, refatorar. |
| **[testar](testar/SKILL.md)** | TDD com ciclo Red/Green/Refactor. Padrão "Prove First" para bugs. Pirâmide de testes. | Ao implementar lógica nova, corrigir bugs, alterar comportamentos. |
| **[revisar](revisar/SKILL.md)** | Code review em 5 eixos: correção, legibilidade, arquitetura, segurança, desempenho. | Antes de merge, após completar features, avaliar código alheio. |
| **[debugar](debugar/SKILL.md)** | Debug sistemático com triagem estruturada. Regra Stop-the-Line, causa-raiz, blindagem. | Testes falhando, build quebrado, bugs de runtime, incidentes. |
| **[documentar](documentar/SKILL.md)** | ADRs, READMEs, contratos de API, changelog. Documenta o "porquê", não o "o quê". | Decisões arquiteturais, documentação de sistema, onboarding. |
| **[simplificar](simplificar/SKILL.md)** | Simplifica código para clareza sem alterar comportamento. 5 princípios, processo de 4 passos. | Limpar complexidade, melhorar legibilidade, refatorar código confuso. |

## Fluxos de Trabalho

A skill **pilotar** identifica o tipo de solicitação e roteia automaticamente:

```
Projeto Novo:      pilotar → contextualizar → refinar → especificar → implementar (+testar) → revisar → documentar
Feature Nova:      pilotar → contextualizar → [refinar] → especificar → implementar (+testar) → revisar
Bug Fix:           pilotar → debugar → testar → implementar → revisar
Refatoração:       pilotar → contextualizar → especificar → implementar (+testar) → simplificar → revisar
Debug Urgente:     debugar → testar → implementar  (atalho)
Documentar:        pilotar → contextualizar → documentar  (atalho)
Simplificar:       simplificar → testar  (atalho)
```

## Estrutura de Documentação do Projeto

Quando ativada, a skill `pilotar` organiza a documentação do projeto assim:

```
projeto/
├── docs/
│   ├── context.json              ← Estado leve do projeto
│   ├── 00-visao.md               ← Visão geral, problema, público
│   ├── 01-ideias/                ← Ideias refinadas (refinar)
│   ├── 02-especificacoes/        ← Specs rigorosas (especificar)
│   ├── 03-planos/                ← Planos técnicos (especificar)
│   ├── 04-tarefas/               ← Checklists executáveis (especificar)
│   ├── 05-decisoes/              ← ADRs (documentar)
│   ├── 06-aprendizados.md        ← Lições aprendidas
│   ├── 07-debug/                 ← Relatórios de debug (debugar)
│   └── feedback/
├── src/                          ← Código do projeto
└── tests/                        ← Testes
```

Cada diretório tem prefixo numérico para ordenação natural e dono claro por skill.

## Instalação

### Via CLI (Recomendado)

Instale todas as skills de uma vez:

```bash
npx skills add viniciuscsouza/skills
```

Ou instale skills individuais:

```bash
npx skills add viniciuscsouza/skills --skill pilotar
npx skills add viniciuscsouza/skills --skill refinar
npx skills add viniciuscsouza/skills --skill especificar
```

Busque skills por palavra-chave:

```bash
npx skills find desenvolvimento
```

Liste skills instaladas:

```bash
npx skills list
```

Remova uma skill:

```bash
npx skills remove pilotar
```

### Compatibilidade

As skills funcionam com múltiplos agentes de IA:

- Cursor
- Claude Code
- Codex
- Continue
- Agentes locais
- Runners customizados

### Instalação Manual

Clone o repositório e copie as skills para o diretório do seu agente:

```bash
git clone https://github.com/viniciuscsouza/skills.git
cp -r skills/* ~/.agents/skills/
```

Ou para o diretório `.agents` do seu projeto:

```bash
git clone https://github.com/viniciuscsouza/skills.git
cp -r skills/* .agents/skills/
```

## Como Usar

### Começando com a Skill Pilotar

A skill `pilotar` é o ponto de entrada. Basta mencionar que quer começar um projeto, planejar uma feature ou organizar o desenvolvimento:

- *"Quero criar um app de gerenciamento de tarefas"*
- *"Preciso adicionar autenticação OAuth ao meu projeto"*
- *"Tem um bug no checkout que tá travando tudo"*
- *"Quero refatorar o módulo de pagamentos"*

A `pilotar` identifica o tipo de trabalho e orquestra as skills necessárias automaticamente.

### Usando Skills Individualmente

Cada skill pode ser invocada diretamente:

| Skill | Frases de acionamento |
|-------|----------------------|
| `refinar` | "refinar ideia", "brainstorm de X", "melhorar essa ideia" |
| `especificar` | "especificar feature", "criar spec", "planejar implementação" |
| `implementar` | "implementar funcionalidade", "construir X", "fazer Y" |
| `testar` | "testar essa lógica", "escrever testes para X", "TDD" |
| `revisar` | "revisar código", "code review", "avaliar esse PR" |
| `debugar` | "debugar erro", "investigar bug", "achar causa-raiz" |
| `documentar` | "documentar decisão", "criar ADR", "escrever README" |
| `simplificar` | "simplificar código", "limpar esse código", "melhorar legibilidade" |
| `contextualizar` | "contextualizar", "organizar contexto", "limpar contexto" |

## Arquitetura

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

## Licença

MIT

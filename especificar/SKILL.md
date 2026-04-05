---
name: especificar
description: Cria especificações rigorosas antes da codificação (Spec-Driven Development). Use ao iniciar novos projetos, funcionalidades, grandes refatorações ou sempre que a requisição inicial for vaga e aberta a múltiplas interpretações.
---

# Especificar (Desenvolvimento Orientado a Especificações)

## Visão Geral

Escreva um documento estruturado antes de escrever o código. A especificação ("Spec") é a fonte da verdade compartilhada entre o agente de Inteligência Artificial e a pessoa responsável — ela define o que será construído, o motivo e como saberemos firmemente que foi entregue. Programar sem especificação é programar na base da adivinhação.

## Quando Usar

- Início de um novo projeto, época de ideação, ou nova funcionalidade ampla.
- Requisitos ambíguos ("Deixe o botão melhor").
- Tarefas estruturais que envolverão quebrar/ler 5 ou mais arquivos para funcionar.
- Mudanças profundas de arquitetura e tecnologia.

**Quando NÃO usar:** Um ajuste de linha única num `if`, correção de erro de português no sistema ou reajustes lógicos com barreiras de testes claras e isoladas.

## O Fluxo com Checagens (Gated Workflow)

Siga estas 3 etapas. **Nunca** siga livremente para a próxima frente de atuação sem que a etapa atual não sofra revisão. A etapa de implementação é delegada à skill `implementar`.

```text
ESPECIFICAR ──→ PLANEJAR ──→ TAREFAS
     │             │            │
     ▼             ▼            ▼
   Revisão      Revisão      Revisão
   Humana       Humana       Humana
```

### Fase 1: Especificar

Ataque a indefinição elaborando a visão do que aquilo trata. Para suporte às fases desta diretriz, adote nosso guia de **[Templates](references/templates.md)** como referência estrutural e os nossos **[Checklists](references/checklists.md)** como medidores de sucesso.

**Mostre as Suposições:** A pior decisão é preencher os espaços em branco com base no que a IA deduz, calada. Sempre abra o documento escrevendo o que você assumiu existir na cabeça da equipe para balizar a conversa:

```text
SUPOSIÇÕES QUE ESTOU TOMANDO COMO VERDADE:
1. Trabalharemos apenas para web e monitores largos (Mobile Out).
2. O Autenticador é mantido via Cookies simples sem segurança exagerada no momento.
3. Não haverá sub-tabelas pois é um MVP.
→ Corrija isso antes de continuarmos.
```

Escreva uma especificação (Template) com as seguintes camadas:

1. **Objetivo:** Para quem? O que resolve?
2. **Ambiente/Comandos:** Quais rodadas compilarão e testarão a aplicação com sucesso absoluto?
3. **Estrutura de Arquivos:** Onde isso vai parar e que dependências cria?
4. **Acordos Práticos:** Regras "Sempre", "Pergunte", "Nunca".
5. **Critérios de Sucesso:** Metas inquestionáveis. Transforme desejos de *"Faça mais rápido"* em métricas explícitas *"A lista de resultados surge em 2 segundos"*.

**Artefato:** Salve em `docs/02-especificacoes/[nome-da-spec].md`.

### Fase 2: Planejar

Com o problema compreendido e especificado, gere o plano técnico de execução:
1. Ordem de elaboração das camadas do sistema (o que destrava o quê).
2. Paralelizações possíveis de estrutura técnica.
3. Riscos claros percebidos.

Se o humano interrogar o plano, adapte.

**Artefato:** Salve em `docs/03-planos/[nome-do-plano].md`.

### Fase 3: Tarefas (Checklist Executável)

Quebre a Fase 2 em ações preenchendo as diretrizes formalizadas no roteiro de **[Templates](references/templates.md)**. Cada tarefa se assemelha a uma pequena fatia estritamente definida:

```text
- [ ] Tarefa: Criar tela principal do serviço
  - Aceite: O modelo renderiza sem travamentos no console base.
  - Verifique: Comando de teste interno passando.
  - Limite: Altera no máximo 4 arquivos no escopo vizinho.
```
Nenhuma tarefa deve envolver a reconstrução mágica da base por si mesma.

**Artefato:** Salve em `docs/04-tarefas/[nome-do-checklist].md`.

## Mantendo a Especificação Viva

Mudar os planos faz parte da dinâmica.
No entanto, caso uma rota técnica fuja do escopo documentado original em `Spec`, ou falhas inesperadas de banco forçarem nova lógica - o documento principal é atualizado (commits controlados), para somente depois a equipe atuar no código seguindo a nova fonte da verdade.

Se decisões arquiteturais forem tomadas durante a especificação, registre como ADR usando a skill `documentar` em `docs/05-decisoes/ADR-NNN-[tema].md`.

## Sinais de Alerta (Red Flags)

*(Lembrete vital de segurança: Sempre transite entre etapas validando as diretrizes dos nossos **[Checklists Formais de Aprovação](references/checklists.md)**)*

- Escrever códigos no chat antes do final das Fases 1 a 3.
- Perguntar "Vou começar a construir a lógica do zero" e já gerar os arquivos subjacentes se o humano mal analisou e confirmou o roteiro.
- Decisões em arquiteturas que divergem com o que consta guardado no documento *Spec*.
- Trabalhar em especificações cheias de descrições não testáveis de forma técnica direta.

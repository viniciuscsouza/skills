# Guia de Orquestração de Skills

Este documento explica quando chamar cada skill como subagente pesado e quando apenas referenciar como guia rápido.

## Quando Chamar como Subagente

Use subagentes quando a tarefa é pesada, independente e produz um artefato completo.

### refinar → Subagente
**Chame quando:**
- Sessão completa de ideação com múltiplas variações
- Projeto novo do zero, sem direção clara
- Feature grande que precisa explorar múltiplas abordagens

**Não chame quando:**
- A ideia já foi refinada e só precisa de validação rápida
- É um bug fix óbvio que não precisa de brainstorming

**Artefato de saída:** `docs/01-ideias/[nome].md`

### especificar → Subagente
**Chame quando:**
- Spec grande com múltiplas camadas e dependências
- Feature que toca muitos módulos do sistema
- Mudança de arquitetura ou stack

**Não chame quando:**
- Spec leve para bug fix (faça inline)
- Ajuste cosmético que não precisa de spec formal

**Artefatos de saída:**
- `docs/02-especificacoes/[nome].md`
- `docs/03-planos/[nome].md`
- `docs/04-tarefas/[nome].md`

### implementar → Subagente
**Chame quando:**
- Fatia complexa que toca muitos arquivos
- Integração com serviço externo
- Refatoração de módulo inteiro

**Não chame quando:**
- Fatia pequena e isolada (faça inline)
- Correção de bug pontual

### revisar → Subagente
**Chame quando:**
- Revisão completa de PR ou feature inteira
- Avaliação de segurança de módulo crítico
- Auditoria de desempenho

**Não chame quando:**
- Checklist rápido durante desenvolvimento
- Revisão de mudança pequena (< 50 linhas)

### debugar → Subagente
**Chame quando:**
- Bug complexo com causa-raiz desconhecida
- Incidente em produção
- Erro intermitente que precisa de investigação profunda

**Não chame quando:**
- Bug óbvio com causa clara (vá direto para testar → implementar)

### documentar → Subagente
**Chame quando:**
- Criar conjunto de ADRs para decisão arquitetural grande
- Escrever README completo de projeto novo
- Documentar contratos de API

**Não chame quando:**
- Registrar uma única decisão rápida (faça inline)
- Comentário de código pontual

## Quando Referenciar Diretamente

Use como referência quando a consulta é rápida, contextual ou contínua.

### contextualizar → Sempre Referência
É um mindset, não uma fase isolada. Aplique os princípios durante TODO o trabalho:
- Hierarquia de memória (5 níveis)
- Selective include (só o necessário)
- Tratamento de ambiguidade (pare e pergunte)
- Limpeza de contexto entre tarefas

### testar → Referência Integrada
Use durante cada fatia de implementação:
- Ciclo Red/Green/Refactor para lógica nova
- Padrão "Prove First" para bugs
- Pirâmide de testes (80/15/5)
- Padrão AAA

### implementar → Referência Contínua
Use as regras durante o trabalho:
- Fatias verticais
- Risco primeiro
- Simplicidade antes de abstração
- Disciplina de escopo

### simplificar → Referência Durante Refatoração
Use após implementar, antes de revisar:
- 5 princípios de simplificação
- Processo de 4 passos
- Regra das 500 linhas

### revisar → Referência Rápida
Use os 5 eixos para checklists rápidos:
- Correção, Legibilidade, Arquitetura, Segurança, Desempenho

## Mapa de Decisão

```
Solicitação do usuário → Qual tipo?
├── Projeto novo → pilotar → fluxo completo (5 fases + documentar)
├── Feature nova → pilotar → contextualizar → [refinar] → especificar → implementar → revisar
├── Bug → pilotar → debugar → testar → implementar → revisar
├── Refatoração → pilotar → contextualizar → especificar → implementar → simplificar → revisar
├── Debug urgente → debugar → testar → implementar (atalho, sem pilotar)
├── Documentar → pilotar → contextualizar → documentar (atalho)
└── Simplificar → simplificar → testar (atalho, sem pilotar)

Dentro de qualquer fluxo → É pesado e independente?
├── Sim → Chamar como subagente
└── Não → Referenciar e executar inline
```

## Integração de Artefatos

**Regra fundamental:** Cada skill é dona do seu diretório de saída. A `pilotar` NUNCA copia ou sobrescreve artefatos gerados por outras skills. Ela apenas referencia seus caminhos no `context.json`.

| Skill | Diretório de Saída | Como pilotar usa |
|-------|-------------------|-----------------|
| pilotar | `docs/context.json`, `docs/00-visao.md`, `docs/06-aprendizados.md` | Cria e mantém diretamente |
| refinar | `docs/01-ideias/[nome].md` | Lê e referencia no context.json |
| especificar | `docs/02-especificacoes/`, `docs/03-planos/`, `docs/04-tarefas/` | Lê e referencia no context.json |
| documentar | `docs/05-decisoes/ADR-NNN-[tema].md` | Lê e referencia no context.json |
| debugar | `docs/07-debug/[data]-[tema].md` | Lê e referencia no context.json |
| implementar, testar, revisar, simplificar | Código + testes (sem docs obrigatórios) | Não geram artefatos de docs |

Se um artefato já existe, leia-o do caminho original. Nunca crie uma cópia em outro lugar.

## Tabela de Roteamento Rápido

| O usuário diz... | Tipo | Fluxo |
|------------------|------|-------|
| "Quero criar um app/site/sistema" | Projeto novo | Full: contextualizar → refinar → especificar → implementar → revisar → documentar |
| "Quero adicionar X ao meu projeto" | Feature | contextualizar → [refinar] → especificar → implementar → revisar |
| "Tem um bug em X" | Bug | debugar → testar → implementar → revisar |
| "Quero melhorar/limpar o código de X" | Refatoração | contextualizar → especificar → implementar → simplificar → revisar |
| "Tá tudo quebrado!" | Debug urgente | debugar → testar → implementar |
| "Preciso documentar X" | Documentar | contextualizar → documentar |
| "Esse código tá confuso" | Simplificar | simplificar → testar |

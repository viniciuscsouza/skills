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

**Artefato de saída:** `docs/ideas/[nome].md`

### especificar → Subagente
**Chame quando:**
- Spec grande com múltiplas camadas e dependências
- Feature que toca muitos módulos do sistema
- Mudança de arquitetura ou stack

**Não chame quando:**
- Spec leve para bug fix (faça inline)
- Ajuste cosmético que não precisa de spec formal

**Artefatos de saída:**
- `docs/specs/[nome].md`
- `docs/plans/[nome].md`
- `docs/tasks/[nome].md`

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

### revisar → Referência Rápida
Use os 5 eixos para checklists rápidos:
- Correção, Legibilidade, Arquitetura, Segurança, Desempenho

## Mapa de Decisão

```
Tarefa nova → É pesada e independente?
  ├── Sim → Chamar como subagente
  └── Não → Referenciar e executar inline

Durante implementação → Precisa de teste?
  ├── Sim → Referenciar testar (inline)
  └── Não → Seguir implementar

Após feature completa → Precisa de revisão formal?
  ├── Sim → Chamar revisar como subagente
  └── Não → Checklist rápido inline
```

## Integração de Artefatos

**Regra fundamental:** A skill `pilotar` NUNCA copia ou sobrescreve artefatos gerados por outras skills. Ela apenas referencia seus caminhos no `context.json`.

| Skill | Diretório de Saída | Como pilotar usa |
|-------|-------------------|-----------------|
| refinar | `docs/ideas/[nome].md` | Lê e referencia no context.json |
| especificar | `docs/specs/`, `docs/plans/`, `docs/tasks/` | Lê e referencia no context.json |
| pilotar | `docs/00-visao.md`, `docs/05-decisoes.md`, `docs/06-aprendizados.md`, `docs/context.json` | Cria e mantém diretamente |

Se um artefato já existe, leia-o do caminho original. Nunca crie uma cópia em outro lugar.

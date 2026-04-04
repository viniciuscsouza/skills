# Templates de Especificação e Planejamento

Estes templates devem ser utilizados como ponto de partida (boilerplate) nas fases relativas ao Desenvolvimento Orientado a Especificações (Spec-Driven Development).

## 1. Template de Especificação (Spec)
Este documento estabelece o contrato do que será construído.

```markdown
# Spec: [Nome do Projeto ou Funcionalidade]

## Objetivo
[Para quem estamos construindo e qual a dor que estamos resolvendo. Descreva as "User Stories" ou épicos principais.]

## Ambiente e Comandos
- **Stack Final:** [ex: Node.JS 20, Vue 3, PostgreSQL]
- **Rodar Local:** `[comando de start]`
- **Rodar Testes:** `[comando de testes]`
- **Lint/Build:** `[comandos de build]`

## Estrutura de Arquivos
[Descreva brevemente a árvore ou onde os arquivos principais dessa spec viverão]
- `/src/...` -> [motivo]
- `/tests/...` -> [motivo]

## Acordos Práticos (Boundaries)
- **Sempre a fazer:** [ex: Garantir cobertura de teste unitário nas rotas novas]
- **Perguntar antes:** [ex: Alterar schemas do banco central de dados]
- **Nunca fazer:** [ex: Commitar chaves secretas ou instalar pacotes pesados sem análise]

## Critérios de Sucesso
- [ ] [Métrica 1: ex: Endpoint de login deve retornar status 200 em menos de 100ms]
- [ ] [Métrica 2: ex: Cobertura visual sendo perfeitamente acessível via teclado (WCAG)]
- [ ] [Métrica 3]

## Perguntas em Aberto
- [Dúvida que o analista percebeu e o líder/solicitante precisa responder antes de fechar a Spec.]
```

## 2. Template de Plano Técnico (Phase 2)
Este template tangibiliza o "Como" a Spec será estruturada para a execução real.

```markdown
# Plano Técnico: [Nome da Funcionalidade]

## 1. Ordem de Execução
[Escreva o encadeamento de lógicas. O que precisa ser feito primeiro para destravar o restante?]
1. Ex: Entidades do Banco de Dados e Modelos
2. Ex: Rotas (Controllers/Handlers)
3. Ex: Visual (Frontend/Componentes)

## 2. Paralelização
[O que pode ser feito ao mesmo tempo sem quebrar dependências?]
- Ex: Toda a parte visual (Frontend) pode ser mockada e iniciada sem depender da API.

## 3. Riscos e Mitigações
- **Risco:** [Ex: Falha de limite de taxa (Rate Limit) da requisição X]
- **Mitigação:** [Ex: Implementar cache com Redis ou Fallback automático]
```

## 3. Template de Tarefa (Phase 3)
Use este padrão para listar e delegar micro entregas acionáveis do seu plano.

```markdown
- [ ] Tarefa: [Ação curta e direta. Ex: 'Definir banco de dados de Produtos']
  - **Aceite:** [O que aprova essa tarefa? Ex: 'Todos os campos do Spec constando na tabela com types devidos']
  - **Verifique:** [Como testar pontualmente? Ex: `npm run seed`]
  - **Limite Máximo:** [Altera no máximo as pastas de migração. Não injetar rotas aqui!]
```

# Critérios de Refinamento & Avaliação

Use esta rubrica durante a Fase 2 (Avaliar & Convergir) para testar ideias sob estresse. Nem todo critério se aplica a toda ideia — use julgamento sobre quais dimensões importam mais para o contexto específico.

## Dimensões Centrais de Avaliação

### 1. Valor para o Usuário

A dimensão mais importante. Se o valor não está claro, nada mais importa.

**Analgésico vs. Vitamina:**
- **Analgésico:** Resolve um problema agudo e frequente. Usuários vão procurar ativamente isso. Vão trocar da solução atual. Sinais: as pessoas descrevem o problema com emoção, já criaram gambiarras, pagariam por uma solução.
- **Vitamina:** Bom de ter. Melhora algo marginalmente. Usuários não vão se esforçar. Sinais: as pessoas acenam educadamente, dizem "que legal", mas não mudam de comportamento.

**Perguntas para fazer:**
- Você consegue nomear 3 pessoas específicas que têm esse problema agora?
- O que elas fazem hoje em vez disso? (O concorrente real é sempre a gambiarra atual.)
- Elas trocariam da abordagem atual? O que faria elas trocarem?
- Com que frequência encontram esse problema? (Problemas diários > problemas mensais)
- Isso é um problema de "puxar" (usuários estão pedindo) ou de "empurrar" (você acha que deveriam querer)?

**Bandeiras vermelhas:**
- "Todo mundo poderia usar isso" — se não consegue nomear um usuário específico, o valor não está claro
- "É como X mas melhor" — melhorias marginais raramente geram adoção
- O problema é real mas raro — alta intensidade mas baixa frequência raramente justifica um produto

### 2. Viabilidade

Você consegue realmente construir isso? Não apenas tecnicamente, mas na prática.

**Viabilidade técnica:**
- A tecnologia central existe e funciona de forma confiável?
- Qual é o problema técnico mais difícil? É um problema conhecido como difícil ou é novo?
- Existem dependências de terceiros, APIs ou fontes de dados que você não controla?
- Qual é a stack técnica mínima necessária? (Se a resposta é "muita coisa", isso é um sinal.)

**Viabilidade de recursos:**
- Qual é a equipe/esforço mínimo para construir um MVP?
- Requer expertise especializada que você não tem?
- Existem requisitos regulatórios, legais ou de compliance?

**Tempo até o valor:**
- Quão rápido consegue colocar algo na frente dos usuários?
- Existe uma versão que entrega valor em dias/semanas, não meses?
- Qual é o caminho crítico? O que precisa acontecer primeiro?

**Bandeiras vermelhas:**
- "Só precisamos resolver [problema de pesquisa muito difícil] primeiro"
- Múltiplas dependências que precisam funcionar simultaneamente
- O MVP ainda requer meses de trabalho — provavelmente não é mínimo o suficiente

### 3. Diferenciação

O que torna isso genuinamente diferente? Não melhor — *diferente*.

**Perguntas para fazer:**
- Se um usuário descrevesse isso para um amigo, o que diria? Essa descrição é convincente?
- Qual é a única coisa que isso faz que nada mais faz? (Se não consegue nomear uma, isso é um problema.)
- Essa diferenciação é durável? Um concorrente consegue copiar em uma semana?
- A diferença é algo que os usuários realmente se importam, ou apenas algo que construtores acham interessante?

**Tipos de diferenciação (do mais forte ao mais fraco):**
1. **Nova capacidade:** Faz algo que era previamente impossível
2. **Melhoria 10x:** Tão melhor em uma dimensão chave que muda o comportamento
3. **Novo público:** Traz uma capacidade existente para pessoas que eram excluídas
4. **Novo contexto:** Funciona em uma situação onde soluções existentes falham
5. **Melhor UX:** Mesma capacidade, experiência dramaticamente mais simples
6. **Mais barato:** A mesma coisa, menor custo (mais fraco — facilmente competido)

**Bandeiras vermelhas:**
- Diferenciação é inteiramente sobre tecnologia, não sobre experiência do usuário
- "Somos mais rápidos/baratos/bonitos" sem uma razão estrutural para isso
- A funcionalidade que diferencia não é a que os usuários mais se importam

## Auditoria de Suposições

Para cada direção de ideia, liste explicitamente suposições em três categorias:

### Precisa Ser Verdade (Impeditivo)
Suposições que, se erradas, matam a ideia inteiramente. Precisam de validação antes de construir.

Exemplo: "Usuários vão compartilhar seus dados conosco" — se não compartilharem, o produto inteiro não funciona.

### Deveria Ser Verdade (Importante)
Suposições que impactam significativamente o sucesso mas não matam a ideia. Você pode ajustar a abordagem se estiverem erradas.

Exemplo: "Usuários preferem self-service a falar com uma pessoa" — se errado, precisa de um go-to-market diferente, mas o produto central ainda pode funcionar.

### Pode Ser Verdade (Bom Ter)
Suposições sobre funcionalidades secundárias ou otimizações. Não valide isso até que o core esteja provado.

Exemplo: "Usuários vão querer compartilhar seus resultados com colegas" — uma funcionalidade de crescimento, não a proposição de valor central.

## Framework de Decisão

Ao escolher entre direções, classifique nesta matriz:

|                    | Alta Viabilidade | Baixa Viabilidade |
|--------------------|-------------------|-----------------|
| **Alto Valor**     | Faça isso primeiro | Vale o risco     |
| **Baixo Valor**    | Só se for trivial  | Não faça isso    |

Depois use a diferenciação como desempate entre opções no mesmo quadrante.

## Princípios de Escopo do MVP

Ao definir o escopo do MVP para a direção escolhida:

1. **Um trabalho, bem feito.** O MVP deve acertar exatamente um trabalho do usuário. Não três trabalhos feitos parcialmente.
2. **A suposição mais arriscada primeiro.** O propósito primário do MVP é testar a suposição mais provável de estar errada.
3. **Caixa de tempo, não lista de funcionalidades.** "O que conseguimos construir e testar em [prazo]?" é melhor que "Quais funcionalidades precisamos?"
4. **A lista de 'Não Vamos Fazer' é obrigatória.** Nomeie explicitamente o que está cortando e por quê. Isso previne scope creep e força priorização honesta.
5. **Se não está constrangedor, demorou demais.** A primeira versão deve parecer incompleta para quem construiu. Se não parece, você construiu demais.

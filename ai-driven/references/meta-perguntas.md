# Meta-Perguntas — Guia de Descoberta para Domínios Desconhecidos

> Use estas perguntas ao entrar em um domínio que você ou o usuário não dominam.
> Elas foram desenhadas para revelar o que ninguém conta espontaneamente.

---

## As Cinco Perguntas Essenciais

### 1. A Pergunta do Conceito Óbvio (Descoberta de Linguagem)

> "O que é óbvio para um especialista deste domínio que eu, como alguém de fora, provavelmente ainda não percebi?"

**Por que funciona:** Remove o viés do especialista que assume que "todo mundo sabe disso" e força a explicação da linguagem do domínio — que é frequentemente o maior gargalo entre negócio e engenharia.

**Quando usar:** No início de qualquer projeto em domínio novo, especialmente em conversas com stakeholders de negócio.

---

### 2. A Pergunta da Catástrofe (Descoberta de Regras)

> "Se este processo fosse feito manualmente por humanos, qual seria o erro mais catastrófico possível e qual é o termo que vocês usam para descrever quando isso acontece?"

**Por que funciona:** Identifica as regras de negócio críticas — aquelas que nunca podem ser violadas. O uso da "gíria" revela como o time pensa sobre o problema no dia a dia, expondo terminologia que raramente aparece em documentação formal.

**Quando usar:** Ao mapear regras de negócio e invariantes do domínio, especialmente antes de modelar entidades.

---

### 3. A Pergunta da Restrição Invisível (Arquitetura & Trade-offs)

> "Qual é a regra desse negócio que parece absurda ou ineficiente para quem olha de fora, mas que existe por um motivo de segurança ou compliance que eu ainda não conheço?"

**Por que funciona:** Evita que você sugira "melhorias" que quebrem regras de conformidade ou segurança não documentadas no código. Muitos bugs em produção nascem de desenvolvedores que "simplificaram" algo que parecia desnecessário.

**Quando usar:** Antes de propor mudanças arquiteturais ou simplificações em sistemas existentes.

---

### 4. A Pergunta da Erosão (Descoberta de Volatilidade)

> "O que mudou neste domínio nos últimos 12 meses que invalidou algo antes considerado estável? E o que provavelmente vai mudar nos próximos 12?"

**Por que funciona:** Revela a taxa de mudança do domínio. Domínios que mudam rápido (regulação, mercado) exigem arquiteturas flexíveis. Domínios estáveis permitem otimizações mais agressivas.

**Quando usar:** Ao tomar decisões arquiteturais de longo prazo.

---

### 5. A Pergunta da Exceção (Descoberta de Edge Cases)

> "Me conte sobre a última vez que alguém precisou resolver algo 'na mão' porque o sistema não cobria esse caso. O que aconteceu?"

**Por que funciona:** Transforma o abstrato ("quais são os edge cases?") em algo concreto e narrativo. O caso que alguém resolveu manualmente ontem é o bug que vai aparecer em produção amanhã.

**Quando usar:** Após mapear o happy path, para descobrir os caminhos alternativos ignorados.

---

## A Meta-Pergunta Definitiva

Se pudesse fazer apenas **uma única pergunta**:

> "Qual é o acoplamento conceitual deste domínio que, se eu ignorar, fará com que o sistema 'funcione' tecnicamente, mas falhe miseravelmente no propósito real do negócio?"

Combina todas as anteriores: conhecimento tácito, risco crítico, restrições invisíveis e volatilidade.

---

## Anti-padrões: Perguntas que Fecham Portas

Evite perguntas que soem como julgamento. A diferença entre uma pergunta que revela contexto e uma que cria defensividade está na **curiosidade genuína**.

| ❌ Não pergunte | ✅ Pergunte assim |
|---|---|
| "Por que vocês fazem isso de um jeito tão complicado?" | "Qual o histórico por trás dessa decisão?" |
| "Isso não deveria ser mais simples?" | "O que torna esse processo necessariamente complexo?" |
| "Quem decidiu fazer assim?" | "Qual era o contexto quando essa abordagem foi escolhida?" |
| "Isso tá errado." | "O que aconteceria se fizéssemos diferente aqui?" |
| "Ninguém testou isso antes?" | "Como esse cenário era validado até agora?" |

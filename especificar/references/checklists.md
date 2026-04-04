# Checklists de Verificação (Gated Workflow)

A metodologia de especificação é pautada em "Portões" (Gates). Utilize estas litas para checar com o Humano ou Líder Técnico se o modelo atual possui qualidade e maturidade para avançar à próxima fase sem desperdiçar esforço.

## Porta 1: Validação de Especificação (Spec)
*Antes de dar a 'Fase 1' como concluída, certifique-se de que:*

- [ ] A seção de "Suposições" (Assumptions) foi explícita e revisada ativamente?
- [ ] O motivador e a declaração real do problema (Objetivo) estão claros?
- [ ] Foram definidos os comandos obrigatórios do sistema desta rotina?
- [ ] Os limitadores contratuais "Sempre a Fazer" e "Nunca Fazer" estão listados?
- [ ] Todos os "desejos abstratos" do sistema viraram **"Critérios de Sucesso Irrefutáveis"**?
- [ ] **Aprovação Final:** O solicitante confirmou o documento de Spec e suas lógicas abertas?

## Porta 2: Validação do Planejamento Técnico
*Antes de criar os arquivos e ir codificar precipitadamente:*

- [ ] A ordem proposta de quem entra antes de quem faz sentido técnico? (Ex: Não esquecer os mocks ao isolar rotas do UX).
- [ ] Os riscos do caminho estão listados e possuem atalhos lógicos para mitigar danos (se aplicável)?
- [ ] Há tarefas que demorariam seitas horas, e consequentemente demandariam divisões de time ou paralelismo?
- [ ] **Aprovação Final:** O usuário endossou a estratégia de execução?

## Porta 3: Validação do Checklist de Tarefas
*O sinal verde para o início dos trabalhos da mão na massa:*

- [ ] Nenhuma tarefa listada é um superpacote infinito? A regra é: tarefas devem ser alcançáveis e curtas.
- [ ] Toda tarefa possui a via de checagem "Como Validar/Aceitar" evidenciada?
- [ ] Os limites declarados na tarefa a impedem de causar vazamento de escopo (*Scope Creep*) em pastas aleatórias?
- [ ] **Aprovação Final:** O executor/IA tem a sequência perfeitamente legível sem criar confusão?

*Ao atravessar todas as 3 portas, você pode começar efetivamente as escritas utilizando as skills de código (`implementar` e `testar`).*

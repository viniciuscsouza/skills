# Ciclos de Qualidade — Framework de Avaliação Multidimensional

> Framework de perguntas para analisar features, projetos e decisões técnicas
> sob diferentes ângulos. Cada ciclo é uma lente diferente sobre o mesmo problema.
>
> **Não percorra todos os ciclos para cada tarefa.** Use o Ciclo 0 ao entrar em
> domínios novos. Para tarefas do dia a dia, selecione os ciclos relevantes.

---

## Índice

- [Ciclo 0: Descoberta & Contexto](#ciclo-0-descoberta--contexto)
- [Ciclo 1: Negócio e Estratégia](#ciclo-1-negócio-e-estratégia)
- [Ciclo 2: Produto e Evolução](#ciclo-2-produto-e-evolução)
- [Ciclo 3: Experiência do Usuário (UX)](#ciclo-3-experiência-do-usuário-ux)
- [Ciclo 4: Engenharia e Backend](#ciclo-4-engenharia-e-backend)
- [Ciclo 5: Segurança e Compliance](#ciclo-5-segurança-e-compliance)
- [Ciclo 6: Qualidade e Operação](#ciclo-6-qualidade-e-operação)
- [Ciclo 7: Dados & Inteligência](#ciclo-7-dados--inteligência)
- [Ciclo 8: Time e Cultura](#ciclo-8-time-e-cultura)
- [Ciclo 9: Pessoas e Organização](#ciclo-9-pessoas-e-organização)
- [Ciclo 10: Ética e Impacto](#ciclo-10-ética-e-impacto)
- [Ciclo 11: Front-end (Web)](#ciclo-11-front-end-web)
- [Ciclo 12: Mobile](#ciclo-12-mobile)

---

## Relevância por Perfil

| Ciclo | Dev Solo | Tech Lead | PM |
|-------|----------|-----------|-----|
| 0. Descoberta | ● | ● | ● |
| 1. Negócio | ○ | ● | ● |
| 2. Produto | ● | ● | ● |
| 3. UX | ● | ○ | ● |
| 4. Engenharia | ● | ● | ○ |
| 5. Segurança | ● | ● | ○ |
| 6. Qualidade/Ops | ● | ● | ○ |
| 7. Dados | ○ | ● | ○ |
| 8. Time/Cultura | ● | ● | ● |
| 9. Organização | ○ | ● | ● |
| 10. Ética | ○ | ● | ● |
| 11. Front-end | ● | ○ | ○ |
| 12. Mobile | ● | ○ | ○ |

`●` Alta relevância · `○` Consultar conforme contexto

---

## Ciclo 0: Descoberta & Contexto
*Estou resolvendo o problema certo ou apenas automatizando um mal-entendido?*

### Mapeamento de Ignorância
→ Quais perguntas eu não estou fazendo, mas seriam óbvias para um especialista?
→ O que parece simples, mas esconde regras de negócio caóticas?
→ Quais coisas "todo mundo sabe" mas não estão escritas em lugar nenhum?

### Linguagem Ubíqua
→ Negócio e engenharia usam as mesmas palavras para as mesmas coisas?
→ Existem termos no código que significam algo diferente na operação?
→ Qual conceito precisa ser desmembrado porque significa coisas diferentes por contexto?

### Fronteiras & Especialistas
→ Quem detém o conhecimento profundo e histórico de por que as coisas são como são?
→ Onde termina a responsabilidade do nosso domínio e começa a de outro?

### Sistemas Sombra
→ Onde estão as "planilhas mágicas" que a operação usa por fora do sistema?
→ Como as pessoas resolvem o problema quando o sistema não atende uma exceção?

### Histórico
→ Alguém já tentou resolver isso antes? O que aconteceu?
→ Existe alguma decisão política que influenciou a solução atual?
→ O problema mudou desde a última avaliação?

---

## Ciclo 1: Negócio e Estratégia
*Gera valor, é mensurável e economicamente viável?*

### ROI & Valor
→ O esforço é proporcional ao retorno esperado?
→ Qual métrica essa feature move (North Star Metric)?
→ Como medimos sucesso — e em quanto tempo?

### Hipóteses & Validação
→ É uma hipótese sendo testada ou uma certeza?
→ Como validar ou invalidar rapidamente?
→ Qual o custo de estar errado?

### Time-to-Market & Escopo
→ Qual a menor fatia que valida o valor real?
→ O que pode ser cortado sem comprometer a hipótese?
→ Devemos construir ou usar uma solução pronta?

### FinOps
→ Essa feature aumenta o custo de infra de forma relevante?
→ Há risco de um cliente consumir recursos desproporcionalmente?
→ Existe chamada externa cobrada por volume?

---

## Ciclo 2: Produto e Evolução
*Abre ou fecha o futuro? É sustentável tecnicamente?*

### Extensibilidade
→ A feature abre ou fecha possibilidades futuras?
→ Existe abstração que vale fazer agora ou é overengineering?
→ É funcionalidade permanente ou experimento temporário?

### Dívida Técnica
→ Estamos criando dívida intencional ou acidental?
→ Custo e riscos estão explícitos?
→ Existe plano para pagar essa dívida?

### Descomissionamento
→ Se falhar, qual o esforço para remover do código e do banco?
→ O que faremos com os dados gerados se desativarmos?

---

## Ciclo 3: Experiência do Usuário (UX)
*Resolve o problema com mínima fricção?*

### Jornada & Modelo Mental
→ Qual o modelo mental do usuário? O sistema reflete isso?
→ Existe fricção desnecessária no fluxo?
→ O comportamento é previsível e consistente?

### Feedback & Comunicação
→ Como o usuário sabe que algo deu errado?
→ Existe confirmação visual de que a ação foi concluída?
→ O erro é acionável — o usuário sabe o que fazer?

### Acessibilidade
→ Funciona com leitores de tela?
→ Contraste e tamanho de fonte são adequados?
→ Toda jornada é navegável via teclado?

### Estados Visuais
→ Quais estados previstos: loading, empty, error, success?
→ Podemos usar Optimistic UI ou skeleton screens?

---

## Ciclo 4: Engenharia e Backend
*Funciona, escala e mantém a integridade?*

### Domínio & Regras
→ Quais entidades e agregadores envolvidos?
→ Quais regras nunca podem ser violadas?
→ Quais estados existem e quais transições são válidas?

### Resiliência
→ O sistema degrada graciosamente se uma dependência cair?
→ Circuit breakers, fallbacks e retry estão previstos?
→ O sistema se recupera sozinho após a normalização?

### Concorrência & Idempotência
→ O que acontece com requisições concorrentes idênticas?
→ A operação é idempotente (pode ser repetida com segurança)?
→ Onde locks podem causar gargalos?

### Performance & Escalabilidade
→ Qual o volume esperado — agora e em 12 meses?
→ Existe query que escala mal (O(n²), full table scan)?
→ Precisa de cache, paginação ou processamento assíncrono?

---

## Ciclo 5: Segurança e Compliance
*É resistente e protege a privacidade?*

### Proteção de Dados
→ Quem pode acessar isso? Autorização granular (RBAC/ABAC)?
→ Dado sensível exposto? Criptografado em repouso e trânsito?
→ Entrada sanitizada contra injection, XSS e IDOR?

### Superfície de Ataque
→ Quantas novas portas de entrada estamos adicionando?
→ Algo interno está exposto à internet sem necessidade?
→ Proteção contra abuse/fraud (spam, scraping)?

### Supply Chain
→ Novas bibliotecas ou imagens Docker são confiáveis?
→ Dependências com CVEs conhecidas?
→ O serviço executa com permissões mínimas?

### Compliance
→ Dado sujeito à LGPD?
→ Existe fluxo de retenção e direito de exclusão?
→ Precisa de consentimento explícito?

---

## Ciclo 6: Qualidade e Operação
*É fácil de testar, operar e debugar?*

### Testabilidade
→ Como testar unitariamente sem dependências externas?
→ Quais cenários precisam de testes E2E?
→ Se é difícil testar, onde está o acoplamento escondido?

### Observabilidade
→ Como saber que funciona corretamente em produção?
→ Quais métricas e logs são necessários para debug rápido?
→ Alertas configurados para anomalias?

### Reversibilidade
→ Consigo reverter a mudança em segundos (rollback)?
→ A mudança no banco é retrocompatível?
→ Precisa de feature flag para rollout gradual?

---

## Ciclo 7: Dados & Inteligência
*Os dados são íntegros e preparados para o futuro?*

### Estrutura
→ Qual a estrutura dos dados que entram e saem?
→ Quem é o dono do dado e o consumidor primário?
→ Existe migração necessária? Nenhum dado será perdido?

### Consumo Analítico
→ O formato facilita ingestão por Data Lake/Warehouse?
→ Alterações quebrarão dashboards ou pipelines?

### Governança
→ Esse contrato de dados pode mudar? Precisa ser versionado?
→ Consumidores serão notificados antes de breaking changes?

---

## Ciclo 8: Time e Cultura
*É sustentável para quem mantém o código?*

### Legibilidade
→ O código será fácil de entender em 6 meses?
→ Os nomes refletem o domínio do negócio?
→ Estamos criando dependência de conhecimento tácito?

### Documentação
→ A decisão precisa de um ADR?
→ Quais trade-offs foram considerados?

### Bus Factor
→ Se o principal dev sair, o time consegue manter?
→ Quantos conceitos novos alguém precisa aprender?

---

## Ciclo 9: Pessoas e Organização
*Impacta além do meu contexto?*

### Governança
→ Existe processo de aprovação formal envolvido?
→ Precisa comunicar breaking changes a outros times?
→ Há risco de causar retrabalho em outra área?

### Padrões & Reúso
→ Estou criando um padrão que outros deveriam seguir?
→ Esse problema já foi resolvido por outro time?

---

## Ciclo 10: Ética e Impacto
*A solução é justa e transparente?*

### Viés e Justiça
→ O algoritmo penaliza injustamente algum grupo?
→ Os dados representam a diversidade real dos usuários?

### Transparência
→ Estamos induzindo decisões contra o interesse do usuário?
→ O caminho para reverter é tão simples quanto o de ativar?

### Sustentabilidade
→ O processamento gera desperdício energético injustificável?
→ Podemos otimizar rotinas para horários de menor impacto?

---

## Ciclo 11: Front-end (Web)
*A aplicação é rápida e respeita o navegador?*

### Performance & Web Vitals
→ Impacta negativamente LCP, CLS ou INP?
→ O bundle size estourou? Precisa de code-splitting?
→ Importando bibliotecas pesadas sem necessidade?

### Estado & Resiliência Visual
→ O estado sobrevive a um refresh (URL/LocalStorage)?
→ Proteção contra cliques duplos (debounce/throttle)?
→ Event listeners e intervalos estão sendo limpos?

### SEO
→ O conteúdo precisa de SSR, SSG ou CSR?
→ A semântica HTML foi respeitada?

### Compatibilidade
→ O layout quebra em resoluções atípicas ou zoom 200%?
→ Precisa de polyfills para navegadores suportados?

---

## Ciclo 12: Mobile (iOS & Android)
*O app sobrevive às restrições físicas e às lojas?*

### Lifecycle & Hardware
→ O estado é restaurado se o SO encerrar o app?
→ O que acontece se minimizado durante transação crítica?
→ Uso de GPS/câmera/animações drena bateria?
→ Respeita Safe Areas (notches, bordas arredondadas)?

### Permissões
→ Permissões pedidas apenas no momento de uso?
→ A interface degrada se o usuário negar permissão?

### Condições de Rede
→ Feedback claro em conexões 3G ou offline?
→ Retoma downloads se a rede alternar Wi-Fi/Dados?

### Lojas
→ Bug crítico: desligamos via feature flag ou dependemos de review?
→ Exige force update por quebra de contrato na API?

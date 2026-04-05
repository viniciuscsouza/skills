---
name: documentar
description: Registra decisões e escreve a memória corporativa de um sistema. Use ao arquitetar grandes caminhos de projeto, escolher as ferramentas primárias do sistema ou pavimentar o terreno (via ADRs e READMEs) para o entendimento futuro da inteligência artificial e humanos. 
---

# Documentação Contínua e ADRs (Records de Decisão)

## Visão Geral

Documente primariamente suas decisões, não as lógicas óbvias. A base mais valiosa de uma documentação corporativa retém o **PORQUÊ** das coisas. O código explica à máquina e aos desenvolvedores experientes o "O Quê" está acontecendo (Ex: "Fazemos o loop usando filtro X"). A documentação deve suprir o "*Por que fizemos assim?*" e "*O que tentamos antes que deu errado?*". Isto é indispensável para inteligências e humanos não andarem em círculos refazendo decisões passadas.

## Quando Usar

- Sempre que definir o esqueleto de um sistema (Padrões, DBs, Auth).
- Mudanças drásticas na Arquitetura inicial.
- Ao publicar caminhos visíveis de APIs (Rotas externas, bibliotecas, pacotes).
- Para configurar o documento central de embarque do projeto (README).

**Quando NÃO usar:** Criar rotinas explicativas para "Scripts triviais de formatação de string" ou comentar passo a passo lógicas óbvias de leitura visual fácil à qualquer engenheiro mediano.

---

## Registros de Decisão de Arquitetura (ADRs)

Documentos rápidos e estritos que gravam em pedra o raciocínio vigente pelo qual algo foi aprovado na aplicação. Eles blindam a base contra a perda de memória institucional.

### Quando Registrar um ADR?
Sempre que o retorno sobre a mudança for caro ou irreversível.
Exemplos: Escolher usar Sistema Relacional ao invés de NoSQL, adotar REST em vez de GraphQL, decidir estruturar tudo numa nuvem proprietária ao invés de servidore abertos.

### O Template Universal (Salve em `docs/05-decisoes/`)

Todos os ADRs devem seguir esta sequência inquebrável:

```markdown
# ADR-001: [O Título da Decisão]

## Status
[Proposto] | [Aceito] | [Substituído por ADR-00X]

## Contexto
O que forçou essa decisão precisar existir? Liste também as limitações de grana/performance/tecnologia atuais que norteiam sua bússola.

## A Decisão Tomada
Usaremos [Ferramenta Y/Padrão Z].

## Alternativas Cogitadas e Rejeitadas
### [Alternativa A]
- Prós e Contras avaliados.
- Razão principal da Rejeição: (Ex: Demanda uma curva de aprendizado indesejada).

## Consequências Adquiridas
O que ganharemos ou passaremos a sofrer/pagar com esta quebra de paradigma daqui em diante.
```

### O Ciclo de Vida Intocável
As ADRs formam um "log histórico". Se daqui 3 anos você decidir remover as referências que o ADR-001 estabeleceu, **NÃO APAGUE O ARQUIVO DO ADR-001**.
Altere o status dele para `[Substituído/Obsoleto]` e aponte para um recém-criado `ADR-030` atual que justifique os motivos modernos da troca de ferramenta. 

---

## Documentação "Em Linha" (No Código Fonte)

A regra máxima do comentário é atuar na contenção de armadilhas mentais ("Gotchas").

**Certo (Foca na Razão Especial ou Falha Histórica):**
```text
// O tempo de expiração do bloqueio obedece o limite arbitrário
// do fuso de 5 horas a menos pois os roteadores não tratam falhas 
// originadas em UTC, evitando ataques nas bordas do limite horário diário.
```

**Errado / Ruim (Parafraseia as variáveis de forma robótica):**
```text
// Adiciona o valor atual ao acumulador geral na lista de usuários.
```

**Banimentos Completos:**
- Linhas de códigos massivas comentadas como lixo ("Vou deixar comentado pois pode usar depois"). Apague-as sem dó, o Histórico (VCS) os preservará na nuvem.
- Espalhar tags eternas de abandono do tipo: `/// TODO: Fazer tratamento de erro aqui numa versão futura`. Se é óbvio, implemente agora ou remova.

---

## Documentos de Contratos Abertos (API/Rotas)

Qualquer comunicação externa deve conter o Contrato (Schema) explicitado no código de fronteira (Swagger, Docstrings rígidas, Interfaces anotadas). A API é cega para o cliente visual. Liste firmemente, na porta de entrada da requisição:
1. Os Atributos exigidos para entrar.
2. O Formato explícito que a requisição obterá como reposta em sucesso.
3. Os códigos e mensagens literais que ela colherá em caso de falha estrutural (Não Autorizado / Validado / Rompido).

---

## A Fachada Global (READMEs Corporativos)

O README raiz não é um convite de festa. Ele é um manual de "Como reviver o paciente", contendo estritamente:

- O Resumo (O que o sistema entrega de valor no mundo real e qual a Stack escolhida).
- O Inicializador (Os exatos comandos imperiosos que levantam sua API, UI ou DB do lixo/zero até o funcionamento cravado na porta 8080 local caso o servidor queime).
- Os Scripts base (O que emito ou clico para disparar testes de CI/CD ou formatadores).
- Variáveis Mandatórias (Avisa se necessita de algum ambiente configurado oculto).

---

## A Memória Diária (Changelog)

Lançamentos de rotinas prontas geram histórico. Em entregas para a *Branch Principal* não se atenha ao código, traduza isso visualmente na raiz agrupando por Tópicos da Entrega (`Added/Fix/Changed/Removed`). Exemplo limpo de leitura para leigos:

```markdown
## [2.1.0] - 2026-XX-XX
### Adicionado
- Possibilidade de recuperar senhas pela confirmação de biometria (#4422).
### Removido
- Painel desatualizado legado de tabelas não relacionais, melhorando a velocidade de render em 15%.
```

---

## Anti-Padrões Punitivos (A Evitar)

- **A Síndrome de "O Código é auto documentado":** Acreditar que legibilidade fina explica o PORQUÊ as falhas forçaram aquele formato de função a viver com defeito até o momento X.
- **"Cobrarei a doc quando estiver pronto":** Arquiteturas expostas em ADRs antecipados nascem estáveis pela força de pensar atrelada à redação fria do projeto.
- **Projeto Refém do Desenvolvedor Único:** Necessita mandar mensagem para pessoas no intuito de subir ou inicializar servidores puramente porque a documentação carece de 12 minutos de polimento.
- **ADRs vazios ou omitindo "Limitações":** O pilar vital da documentação não é prometer sucesso, é pontuar por que as outras versões eram piores.

---

## Check de Sucesso do Documentador Inteligente

- [ ] Arquiteturas chave submetidas em ADRs novos apontando os contrapontos.
- [ ] Entradas ou Contratos (API/Classes abertas) descritas em comentários de bloco que orientações ou ferramentas abstraem em dicionários automáticos.
- [ ] Entender e acatar que TODOs vazios e blocos inoperantes comentados são poeira que deve ser deletada ativamente do ramo corrente.

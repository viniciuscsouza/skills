---
name: revisar
description: Realiza revisão de código (Code Review) multidimensional de alta qualidade. Use esta skill antes de aprovar modificações ou sempre que precisar garantir que o código submetido atende a requisitos de correção, legibilidade, arquitetura, segurança e desempenho.
---

# Revisão de Código e Qualidade

## Visão Geral

Toda modificação grande ou pequena passa por um processo de avaliação antes de ser mesclada na base principal. A revisão abrange cinco eixos: **correção**, **legibilidade**, **arquitetura**, **segurança** e **desempenho**.

**O Padrão de Aprovação**: Aprove a mudança quando ela **melhorar a saúde geral do código**, mesmo que não seja a sua versão "idela" ou perfeita. O objetivo das revisões é a melhoria contínua, não a utopia. Não bloqueie uma mudança apenas porque não faria exatamente daquela forma. Se resolve o problema e segue as convenções, aprove.

## Quando Usar

- Antes de mesclar modificações (Pull Requests/Merge Requests).
- Após completar uma feature para uma validação em retrospecto.
- Quando avaliar blocos de código propostos por humanos ou outras inteligências.
- Durante a limpeza ou refatoração.

## Os Cinco Eixos da Revisão

Cada revisão avalia o código sob estas lentes:

### 1. Correção (Correctness)
O código cumpre o que promete?
- Resolve completamente a especificação original da requisição?
- Os "Edge cases" (valores limites, nulos, vazios) são tratados devidamente?
- O caminho de erro é contemplado, ou foca apenas no cenário "Feliz"?
- Passa pelos testes? Condições de corrida estão minimizadas?

### 2. Legibilidade e Simplicidade
Qualquer mantenedor conseguirá entender sem explicações extensas do autor?
- Os nomes de variáveis e funções revelam seu intento (evitar termos genéricos e amplos)?
- O fluxo de execução é simples de acompanhar (pouco aninhamento)?
- Isso poderia ser feito usando muito menos linhas de código sem perder clareza?
- A abstração utilizada "pagou seu preço" de existir, ou foi construída pensando num futuro incerto?

### 3. Arquitetura
A alteração tem coesão com o projeto como um todo?
- Respeita os padrões adotados no projeto?
- O encapsulamento está respeitado em vez de acoplar serviços soltos?
- As dependências viajam na direção certa? (Ex: Camadas visuais dependem do domínio, não o contrário).
- Existe lógica repetida que já tenha uma função puramente feita para aquilo nativa do sistema?

### 4. Segurança
A mudança mantém o ecossistema confiável e protegido?
Consulte a diretriz detalhada: [Segurança e Resiliência](references/seguranca.md)

### 5. Desempenho (Performance)
A mudança causa impacto notável na fluidez ou sobrecarrega componentes?
Consulte a diretriz detalhada: [Otimização de Desempenho](references/desempenho.md)

## Dimensionamento de Mudanças

Mudanças curtas são infinitamente melhores de serem revisadas. Mire nas seguintes escalas:
- **~100 linhas**: Excelente, revisável em 1 sentada rápida.
- **~300 linhas**: Aceitável, se for estritamente do mesmo escopo lógico da tarefa.
- **~1000 linhas**: Grande demais. Sugira separação de escopos e divisão do envio.

## O Processo Prático de Revisão

**Passo 1: Entenda o Contexto.** O que essa requisição visa concluir? Existes evidências?
**Passo 2: Olhe os Testes.** Veja o que as especificações dizem, e verifique se as checagens são assertivas.
**Passo 3: Verifique o Funcionamento.** Avalie cada arquivo pelos cinco eixos.

**Passo 4: Categorize o Retorno.** Use prefixos ou formatações para que o autor da modificação saiba o quão obrigatório é seu descontentamento:
- **(Sem prefixo / Obrigatório):** Tem que ser consertado antes do merge.
- **Bloqueio/Crítico:** Falha crítica de sistema ou vulnerabilidade de segurança clara.
- **Sujestão / Opcional:** Traz melhorias, mas fica a critério do executor implementar agora ou depois.

## Higiene de Código Morto

Procure ativamente por variáveis não mais ativadas, rotas sem conexão com telas, componentes invisíveis, e pergunte se podem ser descartadas sem culpa.

## Sinais de Alerta (Red Flags) em Alterações
- Mudanças enviadas para aprovação sem um descritivo de "por quê?".
- Dependências novas trazidas sem uma pesquisa superficial.
- Retorno de revisor em tom vago, que apenas diz "Aprovado" ou "Falta arrumar" sem apontar especificamente a linha.
- Autor dizendo que "Essa falha a gente ajeita na próxima versão" (a hora de ajeitar o débito de estruturação é agora).

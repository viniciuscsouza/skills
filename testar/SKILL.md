---
name: testar
description: Guia o desenvolvimento orientado a testes (TDD). Use esta skill sempre que precisar implementar uma nova lógica, corrigir um bug complexo ou alterar um comportamento existente, garantindo que o código seja provado antes mesmo de ser entregue.
---

# Desenvolvimento Orientado a Testes (TDD)

## Visão Geral

Escreva um teste que falha antes de escrever o código que o faz passar. Para correções de bugs, reproduza primeiro o bug com um teste antes de tentar consertá-lo. Testes são provas matemáticas. "Parece que está funcionando" não significa que está finalizado. Uma base de código com bons testes é inviolável; uma base sem testes é uma bomba num futuro próximo.

## Quando Usar

- Ao implementar *qualquer* nova lógica ou comportamento não-trivial.
- Ao corrigir qualquer bug (Padrão: Prove Primeiro).
- Alterando comportamentos delicados na base.
- Adicionando tratamento a *Edge Cases* (casos limite de falha).

**Quando NÃO usar:** Ajustes cosméticos em tela, mudança estrita em arquivos de documentação, ou scripts de "run" no formato de pura configuração que não possuem lógica comportamental.

## O Ciclo Primário

```text
    VERMELHO                VERDE                   REFATORE
 Escreva o teste      Escreva o código          Limpe a sujeira 
    que falha     ──→    mínimo para      ──→    na implementação  ──→  (Repita)
       │                 fazer passar                  │
       ▼                     ▼                         ▼
  Teste QUEBRA         Teste PASSA               Tudo continua PASSANDO
```

### Passo 1: VERMELHO
Um teste que passa de primeira sem código escrito e funcional não testa nada. Crie o teste e comprove sua falha na tentativa de rodar.

### Passo 2: VERDE
Codifique focando somente naquilo que faça o terminal emitir o "PASS", sem excessos ou arquiteturas rebuscadas.

### Passo 3: REFATORAÇÃO
Com o seu "escudo" construído nos Passos 1 e 2, agora sim torne o código limpo, adicione as melhores arquiteturas e retire a repetição de lógicas, ciente de que qualquer tropeço, o teste gritará.

## O Padrão: "Prove" (Correção de Bugs)

Se um bug foi reportado, **não** tente abrir o código fonte para arrumar.
1. O bug foi encontrado, receba a requisição.
2. Escreva um teste que consiga forçar e executar exatamente aquele erro.
3. O Teste falhou? Parabéns, bug confirmado.
4. Agora repare o código alvo.
5. O Teste passou? O Reparo está imortalizado. 

Nunca mais este mesmo bug voltará ao sistema inadvertidamente.

## A Pirâmide de Testes

Priorize esforço seguindo camadas.
- **Acima - Testes E2E (~5%):** Fluxos inteiros de usuário como login real em navegadores. (Grandes, demorados).
- **Meio - Integração (~15%):** Consumo entre limites como Sistema vs Banco de Dados ou Consumo de API externa. (Médios).
- **Base - Unidade (~80%):** A pura lógica encapsulada. Um "if", um "loop", uma checagem. Deve ser a esmagadora maioria. Executam em milisegundos. (Pequenos).

Se cruzar via rede, sistema de arquivos ou banco de dados vira integração, deixe eles apenas para casos onde os serviços dependentes sejam imprescindíveis de testar em conluio. Privilegie testes unitários massivos sob a regra base do negócio em si.

## Escrevendo Bons Testes

### Teste Estados finais, não os caminhos internos.
Alerte sobre o **quê** a função retorna, não sobre **como** ela faz. Testes que tentam "Adivinhar" que o método interno A conectou no array Z para retornar o loop quebram a cada refatoração por nada. Verifique o input e o output.

### Clareza é melhor que Desacoplamento cego nos Testes.
No código final usamos DRY (Não repita a ti mesmo). Mas em arquivos de teste, é preferível pecar duplicando algumas instâncias para garantir que o Teste se conte em forma de "Estória Independente" com um contexto altamente descritivo.

### AAA (Preparar, Executar, Avaliar)
Siga o padrão canônico para ler os testes de modo limpo:
1. **Arrange (Prepare):** Insira os dados fakes, declare o tempo, instancione o serviço.
2. **Act (Aja):** Dispare o único método que está em foco de teste.
3. **Assert (Avalie):** Meça a igualdade e veracidade do retorno.

### Um Teste = Um Conceito Funcional
Não adicione dez checagens aleatórias num pacote só num fluxo massivo testado por assertiva de nome vago (Ex:`"teste form"`). 
Adeque para multiplos mini-testes:
- `"rejeita campo título sem informação"`
- `"limpa acentos do título antes de persistir"`
- `"limita os caracteres do tipo ao limite estipulado"`

## Sinais de Alerta (O que impedir / Red Flags)

- Escrever dezenas de linhas de código produtivo pensando em testá-los "depois do turno".
- Testar bibliotecas/ferramentas ou *frameworks* de terceiros que já vêm testáveis intrinsecamente ao envés de testar a base local.
- Adotar "Mocks" generalizados no sistema, escondendo falhas reais pelo abafamento via bibliotecas injetores de "Falsos Positivos". Onde não for gargalo lento ou conexão perigosa de terceiros, use instâncias verdadeiras para testes verídicos.
- Pular (skip) um teste problemático "rapidamente pra ir pra produção com build". Testes falhando denunciam incêndios, não os rebaixe na prioridade.

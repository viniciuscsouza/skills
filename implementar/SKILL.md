---
name: implementar
description: Conduz o desenvolvimento de features ou grandes modificações de código de forma incremental e segura. Use esta skill sempre que o usuário pedir para implementar uma funcionalidade, corrigir um bug complexo, refatorar código, ou quando a tarefa exigir a escrita de muita lógica ou modificações em vários arquivos.
---

# Implementação Incremental

## Visão Geral

Desenvolva em fatias finas (vertical slices) — implemente uma pequena peça, verifique se funciona, e só então expanda. Evite implementar uma funcionalidade inteira de uma só vez. Cada incremento deve deixar o sistema em um estado funcional e testável. Esta é a disciplina de execução que torna o desenvolvimento de funcionalidades grandes algo seguro e gerenciável.

## Quando Usar

- Ao implementar alterações que tocam múltiplos arquivos ou têm várias etapas lógicas.
- Ao construir uma nova funcionalidade a partir de um planejamento.
- Ao refatorar código existente.
- Toda vez que a tarefa for complexa o suficiente para quebrar algo caso seja feita em uma única tentativa.

**Quando NÃO usar:** Alterações triviais de um único arquivo ou de poucas linhas onde o escopo já é mínimo.

## O Ciclo Incremental

```
┌───────────────────────────────────────────────┐
│                                               │
│   Implementar ──→ Verificar ──→ Confirmar ──┐ │
│       ▲                                     │ │
│       └────────── Próxima fatia ◄───────────┘ │
│                                               │
└───────────────────────────────────────────────┘
```

Para cada fatia (slice):

1. **Implementar**: Escreva a menor peça completa de código que cumpra parte do objetivo.
2. **Verificar**: Confirme se a nova funcionalidade opera como esperado (compile, execute testes se houver, ou apenas cheque a lógica).
3. **Confirmar (Commit)**: Salve seu progresso antes de seguir em frente, para poder reverter rapidamente caso a próxima mudança falhe. (Consulte o [Padrão de Versionamento](references/versionamento.md) para diretrizes de commits frequentes e mensagens limpas).
4. **Mover para a próxima fatia**: Siga em frente construindo sobre uma base estável, sem precisar recomeçar do zero.

## Estratégias de Fatiamento

### Fatias Verticais (Preferencial)

Construa um caminho completo e funcional em vez de camadas isoladas:

```
Fatia 1: Criar a lógica principal e salvar localmente
    → Verificado
Fatia 2: Adicionar uma interface ou saída simples para o usuário
    → Verificado
Fatia 3: Implementar tratamento de erros e refinamentos
    → Verificado
```

O objetivo é que, a cada fatia, a funcionalidade entregue algo que possa ser testado de ponta a ponta, mesmo que de forma rudimentar.

### Foco no Maior Risco Primeiro

Aborde a parte mais incerta da modificação logo no início:

```
Fatia 1: Provar que a conexão/integração com um serviço externo funciona (maior risco).
Fatia 2: Construir a lógica da aplicação que usa essa conexão.
Fatia 3: Adicionar fluxo de exceções e otimizações.
```

Se a Fatia 1 falhar, você descobre o erro estrutural antes de investir tempo nas outras etapas.

## Regras de Implementação

### Regra 0: Simplicidade Primeiro

Antes de escrever qualquer código, pergunte-se: "Qual é a coisa mais simples que poderia funcionar?"

Evite abstrações prematuras. Crie códigos fáceis de ler, com foco em resolver o problema atual, não problemas hipotéticos do futuro.

### Regra 0.5: Disciplina de Escopo

Toque apenas no que a tarefa exige.

**NÃO FAÇA:**
- "Limpar" ou refatorar código adjacente que não interfere na sua tarefa.
- Atualizar versões, alterar convenções de projeto ou remover comentários antigos, a menos que seja explicitamente solicitado.
- Adicionar funcionalidades extras que "parecem úteis" mas não estão no planejamento principal.

Se notar algo que vale a pena melhorar e está fora do escopo, avise o usuário e continue com a sua tarefa original.

### Regra 1: Uma Coisa de Cada Vez

Cada incremento ou mudança deve ter um foco lógico claro. Não misture duas lógicas complexas ou grandes modificações de diferentes naturezas na mesma iteração.

### Regra 2: Mantenha o Projeto Funcionando

O sistema nunca deve ficar quebrado entre incrementos. Ao final de uma fatia, toda a aplicação deve ainda ser capaz de compilar/rodar normalmente.

### Regra 3: Reversão Fácil

Cada incremento deve ser facilmente reversível caso o usuário decida voltar atrás:
- Alterações aditivas (novos arquivos/funções) são mais seguras.
- Evite apagar e reescrever grandes blocos de lógica antiga sem primeiro garantir que o novo formato funciona bem.

## Trabalhando de Forma Orquestrada

Ao executar tarefas, seja claro a respeito de **qual passo** está sendo implementado. Avise sempre sobre qual é o estado atual das modificações:

```
"Vou implementar esta feature de forma incremental.
Na primeira etapa, vou criar apenas a modelagem inicial de dados. 
Não mexerei na interface de usuário ainda.
Depois de fazer essa primeira implementação, vou verificar se a base continua funcional antes de prosseguirmos."
```

## Anti-Padrões de Execução (O que evitar)

- Alterar ou adicionar grandes quantidades de código de uma só vez sem pausa para verificação.
- Misturar correções de bugs, refatoração de código antigo e construção da feature atual na mesma leva.
- Expandir o escopo dizendo "Ah, já vou aproveitar para fazer isso também".
- Assumir que é "mais rápido" fazer tudo antes de verificar a integração de cada etapa.

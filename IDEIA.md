# Visão Geral

Esse é um sistema SDD (Spec Driven Development) desenvolvido para guiar o usuário durante todo o processo de desenvolvimento de software. O Agente de IA deve atuar de forma ativa transferindo a carga cognitiva do usuário para a máquina.
No mundo real não podemos esperar que um usuário forneça uma especificação técnica perfeita, então o agente de IA deve ser capaz de extrair a especificação técnica do usuário através de perguntas e respostas. A construção de especificações técnicas perfeitas é a base sólida de todo o desenvolvimento de software.

## Como desenvolver uma especificação técnica perfeita?

É necessário primeiro entender o que o usuário quer e descobrir o que o usuário ainda não sabe que quer (Unknown Unknowns). Portanto a ideia inicial precisa ser refinada, todas as lacunas e pontos cegos precisam ser clarificados. Nessa etapa a skill `refinar` deve ser utilizada. A saída deve ser um arquivo `.md` na pasta `docs/ideas` com o nome da ideia.

Agora que temos insumos suficientes para definir o que fazer e como fazer, podemos partir para a construção da especificação técnica usando a skill `especificar`.

## Regras
- Todos os scripts devem ser escritos na linguagem JavaScript com a extensão `.cjs`.
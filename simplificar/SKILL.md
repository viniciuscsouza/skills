---
name: simplificar
description: >
  Simplifica código para clareza e manutenibilidade. Use ao refatorar código para torná-lo mais
  legível sem alterar comportamento. Use quando o código funciona mas está mais difícil de ler,
  manter ou estender do que deveria. Use ao revisar código que acumulou complexidade desnecessária.
  Acione com "simplificar", "simplificar código", "limpar esse código", "refatorar para clareza",
  "melhorar legibilidade", "reduzir complexidade", ou quando perceber código confuso, funções
  longas, nomes genéricos, lógica duplicada ou aninhamento excessivo.
---

# Simplificar Código

## Visão Geral

Simplifique código reduzindo complexidade enquanto preserva o comportamento exato. O objetivo não é menos linhas — é código mais fácil de ler, entender, modificar e depurar. Cada simplificação deve passar em um teste simples: "Um membro novo do time entenderia isso mais rápido do que o original?"

## Quando Usar

- Depois que uma feature funciona e os testes passam, mas a implementação parece mais pesada do que precisa ser
- Durante revisão de código quando problemas de legibilidade ou complexidade são identificados
- Ao encontrar lógica profundamente aninhada, funções longas ou nomes pouco claros
- Ao refatorar código escrito sob pressão de tempo
- Ao consolidar lógica relacionada espalhada por vários arquivos
- Depois de merges que introduziram duplicação ou inconsistência

**Quando NÃO usar:**

- O código já é limpo e legível — não simplifique por simplificar
- Você ainda não entende o que o código faz — compreenda antes de simplificar
- O código é crítico em desempenho e a versão "mais simples" seria mensuravelmente mais lenta
- Você vai reescrever o módulo inteiro — simplificar código descartável desperdiça esforço

## Os Cinco Princípios

### 1. Preserve o Comportamento Exatamente

Não mude o que o código faz — apenas como ele expressa isso. Todas as entradas, saídas, efeitos colaterais, comportamento de erro e casos limite devem permanecer idênticos. Se não tem certeza de que uma simplificação preserva o comportamento, não a faça.

```
PERGUNTE ANTES DE CADA MUDANÇA:
→ Isso produz a mesma saída para cada entrada possível?
→ Isso mantém o mesmo comportamento de erro?
→ Isso preserva os mesmos efeitos colaterais e ordenação?
→ Todos os testes existentes continuam passando sem modificação?
```

### 2. Siga as Convenções do Projeto

Simplificar significa tornar o código mais consistente com o codebase, não impor preferências externas. Antes de simplificar:

```
1. Leia as convenções do projeto (CLAUDE.md, AGENTS.md, CONTRIBUTING.md)
2. Estude como o código vizinho lida com padrões similares
3. Adapte o estilo do projeto para:
   - Ordenação de imports e sistema de módulos
   - Estilo de declaração de funções
   - Convenções de nomenclatura
   - Padrões de tratamento de erros
   - Profundidade de anotações de tipo
```

Simplificação que quebra a consistência do projeto não é simplificação — é ruído.

### 3. Prefira Clareza a Esperteza

Código explícito é melhor que código compacto quando a versão compacta exige uma pausa mental para entender.

```
// ESCURO: Cadeia de ternários densa
status = novo ? "Novo" : atualizado ? "Atualizado" : arquivado ? "Arquivado" : "Ativo"

// CLARO: Mapeamento legível
se (item.ehNovo) retorne "Novo"
se (item.ehAtualizado) retorne "Atualizado"
se (item.ehArquivado) retorne "Arquivado"
retorne "Ativo"
```

```
// ESCURO: Lógica inline com operação de redução encadeada
resultado = itens.reduzir((acc, item) => ({
  ...acc,
  [item.id]: { ...acc[item.id], contagem: (acc[item.id]?.contagem ?? 0) + 1 }
}), {})

// CLARO: Etapa intermediária nomeada
contagemPorId = novo Mapa()
para cada (item em itens) {
  contagemPorId.definir(item.id, (contagemPorId.obter(item.id) ?? 0) + 1)
}
```

### 4. Mantenha o Equilíbrio

Simplificação tem um modo de falha: super-simplificação. Fique atento a estas armadilhas:

- **Inlining agressivo demais** — remover uma função auxiliar que dava nome a um conceito torna o ponto de chamada mais difícil de ler
- **Combinar lógica não relacionada** — duas funções simples fundidas em uma função complexa não é mais simples
- **Remover abstração "desnecessária"** — algumas abstrações existem para extensibilidade ou testabilidade, não por complexidade
- **Otimizar para contagem de linhas** — menos linhas não é o objetivo; compreensão mais fácil é

### 5. Limite ao Que Mudou

Por padrão, simplifique código modificado recentemente. Evite refatorações não solicitadas de código não relacionado. Simplificação sem escopo cria ruído nos diffs e riscos de regressões não intencionais.

## O Processo de Simplificação

### Passo 1: Entenda Antes de Tocar (A Cerca de Chesterton)

Antes de mudar ou remover qualquer coisa, entenda por que ela existe. Esta é a Cerca de Chesterton: se você vê uma cerca no meio de uma estrada e não entende por que está lá, não a derrube. Primeiro entenda o motivo, depois decida se o motivo ainda se aplica.

```
ANTES DE SIMPLIFICAR, RESPONDA:
- Qual é a responsabilidade deste código?
- Quem o chama? Quem ele chama?
- Quais são os casos limite e caminhos de erro?
- Existem testes que definem o comportamento esperado?
- Por que pode ter sido escrito assim? (Desempenho? Restrição de plataforma? Razão histórica?)
- Consulte o histórico de mudanças: qual era o contexto original?
```

Se não consegue responder a essas perguntas, não está pronto para simplificar. Leia mais contexto primeiro.

### Passo 2: Identifique Oportunidades de Simplificação

Procure por estes padrões — cada um é um sinal concreto, não um "cheiro" vago:

**Complexidade estrutural:**

| Padrão | Sinal | Simplificação |
|--------|-------|---------------|
| Aninhamento profundo (3+ níveis) | Difícil seguir o fluxo de controle | Extraia condições em guard clauses ou funções auxiliares |
| Funções longas (50+ linhas) | Múltiplas responsabilidades | Divida em funções focadas com nomes descritivos |
| Ternários aninhados | Exige pilha mental para interpretar | Substitua por cadeias if/else, switch ou objetos de consulta |
| Flags booleanas como parâmetro | `fazerAlgo(verdadeiro, falso, verdadeiro)` | Substitua por objetos de opções ou funções separadas |
| Condicionais repetidas | Mesma verificação `if` em vários lugares | Extraia para uma função predicado com nome claro |

**Nomenclatura e legibilidade:**

| Padrão | Sinal | Simplificação |
|--------|-------|---------------|
| Nomes genéricos | `dados`, `resultado`, `temp`, `val`, `item` | Renomeie para descrever o conteúdo: `perfilUsuario`, `errosValidacao` |
| Nomes abreviados | `usr`, `cfg`, `btn`, `evt` | Use palavras completas, exceto abreviações universais (`id`, `url`, `api`) |
| Nomes enganosos | Função chamada `obter` que também muta estado | Renomeie para refletir o comportamento real |
| Comentários explicando "o quê" | `// incrementa contador` acima de `contador++` | Delete o comentário — o código já é claro |
| Comentários explicando "por quê" | `// Retenta porque a API é instável sob carga` | Mantenha — carregam intenção que o código não expressa |

**Redundância:**

| Padrão | Sinal | Simplificação |
|--------|-------|---------------|
| Lógica duplicada | Mesmas 5+ linhas em vários lugares | Extraia para uma função compartilhada |
| Código morto | Ramos inalcançáveis, variáveis não usadas, blocos comentados | Remova (após confirmar que está realmente morto) |
| Abstrações desnecessárias | Wrapper que não agrega valor | Inline o wrapper, chame a função subjacente diretamente |
| Padrões superengenheirados | Factory-de-uma-factory, estratégia-com-uma-estratégia | Substitua pela abordagem direta e simples |
| Asserções de tipo redundantes | Casting para tipo já inferido | Remova a asserção |

### Passo 3: Aplique Mudanças Incrementalmente

Faça uma simplificação por vez. Execute os testes após cada mudança. **Submeta mudanças de refatoração separadamente de mudanças de feature ou correção de bug.** Um PR que refatora e adiciona uma feature são dois PRs — separe-os.

```
PARA CADA SIMPLIFICAÇÃO:
1. Faça a mudança
2. Execute a suíte de testes
3. Se os testes passam → confirme (ou continue para a próxima simplificação)
4. Se os testes falham → reverta e reconsidere
```

Evite agrupar múltiplas simplificações em uma única mudança não testada. Se algo quebrar, você precisa saber qual simplificação causou.

**A Regra das 500 Linhas:** Se uma refatoração tocar mais de 500 linhas, invista em automação (codemods, scripts de transformação, AST) em vez de fazer as mudanças à mão. Edições manuais nessa escala são propensas a erro e exaustivas de revisar.

### Passo 4: Verifique o Resultado

Após todas as simplificações, dê um passo atrás e avalie o conjunto:

```
COMPARE ANTES E DEPOIS:
- A versão simplificada é genuinamente mais fácil de entender?
- Você introduziu padrões novos inconsistentes com o codebase?
- O diff está limpo e revisável?
- Um colega aprovaria essa mudança?
```

Se a versão "simplificada" é mais difícil de entender ou revisar, reverta. Nem toda tentativa de simplificação succeeds.

## Exemplos de Simplificação

### Função com Wrapper Desnecessário

```
// Antes
função assíncrona buscarUsuario(id):
  retorne espere serviçoUsuario.buscarPorId(id)

// Depois
função buscarUsuario(id):
  retorne serviçoUsuario.buscarPorId(id)
```

### Atribuição Condicional Verbosa

```
// Antes
var nomeExibicao
se (usuario.apelido) {
  nomeExibicao = usuario.apelido
} senão {
  nomeExibicao = usuario.nomeCompleto
}

// Depois
const nomeExibicao = usuario.apelido ou usuario.nomeCompleto
```

### Construção Manual de Lista

```
// Antes
usuariosAtivos = lista vazia
para cada (usuario em usuarios) {
  se (usuario.estaAtivo) {
    usuariosAtivos.adicionar(usuario)
  }
}

// Depois
usuariosAtivos = usuarios.filtrar(usuario => usuario.estaAtivo)
```

### Retorno Booleano Redundante

```
// Antes
função ehValido(texto): booleano
  se (texto.tamanho > 0 e texto.tamanho < 100) {
    retorne verdadeiro
  }
  retorne falso

// Depois
função ehValido(texto): booleano
  retorne texto.tamanho > 0 e texto.tamanho < 100
```

### Condicionais Aninhados com Retorno Antecipado

```
// Antes
função processar(dados):
  se (dados não é nulo) {
    se (dados.ehValido()) {
      se (dados.temPermissao()) {
        retorne executarTrabalho(dados)
      } senão {
        lance ErroPermissao("Sem permissão")
      }
    } senão {
      lance ErroValor("Dados inválidos")
    }
  } senão {
    lance ErroTipo("Dados são nulos")
  }

// Depois
função processar(dados):
  se (dados é nulo) lance ErroTipo("Dados são nulos")
  se (não dados.ehValido()) lance ErroValor("Dados inválidos")
  se (não dados.temPermissao()) lance ErroPermissao("Sem permissão")
  retorne executarTrabalho(dados)
```

### Renderização Condicional Verbosa (Componentes de UI)

```
// Antes
função DistintivoUsuario(usuario):
  se (usuario.ehAdmin) {
    retorne Distintivo(variante="admin", texto="Admin")
  } senão {
    retorne Distintivo(variante="padrao", texto="Usuário")
  }

// Depois
função DistintivoUsuario(usuario):
  variante = usuario.ehAdmin ? "admin" : "padrao"
  texto = usuario.ehAdmin ? "Admin" : "Usuário"
  retorne Distintivo(variante=variante, texto=texto)
```

## Racionalizações Comuns

| Racionalização | Realidade |
|---|---|
| "Está funcionando, não precisa mexer" | Código funcional mas difícil de ler será difícil de consertar quando quebrar. Simplificar agora economiza tempo em cada mudança futura. |
| "Menos linhas é sempre mais simples" | Um ternário aninhado de 1 linha não é mais simples que um if/else de 5 linhas. Simplicidade é sobre velocidade de compreensão, não contagem de linhas. |
| "Vou simplificar rapidamente esse código não relacionado também" | Simplificação sem escopo cria diffs ruidosos e riscos de regressão em código que não pretendia mudar. Mantenha o foco. |
| "Os tipos tornam o código auto-documentado" | Tipos documentam estrutura, não intenção. Uma função bem nomeada explica *por quê* melhor que uma assinatura de tipo explica *o quê*. |
| "Essa abstração pode ser útil depois" | Não preserve abstrações especulativas. Se não é usada agora, é complexidade sem valor. Remova e readicione quando necessário. |
| "O autor original deve ter tido um motivo" | Talvez. Consulte o histórico — aplique a Cerca de Chesterton. Mas complexidade acumulada frequentemente não tem motivo; é apenas o resíduo de iteração sob pressão. |
| "Vou refatorar enquanto adiciono essa feature" | Separe refatoração de trabalho de feature. Mudanças mistas são mais difíceis de revisar, reverter e entender no histórico. |

## Bandeiras Vermelhas

- Simplificação que exige modificar testes para passar (provavelmente mudou o comportamento)
- Código "simplificado" que é mais longo e difícil de seguir que o original
- Renomear coisas para combinar com suas preferências em vez das convenções do projeto
- Remover tratamento de erros porque "torna o código mais limpo"
- Simplificar código que não entende completamente
- Agrupar muitas simplificações em um commit grande e difícil de revisar
- Refatorar código fora do escopo da tarefa atual sem ser solicitado

## Verificação

Após completar uma passagem de simplificação:

- [ ] Todos os testes existentes passam sem modificação
- [ ] Build/sucesso de compilação sem novos avisos
- [ ] Linter/formatador passa (sem regressões de estilo)
- [ ] Cada simplificação é uma mudança incremental e revisável
- [ ] O diff está limpo — sem mudanças não relacionadas misturadas
- [ ] Código simplificado segue as convenções do projeto
- [ ] Nenhum tratamento de erro foi removido ou enfraquecido
- [ ] Nenhum código morto foi deixado para trás (imports não usados, ramos inalcançáveis)
- [ ] Um colega ou revisor aprovaria a mudança como uma melhoria líquida

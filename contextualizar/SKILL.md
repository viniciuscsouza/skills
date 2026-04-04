---
name: contextualizar
description: Otimiza a engenharia de contexto do agente de inteligência artificial. Use esta skill para configurar o modelo mental do agente, prevenir degradação de respostas, organizar as referências passadas ou lidar com mudanças drásticas no escopo de trabalho.
---

# Contextualizar (Engenharia de Contexto)

## Visão Geral

Alimente seu agente e equipe com a informação certa, no momento exato. O contexto compreendido é a maior e mais poderosa alavanca para a qualidade do que é produzido pelo LLM — pouca informação faz o assistente alucinar/inventar, muita informação embaralha o raciocínio. "Contextualizar", ou fazer Engenharia de Contexto, é a prática de **curar deliberadamente o que a máquina vê, quando vê, e qual recorte de mundo possui**.

## Quando Usar

- Início de trabalho em nova arquitetura ou sessão no dia.
- Quando as qualidades das respostas começarem a cair (adivinhando dependências, ignorando ordens, usando lógicas já descartadas).
- Troca de ramo na arquitetura (Saindo do painel visual indo para configurações em banco de dados).
- O agente IA frequentemente se esquece das convenções predefinidas.

## A Hierarquia da Memória Estruturada

Formule a mente do assistente do mais duradouro ao mais rápido e volátil:

```text
┌───────────────────────────────────────────────┐
│  1. Arquivos de Regras (Instruções do Sistema)│ ← Sempre carregado base global
├───────────────────────────────────────────────┤
│  2. Specs e Documentos de Arquitetura         │ ← Carregado por Funcionalidade
├───────────────────────────────────────────────┤
│  3. Arquivos Fonte/Código Relevados           │ ← Fornecidos para a Tarefa
├───────────────────────────────────────────────┤
│  4. Resultados da Execução / Erros e Logs     │ ← Carregado na iteração
├───────────────────────────────────────────────┤
│  5. Histórico da Conversação atual            │ ← Acumula, precisa condensar
└───────────────────────────────────────────────┘
```

### Nível 1: Diretrizes de Sistema (Rules Files)
Tenha sempre disponível os combinados (O seu "Stack", os comandos do sistema, o padrão de nomes/variáveis/pastas). Evite que o agente deduza e ensine-o como o projeto respira. Ex: `"Sempre adote injeção de dependências", "Nunca acesse o DB na controladora"`.

### Nível 2: Especificações Parciais
Só entregue e alimente a especificação da tarefa que for desenvolver agora.
**Bom:** *"Leia as diretrizes na pasta Auth pois farei login"*.
**Ruim:** *"Carregue toda a documentação de infra + o banco de dados"* sendo que você fará apenas botões de tela de login.

### Nível 3: Padrões Observáveis
Se for modificar um padrão, apresente sempre ao assistente um exemplo vivo de que você espera. Modelos de IA performam melhor com "Exemplos" (Few-Shot) do que com regras discursadas soltas.

### Nível 4: Recortes de Log
Se estourou erro testando a funcionalidade de um método que faliu, copie o trace exato em direção ao erro. O resto da saída que informava o que passou e tudo perfeitamente limpo sobrecarrega o chat sem valor.

### Nível 5: A Rotatividade (Limpar Histórico)
Ao terminar tarefas complexas num chat massivo, pare. Peça um resumo do estado recém modificado ou feche a conversação. Chats extensos demais emburrecem modelos, confundido o passado já obsoleto com o estado limpo do presente.

## Estratégias de Empacotamento  (Selective Include)

O padrão fundamental: Forneça só os vizinhos essenciais para a tarefa atual.

```text
TAREFA: "Fazer o componente ler os dados externos".
O que preciso fornecer agorat?
 - A estrutura das informações.
 - O arquivo do serviço de interface visual.
 - APENAS um exemplo anterior de algo parecido no sistema.

CONDIÇÃO:
  - Não me traga as bibliotecas em versões diferentes da citada neste ambiente.
```

## Tratamento de Ambiguidade

Se as diretrizes mandam usar padrão V2, mas os arquivos observados no sistema real ainda utilizam padrão legado V1. O Agente **não deve assumir** silenciosamente qual irá usar ou forçar um estilo que cause um conflito doloroso no projeto sem avisar!

1. Eleve a indecisão (Confusion Management): Pare e evidencie o bloqueio.
2. Formule opções: "Opção A: Manter como legado para padronização global. Opção B: Mudar para V2 e quebrar as outras dependências gradualmente".
3. Aguarde o comando de confirmação.

## Planejamento Rápido em Tarefas Multi-etapas

Para evitar código massivo gerado na via ou lógica errada, sempre planeje as etapas abertamente e verifique com o humano (Se as etapas passarem de 3 iterações complexas de execução):

```text
Entendi sua requisição. O Plano simplificado será:
 1. Corrigir o arquivo gerador de entrada para suportar novos dados.
 2. Criar um testador pro retorno.
 3. Integrar com o renderizador global.
 
> Sigo em frente e executo tudo de uma vez?
```

Isso resgata horas de reescrever código gerado erroneamente caso já houvesse uma rota no passo 1 divergente do escopo da plataforma ou se o humano precisava avisar de outro padrão.

## Sinais de Alerta e Anti-Padrões (Red Flags)

- **Inundar com Contexto (Context Flooding):** Abrir abas com 50 arquivos no chat julgando que "ele lê". O limite de tokens pode até engolir, mas o poder resolutivo linear (Atenção do Modelo) não equivale a focar com as 2 páginas corretas na mão da IA. A cura e eliminação é ouro.
- **Fome de Contexto:** Tentar fazer a IA consertar uma lógica isolada enviando apenas a mensagem "Por que quebrou este script?", e zero código ou versão de ambiente enviada na mensagem.
- **Conhecimento Implícito:** A regra está "no pensamento da equipe" e não nas diretrizes ou no log. O que não é explicitado, não existe num bot. 
- **Represamento Silencioso:** Quando a documentação está vaga de requerimentos e o agente inventa por conta em vez de pausar a operação e pedir balizamento.

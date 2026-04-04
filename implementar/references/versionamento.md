# Padrões de Versionamento e Fluxo de Trabalho

Estas são as diretrizes de versionamento para garantir o desenvolvimento seguro e a fácil reversão de erros.

## 1. Commits Frequentes (Commit Early, Commit Often)

Cada incremento bem-sucedido recebe seu próprio commit. Não acumule grandes mudanças soltas.

```text
Padrão de trabalho:
Implementar fatia → Verificar → Confirmar (Commit) → Próxima fatia

Não faça isso:
Implementar tudo → Torcer para funcionar → Commit gigante
```

Commits são seus "save points" (pontos de salvamento). Se a próxima mudança quebrar algo, você pode reverter para o último estado funcional instantaneamente.

## 2. Commits Atômicos

Cada commit faz apenas uma coisa em termos lógicos:

```text
# Bom: Cada commit é autocontido
git log --oneline
a1b2c3d Adiciona endpoint de criação de tarefa com validação
d4e5f6g Adiciona componente visual do formulário de tarefas
h7i8j9k Conecta formulário à API e adiciona estado de loading
m1n2o3p Adiciona testes de criação de tarefas

# Ruim: Tudo misturado
git log --oneline
x1y2z3a Adiciona feature de tarefas, corrige sidebar, atualiza dependências e refatora utils
```

## 3. Mensagens Descritivas

As mensagens de commit explicam o *porquê*, não apenas o *quê*:

```text
# Bom: Explica a intenção
feat: adiciona validação de email no endpoint de registro

Impede que formatos de email inválidos cheguem ao banco de dados.
Usa validação de esquema no nível da rota, consistente com auth.

# Ruim: Descreve apenas o que é óbvio no diff
atualiza auth.ts
```

**Formato:**
```text
<tipo>: <descrição curta>

<corpo opcional explicando o porquê, não o quê>
```

**Tipos:**
- `feat` — Nova funcionalidade
- `fix` — Correção de bug
- `refactor` — Alteração de código que não corrige bugs nem adiciona funcionalidades
- `test` — Adição ou atualização de testes
- `docs` — Apenas documentação
- `chore` — Ferramentas auxiliares, dependências, configuração

## 4. Separe os Contextos (Concerns)

Não misture mudanças de formatação com mudanças de comportamento. Não misture refatorações com novas funcionalidades. Cada tipo de mudança deve ser um commit separado:

```bash
# Bom: Preocupações separadas
git commit -m "refactor: extrai lógica de validação para utility"
git commit -m "feat: adiciona campo de telefone no registro"

# Ruim: Preocupações misturadas
git commit -m "refatora validação e adiciona campo de telefone"
```

## 5. Dimensione suas Mudanças

Mire em alterações de cerca de 100 linhas por commit. Alterações muito grandes (ex: 1000 linhas) devem ser divididas para falicitar a revisão e revesão.

## O Padrão de Ponto de Salvamento (Save Point)

```text
Agente começa o trabalho
    │
    ├── Faz uma alteração
    │   ├── Verificaçao OK? → Commit → Continua
    │   └── Verificação Falhou? → Reverte para o último commit → Investiga
    │
    ├── Faz outra alteração
    │   ├── Verificação OK? → Commit → Continua
    │   └── Verificação Falhou? → Reverte para o último commit → Investiga
    │
    └── Feature completa → Todos os commits formam um histórico limpo
```

Esse padrão significa que você nunca perde mais do que o trabalho de uma única fatia. Se o caminho adotado não der certo, um simples `git reset --hard HEAD` leva você de volta ao último estado seguro.

## Resumos de Alterações (Change Summaries)

Após modificar o código, forneça um resumo estruturado. Isso deixa claro o escopo:

```text
ALTERAÇÕES REALIZADAS:
- src/routes/tasks.ts: Adicionado middleware de validação
- src/lib/validation.ts: Esquema de tarefas

O QUE NÃO FOI TOCADO (intencionalmente):
- src/routes/auth.ts: Tem falha de validação similar, mas está fora do escopo

PREOCUPAÇÕES POTENCIAIS:
- O novo esquema é estrito e rejeita campos extras.
```

O bloco "NÃO FOI TOCADO" é crucial: mostra que você teve disciplina de escopo e não saiu modificando a aplicação por iniciativa própria sem planejamento.

## Higiene Pré-Commit

Antes de cada commit verifique se algo indesejado subiu na alteração:
- Revise o `git diff --staged`
- Certifique-se de que não vazou nenhuma credencial (senha, chaves, tokens).

## Lidando com Arquivos Gerados

- Faça o commit se o tipo de arquivo gerado for esperado (ex. `.lock`, migrações de DB).
- **Não commite** pastas de build (`dist/`, `.next/`), arquivos de ambiente (`.env`) ou configurações de sua IDE pessoal.
- Tenha sempre um arquivo `.gitignore` logo no início, incluindo: `node_modules/`, `dist/`, arquivos `.env` e certificados (`*.pem`).

## Usando o Git para Depuração

```bash
# O que mudou recentemente
git diff HEAD~5..HEAD -- src/

# Quem mudou uma linha específica por último
git blame src/services/task.ts

# Buscar em mensagens de commit por uma palavra chave
git log --grep="validação" --oneline
```

## Racionalizações Comuns

| A Desculpa | A Realidade |
|---|---|
| "Vou fazer o commit quando a feature estiver pronta" | Um commit gigantesco é impossível de revisar ou reverter adequadamente. Commite por fatias. |
| "A mensagem não importa" | Mensagens são documentação base. Futuros desenvolvedores (ou você mesmo e os agentes AI) precisam dela. |
| "Ajusto isso tudo no final com um squash" | Squashes destroem o histórico e a narrativa da evolução do código. Construa commits pequenos e claros desde o início. |

## Sinais de Alerta (Red Flags)

- Grande acumulo de mudanças não commitadas (`uncommitted changes`).
- Mensagens superficiais como "fix", "update", "misc".
- Falta de `.gitignore`.
- Subir a pasta `node_modules`, `.env`, ou artefatos gerados pelo build pro repositório.

## Verificação

Para cada commit certifique-se:
- [ ] O commit trata de uma única coisa lógica (Atômico)
- [ ] A mensagem segue as convenções e explica o *porquê*
- [ ] O código foi verificado/testado antes do commit
- [ ] Nenhum segredo credencial vazou pro diff
- [ ] O `.gitignore` cobre de forma correta as extensões ignoradas.

# Templates de Documentação — AI-Driven

Templates prontos para inicializar a pasta `/docs` de um novo projeto.
Copie e adapte conforme necessário.

---

## Índice

1. [context.json](#1-contextjson)
2. [00-visao.md](#2-00-visaomd)
3. [Funcionalidades](#3-funcionalidadesmd)
4. [Blueprint](#4-blueprintmd)
5. [Decisões](#5-decisoesmd)
6. [Plano de Voo](#6-plano-de-voomd)
7. [Aprendizados](#7-aprendizadosmd)
8. [Guia Operacional](#8-guia-operacionalmd)

---

## 1. context.json

Local: `/docs/context.json`

```json
{
  "projeto": "NOME_DO_PROJETO",
  "versao_workflow": "1.0",
  "data_inicio": "YYYY-MM-DD",
  "fase_atual": 1,
  "status_geral": "Iniciando definição do MVP",
  "diretorio_ativo": "docs/fase-01-mvp/",
  "stack_tecnica": {
    "frontend": "",
    "backend": "",
    "database": "",
    "auth": ""
  },
  "historico_fases": [
    {
      "fase": 1,
      "nome": "Setup e Funcionalidades Base",
      "status": "em_andamento",
      "objetivo": "Definir e implementar o MVP",
      "documentos": "docs/fase-01-mvp/"
    }
  ],
  "pontos_atencao": [],
  "ultimo_checkpoint": {
    "data": "YYYY-MM-DD",
    "resumo": "Projeto inicializado",
    "tarefa_finalizada": null,
    "pendencia_imediata": "Definir funcionalidades principais",
    "proximo_passo_sugerido": "Preencher 01-funcionalidades.md e 01-blueprint.md"
  }
}
```

---

## 2. 00-visao.md

Local: `/docs/00-visao.md` — Raramente muda. Representa a "alma" do projeto.

```markdown
# 🎯 Visão Geral do Projeto

> ⚠️ **Este documento raramente muda.** Só altere se o rumo do produto mudar completamente.

---

## 🚀 O Problema

> Descreva em uma frase o problema real que você está resolvendo.

---

## 💡 A Solução

> Como o software resolve esse problema? Qual é o diferencial?

---

## 👥 Público-Alvo

- **Quem vai usar?**
- **Qual o principal benefício para eles?**
- **Nível técnico esperado:**

---

## 🏆 Critério de Sucesso

> Como você saberá que o projeto foi um sucesso?

- [ ] Métrica 1
- [ ] Métrica 2

---

## 🚫 O que o Projeto NÃO é (Non-Goals)

> Defina os limites para manter o foco.

- Não é ...
- Não vai incluir ...
- Fora do escopo por enquanto: ...
```

---

## 3. funcionalidades.md

Local: `/docs/fase-[n]-[nome]/[n]-funcionalidades.md`

```markdown
# 📋 Funcionalidades — Fase [N]

> **Objetivo da Fase:** [Descreva o objetivo]
> **Status:** 🔄 Em andamento

---

## ✅ Escopo desta Fase

> Liste apenas o que será feito nesta iteração. Sem escopo aberto.

- [ ] **Funcionalidade 1:** Descrição breve do comportamento esperado.
- [ ] **Funcionalidade 2:** Descrição breve do comportamento esperado.

---

## 🎯 Requisitos Mínimos (MVP)

> O que é o "mínimo aceitável" para esta fase ser considerada um sucesso?

- O sistema deve ser capaz de ...
- O usuário deve conseguir ...

---

## 🎨 Interface / Fluxo de Telas (Opcional)

> Descrição simples ou referências visuais.

- Tela 1: ...
- Tela 2: ...

---

## 🚫 Fora do Escopo desta Fase

> Evite escopo creep listando explicitamente o que NÃO entra aqui.

- ...
```

---

## 4. blueprint.md

Local: `/docs/fase-[n]-[nome]/[n]-blueprint.md`

```markdown
# 🏗️ Blueprint Técnico — Fase [N]

> **Este documento define o "como" da fase.**
> Sempre inclua este arquivo no contexto para a IA não sugerir bibliotecas incompatíveis.

---

## 🛠️ Stack Técnica

| Camada | Tecnologia | Justificativa |
| :--- | :--- | :--- |
| Frontend | | |
| Backend | | |
| Banco de Dados | | |
| Autenticação | | |
| Hospedagem | | |

---

## 🗄️ Modelo de Dados

> Defina as entidades principais e seus campos.

**Entidade: NomeDoModelo**
- `id`: identificador único
- `campo1`: tipo — descrição
- `created_at`: timestamp

---

## 📂 Estrutura de Pastas Proposta

```text
/src
  /components     → Componentes reutilizáveis
  /pages          → Telas / rotas principais
  /services       → Lógica de negócio e chamadas de API
  /utils          → Funções auxiliares
```

---

## 🔌 Integrações e APIs Externas

| Serviço | Finalidade | Documentação |
| :--- | :--- | :--- |
| | | |

---

## ⚙️ Decisões de Arquitetura

> Escolhas estruturais que impactam todo o projeto.

- Padrão de estado global: ...
- Estratégia de autenticação: ...
- Convenção de nomenclatura: ...
```

---

## 5. decisoes.md

Local: `/docs/fase-[n]-[nome]/[n]-decisoes.md`

```markdown
# ⚖️ Registro de Decisões — Fase [N]

> **ADR Lite (Architecture Decision Record simplificado)**
> Sempre que escolher X em vez de Y, registre aqui o motivo.
> Isso evita que a IA questione e mude decisões já tomadas.

---

## 📋 Decisões Registradas

| Data | Decisão Tomada | Alternativa Descartada | Motivo |
| :--- | :--- | :--- | :--- |
| | | | |

---

## 🔄 Decisões Revisadas ou Revertidas

| Data | Decisão Original | Motivo da Revisão | Nova Decisão |
| :--- | :--- | :--- | :--- |
| | | | |
```

---

## 6. plano-de-voo.md

Local: `/docs/fase-[n]-[nome]/[n]-plano-de-voo.md` — **Documento mais dinâmico.**

```markdown
# ✈️ Plano de Voo — Fase [N]

> **Este é o documento mais dinâmico do projeto.**
> A IA deve atualizá-lo após cada tarefa confirmada como concluída.

---

## 🚩 Status Atual

**Estado:** 🔄 Em progresso
**Progresso:** 0 / 0 tarefas concluídas (0%)
**Última atualização:** YYYY-MM-DD

---

## 📝 Checklist de Tarefas

> A IA marca `[x]` apenas após o usuário confirmar que a tarefa está concluída.

### 🔧 Setup e Configuração
- [ ] **Tarefa 1** — Descrição.
- [ ] **Tarefa 2** — Descrição.

### 🧩 Funcionalidades
- [ ] **Feature 1** — Descrição.
  - [ ] Subtarefa A
  - [ ] Subtarefa B

### 🧪 Qualidade
- [ ] **Smoke test** — Testar o fluxo principal.
- [ ] **Revisar console errors** — Garantir que não há erros no dev.

---

## 🚧 Bloqueios / Pendências

> O que está impedindo o progresso agora?

- _Nenhum bloqueio identificado._

---

## ⏭️ Próximo Passo Sugerido

> A IA atualiza este campo após cada tarefa concluída.

- ...
```

---

## 7. aprendizados.md

Local: `/docs/fase-[n]-[nome]/[n]-aprendizados.md` — Preenchido ao final da fase.

```markdown
# 🧠 Aprendizados e Post-Mortem — Fase [N]

> **Preenchido ao final da fase, antes de iniciar a próxima.**
> Serve para que fases futuras não repitam os mesmos erros.

---

## ❌ O que deu errado?

> Erros técnicos, bugs difíceis de debugar, mudanças de plano inesperadas.

- _A ser preenchido ao encerrar a fase._

---

## ✅ O que funcionou bem?

> Atalhos, padrões ou soluções que valem a pena repetir.

- _A ser preenchido ao encerrar a fase._

---

## ⏱️ Estimativa vs. Realidade

| Tarefa | Estimado | Real | Observação |
| :--- | :--- | :--- | :--- |
| | | | |

---

## 💡 Lições para a Próxima Fase

- _A ser preenchido ao encerrar a fase._

---

## 📦 Dependências ou Débitos Técnicos Gerados

> O que foi feito de forma temporária e precisará ser refatorado depois?

- _Nenhum identificado até o momento._
```

---

## 8. guia-operacional.md

Local: `/docs/guia-operacional.md` — Documento cumulativo, válido para todas as fases.

```markdown
# 🛠️ Guia Operacional

> **Documento cumulativo** — válido para todas as fases.
> É o seu "eu do futuro" agradecendo. Mantenha sempre atualizado.

---

## ⚙️ Configuração Inicial do Ambiente

```bash
# 1. Clonar o repositório
git clone [URL_DO_REPO]
cd [NOME_DO_PROJETO]

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env
# Edite o .env com suas chaves reais
```

---

## 🔑 Variáveis de Ambiente

| Variável | Descrição | Obrigatória? |
| :--- | :--- | :--- |
| `DATABASE_URL` | URL do banco de dados | ✅ Sim |
| `API_KEY` | Chave do serviço externo | ✅ Sim |
| `NODE_ENV` | `development` ou `production` | ✅ Sim |

---

## 🚀 Comandos Úteis

```bash
# Desenvolvimento
npm run dev          # Servidor local com hot reload

# Build e Produção
npm run build        # Build de produção
npm run start        # Servidor em modo produção

# Qualidade de Código
npm run lint         # Verificar erros de lint
npm run format       # Formatar código
```

---

## 🌐 Deploy

### Staging
```bash
# Descreva o processo de deploy para staging
```

### Produção
```bash
# Descreva o processo de deploy para produção
```

---

## 🔍 Troubleshooting Comum

| Sintoma | Causa Provável | Solução |
| :--- | :--- | :--- |
| | | |

---

## 📌 Links Importantes

- Repositório:
- Staging:
- Produção:
```

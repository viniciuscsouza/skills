#!/bin/bash

# Script para inicializar a estrutura de documentação AI-Driven
# Uso: ./init.sh [nome_do_projeto]

PROJECT_NAME=${1:-"Novo Projeto"}
DATE=$(date +%Y-%m-%d)

mkdir -p docs/fase-01-mvp

if [ ! -f docs/context.json ]; then
cat <<EOF > docs/context.json
{
  "projeto": "$PROJECT_NAME",
  "versao_workflow": "1.0",
  "data_inicio": "$DATE",
  "fase_atual": 1,
  "status_geral": "Iniciando projeto com AI-Driven",
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
      "nome": "Setup e MVP",
      "status": "em_andamento",
      "objetivo": "Definir e implementar o MVP",
      "documentos": "docs/fase-01-mvp/"
    }
  ],
  "pontos_atencao": [],
  "ultimo_checkpoint": {
    "data": "$DATE",
    "resumo": "Projeto inicializado",
    "tarefa_finalizada": null,
    "pendencia_imediata": "Definir visão do projeto em 00-visao.md",
    "proximo_passo_sugerido": "Preencher o arquivo 00-visao.md"
  }
}
EOF
echo "Arquivo docs/context.json criado com sucesso."
fi

if [ ! -f docs/00-visao.md ]; then
cat <<EOF > docs/00-visao.md
# Visão do Projeto: $PROJECT_NAME

## 1. O Problema
Descreva o problema que o projeto resolve.

## 2. A Solução
Como o projeto resolve o problema.

## 3. Público-Alvo
Quem vai usar o projeto.
EOF
echo "Arquivo docs/00-visao.md criado com sucesso."
fi

echo "Estrutura AI-Driven inicializada com sucesso!"

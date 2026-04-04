# Otimização de Desempenho

Desempenho exige empirismo. Medir antes de otimizar é a premissa mais essencial. Tentar adivinhar processos leva a refatorações complexas que raramente combatem o impacto de carregamento real provado.

## Gatilhos para uso
- Requisitos base indicam limiares estritos de processamento ou carregamento visual (SLAs).
- Quando as medições indicam comportamentos morosos para o observador na renderização, cliques travados ou atrasos evidentes da via rede.
**Não use para:** Criar melhoramentos visando possíveis cenários utópicos; "Otimização prematura é a raiz de diversos problemas de design de software."

## O Ciclo Prático de Performance
1. **Meça:** Tenha dados. Qual o tempo e a origem base do problema hoje?
2. **Identifique:** Aonde exatamente ele passa a onerar.
3. **Conserte:** Redirecione e amenize o cenário identificado e comprovado.
4. **Verifique Novamente:** Confirme com as novas medidas as métricas colhidas inicialmente para cruzar melhorias.

## Anti-Padrões de Desempenho e Seus Remédios

### Fóssil: Consultas N+1  (Em qualquer Base relacional/rede)
*O clássico vilão oculto.* Acontece ao iterar uma lista, onde a cada posição do elemento principal invoca-se *uma nova solicitação externa* para buscar os anexos subjacentes e relacionamentos daquela linha no banco de dados. 
**A solução** consiste sempre em recuperar estes vínculos utilizando junções num pacote só por intermédio das instruções matrizes.

### Buscas descontroladas sem Teto
Tentar carregar milhares de referências na memória se o objetivo é mostrar ou avaliar as dez/cem primeiras no escopo presente (seja no cliente, num terminal, ou numa fila transacional backend). Utilize recursos simples de limitação (Take/Limit e Paginações) e filtros robustos para estancar inundações de dados.

### Estrangulamento da Linha Principal
Síncronizar grandes contestações como recálculos brutos de imagens pesadas ou criptografias extensas que detêm totalmente a execução geral. Processos densos exigem divisões em tarefas demoradas separadas em caminhos paralelos ou agendados, dependendo das características do motor/ambiente.

### Repetição Cega de Elementos Imutáveis (Re-Computação ou Cache Ausente)
Recuperar os estados amplos de informações que alteram apenas se o semestre letivo finalizar numa rotações de minuto-em-minuto é dispendioso sem motivo. Implemente cacheamento na memória nas vias externas, evitando re-processamento sistêmico sobre resultados comuns.

## Sinais de Alerta (Red Flags) durante a Revisão
- Qualquer desvio no código focado primeiramente em desempenho que não ofereça números comparativos de antes x depois do implementador justificando o feito.
- Ciclos for/forEach gerando consultas externas iterativas de forma unitária na subida.
- Carregamentos na camada cliente visuais que invocam os assets (videos, imgs) num peso que ultrapassa muito a necessidade ou sem os adequados particionamentos.

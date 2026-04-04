# Segurança e Resiliência (Hardening)

A postura básica do desenvolvimento seguro impõe tratar todo input externo como hostil, e blindar qualquer vazamento acidental de informação técnica ou credenciais.

## As Regras Básicas Sem Exceção

1. **Valide toda informação na fronteira:** As informações que entram em APIs, Formulários, ou argumentos expostos de comandos devem ser sanitarizadas. Não assuma que o cliente te dará o formato correto.
2. **Parametrize toda "Query":** Evite ao máximo injetar "strings" concatenadas puras para comandos de banco de dados ou prompts de OS. Utilize pacotes (Drivers) nativos para vincular o formato de forma isolada do código lógico.
3. **Senhas sempre passam por dispersão matemática estruturada:** Utilize tecnologias padrão de indústria para hashear credenciais - nada deve ser passível de engenharia reversa.
4. **Utilize chaves e controles para chamadas externas.**

## O que NUNCA fazer

- **Jamais envie chaves (API Keys, senhas locais, PEMs) para os commits:** Um único descuido obriga o descarte absoluto da chave em produção.
- **Evite retornar atributos sigilosos de Entidades nas requisições:** Ao retornar o dado de um Utilizador/Serviço, certifique-se de suprimir os campos privados antes de formatar a visualização.
- **Jamais trate os componentes puramente de tela/front-end como barreiras fortes de segurança**: Restrição de botões não impede requisições manuais do usuário à camada servidor. A validação real ocorre nos manipuladores de destino.

## Ameaças Comuns (OWASP Insights Práticos)

*   **Injeção Dinâmica (XSS):** O que previne que uma entrada de formulário torne-se executável para que outro utilizador baixe códigos indevidos do seu servidor? Use "escapes" adequados nas bibliotecas em uso.
*   **Limites de Acesso Rompidos:** Validar não reflete apenas "Estar logado". O que proíbe do Aluno A acessar via ID alterado na requisição HTTP os dados do Aluno B fechados ao sistema? Tenha autorizações lógicas fortes na obtenção de tabelas restritas.
*   **Exposição Indevida:** Stack-Traces extensos e descritivos em tela quando tudo "Crashou" na aplicação exibindo tabelas, caminhos locais, e endereços a qualquer invasor na internet. Trate os erros e os apresente num envelope fechado e seguro, logando os detalhes ocultamente no seu servidor de monitoramento.

## Sinais de Alerta (Red Flags) durante a Revisão
- Dados que vêm de componentes vindos direto para o processador de estado geral do banco.
- Repositório com arquivo de ambiente descuidado ou falho com itens não integrados.
- Arquivos contendo tokens hardcoded no início das declarações.
- Portas ou roteadores da aplicação aceitando dados de todas as origens ou abusando de Wildcards (`*`).

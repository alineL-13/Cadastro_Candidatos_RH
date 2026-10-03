# Registro de Desenvolvimento — TalentHub

Este documento registra o processo de desenvolvimento do TalentHub, aplicação de cadastro e consulta de candidatos construída para um teste técnico.

## 1. Organização e execução do trabalho

O trabalho foi organizado em etapas para transformar os requisitos do desafio em uma aplicação funcional:

1. **Leitura dos requisitos:** identificação dos fluxos obrigatórios: cadastro manual, cadastro assistido por PDF, listagem e detalhes de candidatos, e regras de validação.
2. **Modelagem dos dados:** definição da tabela `Candidatos` no SQL Server e dos campos necessários para armazenar os dados pessoais e profissionais.
3. **Backend:** implementação da API com Node.js e Express, acesso ao SQL Server e operações para cadastrar e consultar candidatos.
4. **Frontend:** desenvolvimento da interface em React, com formulário compartilhado pelos fluxos manual, listagem e tela de detalhes.
5. **Integração:** conexão do frontend com a API por Axios e apresentação de mensagens de retorno para o usuário.
6. **Análise de PDF:** criação do fluxo de recebimento do arquivo no backend, extração do texto e tentativa de identificar nome, e-mail e telefone.

A aplicação foi dividida em `frontend` e `backend`, mantendo separadas a interface e a API. O script `script.sql`, na raiz do repositório, permite criar a estrutura inicial do banco.

## 2. Principais decisões técnicas

### React no frontend

React foi escolhido para construir uma interface baseada em componentes e gerenciar os dados preenchidos no formulário. O Vite é utilizado no ambiente de desenvolvimento e na geração do build.

### Node.js e Express no backend

Node.js com Express foi utilizado para expor os endpoints HTTP e concentrar as operações de acesso aos dados e de processamento do currículo. Essa separação evita que o frontend acesse diretamente o banco de dados.

### SQL Server como banco de dados

O SQL Server foi utilizado conforme solicitado no desafio. A tabela `Candidatos` define `ID` como chave primária auto incremental e usa restrições `NOT NULL` para os campos obrigatórios. `DataCriacao` recebe um valor padrão com `SYSUTCDATETIME()`.

A estrutura inicial é disponibilizada em `script.sql`, para que o banco possa ser criado sem depender de alterações manuais na tabela.

### Extração de texto do PDF no backend

Multer recebe o arquivo enviado, com limite de tamanho e filtro de tipo. A biblioteca `pdf-parse` é utilizada para extrair o texto do documento no backend. A partir desse texto, a aplicação tenta identificar nome, e-mail e telefone com regex.

A extração não foi tratada como garantia de reconhecimento: os currículos variam em estrutura, conteúdo e formatação. Por isso, os dados identificados são apresentados no formulário para revisão, e os campos continuam editáveis.

### Bibliotecas de interface e integração

- **Axios:** comunicação HTTP entre React e API.
- **Tailwind CSS e DaisyUI:** estilização e componentes visuais.
- **lucide-react:** ícones.
- **react-hot-toast:** mensagens de retorno para ações e erros.
- **mssql:** comunicação com o SQL Server.
- **dotenv:** configuração por variáveis de ambiente.
- **cors:** configuração de comunicação entre origens durante o desenvolvimento.

### Exclusão como funcionalidade adicional

A exclusão de candidatos não estava entre os requisitos explícitos do desafio. Foi incluída como funcionalidade complementar para oferecer maior autonomia na manutenção dos registros. Ela não substitui nem altera os fluxos obrigatórios de cadastro e consulta.

Além disso, implementei a validação do formato do telefone como uma melhoria adicional, mantendo o campo opcional, conforme os requisitos originais do desafio.

## 3. Uso de inteligência artificial

Durante o desenvolvimento, utilizei o ChatGPT e o GitHub Copilot como apoio para compreender os requisitos, esclarecer dúvidas de implementação e revisar trechos de código. A IA foi usada como ferramenta de apoio, as sugestões precisaram ser avaliadas e adaptadas ao projeto.

Exemplos de solicitações feitas durante o trabalho:

- **Entendimento do desafio:** pedi ajuda para decompor a descrição do teste técnico em funcionalidades e requisitos verificáveis. Usei a resposta como apoio para organizar o escopo.
- **Persistência no SQL Server:** solicitei ajuda para criar a conexão do backend com o banco de dados.
- **Leitura de currículos:** utilizei a conversa para discutir o recebimento do PDF, a extração do texto e a identificação de informações. As sugestões foram adaptadas ao fluxo real da aplicação.
- **Compreensão do código:** solicitei explicações linha a linha das implementações sugeridas para entender o comportamento das funções, em vez de depender apenas de código sugerido.

As respostas não foram consideradas corretas automaticamente. Foi necessário confrontar as sugestões com a estrutura do projeto, e ajustar conforme as necessidades, além de observar o comportamento da aplicação.

## 4. Correções, adaptações e pontos de atenção

Durante o desenvolvimento, foi necessário trabalhar de forma iterativa na integração entre frontend, backend e banco de dados. Entre os cuidados adotados estão:

- Manter os nomes dos campos enviados pelo formulário compatíveis com os esperados pela API e pela tabela SQL Server.
- Tratar campos opcionais sem exigir que o usuário preencha telefone, cargo ou resumo profissional.
- Criar verificações duplas a fim de garantir os requisitos solicitados, tal qual a verificação de campos obrigatórios.
- Separar a análise do currículo do salvamento definitivo, para permitir a revisão das informações extraídas.
- Considerar que a leitura de PDF pode falhar ou não identificar todas as informações, e essa falha não deve bloquear o cadastro manual.
- Verificar o comportamento da aplicação com mensagens de sucesso e erro, para tornar o resultado das ações compreensível ao usuário.

## 5. Como a solução foi verificada

A verificação foi realizada manualmente, utilizando a interface da aplicação e o postman, observando as respostas do sistema. Os fluxos conferidos incluem, mas não se limitam a:

- Abrir a listagem de candidatos.
- Abrir o formulário de cadastro.
- Tentar salvar sem nome ou sem e-mail e observar a validação.
- Informar um e-mail ou telefone em formato inválido e observar a mensagem apresentada.
- Realizar cadastro manual sem anexar arquivo.
- Selecionar um PDF válido e um inválido e analisar as informações extraídas.
- Consultar o candidato salvo na listagem e abrir sua tela de detalhes.
- Excluir um candidato e conferir a atualização da listagem.
- Conferir no SQL Server se os dados cadastrados foram persistidos.

## 6. Tempo dedicado

**Tempo aproximado:** Aproximadamente 13 horas.

## 7. Dificuldades e limitações

### Extração de informações de currículos

A identificação de nome, e-mail e telefone depende do texto extraído e de padrões heurísticos. A solução pode não reconhecer corretamente documentos com layouts complexos, texto em colunas, dados em imagens, informações ausentes ou formatos inesperados.

### Escopo funcional

A aplicação cobre o cadastro e a consulta previstos no desafio e inclui exclusão como recurso adicional. Não foram incluídos, nesta versão, recursos como autenticação e autorização de usuários, edição de candidatos, busca avançada, paginação ou auditoria de alterações.

### Ambiente de execução

A conexão depende de uma instância SQL Server acessível e de uma configuração local adequada. As variáveis de ambiente e os drivers necessários podem variar de acordo com o sistema e o método de autenticação utilizado.

## 8. Melhorias futuras

Com mais tempo, eu priorizaria:

1. **Testes automatizados:** adicionar testes unitários para validações e extração, testes de integração para os endpoints com Supertest e testes de interface para os principais fluxos.
2. **Extração de PDF mais robusta:** ampliar os casos de teste com currículos de formatos variados e melhorar a identificação de campos sem impedir a edição manual.
3. **Segurança e privacidade:** revisar limites de requisição, mensagens de erro, configurações de produção e políticas de acesso aos dados pessoais dos candidatos.
4. **Experiência de uso:** avaliar busca, filtros, paginação, e edição de registros.

## 9. Considerações finais

O objetivo foi entregar uma aplicação funcional que cobrisse os fluxos centrais do desafio, mantendo o cadastro manual disponível independentemente do sucesso da leitura do PDF. A solução utiliza uma arquitetura separada entre frontend, API e banco de dados, e deixa implicito que a extração automática é uma assistência ao preenchimento, não uma substituição da conferência humana.

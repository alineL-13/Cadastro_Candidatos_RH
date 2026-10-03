# TalentHub - Cadastro de Candidatos

Aplicação web para cadastro e consulta de candidatos, desenvolvida como teste técnico. O TalentHub permite registrar candidatos manualmente ou utilizar um currículo em PDF para preencher automaticamente os campos de Nome, Email e Telefone.

## Funcionalidades

- Cadastro manual de candidatos, sem obrigatoriedade de anexar currículo.
- Envio de currículo em PDF para extração de texto no backend.
- Tentativa de identificação de nome completo, e-mail e telefone no conteúdo extraído.
- Preenchimento do mesmo formulário nos fluxos manual e com PDF, permitindo revisar e complementar os dados antes de salvar.
- Validação dos campos obrigatórios e do formato do e-mail e telefone.
- Validação do arquivo enviado, com limite de 5 MB e aceitação de PDF.
- Listagem de candidatos cadastrados e acesso à tela de detalhes.
- Exclusão de candidatos, funcionalidade adicional incluída para oferecer mais autonomia ao usuário.
- Mensagens de feedback para informar o resultado das ações e possíveis erros.

## Tecnologias

### Stack principal

- **Frontend:** React, JavaScript, Vite.
- **Backend:** Node.js, Express.
- **Banco de dados:** Microsoft SQL Server.

### Bibliotecas principais

| Biblioteca | Finalidade |
| --- | --- |
| `axios` | Requisições HTTP do frontend para a API |
| `react-hot-toast` | Notificações de sucesso e erro |
| `lucide-react` | Ícones da interface |
| `tailwindcss` | Estilização da aplicação |
| `daisyui` | Componentes e estilos de interface |
| `mssql` | Acesso ao SQL Server |
| `msnodesqlv8` e `odbc` | Suporte à conexão com SQL Server/ODBC |
| `multer` | Recebimento e validação inicial do arquivo enviado |
| `pdf-parse` | Extração de texto de arquivos PDF |
| `dotenv` | Leitura de variáveis de ambiente |
| `cors` | Configuração de acesso entre frontend e backend |

### Versões declaradas no `package.json`

As versões abaixo correspondem às faixas declaradas no projeto; não representam necessariamente a versão exata instalada em cada ambiente.

| Tecnologia/biblioteca | Versão declarada |
| --- | --- |
| Node.js | Recomendado: 18+ ou 20+ |
| React | `^19.2.8` |
| Vite | `^8.3.0` |
| Tailwind CSS | `^4.3.3` |
| DaisyUI | `^5.7.47` |
| Axios | `^1.20.0` |
| lucide-react | `^1.49.0` |
| react-hot-toast | `^2.6.1` |
| Express | `^5.2.1` |
| mssql | `^12.7.2` |
| Multer | `^2.4.0` |
| pdf-parse | `^1.1.1` |

## Pré-requisitos

Antes de executar a aplicação, instale:

- Node.js 18+ ou 20+ e npm.
- SQL Server ou acesso a uma instância compatível.
- SQL Server Management Studio (SSMS) ou ferramenta equivalente.
- ODBC Driver 18 for SQL Server, conforme a configuração do ambiente.

## Configuração do banco de dados

1. Inicie o SQL Server e conecte-se à instância desejada.
2. Abra o arquivo `script.sql` no SSMS ou ferramenta equivalente.
3. Execute o script para criar o banco `Cadastro_Candidatos_RH` e a tabela `Candidatos`.
4. Confira se as configurações de conexão do backend correspondem à sua instância.

A tabela contém os campos:

| Campo | Tipo | Regra |
| --- | --- | --- |
| `ID` | `INT IDENTITY(1,1)` | Chave primária gerada pelo banco |
| `NomeCompleto` | `NVARCHAR(200)` | Obrigatório |
| `Email` | `NVARCHAR(254)` | Obrigatório |
| `Telefone` | `NVARCHAR(30)` | Opcional |
| `CargoDesejado` | `NVARCHAR(150)` | Opcional |
| `ResumoProfissional` | `NVARCHAR(MAX)` | Opcional |
| `DataCriacao` | `DATETIME2` | Preenchido por padrão com `SYSUTCDATETIME()` |

## Variáveis de ambiente

Configure as variáveis utilizadas pela conexão do backend em um arquivo `.env` no diretório de execução do backend. Não publique credenciais reais no Git.

```env
DB_SERVER=nome-ou-endereco-da-instancia
DB_DATABASE=Cadastro_Candidatos_RH
PORT=5000
```

O modo de autenticação e quaisquer outras variáveis necessárias dependem da configuração da instância e do código de conexão utilizado. Ajuste a configuração do banco para o seu ambiente local.

## Instalação e execução

Abra dois terminais na raiz do repositório.

### 1. Backend

```bash
cd backend
npm install
npm run dev
```

Por padrão, a API é disponibilizada em `http://localhost:5000`, conforme a configuração local.

### 2. Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

O Vite informará no terminal o endereço local do frontend, normalmente `http://localhost:5173`.

Se o frontend não conseguir acessar a API, confira a URL configurada no cliente Axios, se o backend está em execução e se a configuração de CORS permite a origem do frontend.

## Fluxo de utilização

1. Abra a aplicação e consulte a listagem de candidatos.
2. Selecione a opção para adicionar um candidato.
3. Para o cadastro manual, preencha os campos diretamente.
4. Para usar um currículo, selecione um arquivo PDF e solicite a análise. Os dados identificados são inseridos no formulário.
5. Revise e corrija os campos.
6. Salve o cadastro. Após a confirmação, o candidato passa a aparecer na listagem.
7. Abra um candidato para consultar os detalhes. A ação de exclusão também está disponível como funcionalidade adicional.

## API

As operações de cadastro e consulta são realizadas pelo backend, que persiste os dados no SQL Server. As rotas de candidatos incluem operações para listar, cadastrar, consultar um registro por identificador e excluir um registro. A análise do PDF também é feita no backend.

Para conferir os caminhos exatos e os formatos das requisições, consulte os arquivos de rotas em `backend/src/routes`.

## Validação e limitações

- Nome completo e e-mail são obrigatórios.
- Os formatos de e-mail e telefone são validados.
- O PDF é opcional: não anexar um arquivo não impede o cadastro manual.
- O envio de arquivo aceita PDF de até 5 MB.
- A extração depende do texto disponível no documento. PDFs digitalizados como imagem, documentos protegidos, layouts incomuns ou informações organizadas de forma inesperada podem não ser interpretados corretamente.
- O currículo é usado para análise, o sistema não armazena o PDF no banco de dados.

## Testes

Não foram implementados testes unitários ou testes automatizados para esta entrega. A verificação realizada durante o desenvolvimento foi manual com o uso de postman, percorrendo os fluxos disponíveis na interface e conferindo as respostas e a persistência da aplicação.

## Documentação complementar

Consulte [`DESENVOLVIMENTO.md`](./DESENVOLVIMENTO.md) para conhecer o processo de desenvolvimento, as decisões técnicas, o uso de IA, as verificações, as limitações e as melhorias planejadas.

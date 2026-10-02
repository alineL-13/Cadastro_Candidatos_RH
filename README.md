# Cadastro de Candidatos RH

Este projeto foi desenvolvido como um teste técnico para uma vaga, seguindo as orientações do recrutador para validar habilidades.

O sistema consiste em uma aplicação para cadastro e consulta de candidatos, com backend em Node.js, frontend em React.js, e banco de dados SQL Server.

## Stack principal

- Javascript
- Node.js
- Express
- SQL Server
- mssql / msnodesqlv8
- Multer
- pdf-parse
- React
- Axios
- Tailwind CSS
- DaisyUI

## Requisitos

Antes de iniciar, verifique se os itens abaixo estão instalados:

- Node.js 18+ ou 20+
- npm
- SQL Server (Express, Developer ou instância local)
- SQL Server Management Studio (SSMS) ou ferramenta equivalente
- ODBC Driver 18 for SQL Server
- Git

## Configuração da conexão com o SQL Server

O backend lê as configurações do banco a partir do arquivo `.env` na raiz do projeto.

Crie ou edite o arquivo `.env` com as seguintes variáveis:

```env
DB_SERVER
DB_DATABASE
PORT
```

## Estrutura do banco

O script de criação do banco e da tabela está no arquivo `script.sql`.

### Para criar a base localmente

1. Conecte-se ao SQL Server.
2. Abra o arquivo `script.sql`.
3. Execute o conteúdo do script.

## Instalação das dependências

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

## Executando a aplicação

### 1) Iniciar o backend

```bash
cd backend
npm run dev
```

A API ficará disponível em:

```text
http://localhost:5000
```

### 2) Iniciar o frontend

```bash
cd frontend
npm run dev
```

A aplicação web será iniciada normalmente pelo Vite, geralmente em:

```text
http://localhost:5173
```
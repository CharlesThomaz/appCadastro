# ORM - Gerenciador de Usuários

## Descrição

Este projeto é uma API RESTful para gerenciamento de usuários, construída com Node.js, Express e Knex.js para a comunicação com o banco de dados SQLite. A API permite listar, criar, pesquisar, atualizar e deletar usuários. O projeto também é conteinerizado com Docker, facilitando a configuração e execução do ambiente.

## Preview

![Preview do Projeto](src/public/assets/preview.png)

## Tecnologias Utilizadas

-   **Node.js:** Ambiente de execução JavaScript no servidor.
-   **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
-   **Express:** Framework para construção de APIs RESTful.
-   **Knex.js:** Construtor de consultas SQL para Node.js.
-   **SQLite3:** Banco de dados relacional embarcado.
-   **Docker:** Plataforma de contêineres para empacotar e distribuir a aplicação.
-   **tsx:** Executa arquivos TypeScript e ESM no Node.js de forma nativa.
-   **Zod:** Biblioteca de validação de esquemas.

## Primeiros Passos

Você pode executar o projeto localmente usando Node.js ou com Docker.

### Pré-requisitos

-   Node.js (v18 ou superior)
-   NPM ou Yarn
-   Docker e Docker Compose (para a opção com contêiner)

### Opção 1: Executando Localmente

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/CharlesThomaz/orm.git
    cd orm
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Execute as migrations** para criar as tabelas no banco de dados:
    ```bash
    npm run latest
    ```

4.  **(Opcional) Popule o banco de dados** com dados de exemplo:
    ```bash
    npm run seed
    ```

5.  **Inicie o servidor** de desenvolvimento:
    ```bash
    npm run dev
    ```

### Opção 2: Executando com Docker

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/CharlesThomaz/orm.git
    cd orm
    ```

2.  **Construa e inicie os contêineres:**
    ```bash
    docker-compose up -d --build
    ```
    Este comando irá instalar as dependências, rodar as migrations, popular o banco e iniciar o servidor.

O servidor estará disponível em `http://localhost:3000` e a página estática em `http://localhost:8001`.

## Docker e Variáveis de Ambiente

O `docker-compose.yml` é responsável por orquestrar os contêineres da aplicação:

-   **`front`:** Serve a aplicação front-end estática (HTML, CSS, JS) na porta `8001`.
-   **`api`:** Executa a API Node.js na porta `3000`.
-   **`postgres`:** Inicia uma instância do banco de dados PostgreSQL.

### Variáveis de Ambiente

O projeto utiliza arquivos `.env` para gerenciar as configurações sensíveis. O arquivo `.db.example.env` serve como um template.

Para configurar o ambiente Docker, crie um arquivo chamado `.db.env` na raiz do projeto, seguindo o exemplo:

```env
# .db.env
POSTGRES_USER=seu_usuario
POSTGRES_PASSWORD=sua_senha
POSTGRES_DB=seu_banco
```

Essas variáveis serão carregadas pelos serviços `api` and `postgres` conforme definido no `docker-compose.yml`.

## Endpoints da API

A seguir estão os endpoints disponíveis na API:

| Método | Rota                  | Descrição                               |
| :----- | :-------------------- | :-------------------------------------- |
| `GET`  | `/users`              | Lista todos os usuários.                |
| `POST` | `/users`              | Cria um novo usuário.                   |
| `GET`  | `/users/search`       | Pesquisa usuários pelo nome.            |
| `PUT`  | `/users/:id`          | Atualiza um usuário existente.          |
| `DELETE`| `/users/:id`          | Deleta um usuário.                      |

---

### `GET /users`

Lista todos os usuários cadastrados.

-   **Resposta de Sucesso (200 OK):**
    ```json
    [
      {
        "idUser": 1,
        "nameUser": "John Doe",
        "emailUser": "john.doe@example.com"
      },
      {
        "idUser": 2,
        "nameUser": "Jane Doe",
        "emailUser": "jane.doe@example.com"
      }
    ]
    ```

---

### `POST /users`

Cria um novo usuário.

-   **Corpo da Requisição:**
    ```json
    {
      "nameUser": "John Doe",
      "emailUser": "john.doe@example.com"
    }
    ```
-   **Resposta de Sucesso (201 Created):**
    ```json
    {
      "message": "Usuário criado com sucesso!",
      "user": {
        "idUser": 3,
        "nameUser": "John Doe",
        "emailUser": "john.doe@example.com"
      }
    }
    ```
-   **Resposta de Erro (400 Bad Request):**
    ```json
    {
      "message": "O e-mail 'john.doe@example.com' já está em uso."
    }
    ```

---

### `GET /users/search?name=...`

Pesquisa por usuários cujo nome contém o termo fornecido.

-   **Parâmetro de Query:** `name` (string)
-   **Exemplo:** `/users/search?name=John`
-   **Resposta de Sucesso (200 OK):**
    ```json
    [
      {
        "idUser": 1,
        "nameUser": "John Doe",
        "emailUser": "john.doe@example.com"
      }
    ]
    ```

---

### `PUT /users/:id`

Atualiza os dados de um usuário existente.

-   **Parâmetro de Rota:** `id` (number)
-   **Corpo da Requisição:**
    ```json
    {
      "nameUser": "Johnathan Doe",
      "emailUser": "john.doe.new@example.com"
    }
    ```
-   **Resposta de Sucesso (200 OK):**
    ```json
    {
      "message": "Usuário atualizado com sucesso!"
    }
    ```
-   **Resposta de Erro (404 Not Found):**
    ```json
    {
      "message": "Usuário não encontrado."
    }
    ```

---

### `DELETE /users/:id`

Deleta um usuário pelo seu ID.

-   **Parâmetro de Rota:** `id` (number)
-   **Resposta de Sucesso (200 OK):**
    ```json
    {
      "message": "Usuário deletado com sucesso."
    }
    ```
-   **Resposta de Erro (404 Not Found):**
    ```json
    {
      "message": "Usuário não encontrado."
    }
    ```

## Banco de Dados

O projeto utiliza o Knex.js para gerenciar as migrações e sementes do banco de dados SQLite.

### Tabela `tbl_user`

| Coluna      | Tipo      | Restrições                    |
| :---------- | :-------- | :---------------------------- |
| `idUser`    | `INTEGER` | Chave Primária, Auto-incremento |
| `nameUser`  | `TEXT`    | Não Nulo                      |
| `emailUser` | `TEXT`    | Não Nulo, Único               |

## Estrutura do Projeto

```
orm/
├── src/
│   ├── controllers/
│   │   ├── IController.ts
│   │   └── User-Controller.ts
│   ├── errors/
│   │   └── AppError.ts
│   ├── models/
│   │   ├── database/
│   │   │   ├── db.ts
│   │   │   └── dev.sqlite3
│   │   ├── migrations/
│   │   │   └── 20250712231837_criar-tabela-usuario.ts
│   │   ├── seeds/
│   │   │   └── inserir-usuarios.ts
│   │   └── types/
│   │       └── tipoUser.d.ts
│   ├── public/
│   │   ├── index.html
│   │   └── ...
│   ├── routes/
│   │   ├── index.ts
│   │   └── user-route.ts
│   └── server.ts
├── .dockerignore
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── knexfile.ts
├── package.json
└── tsconfig.json
```

## Tratamento de Erros

A API utiliza uma classe `AppError` para padronizar as mensagens de erro. Em caso de erro, a API retornará um JSON com a mensagem e o `statusCode` apropriado, facilitando o debug no front-end.

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a licença ISC.
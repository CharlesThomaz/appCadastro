
# ORM - Gerenciador de Usuários

## Descrição

Este projeto é uma API RESTful para gerenciamento de usuários, construída com Node.js, Express e Knex.js para a comunicação com o banco de dados SQLite. A API permite listar, criar e pesquisar usuários.

## Preview

![Preview do Projeto](src/public/assets/preview.png)

## Tecnologias Utilizadas

*   **Node.js:** Ambiente de execução JavaScript no servidor.
*   **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
*   **Express:** Framework para construção de APIs RESTful.
*   **Knex.js:** Construtor de consultas SQL para Node.js.
*   **SQLite3:** Banco de dados relacional embarcado.
*   **tsx:** Executa arquivos TypeScript e ESM no Node.js de forma nativa.
*   **Zod:** Biblioteca de validação de esquemas.

## Primeiros Passos

### Pré-requisitos

*   Node.js (v18 ou superior)
*   NPM ou Yarn

### Instalação

1.  Clone o repositório:
    ```bash
    git clone https://github.com/CharlesThomaz/orm.git
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```

### Executando o Projeto

1.  Execute as migrations para criar as tabelas no banco de dados:
    ```bash
    npm run latest
    ```
2.  (Opcional) Execute as seeds para popular o banco de dados com dados de exemplo:
    ```bash
    npm run seed
    ```
3.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

O servidor estará disponível em `http://localhost:3000`.

## Endpoints da API

A seguir estão os endpoints disponíveis na API:

| Método | Rota            | Descrição                  |
| :----- | :-------------- | :------------------------- |
| `GET`  | `/users`        | Lista todos os usuários.   |
| `POST` | `/users`        | Cria um novo usuário.      |
| `GET`  | `/users/pesquisar` | Pesquisa um usuário pelo nome. |

### Exemplo de Corpo da Requisição (POST /users)

```json
{
  "nameUser": "John Doe",
  "emailUser": "john.doe@example.com"
}
```

## Banco de Dados

O projeto utiliza o Knex.js para gerenciar as migrações e sementes do banco de dados.

### Tabela `tbl_user`

| Coluna      | Tipo     | Restrições        |
| :---------- | :------- | :---------------- |
| `idUser`    | `INTEGER`| Chave Primária, Auto-incremento |
| `nameUser`  | `TEXT`   | Não Nulo          |
| `emailUser` | `TEXT`   | Não Nulo, Único   |

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
│   │   ├── assets/
│   │   │   └── preview.png
│   │   ├── css/
│   │   │   └── style.css
│   │   └── js/
│   │       └── script.js
│   ├── routes/
│   │   ├── route.ts
│   │   └── user-route.ts
│   └── server.ts
├── .gitignore
├── knexfile.ts
├── package-lock.json
├── package.json
└── tsconfig.json
```

## Tratamento de Erros

A API utiliza uma classe `AppError` para padronizar as mensagens de erro. Em caso de erro, a API retornará um JSON com a mensagem de erro e o status code apropriado.

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a licença ISC.

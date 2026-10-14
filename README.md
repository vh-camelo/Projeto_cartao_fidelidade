# Cartão Fidelidade — API

API back-end para um programa de fidelidade digital: uma forma mais tecnológica de donos de estabelecimentos fidelizarem seus clientes. O proprietário cadastra os clientes e, a cada compra, acrescenta o bônus acumulado; quando o cliente atinge o limite, o bônus pode ser resgatado.

> Projeto de estudos, feito apenas com a parte de **back-end** (não há interface). Os endpoints podem ser testados com Insomnia, Postman ou `curl`.

## Funcionalidades

- Cadastro e login de usuários (proprietários) com **senha criptografada** e **autenticação por token JWT** (validade de 1 hora)
- Cadastro de clientes com nome, telefone (único) e e-mail opcional
- Consulta de todos os clientes (do mais recente para o mais antigo) ou de um cliente pelo ID
- Acréscimo e remoção (resgate) de bônus de um cliente, com validação de valores e de saldo suficiente
- Rotas de clientes protegidas: só acessíveis com token válido

## Tecnologias

- [Node.js](https://nodejs.org/) e [Express 5](https://expressjs.com/)
- [Sequelize](https://sequelize.org/) (ORM) com **MySQL** (`mysql2`)
- [JWT](https://www.npmjs.com/package/jsonwebtoken) (`jsonwebtoken`) e [bcryptjs](https://www.npmjs.com/package/bcryptjs) para autenticação
- `dotenv` para variáveis de ambiente e `cors`

## Estrutura do projeto

```
├── config/        # conexão com o banco (Sequelize)
├── controllers/   # regras de cada rota (autenticação e clientes)
├── middleware/    # verificação do token JWT
├── models/        # modelos User e Client
├── routes/        # definição das rotas
└── server.js      # ponto de entrada da aplicação
```

## Como rodar

**Pré-requisitos:** Node.js e um servidor MySQL em execução.

1. Clone o repositório e instale as dependências:

   ```bash
   git clone https://github.com/vh-camelo/Projeto_cartao_fidelidade.git
   cd Projeto_cartao_fidelidade
   npm install
   ```

2. Crie um banco de dados vazio no MySQL (as tabelas são criadas automaticamente ao iniciar):

   ```sql
   CREATE DATABASE fidelidade;
   ```

3. Crie um arquivo `.env` na raiz do projeto com as variáveis abaixo (ajuste os valores):

   ```env
   PORT=5000
   DB_NAME=fidelidade
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_HOST=localhost
   DB_DIALECT=mysql
   JWT_SECRET=uma_chave_secreta_longa
   ```

4. Inicie o servidor:

   ```bash
   node server.js
   ```

   A API ficará disponível em `http://localhost:5000`.

## Endpoints

### Autenticação

| Método | Rota | Corpo (JSON) | Descrição |
|--------|------|--------------|-----------|
| POST | `/api/auth/register` | `username`, `password` | Cria um usuário e retorna um token |
| POST | `/api/auth/login` | `username`, `password` | Autentica e retorna um token |

### Clientes (exigem o header `x-auth-token`)

| Método | Rota | Corpo (JSON) | Descrição |
|--------|------|--------------|-----------|
| POST | `/api/clients` | `nome`, `telefone`, `email` (opcional) | Cadastra um cliente |
| GET | `/api/clients` | — | Lista todos os clientes |
| GET | `/api/clients/:id` | — | Busca um cliente pelo ID |
| PUT | `/api/clients/add-points/:id` | `pontosAdicionar` (número positivo) | Acrescenta bônus ao cliente |
| PUT | `/api/clients/remove-points/:id` | `pontosRemover` (número positivo) | Remove bônus (resgate); recusa se o saldo for insuficiente |

### Exemplo de uso

```bash
# 1. Criar um usuário e obter o token
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "padaria", "password": "123456"}'

# 2. Cadastrar um cliente usando o token recebido
curl -X POST http://localhost:5000/api/clients \
  -H "Content-Type: application/json" \
  -H "x-auth-token: SEU_TOKEN" \
  -d '{"nome": "Maria", "telefone": "99999-0000"}'
```

## Conceitos praticados

- Organização de uma API em camadas (rotas, controllers, models, middleware)
- Autenticação com JWT e armazenamento seguro de senhas com hash
- Modelagem de dados e persistência com ORM (Sequelize + MySQL)
- Validação de entrada e respostas com códigos HTTP adequados (400, 401, 404, 500)
- Uso de variáveis de ambiente para dados sensíveis

## Próximos passos

- Permitir que o **cliente faça o próprio cadastro** e consulte seu saldo
- Definir um **limite de bônus** e automatizar o resgate ao atingi-lo
- Criar a interface (front-end) para proprietário e cliente
- Adicionar testes automatizados e um script `start` no `package.json`

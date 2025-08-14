# 🚀 API de Cursos - Desafio Node.js

Uma API REST moderna construída com **Fastify**, **Drizzle ORM** e **PostgreSQL** para gerenciamento de cursos.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Endpoints da API](#endpoints-da-api)
- [Documentação da API](#documentação-da-api)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Scripts Disponíveis](#scripts-disponíveis)

## 🎯 Sobre o Projeto

Este projeto é uma API REST para gerenciamento de cursos, desenvolvida como parte de um desafio Node.js. A aplicação oferece funcionalidades completas de CRUD para cursos, com validação de dados usando Zod e documentação automática da API.

### Características Principais

- ⚡ **Performance**: Fastify para alta performance
- 🔒 **Validação**: Zod para validação de dados
- 📊 **Banco de Dados**: PostgreSQL com Drizzle ORM
- 📚 **Documentação**: Swagger/OpenAPI automática
- 🐳 **Containerização**: Docker para banco de dados
- 🔧 **TypeScript**: Tipagem estática completa

## 🛠 Tecnologias Utilizadas

- **Fastify** - Framework web rápido e eficiente
- **Drizzle ORM** - ORM moderno e type-safe
- **PostgreSQL** - Banco de dados relacional
- **Zod** - Validação de esquemas
- **TypeScript** - Linguagem de programação
- **Docker** - Containerização
- **Swagger/OpenAPI** - Documentação da API

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- Docker e Docker Compose
- npm ou yarn

## 🚀 Instalação

1. **Clone o repositório**

   ```bash
   git clone https://github.com/Andr3yGabriel/intensivo_node
   cd intensivo_node
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**

   ```bash
   cp .env.example .env
   ```

   Edite o arquivo `.env` com suas configurações:

   ```env
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/desafio
   NODE_ENV=development
   ```

## ⚙️ Configuração

### Banco de Dados

1. **Inicie o PostgreSQL com Docker**

   ```bash
   docker-compose up -d
   ```

2. **Execute as migrações**
   ```bash
   npm run db:migrate
   ```

## 🎮 Uso

### Desenvolvimento

```bash
npm run dev
```

A API estará disponível em `http://localhost:3333`

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev                    # Inicia o servidor em modo desenvolvimento

# Banco de Dados
npm run db:generate           # Gera novas migrações
npm run db:migrate            # Executa migrações pendentes
npm run db:studio             # Abre o Drizzle Studio
```

## 📡 Endpoints da API

### Cursos

| Método | Endpoint       | Descrição              |
| ------ | -------------- | ---------------------- |
| `POST` | `/courses`     | Criar um novo curso    |
| `GET`  | `/courses`     | Listar todos os cursos |
| `GET`  | `/courses/:id` | Buscar curso por ID    |

### Exemplos de Uso

#### Criar um curso

```bash
curl -X POST http://localhost:3333/courses \
  -H "Content-Type: application/json" \
  -d '{"title": "Node.js Avançado"}'
```

#### Listar cursos

```bash
curl http://localhost:3333/courses
```

#### Buscar curso por ID

```bash
curl http://localhost:3333/courses/3debd0ad-5995-4825-8ed7-2b6655596585
```

## 📚 Documentação da API

A documentação interativa da API está disponível em:

- **Swagger UI**: `http://localhost:3333/docs`
- **Scalar API Reference**: `http://localhost:3333/docs` (tema solarized)

A documentação é gerada automaticamente baseada nos esquemas Zod definidos nas rotas.

## 📁 Estrutura do Projeto

```
intensivo_node_dia_1/
├── src/
│   ├── database/
│   │   ├── client.ts          # Cliente do banco de dados
│   │   └── schema.ts          # Esquemas das tabelas
│   └── routes/
│       ├── create-course.ts   # Rota para criar curso
│       ├── get-courses.ts     # Rota para listar cursos
│       └── get-course-by-id.ts # Rota para buscar curso por ID
├── drizzle/
│   ├── 0000_warm_anita_blake.sql
│   ├── 0001_quiet_nico_minoru.sql
│   └── meta/
├── docker-compose.yml         # Configuração do PostgreSQL
├── drizzle.config.ts          # Configuração do Drizzle
├── server.ts                  # Servidor principal
├── package.json
└── README.md
```

### Esquema do Banco de Dados

#### Tabela `courses`

- `id` (UUID, Primary Key) - Identificador único do curso
- `title` (Text, Not Null, Unique) - Título do curso
- `description` (Text, Nullable) - Descrição do curso

#### Tabela `users` (preparada para futuras funcionalidades)

- `id` (UUID, Primary Key) - Identificador único do usuário
- `name` (Text, Not Null) - Nome do usuário
- `email` (Text, Not Null, Unique) - Email do usuário

## 🔧 Scripts Disponíveis

| Script        | Descrição                                                |
| ------------- | -------------------------------------------------------- |
| `dev`         | Inicia o servidor em modo desenvolvimento com hot reload |
| `db:generate` | Gera novas migrações baseadas nas mudanças do schema     |
| `db:migrate`  | Executa migrações pendentes no banco de dados            |
| `db:studio`   | Abre o Drizzle Studio para visualizar/editar dados       |

## 🐳 Docker

O projeto inclui configuração Docker para o banco de dados PostgreSQL:

```bash
# Iniciar o banco de dados
docker-compose up -d

# Parar o banco de dados
docker-compose down
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

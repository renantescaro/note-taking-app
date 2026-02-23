# Note Taking API

Este é o backend da aplicação de gerenciamento de notas, construído com Node.js.
Ele atua como o núcleo de processamento e segurança, gerenciando a persistência de dados no Supabase (Self-hosted) e a autenticação via JWT.

## 🚀 Tecnologias

```
* Node.js & TypeScript
* Supabase Client
* JWT para autenticação
* Docker & Docker Compose
```

## 🛠️ Configuração do Ambiente

Crie um arquivo ".env" na raiz do projeto com as seguintes variáveis:

```
NEXT_PUBLIC_SUPABASE_URL=http://seu-ip-local:8000
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role
JWT_SECRET=sua-secret-segura
```

## 📦 Como rodar

### Via Docker (Recomendado)

```bash
docker build -t teskaro/note-taking-app .
docker run -p 3333:3333 --env-file .env teskaro/note-taking-app
```

### Desenvolvimento

```bash
npm install
npm run dev
```

## 🔗 Repositórios Relacionados

Este backend serve à interface encontrada em:
[https://github.com/renantescaro/note-taking-front](https://github.com/renantescaro/note-taking-front)

## ⚙️ Funcionalidades

- Autenticação de usuários (Integração com Supabase Auth).
- CRUD de Notas (Create, Read, Update, Delete).
- Middleware de validação de token (401 Unauthorized para sessões expiradas).

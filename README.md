#  Tech Challenge-3

 aplicação web foi desenvolvida com **React**, **TypeScript** e **Vite**, focada em boas práticas de frontend, organização de código e uma interface moderna e responsiva.

A aplicação permite autenticação de usuários e gerenciamento completo de posts (criar, visualizar, editar e excluir), além de acesso público para leitura dos conteúdos.

---

##  Visão Geral

- Usuários **não autenticados** podem visualizar os posts públicos.
- Usuários **autenticados** podem criar, editar, visualizar e excluir seus próprios posts.

A arquitetura foi pensada para ser escalável, modular e alinhada com padrões utilizados no mercado.

---

##  Tecnologias Utilizadas

### Frontend
- **React 19**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **React Router DOM**
- **Lucide React** (ícones)

### Gerenciamento de Estado e Dados
- **React Query (TanStack Query)**
- **Axios**

### Qualidade de Código
- **ESLint**
- **TypeScript strict typing**

---

## Funcionalidades

###  Autenticação
- Login de usuário
- Cadastro de usuário
- Persistência de autenticação via token
- Proteção de rotas privadas

###  Posts
- Listagem de posts
- Busca por texto
- Criação de post
- Edição de post
- Exclusão de post
- Visualização de post em modal

###  Interface
- Layout responsivo
- Identidade visual padronizada
- Componentes reutilizáveis
- Modais para ações de CRUD

---

##  Estrutura de Pastas

```
src/
├── api/
│   └── api.ts                # Configuração do Axios e interceptors
├── hooks/
│   ├── useAuth.ts            # Hooks de autenticação
│   └── usePosts.ts           # Hooks de CRUD de posts
├── types/
│   └── posts.ts              # Tipagens TypeScript
├── components/
│   ├── common/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── modals/
│       ├── create/
│       │   └── CreatePostModal.tsx
│       ├── update/
│       │   └── UpdatePostModal.tsx
│       └── view/
│           └── ViewPostModal.tsx
├── pages/
│   ├── Auth/
│   │   └── Auth.tsx          # Página de autenticação
│   └── Posts/
│       └── Posts.tsx         # Página principal do blog
├── routes/
│   └── Routes.tsx            # Configuração das rotas
├── main.tsx
└── App.tsx
```

---

## ▶ Como Executar o Projeto

### Pré-requisitos
- **Node.js 18+**
- **npm**

### Passo a passo

1. Clone o repositório:
```bash
git clone https://github.com/eoKelvio/pos-tech-challenge-3.git
```

2. Acesse a pasta do projeto:
```bash
cd pos-tech-challenge-3
```

3. Instale as dependências:
```bash
npm install
```

4. Execute o projeto em modo desenvolvimento:
```bash
npm run dev
```

A aplicação ficará disponível em:
```
http://localhost:5173
```

---

##  Scripts Disponíveis

| Comando | Descrição |
|-------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run preview` | Visualiza o build local |
| `npm run lint` | Executa o ESLint para análise de código |

---

##  Configurações Importantes

- A configuração de requisições HTTP está em:
  - `src/api/api.ts`
- A identidade visual é controlada via **Tailwind CSS**
- Rotas protegidas são definidas em:
  - `src/routes/Routes.tsx`

---

## 📄 Licença

Este projeto está sob a licença **MIT**.

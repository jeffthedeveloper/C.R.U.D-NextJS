<<<<<<< HEAD
# Projeto CRUD de Produtos com Next.js

Este projeto implementa um sistema CRUD (Create, Read, Update, Delete) para gerenciar produtos, migrado e aprimorado a partir de uma base Ionic para uma arquitetura moderna com Next.js, utilizando o App Router. Ele incorpora tecnologias como TypeScript, Prisma ORM, Tailwind CSS para estilização, NextAuth.js para autenticação e Zod para validação de dados.

## Funcionalidades

* **Listagem de Produtos:** Exibe todos os produtos cadastrados.
* **Criação de Produtos:** Permite adicionar novos produtos ao sistema.
* **Edição de Produtos:** Possibilita a modificação de produtos existentes.
* **Exclusão de Produtos:** Remove produtos do sistema.
* **Autenticação:** Protege as rotas da API e certas funcionalidades da interface do usuário através de autenticação (NextAuth.js).
* **Validação de Dados:** Garante a integridade dos dados através de validação rigorosa com Zod.
* **Estilização Moderna:** Interface de usuário responsiva e visualmente atraente, estilizada com Tailwind CSS.

## Tecnologias Utilizadas

* **Next.js (App Router):** Framework React para aplicações web de alto desempenho, com renderização no servidor e geração de sites estáticos.
* **TypeScript:** Superset de JavaScript que adiciona tipagem estática, melhorando a robustez e manutenibilidade do código.
* **Prisma ORM:** ORM moderno e de próxima geração para Node.js e TypeScript, que facilita a interação com bancos de dados (neste caso, SQLite).
* **SQLite:** Banco de dados relacional leve e sem servidor, ideal para desenvolvimento local e pequenas aplicações.
* **Tailwind CSS:** Framework CSS utility-first para construção rápida de interfaces de usuário personalizadas.
* **NextAuth.js:** Solução completa de autenticação para Next.js.
* **Zod:** Biblioteca de validação de esquemas TypeScript-first.

## Estrutura do Projeto

A estrutura do projeto segue as convenções do Next.js App Router:

```plaintext
├── app/
│   ├── api/
│   │   └── produtos/
│   │       ├── route.ts (API Routes para CRUD de produtos)
│   ├── produtos/
│   │   ├── page.tsx (Página principal de listagem e gerenciamento de produtos)
│   ├── layout.tsx (Layout global da aplicação)
│   └── globals.css (Estilos globais)
├── components/
│   ├── ProductList.tsx
│   ├── ProductCard.tsx
│   ├── ProductForm.tsx
│   └── (outros componentes auxiliares)
├── lib/
│   └── prisma.ts (Configuração do cliente Prisma)
├── prisma/
│   ├── schema.prisma (Definição do modelo de dados Produto)
│   └── migrations/ (Migrações do banco de dados)
├── public/ (Arquivos estáticos)
├── .env (Variáveis de ambiente)
├── next.config.js
├── package.json
├── tsconfig.json
└── README.md
```


## Configuração e Execução Local

Siga os passos abaixo para configurar e executar o projeto em sua máquina local:

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd <nome-do-seu-projeto>
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Configure o Prisma e o Banco de Dados:**

    Crie um arquivo `.env` na raiz do projeto com a seguinte variável de ambiente:
    ```env
    DATABASE_URL="file:./dev.db"
    NEXTAUTH_SECRET="UM_TEXTO_SECRETO_QUALQUER_E_LONGO" # Gerar um seguro em produção
    ```
    Para gerar um `NEXTAUTH_SECRET` seguro, você pode usar:
    ```bash
    openssl rand -base64 32
    ```

    Em seguida, gere o cliente Prisma e execute as migrações para criar o banco de dados:
    ```bash
    npx prisma generate
    npx prisma migrate dev --name init
    ```

4.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    # ou
    yarn dev
    ```

    O projeto estará acessível em `http://localhost:3000`.

## Detalhes da Implementação

### Modelo de Dados (Prisma Schema)

O modelo `Produto` é definido em `prisma/schema.prisma` e inclui campos como `id`, `nome`, `descricao` e `preco`.

```prisma
// Exemplo simplificado de schema.prisma
model Produto {
  id        String   @id @default(uuid())
  nome      String
  descricao String?
  preco     Float
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```
# API Routes (/api/produtos)

As operações CRUD são expostas através de Route Handlers no diretório app/api/produtos/route.ts.

GET /api/produtos: Retorna todos os produtos.
POST /api/produtos: Cria um novo produto.
PUT /api/produtos/[id]: Atualiza um produto existente.
DELETE /api/produtos/[id]: Exclui um produto.
Todas as rotas são protegidas por NextAuth.js e os dados de entrada são validados com Zod.

# Componentes de UI

```plaintext
app/produtos/page.tsx: A página principal que orquestra a exibição dos produtos e a interação com os formulários. Utiliza ProductList e ProductForm.
ProductList.tsx: Componente responsável por renderizar a lista de produtos, geralmente recebendo os dados via props ou fazendo fetch no lado do cliente.
ProductCard.tsx: Componente para exibir os detalhes de um único produto, incluindo ações de edição e exclusão.
ProductForm.tsx: Componente de formulário para criar ou editar produtos.
Sugestões de Deploy Online
Este projeto pode ser facilmente implantado em diversas plataformas de nuvem:
```

Vercel: A plataforma recomendada para projetos Next.js, oferecendo deploy contínuo, funções serverless e uma ótima integração. 

Ideal para um deploy rápido e eficiente.
Netlify: Outra excelente opção para hospedar aplicações Jamstack, com recursos semelhantes ao Vercel e suporte a funções serverless.

Docker com Provedor de Nuvem (AWS, Google Cloud, Azure): Para maior controle e escalabilidade, você pode conteinerizar a aplicação com Docker e implantá-la em serviços de contêiner ou máquinas virtuais (EC2 na AWS, Compute Engine no Google Cloud, VMs no Azure). Isso oferece flexibilidade para gerenciar o ambiente de banco de dados (e.g., PostgreSQL, MySQL) separadamente.

Próximos Passos (Potenciais Melhorias)

Implementar paginação e filtragem na listagem de produtos.

Adicionar um sistema de busca de produtos.

Melhorar a experiência de usuário com loaders e feedback visuais.

Expandir as opções de autenticação (e.g., Google, GitHub com NextAuth.js).

Adicionar testes unitários e de integração.

Refatorar para padrões de design mais avançados (e.g., CQRS, DDD se a complexidade justificar).
Internacionalização (i18n).

Por Jefferson Firmino Mendes
=======
# CRUD de Produtos em Next.js

Este projeto é uma adaptação moderna de um CRUD de produtos originalmente desenvolvido em Ionic/Angular para Next.js, utilizando as melhores práticas e tecnologias atuais.

## Tecnologias Utilizadas

- **Next.js 14** com App Router
- **TypeScript** para tipagem estática
- **Prisma** como ORM
- **SQLite** como banco de dados (facilmente substituível por PostgreSQL, MySQL, etc.)
- **Tailwind CSS** para estilização
- **NextAuth.js** para autenticação
- **Zod** para validação de dados

## Funcionalidades

- Autenticação de usuários
- Listagem de produtos
- Visualização detalhada de produtos
- Criação de novos produtos
- Edição de produtos existentes
- Exclusão de produtos
- Validação de formulários
- Interface responsiva

## Estrutura do Projeto

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   └── produtos/
│   │       └── [id]/
│   ├── login/
│   └── produtos/
├── components/
│   ├── Loading.tsx
│   ├── ProductCard.tsx
│   ├── ProductForm.tsx
│   └── ProductList.tsx
├── lib/
│   ├── prisma.ts
│   └── validations/
│       └── produto.ts
└── docs/
    └── alternativas_execucao_online.md
```

## Como Executar Localmente

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure o banco de dados:
   ```bash
   npx prisma migrate dev
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
5. Acesse http://localhost:3000

## Credenciais de Acesso (Demo)

- **Usuário**: admin
- **Senha**: admin

## Execução Online

Para informações detalhadas sobre como executar este projeto online, consulte o documento [Alternativas para Execução Online](./src/docs/alternativas_execucao_online.md).

## Melhorias em Relação ao CRUD Original

1. **Arquitetura Moderna**: Utilização do App Router do Next.js 14 com React Server Components
2. **Tipagem Forte**: TypeScript em todo o projeto para maior segurança e autocompletar
3. **Validação Robusta**: Zod para validação de dados tanto no cliente quanto no servidor
4. **Autenticação Integrada**: NextAuth.js para proteção de rotas e API
5. **UI Responsiva**: Interface adaptável a diferentes tamanhos de tela com Tailwind CSS
6. **Otimização de Performance**: Server Components para redução de JavaScript no cliente
7. **Banco de Dados com ORM**: Prisma para operações de banco de dados tipadas e seguras
8. **Experiência de Desenvolvimento**: Hot reload, TypeScript, ESLint para desenvolvimento ágil

## Próximos Passos

- Implementar testes automatizados (Jest, React Testing Library)
- Adicionar paginação na listagem de produtos
- Implementar busca e filtros
- Expandir funcionalidades de autenticação (registro, recuperação de senha)
- Adicionar upload de imagens para produtos
>>>>>>> 88ffbfb (commit inicial)

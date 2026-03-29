# Tonique Workspace

A premium hospitality and nightlife monorepo built with React, Express, and PostgreSQL. This project uses a `pnpm` workspace architecture for efficient package management and shared libraries.

## 🌟 Overview

**Tonique** is a sophisticated restaurant and nightlife platform designed to provide an immersive dining experience through a high-performance web application.

## 🛠️ Technology Stack

- **Monorepo Management**: [pnpm Workspaces](https://pnpm.io/workspaces)
- **Frontend**: [React](https://react.dev/), [Vite](https://vitejs.dev/), [Framer Motion](https://www.framer.com/motion/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [Express 5](https://expressjs.com/), [Node.js 24](https://nodejs.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Drizzle ORM](https://orm.drizzle.team/)
- **Type Safety**: [TypeScript 5.9](https://www.typescriptlang.org/), [Zod](https://zod.dev/)
- **API Tooling**: [OpenAPI 3.1](https://www.openapis.org/), [Orval](https://orval.dev/) for codegen

## 📂 Project Structure

```text
Restaurant-Site-Design/
├── artifacts/              # Deployable applications
│   ├── tonique/            # React/Vite Frontend (Main Site)
│   └── api-server/         # Express API Server
│
├── lib/                    # Shared workspace libraries
│   ├── api-spec/           # OpenAPI specifications & Orval configuration
│   ├── api-client-react/   # Generated React Query hooks for the frontend
│   ├── api-zod/            # Generated Zod schemas for validation
│   └── db/                 # Database schema definitions and Drizzle client
│
├── scripts/                # Internal utility and maintenance scripts
│
├── pnpm-workspace.yaml     # Workspace definition
├── tsconfig.json           # Root TypeScript configuration (Project References)
└── package.json            # Root package with workspace scripts
```

## 🚀 Getting Started

### Prerequisites

- [Node.js 24+](https://nodejs.org/)
- [pnpm 9+](https://pnpm.io/)

### Installation

```bash
# Install dependencies for the entire workspace
pnpm install
```

### Development

You can run individual applications or the entire stack:

```bash
# Run all applications (Frontend & Backend) in parallel
pnpm dev

# Run specific applications
pnpm --filter @workspace/tonique run dev    # Frontend only
pnpm --filter @workspace/api-server run dev # Backend only
```

### Building

```bash
# Build the entire workspace
pnpm build
```

### Type Checking

The project uses TypeScript Project References. For accurate type checking across the workspace, always run from the root:

```bash
pnpm run typecheck
```

## 📜 Coding Standards

- **Type Safety**: Avoid `any`. Use the generated Zod schemas and TypeScript interfaces.
- **Styling**: Use Tailwind CSS with the provided design system tokens.
- **Shared Code**: Libraries in `lib/` should be used for any logic shared between the frontend and backend.

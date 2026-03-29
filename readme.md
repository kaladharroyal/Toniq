Tonique Workspace
A premium hospitality and nightlife monorepo built with React, Express, and PostgreSQL. This project uses a pnpm workspace architecture for efficient package management and shared libraries.

🌟 Overview
Tonique is a sophisticated restaurant and nightlife platform designed to provide an immersive dining experience through a high-performance web application.

🛠️ Technology Stack
Monorepo Management: pnpm Workspaces
Frontend: React, Vite, Framer Motion, Tailwind CSS
Backend: Express 5, Node.js 24
Database: PostgreSQL with Drizzle ORM
Type Safety: TypeScript 5.9, Zod
API Tooling: OpenAPI 3.1, Orval for codegen
📂 Project Structure
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
🚀 Getting Started
Prerequisites
Node.js 24+
pnpm 9+
Installation
# Install dependencies for the entire workspace
pnpm install
Development
You can run individual applications or the entire stack:

# Run all applications (Frontend & Backend) in parallel
pnpm dev

# Run specific applications
pnpm --filter @workspace/tonique run dev    # Frontend only
pnpm --filter @workspace/api-server run dev # Backend only
Building
# Build the entire workspace
pnpm build
Type Checking
The project uses TypeScript Project References. For accurate type checking across the workspace, always run from the root:

pnpm run typecheck
📜 Coding Standards
Type Safety: Avoid any. Use the generated Zod schemas and TypeScript interfaces.
Styling: Use Tailwind CSS with the provided design system tokens.
Shared Code: Libraries in lib/ should be used for any logic shared between the frontend and backend.
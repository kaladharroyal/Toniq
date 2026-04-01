# TONIQE Workspace 🍸
A premium, high-performance hospitality and nightlife monorepo built with React, Express, and MongoDB. This project uses a `pnpm` workspace architecture for efficient package management and a highly integrated admin ecosystem.

🌟 **Overview**
TONIQE is a sophisticated restaurant and nightlife platform designed to provide an immersive dining experience. It features a cinematic customer-facing reservation system and a robust administrative dashboard for real-time table and booking management.

---

## 🛠️ Technology Stack
- **Monorepo Management**: `pnpm` Workspaces
- **Frontend**: React 18, Vite, Framer Motion, Vanilla CSS (Premium Glassmorphism)
- **Backend**: Express 5 (Node.js 22/24)
- **Database**: MongoDB Atlas
- **Authentication**: Custom Admin Auth with Session Persistence
- **Communication**: SMTP (NodeMailer) for automated reservation confirmations
- **Type Safety**: TypeScript 5.x

---

## 📂 Project Structure
```text
TONIQ/
├── AdminPanel/              # Premium Admin Dashboard (React/Vite)
│   ├── src/                 # Dashboard UI & Logic
│   └── public/              # Static Assets
│
├── TONIQ/                   # Main Application Monorepo
│   ├── artifacts/           
│   │   ├── TONIQE/         # Customer Frontend (Main Site)
│   │   └── api-server/      # Unified Express API Server & Static Host
│   │
│   ├── pnpm-workspace.yaml  # Workspace definition
│   └── package.json         # Unified build scripts for Render
│
├── readme.md                # Project Documentation
└── .env                     # Environment Configuration (API Keys, DB URIs)
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: 22+
- **pnpm**: 9+
- **MongoDB**: Access to an Atlas Cluster

### Installation
```bash
# Install dependencies for the entire workspace
pnpm install
```

### Development
You can run individual applications or the entire stack in parallel:

```bash
# Run the Main Site & API
cd TONIQ
pnpm run dev

# Run the Admin Panel
cd AdminPanel
pnpm run dev
```

---

## 🌐 Deployment (Render)

### Main Web Service (Backend + Main Site)
- **Service Type**: Web Service
- **Build Command**: `npm i -g pnpm && pnpm install --no-frozen-lockfile && pnpm run build:render`
- **Start Command**: `node artifacts/api-server/dist/index.mjs`

### Admin Panel (Static Site)
- **Service Type**: Static Site
- **Root Directory**: `AdminPanel`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`

---

## 📜 Coding Standards
- **Aesthetics**: Follow the "Premium Nightlife" design language—dark modes, glassmorphism, and gold/amber accents.
- **API Calls**: Always use relative paths (`/api/...`) for the main site and the production URL for the separate Admin Panel.
- **Type Safety**: Maintain strict TypeScript interfaces for all Reservation and Table data models.

---
© 2025 TONIQE Restaurant Group. All rights reserved.
# 🎓 DevAcademy — Interactive Programming Learning Platform

An interactive programming learning platform inspired by the learning paradigms of **W3Schools**, complete with an isolated **Live Code Playground**, hands-on coding exercises, automated quiz assessments, learning progress tracking, and an integrated **AI Tutor** powered by OpenAI API.

Built with a modern enterprise architecture:
- **Frontend**: [Next.js](https://nextjs.org) (App Router, Turbopack, TypeScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) v4 + [shadcn/ui](https://ui.shadcn.com) Design System
- **Backend**: [NestJS](https://nestjs.com) v11 (Enterprise Modular Architecture, TypeScript)
- **Database**: [PostgreSQL](https://www.postgresql.org) 16
- **ORM**: [Prisma](https://www.prisma.io) v6.19 (LTS stable & scalable)
- **AI**: [OpenAI API](https://platform.openai.com) (`gpt-4o-mini`) with secure server-side validation & demo fallback mode

---

## 🧭 Routes & Pages Directory

| Page / Route | Key Features & Description | Status |
| :--- | :--- | :--- |
| [`/`](http://localhost:3000) | **Homepage**: Interactive hero, tutorial search, popular course categories, live "Try it Yourself" editor, and core feature pillars. | ✅ Complete |
| [`/tutorials`](http://localhost:3000/tutorials) | **Course Catalog**: Filter tutorials by category (Frontend, Styling, Programming, Backend) and difficulty levels. | ✅ Complete |
| [`/learn/[course]`](http://localhost:3000/learn/html) | **Course Syllabus**: Learning roadmaps, module lists, estimated study time, and prerequisites. | ✅ Complete |
| [`/learn/[course]/[lesson]`](http://localhost:3000/learn/html/introduction) | **Lesson Page**: Navigation sidebar, breadcrumbs, interactive code block with "Try it Yourself", previous/next navigation, and AI Tutor drawer. | ✅ Complete |
| [`/playground`](http://localhost:3000/playground) | **Live Code Playground**: Live HTML, CSS, and JS editor with templates, AI Code Explainer, AI Debugger, and secure sandbox preview `iframe`. | ✅ Complete |
| [`/exercises`](http://localhost:3000/exercises) | **Exercises Catalog**: Structured coding challenges sorted by language and difficulty. | ✅ Complete |
| [`/exercises/[slug]`](http://localhost:3000/exercises/html-create-heading-paragraph) | **Exercise Workspace**: Problem statement, live solution editor, instant test runner, and AI hint assistant. | ✅ Complete |
| [`/quizzes`](http://localhost:3000/quizzes) | **Quiz Catalog**: Test your knowledge across languages and frameworks. | ✅ Complete |
| [`/quizzes/[slug]`](http://localhost:3000/quizzes/html-fundamentals) | **Interactive Quiz**: Multiple choice questions, immediate feedback per question, detailed explanations, and final score summary. | ✅ Complete |
| [`/ai-tutor`](http://localhost:3000/ai-tutor) | **AI Tutor Assistant**: Conversational programming tutor with prompt templates (Explain, Debug, Hint). | ✅ Complete |
| [`/dashboard`](http://localhost:3000/dashboard) | **Student Dashboard**: Progress overview, completion metrics, daily streaks, and recommended next chapters. | ✅ Complete |
| [`/glossary`](http://localhost:3000/glossary) | **Developer Glossary**: Index of key technical terms (DOM, Flexbox, Box Model, Closure, ORM, REST, Prompt Engineering) with instant filtering. | ✅ Complete |
| [`/search`](http://localhost:3000/search?q=html) | **Quick Search**: Fast search engine across tutorials, course topics, and curriculum lessons. | ✅ Complete |
| [`/help`](http://localhost:3000/help) | **Help & FAQ**: Guides for interactive features, sandbox security, and AI usage. | ✅ Complete |
| [`/about`](http://localhost:3000/about) | **About DevAcademy**: Vision, mission, "Learn by Doing" philosophy, and system architecture. | ✅ Complete |

---

## 🔒 Code Playground Security

DevAcademy adheres to strict browser code isolation principles:
1. **Sandboxed Iframe**: User code is executed inside an `iframe` with `sandbox="allow-scripts"`.
2. **No Same-Origin Overprivilege**: Never combines `allow-same-origin` with `allow-scripts` on the same domain, preventing untrusted scripts from accessing `localStorage`, session cookies, or the host DOM.
3. **Server-Side API Guard**: The OpenAI API key is stored safely on the NestJS backend environment and is **never exposed to the client browser**.

---

## 🔌 Backend API Endpoints (NestJS - Port 4000)

### 1. Learning Content
- `GET /api/courses` — Retrieve the full list of courses and syllabus metadata.
- `GET /api/courses/:slug` — Retrieve course details with all chapters and lessons.
- `GET /api/courses/:courseSlug/lessons/:lessonSlug` — Retrieve comprehensive lesson content.
- `GET /api/quizzes` — Retrieve evaluation quiz catalog.
- `GET /api/quizzes/:slug` — Retrieve quiz questions and options.
- `GET /api/exercises` — Retrieve coding exercise catalog.
- `GET /api/exercises/:slug` — Retrieve exercise details & solution verifiers.
- `GET /api/search?q=:query` — Multi-topic content search.

### 2. Integrated AI Services
- `POST /api/ai/chat` — Contextual interactive conversation based on current lesson material.
- `POST /api/ai/explain` — Line-by-line code explanation.
- `POST /api/ai/hint` — Progressive guidance for exercises without spoiling full solutions.
- `POST /api/ai/debug` — Syntax and logical bug diagnostic assistant.
- `GET /api/ai/health` — Backend AI health status.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v20+` or `v24+` (LTS recommended)
- **npm**: `v10+` or `v11+`
- **Docker** *(optional for local PostgreSQL)*

---

### Step 1: Database Setup (PostgreSQL)

Start PostgreSQL 16 container via Docker Compose:
```bash
docker compose up -d
```
*(Or connect to a cloud PostgreSQL database like Supabase / Neon and update `DATABASE_URL` in `backend/.env`)*.

Run Prisma schema migrations:
```bash
npm run prisma:migrate
```

---

### Step 2: Run NestJS Backend

Open terminal and start:
```bash
npm run dev:backend
```
Backend will be active at: **`http://localhost:4000`**

> **OpenAI Configuration**:
> Edit `backend/.env` and provide your OpenAI API key:
> ```env
> OPENAI_API_KEY="sk-proj-..."
> ```
> *If no key is configured, the backend automatically operates in **Fallback Demo Mode**, allowing all AI Tutor features to be tested smoothly.*

---

### Step 3: Run Next.js Frontend

Open another terminal and start:
```bash
npm run dev:frontend
```
Frontend will be active at: **`http://localhost:3000`**

Or start both concurrently from the root directory:
```bash
npm run dev
```

---

## 🧪 Build & Lint Validation

All frontend and backend modules are validated for production compilation:
```bash
# Backend validation
npm run build:backend

# Frontend validation (Static generation & Turbopack)
npm run build:frontend

# Linting
npm run lint:frontend
```
All builds compile cleanly with **0 errors and 0 warnings**.

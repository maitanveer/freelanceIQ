# FreelanceIQ Architecture Overview

## 1. Current project assessment

The workspace started empty. There was no existing framework, app structure, or database scaffold to preserve. This is a greenfield build, which gives us a clean path to implement a production-quality SaaS structure without fighting legacy conventions.

The current implementation baseline includes:

- Next.js app shell with TypeScript and Tailwind
- Public landing page and auth entry screens
- Folder structure aligned to a SaaS layout
- Baseline design tokens and dark-mode palette system
- A staged implementation plan focused on product architecture first

## 2. Proposed architecture

### Frontend

- Next.js App Router for route-driven SaaS pages
- TypeScript for typed business logic and validation
- Tailwind CSS for the design system
- Reusable UI components under `src/components`
- Server-first rendering with client islands only where interaction is required

### Backend and data

- Prisma ORM with PostgreSQL
- Zod validation for request and import validation
- Auth.js for sign-in and session handling
- Server actions and route handlers for business flows
- Seed script to fill demo data for a fully functional portfolio demo

### AI architecture

A provider abstraction isolates the app from model-specific code.

- `AIProvider` interface
- `OllamaProvider` implementation
- Structured prompts for job analysis and proposal generation
- JSON validation for AI output before using it in the UI

### Hybrid job scoring

The app uses a hybrid architecture:

- deterministic rule engine for match score and opportunity score
- AI engine for qualitative analysis and recommendation generation
- final insights combine numeric scoring with portfolio-aware reasoning

## 3. Files to be created or modified

### Core project files

- `package.json`
- `tsconfig.json`
- `next.config.mjs`
- `tailwind.config.ts`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `.env.example`
- `.gitignore`
- `README.md`

### SaaS app structure

- `src/app/dashboard/page.tsx`
- `src/app/jobs/page.tsx`
- `src/app/login/page.tsx`
- `src/app/register/page.tsx`
- `src/app/forgot-password/page.tsx`
- `src/app/profile/page.tsx`
- `src/app/settings/page.tsx`
- `src/app/jobs/[id]/page.tsx`
- `src/app/proposals/[id]/page.tsx`
- `src/app/applications/page.tsx`
- `src/app/analytics/page.tsx`

### Domain and AI layers

- `src/lib/ai/provider.ts`
- `src/lib/ai/ollama.ts`
- `src/lib/ai/prompts.ts`
- `src/lib/ai/job-analyzer.ts`
- `src/lib/ai/proposal-generator.ts`
- `src/lib/scoring/job-priority.ts`
- `src/lib/validators/job.ts`
- `src/lib/validators/profile.ts`

### Prisma and database

- `prisma/schema.prisma`
- `prisma/seed.ts`
- `src/lib/db.ts`

### Reusable UI

- `src/components/ui/button.tsx`
- `src/components/ui/card.tsx`
- `src/components/dashboard/stat-card.tsx`
- `src/components/jobs/job-card.tsx`
- `src/components/proposals/proposal-editor.tsx`
- `src/components/ai/ai-insight-card.tsx`

## 4. Dependencies required

### Runtime

- next
- react
- react-dom
- @prisma/client
- prisma
- next-auth
- zod
- @hookform/resolvers
- react-hook-form
- recharts
- lucide-react
- clsx
- tailwind-merge
- class-variance-authority

### Development

- typescript
- @types/node
- @types/react
- @types/react-dom
- eslint
- eslint-config-next
- tailwindcss
- postcss
- autoprefixer

## 5. Database design

The schema will include normalized entities for the freelance workflow:

- User
- Profile
- Skill
- PortfolioProject
- Job
- JobSkill
- SavedJob
- JobAnalysis
- Proposal
- Application
- ApplicationNote
- Notification
- UserPreference

Core relationships:

- User has one Profile
- User has many Skills, PortfolioProjects, SavedJobs, JobAnalyses, Proposals, Applications
- Job has many JobSkills and JobAnalyses
- Application belongs to User and Job
- Proposal belongs to User and Job
- SavedJob links User and Job

Recommended constraints:

- unique indexes on user email and profile slug
- foreign keys with cascade on dependent records
- timestamps on all mutable records
- index on job status, user id, and match score fields
- category and skill indexes for search/filter performance

## 6. Implementation phases

### Phase 1: repository inspection and architecture foundation

- confirm repo state
- define product architecture
- finalize data model
- set up core config files and AI abstraction stubs

### Phase 2: database and auth foundation

- Prisma schema
- seed script
- auth configuration
- environment variables and validation

### Phase 3: UI system and landing page

- design tokens
- responsive layout
- landing page sections
- public pages and navigation

### Phase 4: dashboard and jobs system

- dashboard widgets
- job listing and filters
- job detail page
- saved jobs and priority logic

### Phase 5: AI analysis and proposal engine

- Ollama provider abstraction
- job analyzer
- proposal generation
- proposal editor and quality scoring

### Phase 6: CRM, analytics, and profile tooling

- application tracker
- analytics dashboard
- profile and portfolio management
- settings and onboarding

### Phase 7: validation, testing, and polish

- Zod validation
- seed data quality checks
- accessibility and responsiveness review
- README and deployment instructions

## 7. Decision summary

The product is being designed as a premium SaaS product for freelance full-stack professionals, with a hybrid rule + AI architecture, portfolio-aware creativity, and a normalized database that supports both product functionality and future extensibility.

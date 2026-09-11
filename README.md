# FreelanceIQ

FreelanceIQ is an AI-powered freelance job intelligence and proposal assistant built with Next.js, TypeScript, Tailwind CSS, Prisma, and Ollama. It helps freelancers evaluate fit, identify skill gaps, generate personalized proposals, and manage their application pipeline.

## Overview

The product combines job discovery, scoring, AI analysis, and CRM workflows in a polished SaaS experience. Freelancers can import jobs, review fit scores, compare portfolio alignment, generate proposals, and analyze opportunity quality using a hybrid rule-engine + AI approach.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- Auth.js
- Ollama for local AI
- Recharts
- Zod validation

## Features

- AI-powered job scoring and fit analysis
- Portfolio-aware proposal generation
- Project and application tracking
- Saved jobs and opportunity prioritization
- Analytics and skill demand intelligence
- CSV and JSON import support
- Responsive SaaS dashboard

## Architecture

- App shell built in Next.js with server-first components
- Shared domain logic and validation in lib/
- AI provider abstraction with Ollama provider implementation
- Prisma schema for user, profile, portfolio, jobs, proposals, applications, and analytics data
- Database seed script to populate demo data

## Getting Started

1. Install dependencies.
2. Create a `.env` file from `.env.example`.
3. Configure PostgreSQL and Ollama.
4. Run Prisma migrations and seed data.
5. Start the app.

## Environment Variables

See `.env.example` for required setup.

## Deployment

The app is designed for Vercel deployment with a PostgreSQL-compatible database such as Neon or Supabase.

## Future Improvements

- Marketplace API integrations
- Browser extension and job feed ingestion
- Team and agency accounts
- Automated follow-up and CRM syncing
- More advanced AI insight generation

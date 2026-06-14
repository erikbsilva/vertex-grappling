# Vertex BJJ — Coaching Platform

Foundation for the coach (admin) and student (PWA) platform described in the
Vertex BJJ PRD. This is a separate Next.js app from the landing page, sharing
the same Supabase project.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Supabase (Postgres, Auth)

## What's included (foundation + Módulo 1)

- Database schema for the full MVP data model: `students`, `classes`,
  `attendance`, `feedback`, `graduations`, `payments`, `xp_transactions`,
  `student_stats`, `belt_levels` (see `supabase/schema.sql`).
- Auth:
  - Coach (admin): email/password login, gated by `ADMIN_EMAIL`.
  - Student: magic link or Google sign-in, no password. Linked to their
    `students` row automatically by e-mail on first login.
- Admin (`/admin`): cadastrar, editar e arquivar alunos (Módulo 1), com envio
  automático de convite por e-mail.
- Student PWA shell (`/app`): login, escolha de idioma no primeiro acesso,
  e um placeholder para o dashboard/jornada.

Aulas, feedback por IA, graduação, pagamentos e gamificação têm o schema
pronto, mas as telas ainda não foram construídas — são os próximos módulos.

## Setup

### 1. Install dependencies

```bash
cd platform
npm install
```

### 2. Database

The schema has already been applied to the shared Supabase project
(`vertex-grappling`). If you need to re-run it (e.g. a fresh project), execute
`supabase/schema.sql` in the Supabase SQL Editor.

### 3. Create the coach account

In the Supabase dashboard → **Authentication → Users → Add user**, create a
user with your e-mail and a password. This is the account you'll use to log
in to `/admin`.

### 4. Configure Google sign-in for students (optional but recommended)

In the Supabase dashboard → **Authentication → Providers → Google**, enable
the provider and add your OAuth client ID/secret. Magic-link e-mail sign-in
works out of the box.

### 5. Environment variables

```bash
cp .env.local.example .env.local
```

Fill in:

- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from Supabase
  **Project Settings → API**.
- `SUPABASE_SERVICE_ROLE_KEY` — same page, **service_role (secret)**. Used
  server-side only for admin (coach) operations.
- `ADMIN_EMAIL` — the e-mail of the coach account created in step 3. Grants
  access to `/admin`.
- `NEXT_PUBLIC_SITE_URL` — base URL of this app (used for auth redirect
  links). For local dev, `http://localhost:3000`.

### 6. Run locally

```bash
npm run dev
```

- Coach login: `/login`
- Student login: `/app/login`

## Deploying

Deploy as its own Vercel project (separate from the landing page), pointing
at the `platform/` directory as the project root. Add the same environment
variables in Vercel project settings.

## Notes / known limitations (foundation scope)

- Student photo upload is a plain URL field for now — Supabase Storage upload
  comes with a later module.
- If a student's e-mail already has an existing Supabase Auth account
  (unlikely for fresh students), the invite e-mail may fail silently and the
  account won't auto-link; re-invite manually if needed.
- PWA icon is a placeholder SVG — replace with branded icons (incl. PNG for
  iOS) before shipping to students.

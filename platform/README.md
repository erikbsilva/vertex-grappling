# Vertex BJJ — Coaching Platform

Foundation for the coach (admin) and student (PWA) platform described in the
Vertex BJJ PRD. This is a separate Next.js app from the landing page, sharing
the same Supabase project.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Supabase (Postgres, Auth)

## What's included (foundation + Módulos 1-6)

- Database schema for the full MVP data model: `students`, `classes`,
  `attendance`, `feedback`, `graduations`, `payments`, `xp_transactions`,
  `student_stats`, `belt_levels` (see `supabase/schema.sql`).
- Auth:
  - Coach (admin): email/password login, gated by `ADMIN_EMAIL`.
  - Student: magic link or Google sign-in, no password. Linked to their
    `students` row automatically by e-mail on first login.
- Admin (`/admin`):
  - **Alunos** (Módulo 1): cadastrar, editar e arquivar alunos, com envio
    automático de convite por e-mail.
  - **Aulas** (Módulo 2): registrar aulas (data/horário/local/notas) e marcar
    presença por aluno.
  - **Feedback** (Módulo 3): enviar feedback de texto (e opcionalmente um
    link de áudio) para um aluno, vinculado ou não a uma aula.
  - **Graduação** (Módulo 4): registrar uma nova faixa/grau para o aluno
    (atualiza o perfil, guarda o histórico e dá XP de bônus).
  - **Pagamentos** (Módulo 5): registrar cobranças (valor/vencimento) por
    aluno e marcar como pago. Cobranças pendentes com vencimento passado
    aparecem como "Atrasado".
  - **Ranking** (Módulo 6): classificação de todos os alunos ativos por XP
    total.
- Student PWA (`/app`):
  - Login, escolha de idioma no primeiro acesso.
  - Dashboard com XP total, streak e a aula do dia, com check-in
    gamificado (Módulo 2/6: cada check-in dá XP e atualiza o streak).
  - **Jornada**: mapa de faixas/graus com o progresso atual, conquistas
    (badges calculados a partir de XP/streak/graduações) e histórico de
    graduações.
  - **Ranking** (Módulo 6): classificação por XP total, com destaque para a
    posição do próprio aluno.
  - **Feedback**, mostrando o resumo do coach (traduzido para o idioma do
    aluno quando disponível) e permitindo marcar como visto.
  - **Pagamentos**: lista de cobranças com status (Pago/Pendente/Atrasado).

### Tradução automática de feedback (Módulo 3)

Se `OPENAI_API_KEY` estiver configurada, o feedback de texto enviado pelo
coach é automaticamente traduzido para o idioma escolhido pelo aluno (caso
seja diferente de português) usando a API da OpenAI. Sem a chave, o aluno
simplesmente vê o texto original em português.

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

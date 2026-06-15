-- Vertex BJJ Platform — foundation schema
-- Run in Supabase > SQL Editor (or via `apply_migration`)
-- Shares the existing Supabase project with the landing page (table `leads`).

-- ============================================================
-- Módulo 4 (foundation): faixas e graus configuráveis
-- ============================================================
create table if not exists belt_levels (
  id uuid primary key default gen_random_uuid(),
  faixa text not null,
  grau int not null default 0,
  ordem int not null,
  created_at timestamptz default now(),
  unique (faixa, grau)
);

-- ============================================================
-- Módulo 1: Alunos
-- ============================================================
create table if not exists students (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users (id) on delete set null,
  nome text not null,
  email text not null unique,
  foto_url text,
  telefone text,
  objetivo text,
  data_inicio date not null default current_date,
  idioma text,
  faixa text not null default 'Branca',
  grau int not null default 0,
  status text not null default 'ativo' check (status in ('ativo', 'arquivado')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists students_status_idx on students (status);

-- ============================================================
-- Módulo 2: Aulas e presenças
-- ============================================================
create table if not exists classes (
  id uuid primary key default gen_random_uuid(),
  data date not null,
  horario time,
  local text not null,
  notas text,
  created_at timestamptz default now()
);

create index if not exists classes_data_idx on classes (data desc);

create table if not exists attendance (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references classes (id) on delete cascade,
  student_id uuid not null references students (id) on delete cascade,
  presente boolean not null default true,
  checkin_at timestamptz,
  xp_awarded int not null default 0,
  created_at timestamptz default now(),
  unique (class_id, student_id)
);

create index if not exists attendance_student_idx on attendance (student_id);

-- ============================================================
-- Módulo 3: Feedback por IA
-- ============================================================
create table if not exists feedback (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students (id) on delete cascade,
  class_id uuid references classes (id) on delete set null,
  audio_url text,
  transcript text,
  summary_original text,
  summary_translated text,
  idioma_traducao text,
  visto_em timestamptz,
  created_at timestamptz default now()
);

create index if not exists feedback_student_idx on feedback (student_id);

-- ============================================================
-- Módulo 4: Histórico de graduações
-- ============================================================
create table if not exists graduations (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students (id) on delete cascade,
  faixa text not null,
  grau int not null default 0,
  data date not null default current_date,
  created_at timestamptz default now()
);

create index if not exists graduations_student_idx on graduations (student_id);

-- ============================================================
-- Módulo 5: Pagamentos (apenas registro)
-- ============================================================
create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students (id) on delete cascade,
  valor numeric(10, 2) not null,
  vencimento date not null,
  status text not null default 'pendente' check (status in ('pago', 'pendente', 'atrasado')),
  pago_em date,
  created_at timestamptz default now()
);

create index if not exists payments_student_idx on payments (student_id);

-- ============================================================
-- Módulo 6: Gamificação
-- ============================================================
create table if not exists xp_transactions (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students (id) on delete cascade,
  tipo text not null check (tipo in ('checkin', 'feedback', 'meta', 'streak')),
  xp int not null,
  referencia_id uuid,
  created_at timestamptz default now()
);

create index if not exists xp_transactions_student_idx on xp_transactions (student_id);

create table if not exists student_stats (
  student_id uuid primary key references students (id) on delete cascade,
  xp_total int not null default 0,
  streak_atual int not null default 0,
  streak_recorde int not null default 0,
  faltas_consecutivas int not null default 0,
  updated_at timestamptz default now()
);

-- ============================================================
-- Link auth.users <-> students on first login (invite accepted)
-- ============================================================
create or replace function public.link_student_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.students
  set user_id = new.id, updated_at = now()
  where email = new.email and user_id is null;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.link_student_user();

-- ============================================================
-- Helper: resolve the students.id for the current auth user
-- ============================================================
create or replace function public.current_student_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select id from public.students where user_id = auth.uid();
$$;

-- ============================================================
-- Row Level Security
-- Admin (coach) writes go through the server using the service
-- role key, which bypasses RLS. These policies only grant
-- students read (and limited self-update) access to their own data.
-- ============================================================
alter table belt_levels enable row level security;
alter table students enable row level security;
alter table classes enable row level security;
alter table attendance enable row level security;
alter table feedback enable row level security;
alter table graduations enable row level security;
alter table payments enable row level security;
alter table xp_transactions enable row level security;
alter table student_stats enable row level security;

create policy "Authenticated users can read belt levels" on belt_levels
  for select to authenticated using (true);

create policy "Students can view own record" on students
  for select using (auth.uid() = user_id);

create policy "Students can update own record" on students
  for update using (auth.uid() = user_id);

create policy "Students can view classes they attended" on classes
  for select using (
    exists (
      select 1 from attendance a
      where a.class_id = classes.id and a.student_id = current_student_id()
    )
  );

-- Students also need to see today's/upcoming classes before they have an
-- attendance row, so the app can show a "check in" card on the dashboard.
create policy "Students can view today's and upcoming classes" on classes
  for select using (data >= current_date);

create policy "Students can view own attendance" on attendance
  for select using (student_id = current_student_id());

create policy "Students can check in to own attendance" on attendance
  for update using (student_id = current_student_id());

create policy "Students can view own feedback" on feedback
  for select using (student_id = current_student_id());

create policy "Students can mark own feedback as seen" on feedback
  for update using (student_id = current_student_id());

create policy "Students can view own graduations" on graduations
  for select using (student_id = current_student_id());

create policy "Students can view own payments" on payments
  for select using (student_id = current_student_id());

create policy "Students can view own xp transactions" on xp_transactions
  for select using (student_id = current_student_id());

create policy "Students can view own stats" on student_stats
  for select using (student_id = current_student_id());

-- ============================================================
-- Seed: standard adult belt progression (faixa, grau, ordem)
-- ============================================================
insert into belt_levels (faixa, grau, ordem) values
  ('Branca', 0, 0), ('Branca', 1, 1), ('Branca', 2, 2), ('Branca', 3, 3), ('Branca', 4, 4),
  ('Azul', 0, 5), ('Azul', 1, 6), ('Azul', 2, 7), ('Azul', 3, 8), ('Azul', 4, 9),
  ('Roxa', 0, 10), ('Roxa', 1, 11), ('Roxa', 2, 12), ('Roxa', 3, 13), ('Roxa', 4, 14),
  ('Marrom', 0, 15), ('Marrom', 1, 16), ('Marrom', 2, 17), ('Marrom', 3, 18), ('Marrom', 4, 19),
  ('Preta', 0, 20), ('Preta', 1, 21), ('Preta', 2, 22), ('Preta', 3, 23), ('Preta', 4, 24)
on conflict (faixa, grau) do nothing;

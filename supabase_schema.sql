-- Run this in Supabase > SQL Editor

create table if not exists leads (
  id uuid default gen_random_uuid() primary key,
  nome text not null,
  whatsapp text not null,
  email text not null,
  ja_treinou boolean not null,
  data_cadastro timestamp with time zone default now(),
  origem text default 'landing_page'
);

-- Optional: index for faster queries by date
create index if not exists leads_data_cadastro_idx on leads (data_cadastro desc);

-- Row Level Security: lock down to service role only
alter table leads enable row level security;

-- No public access (service role key bypasses RLS automatically)

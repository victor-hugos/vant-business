-- Rodar no SQL Editor do Supabase
create table subscribers (
  id uuid default gen_random_uuid() primary key,
  nome text not null,
  email text not null unique,
  ebook text not null,
  created_at timestamptz default now()
);

-- Index para busca por ebook (remarketing segmentado)
create index on subscribers (ebook);

-- Habilita Row Level Security (segurança)
alter table subscribers enable row level security;

-- Apenas service_role pode inserir/ler (nossa API usa service key)
create policy "service only" on subscribers
  using (false)
  with check (false);

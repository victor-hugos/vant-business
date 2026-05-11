create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  whatsapp text not null,
  product_id text not null,
  product_title text not null,
  product_type text not null,
  source text not null default 'site',
  consent boolean not null default false,
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists leads_email_idx on public.leads (email);
create index if not exists leads_product_id_idx on public.leads (product_id);
create index if not exists leads_created_at_idx on public.leads (created_at desc);

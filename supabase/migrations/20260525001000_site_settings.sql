create table if not exists public.site_settings (
  key text primary key,
  label text not null,
  description text,
  value text not null default '',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.site_settings enable row level security;
drop policy if exists "service only" on public.site_settings;
create policy "service only" on public.site_settings using (false) with check (false);
revoke all on public.site_settings from anon, authenticated;
grant select, insert, update, delete on public.site_settings to service_role;

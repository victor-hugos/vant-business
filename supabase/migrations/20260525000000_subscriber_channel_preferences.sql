alter table public.subscribers alter column email drop not null;

alter table public.subscribers
  add column if not exists email_ebooks_opt_in boolean not null default false,
  add column if not exists whatsapp_news_opt_in boolean not null default false;

create unique index if not exists subscribers_whatsapp_ebook_key
  on public.subscribers (whatsapp, ebook)
  where whatsapp is not null and btrim(whatsapp) <> '';

create index if not exists subscribers_email_ebooks_idx
  on public.subscribers (email_ebooks_opt_in);

create index if not exists subscribers_whatsapp_news_idx
  on public.subscribers (whatsapp_news_opt_in);

# Lead capture, newsletter e ebooks

## Variaveis de ambiente com Hostinger SMTP

Configure no Vercel:

```text
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=admin@vant.business
SMTP_PASS=
EMAIL_FROM=VANT Business <admin@vant.business>
EMAIL_REPLY_TO=admin@vant.business
ADMIN_LEADS_EMAIL=admin@vant.business
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_SERVICE_KEY=
CRON_SECRET=
EBOOK_IA_TOOLS_URL=
EBOOK_AUTOMACAO_LEADS_URL=
MAX_DIGEST_RECIPIENTS=200
```

Se a porta 465 com SSL falhar, use a alternativa da Hostinger:

```text
SMTP_PORT=587
SMTP_SECURE=false
```

## Banco

Execute `supabase/leads.sql` no Supabase.

## Teste via CLI

Crie um `.env.local` baseado no `.env.example` e rode:

```bash
set -a
source .env.local
set +a
npm run test:email -- seu-email-de-teste@gmail.com
```

Nao salve senha real em arquivo versionado. `.env.local` ja esta no `.gitignore`.

## Email com dominio Hostinger

Para enviar como `admin@vant.business`, a conta precisa existir na Hostinger e a senha precisa estar configurada em `SMTP_PASS`.

Parametros oficiais da Hostinger Email:

- SMTP: `smtp.hostinger.com`
- Porta SSL: `465`
- Alternativa TLS/STARTTLS: `587`
- IMAP: `imap.hostinger.com`, porta `993`

## Fluxos

- `/api/lead-magnet`: recebe nome, email, WhatsApp, produto e consentimento.
- `/api/newsletter-digest`: envia as 10 melhores noticias para inscritos em `daily-ai-news`.

## Agendamento

O `vercel.json` agenda `/api/newsletter-digest` para `0 11 * * *`, que equivale a 08:00 em Sao Paulo quando o fuso esta em UTC-3. O Vercel Cron usa UTC.

Quando `CRON_SECRET` existir no projeto, o Vercel envia esse valor no header `Authorization: Bearer ...`; o endpoint tambem aceita `?secret=` para teste manual.

## Noticias

O site le `public/data/news.json`. O agente de noticias deve atualizar esse arquivo antes do envio diario.

## Segurança operacional

- Nunca expor `SUPABASE_SERVICE_ROLE_KEY` no frontend.
- Proteger `/api/newsletter-digest` com `CRON_SECRET`.
- Revisar ebooks antes de preencher os links `EBOOK_*_URL`.

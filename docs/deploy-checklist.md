# Checklist de deploy — VANT Business

## Antes do commit

- [ ] Rodar npm install
- [ ] Rodar npm run dev
- [ ] Testar menu
- [ ] Testar Modo Recrutador
- [ ] Testar filtros de projetos
- [ ] Testar modal de estudo de caso
- [ ] Testar links externos
- [ ] Testar `/admin-vant`
- [ ] Testar captura de email/WhatsApp
- [ ] Testar rastreamento de cliques em ferramentas
- [ ] Testar botão de currículo
- [ ] Testar responsividade
- [ ] Rodar npm run build

## Git

- [ ] git status
- [ ] git add .
- [ ] git commit -m "feat: create intelligent portfolio"
- [ ] git branch -M main
- [ ] git remote add origin URL_DO_REPOSITORIO
- [ ] git push -u origin main

## Vercel

- [ ] Importar repositório na Vercel
- [ ] Framework: Vite
- [ ] Build command: npm run build
- [ ] Output directory: dist
- [ ] Configurar `SUPABASE_URL`
- [ ] Configurar `SUPABASE_SERVICE_KEY`
- [ ] Configurar `RESEND_API_KEY`
- [ ] Configurar `EMAIL_FROM=VANT Business <noreply@vant.business>`
- [ ] Configurar `LEAD_NOTIFY_EMAIL` com o email que recebe novos leads
- [ ] Configurar `CRON_SECRET`
- [ ] Configurar `ADMIN_EMAIL=admin@vant.business`
- [ ] Configurar `ADMIN_PASSWORD`
- [ ] Configurar `ADMIN_SESSION_SECRET`
- [ ] Configurar `VITE_VANT_WHATSAPP_NUMBER` com numero internacional da VANT, exemplo `5561981663028`
- [ ] Publicar deploy
- [ ] Testar URL gerada
- [ ] Conectar domínio vant.business

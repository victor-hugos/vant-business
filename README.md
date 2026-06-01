# VANT.Business

Site oficial da **VANT.Business**, uma marca unica que combina agencia premium de identidade digital, presenca online, solucoes digitais, IA aplicada, curadoria de ferramentas, conteudo estrategico e captura de leads.

O projeto combina uma vitrine pública com páginas de recursos, blog, ebooks, formulários de captura, rastreamento de cliques e uma área administrativa privada para curadoria de conteúdo e operação dos agentes.

## Proposta oficial do site

A **VANT.Business** existe para ajudar empresas e criadores a crescer com tecnologia, IA, automacao, identidade digital e posicionamento online.

O site deve funcionar como uma ponte entre descoberta e execução: a pessoa encontra ferramentas confiáveis, entende como aplicar IA no próprio contexto, recebe conteúdos úteis e pode avançar para automações personalizadas quando precisar de implementação.

### Promessa central

```txt
Identidade digital, IA e estrategia para transformar presenca em crescimento.
```

### Posicionamento

A VANT.Business não é apenas um portfólio, uma lista de links ou um blog de tecnologia. Ela é uma agencia e plataforma editorial-operacional focada em:

- captar clientes interessados em identidade digital, sites, Instagram,
  Google Meu Negocio, funis e solucoes digitais;
- curar ferramentas de IA úteis;
- explicar aplicações reais sem enrolação;
- capturar leads interessados em IA, automação, produtividade e crescimento
  digital;
- conectar conteúdo, ebooks e newsletter a oportunidades comerciais;
- organizar demanda para projetos de automação e sistemas personalizados.

### Público-alvo

- Empreendedores que querem melhorar presenca digital, captar clientes e
  automatizar processos.
- Criadores que querem produzir mais com IA.
- Pequenas empresas que precisam vender, atender e operar melhor.
- Profissionais que querem escolher boas ferramentas sem perder tempo testando tudo.
- Leads interessados em implementar agentes, integrações e automações.

### Pilares da marca

- **Estratégia**: escolher o que faz sentido antes de automatizar.
- **Conexão**: ligar ferramentas, dados, canais e processos.
- **Resultados**: priorizar ganho real de tempo, clareza, vendas ou operação.
- **Valor**: transformar conhecimento e tecnologia em ativos úteis.

### Experiência esperada

Quem entra no site deve sair com pelo menos um destes próximos passos:

- testar uma ferramenta recomendada;
- ler um conteúdo ou notícia curada;
- baixar ou acessar um ebook;
- entrar na newsletter;
- solicitar uma identidade digital, site, melhoria de presença online ou
  solução digital;
- conhecer melhor a proposta da VANT.Business.

## Status do projeto

- Produção: <https://vant.business>
- Repositório: <https://github.com/victor-hugos/vant-business>
- Projeto principal na Vercel: `vant-business`
- Stack principal: React, Vite, Tailwind CSS, Vercel Serverless Functions, Supabase e SMTP
- Identidade visual atual: tema escuro premium, logomarca oficial em `public/assets`

## O que o site entrega

- Home com posicionamento de marca: automação, IA e escala.
- Biblioteca de ferramentas de IA em `/recursos`.
- Página comercial para identidade digital e soluções digitais em `/solucoes-digitais` com compatibilidade em `/automatize`.
- Blog e curadoria de notícias em `/blog`.
- Páginas de ebook com formulário de captura em `/ebook/:slug`.
- Newsletter com leads salvos no Supabase.
- Rastreamento de cliques em ferramentas e links externos.
- Área administrativa privada em `/admin-vant`.
- Fluxo de curadoria com agentes internos e notícias aprovadas manualmente.
- Deploy centralizado na Vercel usando o projeto `vant-business`.

## Rotas principais

| Rota | Função |
| --- | --- |
| `/` | Página inicial da VANT.Business |
| `/recursos` | Biblioteca de ferramentas de IA |
| `/solucoes-digitais` | Página comercial para identidade digital e soluções digitais |
| `/automatize` | Compatibilidade para links antigos da página comercial |
| `/blog` | Notícias, conteúdos e curadoria |
| `/blog/:slug` | Página individual de artigo |
| `/ebook/:slug` | Captura de lead para ebook |
| `/admin-vant` | Painel administrativo privado |

## Tecnologias

- **React**: interface, componentes e rotas.
- **React Router**: navegação entre páginas públicas e painel admin.
- **Vite**: desenvolvimento local e build de produção.
- **Tailwind CSS**: base visual, responsividade e utilitários.
- **Supabase**: armazenamento de leads, notícias, rascunhos e eventos.
- **Vercel Functions**: APIs serverless em `api/`.
- **Resend**: envio de emails transacionais e newsletter.
- **Marked + gray-matter**: leitura de posts em Markdown.

## Estrutura

```txt
vant-business/
├── api/
│   ├── subscribe.js
│   ├── newsletter-digest.js
│   ├── admin-*.js
│   └── track-click.js
├── docs/
│   ├── deploy-checklist.md
│   ├── maintenance.md
│   └── supabase-setup.sql
├── public/
│   ├── assets/
│   │   ├── vant-logo-white.png
│   │   ├── vant-logo-black.png
│   │   ├── vant-identity-board.png
│   │   └── vant-site-reference.png
│   └── data/
├── scripts/
│   └── news-agent.mjs
├── src/
│   ├── components/
│   ├── data/
│   ├── pages/
│   ├── posts/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── supabase/
│   └── migrations/
├── index.html
├── package.json
├── tailwind.config.js
└── README.md
```

## Como rodar localmente

1. Instale as dependências:

```bash
npm install
```

2. Rode o servidor local:

```bash
npm run dev
```

3. Acesse:

```txt
http://localhost:5173
```

Se a porta `5173` estiver ocupada, o Vite pode abrir em outra porta, como `5174`.

## Scripts disponíveis

```bash
npm run dev
npm run build
npm run preview
npm run agent:news
```

- `npm run dev`: abre o frontend local com Vite.
- `npm run build`: gera a versão de produção em `dist/`.
- `npm run preview`: testa localmente o build gerado.
- `npm run agent:news`: executa o agente local de curadoria de notícias.

## Variáveis de ambiente

As variáveis abaixo devem ficar na Vercel ou em um `.env` local não versionado.

| Variável | Uso |
| --- | --- |
| `SUPABASE_URL` | URL do projeto Supabase |
| `SUPABASE_SERVICE_KEY` | Chave server-side para APIs e admin |
| `RESEND_API_KEY` | Chave da API Resend para envio de emails |
| `EMAIL_FROM` | Remetente verificado, exemplo `VANT Business <noreply@vant.business>` |
| `LEAD_NOTIFY_EMAIL` | Email que recebe notificacoes internas de novos leads |
| `ADMIN_EMAIL` | Email autorizado no painel admin |
| `ADMIN_PASSWORD` | Senha do painel admin |
| `ADMIN_ACCESS_CODE` | Alternativa para senha admin |
| `ADMIN_SESSION_SECRET` | Segredo para assinar sessão admin |
| `CRON_SECRET` | Segredo para rotas agendadas |
| `VITE_VANT_WHATSAPP_NUMBER` | Numero da VANT em formato internacional, exemplo `5561981663028`, para abrir o briefing direto no WhatsApp |
| `NEWS_AGENT_LIMIT` | Limite opcional de itens no agente de notícias |

Em produção, configure `ADMIN_PASSWORD` e `ADMIN_SESSION_SECRET`. Não use credenciais padrão para operar o painel administrativo.

## APIs serverless

As rotas em `api/` rodam como funções serverless na Vercel.

| Arquivo | Função |
| --- | --- |
| `api/subscribe.js` | Captura lead, salva no Supabase e envia email |
| `api/newsletter-digest.js` | Envia digest de newsletter |
| `api/news.js` | Entrega itens de notícia |
| `api/out.js` | Redireciona links externos com rastreamento |
| `api/track-click.js` | Registra eventos de clique |
| `api/admin-login.js` | Login da área administrativa |
| `api/admin-data.js` | Dados do painel administrativo |
| `api/admin-run-agent.js` | Execução lógica dos agentes |
| `api/admin-content-drafts.js` | Rascunhos de conteúdo |
| `api/admin-news-update.js` | Atualização de status das notícias |

Para testar o fluxo completo de APIs localmente, use um ambiente compatível com funções da Vercel e as variáveis configuradas.

## Conteúdo e manutenção

### Ferramentas

As ferramentas exibidas em `/recursos` ficam em:

```txt
src/data/recursos.js
```

Cada item pode conter nome, categoria, descrição, link, UTM, badge e indicação de plano gratuito.

### Posts e ebooks

Os conteúdos em Markdown ficam em:

```txt
src/posts/
```

Posts com metadados de ebook alimentam as páginas `/ebook/:slug` e os cards de captura.

### Identidade visual

Os arquivos oficiais de marca ficam em:

```txt
public/assets/
```

Arquivos principais:

- `vant-logo-white.png`
- `vant-logo-black.png`
- `vant-identity-board.png`
- `vant-site-reference.png`

### Supabase

A base inicial e os campos esperados estão documentados em:

```txt
docs/supabase-setup.sql
supabase/migrations/
```

Antes de publicar mudanças que dependem do banco, confira se as tabelas, índices e colunas existem no Supabase de produção.

## Deploy

O deploy oficial deve ficar centralizado no projeto Vercel:

```txt
vant-business
```

Configuração esperada:

- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Domínios: `vant.business` e `www.vant.business`
- Branch de produção: `main`

Checklist operacional:

```bash
git status
npm run build
```

Depois do deploy, validar:

- Home
- `/recursos`
- `/solucoes-digitais`
- `/automatize`
- `/blog`
- captura em `/ebook/:slug`
- login em `/admin-vant`
- eventos de clique
- envio de email

## Segurança operacional

- Não versionar `.env`, senhas SMTP, service keys ou tokens.
- Manter `SUPABASE_SERVICE_KEY` apenas no servidor.
- Proteger `/admin-vant` com `ADMIN_EMAIL`, `ADMIN_PASSWORD` e `ADMIN_SESSION_SECRET`.
- Proteger rotas agendadas com `CRON_SECRET`.
- Revisar permissões do Supabase antes de abrir novas tabelas.
- Rodar `npm audit --omit=dev` periodicamente.

## Autor

**Victor Hugo Santos de Jesus**

VANT.Business: automação, IA aplicada, conexão e resultados.

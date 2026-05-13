# AI Notes - Vant.Business

Este arquivo e a caixa de entrada da memoria operacional da IA.

Use para registrar descobertas, riscos, sugestoes e proximos passos depois de
uma sessao de trabalho. Nada aqui e decisao final ate Victor aprovar e mover
para `docs/decisions.md`, `docs/architecture.md` ou para uma nota autoral no
Obsidian.

## Regras

- Registrar fatos observados no codigo ou na documentacao.
- Separar fato, inferencia e sugestao.
- Nao registrar credenciais, tokens ou dados sensiveis.
- Nao tratar recomendacoes da IA como decisao final.

## Registro inicial

Data: 2026-05-12

### Fatos

- O projeto Vant.Business tem `README.md` com proposta oficial, rotas,
  tecnologias e estrutura.
- O projeto usa React, Vite, Tailwind CSS, Vercel Functions e Supabase.
- Existem scripts `npm run build`, `npm run dev`, `npm run preview`,
  `npm run agent:news` e `npm run check:tool-logos`.

### Inferencias

- O `README.md` deve ser tratado como fonte inicial da verdade tecnica e de
  produto.
- Mudancas de produto devem ser sincronizadas com a area Vant Business no
  Obsidian antes de virarem decisoes permanentes.

### Sugestoes

- Manter este arquivo como rascunho de memoria da IA.
- Mover apenas decisoes aprovadas para `docs/decisions.md`.
- Registrar sessoes longas em `logs/codex-session.md`.

## 2026-05-12 - Nova visao estrategica informada pelo Victor

### Fatos informados pelo Victor

- A VANT.BUSINESS deve evoluir para uma agencia de marketing, tecnologia,
  IA, automacao, presenca digital, branding, crescimento de negocios,
  ferramentas digitais e marketing inteligente.
- A estrategia nao e criar marcas separadas. A direcao desejada e construir
  um ecossistema digital com multiplas portas de entrada sob a mesma marca.
- Posicionamento central desejado:
  "Ajudamos empresas e criadores a crescer utilizando tecnologia, IA,
  automacao e posicionamento digital."
- A marca deve transmitir sofisticacao, estrategia, modernidade, tecnologia,
  autoridade, percepcao premium e confianca.
- O TikTok deve funcionar como canal de alcance, descoberta e crescimento,
  com conteudos rapidos sobre ferramentas de IA, automacao, marketing,
  produtividade, tendencias, apps uteis, tutoriais, afiliados e sistemas
  inteligentes.
- O Instagram deve funcionar como canal de autoridade e conversao, com foco
  em branding, identidade visual, posicionamento digital, sites
  profissionais, antes e depois, organizacao de perfil, autoridade visual,
  estrategia digital, presenca online, resultados de clientes e mockups
  premium.
- O site deve funcionar como centro do ecossistema: hub principal, portfolio,
  biblioteca de ferramentas IA, noticias IA, area de automacoes, servicos,
  newsletter, captura de leads e motor de conversao.
- Funcao estrategica dos canais:
  - TikTok: atrair.
  - Instagram: convencer.
  - Site: converter.
- Identidade visual desejada:
  - Preto: `#050505`, `#0B0B0B`, `#111111`.
  - Metalico/prata: `#BFC2C7`, `#E5E5E5`, `#8E8E8E`.
  - Glow discreto: `rgba(255,255,255,0.08)`.
  - Fontes ideais: Space Grotesk, Satoshi, Clash Display e Inter.
- A VANT nao deve parecer freelancer comum, designer generico, perfil
  aleatorio de IA, agencia barata ou pagina amadora.
- A VANT deve parecer uma empresa tecnologica premium focada em crescimento
  digital, com percepcao de startup seria de tecnologia.
- Monetizacao desejada:
  - Entrada: identidade visual, Instagram, Google Meu Negocio e sites.
  - Escalada: automacao, IA, WhatsApp inteligente, CRM, integracoes, funis e
    sistemas personalizados.
  - Paralela: afiliados IA, ferramentas, newsletter, conteudo, automacoes,
    produtos digitais e consultoria.
- Frases-chave informadas:
  - Automacao. IA. Escala.
  - Presenca gera percepcao.
  - Empresas fortes parecem fortes.
  - O digital virou vitrine.
  - Posicionamento e autoridade.
  - Design vende confianca.
  - Estrategia. Conexao. Resultados.
  - Impulsionamos negocios. Geramos valor.

### Inferencias

- A VANT deve deixar de ser percebida apenas como site de conteudo, portfolio
  ou biblioteca de IA, e passar a operar como marca central de uma agencia
  premium com conteudo, autoridade, leads, afiliados e servicos conectados.
- A biblioteca de ferramentas IA e as noticias IA continuam valiosas, mas
  devem servir ao posicionamento maior: atrair audiencia qualificada,
  construir autoridade e gerar oportunidades comerciais.
- O site provavelmente precisa priorizar clareza de oferta, prova de
  autoridade, servicos, portfolio, captura de leads e caminhos de conversao,
  sem perder os ativos de conteudo e afiliados ja existentes.
- O TikTok e o Instagram pedem estrategias visuais e editoriais diferentes:
  TikTok mais rapido, tech e viral; Instagram mais premium, organizado e
  orientado a confianca/comercial.
- As proximas mudancas de produto devem separar rascunho, revisao e
  publicacao para conteudos, ferramentas, cases, servicos e campanhas.

### Sugestoes

- Tratar esta secao como briefing estrategico operacional ate Victor aprovar
  quais pontos viram decisao permanente em `docs/decisions.md`.
- Revisar a homepage para comunicar rapidamente que a VANT e uma empresa
  premium de crescimento digital com IA, automacao, branding e presenca
  online.
- Reorganizar a arquitetura do site em torno de:
  Homepage premium, Servicos, Portfolio/Cases, Automacao, Biblioteca IA,
  Noticias IA, Newsletter e Captura de leads.
- Criar uma matriz simples de canais:
  TikTok atrai, Instagram convence, Site converte.
- Definir ofertas de entrada antes de mexer no funil:
  identidade visual, organizacao de Instagram, Google Meu Negocio e site
  profissional.
- Definir ofertas de escalada depois:
  automacao, IA, CRM, WhatsApp inteligente, integracoes, funis e sistemas.
- Fazer a primeira mudanca de implementacao de forma pequena e reversivel:
  atualizar copy/posicionamento da homepage e navegacao antes de refatorar
  componentes grandes ou mudar arquitetura.

### Pontos para aprovacao do Victor

- Confirmar se o README deve ser atualizado para refletir a nova visao.
- Confirmar se a VANT deixa de ter foco principal em "conteudo/curadoria de
  IA" e passa a ter foco principal em "agencia premium de crescimento digital
  com IA e automacao".
- Confirmar quais servicos entram primeiro na homepage.
- Confirmar se biblioteca IA e noticias IA continuam como secoes principais
  ou passam a funcionar como portas de entrada de conteudo.

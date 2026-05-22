import { Link } from 'react-router-dom';
import ToolLogo from '../components/ToolLogo.jsx';
import { getAllPosts } from '../utils/posts.js';
import { recursos } from '../data/recursos.js';
import { trackEvent, trackedToolHref } from '../utils/tracking.js';

const pillars = [
  {
    title: 'Posicionamento Premium',
    text: 'Marca, presença digital e autoridade para empresas que precisam parecer fortes.',
    icon: 'brain',
  },
  {
    title: 'IA Aplicada',
    text: 'Automação, agentes e sistemas para ganhar velocidade com método.',
    icon: 'box',
  },
  {
    title: 'Soluções Digitais',
    text: 'Sites, identidade digital, funis e estrutura para crescer com clareza.',
    icon: 'nodes',
  },
  {
    title: 'Conteúdo de Entrada',
    text: 'Ferramentas, notícias e guias que atraem audiência e geram oportunidades.',
    icon: 'doc',
  },
];

const newsHighlights = [
  {
    slug: 'curadoria-diaria',
    label: 'Radar diário',
    title: 'Leituras para acompanhar lançamentos, movimentos de mercado e sinais de produto.',
    cta: 'Ler curadoria ›',
  },
  {
    slug: 'traducao-pratica',
    label: 'Tradução prática',
    title: 'Resumo em português do que merece atenção antes de virar pauta, teste ou automação.',
    cta: 'Ver leitura ›',
  },
  {
    slug: 'menos-ruido',
    label: 'Sem ruído',
    title: 'A seleção da VANT filtra hype e destaca o que tem impacto real para operação e conteúdo.',
    cta: 'Abrir notícias ›',
  },
];

function PillarIcon({ type }) {
  const common = {
    className: 'h-7 w-7',
    viewBox: '0 0 32 32',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': 'true',
  };

  if (type === 'brain') {
    return (
      <svg {...common}>
        <path d="M12 6.5c-2.6 0-4.8 2-4.8 4.5v10c0 2.5 2.2 4.5 4.8 4.5M20 6.5c2.6 0 4.8 2 4.8 4.5v10c0 2.5-2.2 4.5-4.8 4.5M12 6.5v19M20 6.5v19" stroke="currentColor" strokeWidth="1.35" />
        <path d="M9.2 12.2h4.2M9.2 18.8h4.2M18.6 12.2h4.2M18.6 18.8h4.2M13.4 15.5H20" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === 'box') {
    return (
      <svg {...common}>
        <path d="M16 4.5 26 10v12L16 27.5 6 22V10L16 4.5Z" stroke="currentColor" strokeWidth="1.35" />
        <path d="M6.5 10.2 16 15.7l9.5-5.5M16 15.7v11" stroke="currentColor" strokeWidth="1.35" />
        <path d="m11 7.4 10 5.7M21 7.4l-10 5.7" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      </svg>
    );
  }

  if (type === 'nodes') {
    return (
      <svg {...common}>
        <circle cx="9" cy="11" r="3.3" stroke="currentColor" strokeWidth="1.35" />
        <circle cx="23" cy="11" r="3.3" stroke="currentColor" strokeWidth="1.35" />
        <circle cx="16" cy="23" r="3.3" stroke="currentColor" strokeWidth="1.35" />
        <path d="M12 12.5h8M10.7 13.9l3.7 6.1M21.3 13.9 17.6 20" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M9 5.5h10l4 4v17H9v-21Z" stroke="currentColor" strokeWidth="1.35" />
      <path d="M19 5.5v4h4M12 14h8M12 18h8M12 22h5" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      <circle cx="22.5" cy="23.5" r="3.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="m21.2 23.4 1 1 1.7-2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HomePage() {
  const ebookPosts = getAllPosts().filter((post) => post.ebook !== undefined).slice(0, 3);
  const featuredTools = recursos.filter((r) => r.badge === 'Que uso').slice(0, 6);

  return (
    <div className="reference-home">
      <section className="reference-hero">
        <div className="reference-hero-copy">
          <div className="reference-mobile-brand" aria-hidden="true">
            <img src="/assets/vant-logo-white.png" alt="" />
            <div>
              <p>VANT.BUSINESS</p>
              <span>Estrategia · Conexao · Resultados</span>
            </div>
          </div>

          <div className="reference-kicker">
            <span />
            <p>Tecnologia · Estratégia · Resultados</p>
          </div>

          <h1>
            <span>Presença.</span>
            <span>IA.</span>
            <span>Crescimento.</span>
          </h1>

          <p className="reference-hero-text">
            A VANT transforma presenca digital, tecnologia e IA em crescimento real. Explore ferramentas, noticias e guias práticos ou avance para a página de soluções se o seu foco for posicionamento, estrutura e conversão.
          </p>

          <div className="reference-actions">
            <Link to="/solucoes-digitais" className="reference-button reference-button-primary">
              Apresentar meu projeto
              <span>›</span>
            </Link>
            <Link to="/blog" className="reference-button reference-button-secondary">Explorar notícias<span aria-hidden="true">›</span></Link>
            <Link to="/recursos" className="reference-button reference-button-secondary">Explorar ferramentas<span aria-hidden="true">›</span></Link>
            <a href="#conteudos" className="reference-button reference-button-secondary">Explorar ebooks<span aria-hidden="true">›</span></a>
          </div>

          <div className="reference-proof">
            <div className="reference-avatars" aria-hidden="true">
              {['BR', 'IA', 'WEB', 'CRM'].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <p>Branding, presença digital, automação, conteúdo e inteligência comercial na mesma marca.</p>
          </div>
        </div>

        <div className="reference-hero-mark">
          <div className="reference-orbit" aria-hidden="true" />
          <img src="/assets/vant-logo-white.png" alt="VANT.Business" />
          <div className="reference-light" aria-hidden="true" />
          <div className="reference-index" aria-label="Seções do destaque">
            <span className="is-active">01</span>
            <span>02</span>
            <span>03</span>
          </div>
        </div>
      </section>

      <section className="reference-pillars" aria-labelledby="vant-definition">
        <h2 id="vant-definition">A VANT conecta percepção, tecnologia e conversão</h2>
        <div className="reference-pillar-grid">
          {pillars.map((item) => (
            <article key={item.title} className="reference-pillar-card">
              <div className="reference-icon-frame">
                <PillarIcon type={item.icon} />
              </div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
              <span className="reference-card-arrow">›</span>
            </article>
          ))}
        </div>
      </section>

      <section className="reference-library">
        <div className="reference-section-head">
          <div>
            <p>Ferramentas para pesquisa aplicada</p>
            <h2>Curadoria para entender o que vale teste, estudo e integração.</h2>
          </div>
          <Link to="/recursos">Explorar acervo</Link>
        </div>

        <div className="reference-tool-grid">
          {featuredTools.map((tool) => (
            <a
              key={tool.id}
              href={trackedToolHref(tool.id, 'home-reference-tool')}
              target="_blank"
              rel="noreferrer"
              className="reference-tool-card"
            >
              <ToolLogo tool={tool} className="reference-tool-logo" />
              <h3>{tool.name}</h3>
              <p>{tool.description}</p>
              <div>
                <span>{tool.categoria}</span>
                <strong>Abrir análise</strong>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="reference-split" id="conteudos">
        <div>
          <div className="reference-section-head compact">
            <div>
              <p>Guias para aprofundar a prática</p>
              <h2>Ebooks e guias para aprofundar a prática</h2>
            </div>
            <Link to="/blog">Ver biblioteca</Link>
          </div>

          <div className="reference-list">
            {ebookPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/ebook/${post.slug}`}
                onClick={() =>
                  trackEvent({
                    eventType: 'click',
                    itemType: 'ebook',
                    itemId: post.slug,
                    itemTitle: post.title,
                    source: 'home-reference-ebook-card',
                  })
                }
              >
                <span>{post.date}</span>
                <strong>{post.title}</strong>
                <em>Ler guia ›</em>
              </Link>
            ))}
          </div>
        </div>

        <div id="cases">
          <div className="reference-section-head compact">
            <div>
              <p>Leituras e sinais de mercado</p>
              <h2>Notícias para acompanhar sem ruído</h2>
            </div>
            <Link to="/blog">Ver curadoria</Link>
          </div>

          <div className="reference-list">
            {newsHighlights.map((item) => (
              <Link key={item.slug} to="/blog">
                <span>{item.label}</span>
                <strong>{item.title}</strong>
                <em>{item.cta}</em>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;

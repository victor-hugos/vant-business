import { Link } from 'react-router-dom';
import VantLogo from '../components/VantLogo.jsx';

const pillars = [
  {
    title: 'Presença Digital Premium',
    text: 'Sites, identidade e posicionamento para sua empresa transmitir autoridade e confiança.',
    icon: 'brain',
  },
  {
    title: 'Atendimento Inteligente',
    text: 'Pré-briefings, WhatsApp, formulários e fluxos para organizar a entrada dos clientes.',
    icon: 'nodes',
  },
  {
    title: 'IA e Automações',
    text: 'Agentes, notificações e processos automáticos para ganhar velocidade e reduzir tarefas manuais.',
    icon: 'box',
  },
  {
    title: 'Estrutura de Crescimento',
    text: 'Funis, áreas do cliente, agendamentos e soluções digitais para transformar leads em clientes.',
    icon: 'doc',
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
  return (
    <div className="reference-home">
      <section className="reference-hero">
        <div className="reference-hero-copy">
          <div className="reference-kicker">
            <span />
            <p>Estruture . Organize . Conecte.</p>
          </div>

          <h1>
            <span>Presença.</span>
            <span>IA.</span>
            <span>Crescimento.</span>
          </h1>

          <p className="reference-hero-text">
            A VANT transforma presença digital, tecnologia e IA em estrutura de captação, atendimento e conversão para empresas que querem crescer com mais organização.
          </p>

          <div className="reference-actions">
            <Link to="/diagnostico" className="reference-button reference-button-primary">
              Conhecer soluções
              <span>›</span>
            </Link>
            <Link to="/solucoes" className="reference-button reference-button-secondary">Ver soluções digitais</Link>
          </div>

          <div className="reference-proof">
            <span>Presença digital</span>
            <span>Automação</span>
            <span>Crescimento</span>
          </div>
        </div>

        <div className="reference-hero-mark">
          <div className="reference-orbit" aria-hidden="true" />
          <VantLogo width="min(28vw, 300px)" height="min(31vw, 336px)" alt="VANT.Business" />
          <div className="reference-light" aria-hidden="true" />
          <div className="reference-index" aria-label="Seções do destaque">
            <span className="is-active">01</span>
            <span>02</span>
            <span>03</span>
          </div>
        </div>
      </section>

      <section className="reference-pillars" aria-labelledby="vant-definition">
        <div className="reference-pillars-head">
          <p>A VANT conecta percepção, tecnologia e conversão</p>
          <h2 id="vant-definition">A VANT conecta presença digital, automação e crescimento</h2>
          <span>
            Criamos estruturas digitais para empresas que querem ser mais profissionais, captar melhor, atender com mais organização e transformar oportunidades em clientes.
          </span>
        </div>
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
        <p className="reference-pillars-note">
          A VANT.Business não entrega apenas sites. Entregamos estruturas digitais para empresas que querem atender melhor, vender com mais clareza e crescer com mais organização.
        </p>
        <Link to="/solucoes" className="reference-pillars-link">
          Conhecer soluções
          <span>›</span>
        </Link>
      </section>
    </div>
  );
}

export default HomePage;

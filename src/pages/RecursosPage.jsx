import { Link } from 'react-router-dom';
import VantLogo from '../components/VantLogo.jsx';

const painPoints = [
  {
    title: 'Lead sem contexto',
    text: 'Leads chegam por WhatsApp, Instagram, site e indicacoes sem roteiro padrao.',
    icon: 'nodes',
  },
  {
    title: 'Atendimento repetitivo',
    text: 'A equipe repete perguntas, perde contexto e depende de memoria para dar continuidade.',
    icon: 'doc',
  },
  {
    title: 'Follow-up perdido',
    text: 'O cliente interessado esfria porque nao existe retorno, status ou proximo passo claro.',
    icon: 'clock',
  },
  {
    title: 'Operacao espalhada',
    text: 'Informacoes ficam espalhadas em conversas, planilhas, emails e processos soltos.',
    icon: 'box',
  },
];

const solutionBlocks = [
  {
    title: 'Roteiro de atendimento padronizado',
    text: 'Perguntas certas, etapas de qualificacao e criterios para cada lead entrar com informacao util.',
    icon: 'doc',
  },
  {
    title: 'Pre-briefing comercial',
    text: 'Formulario ou WhatsApp guiado para capturar objetivo, urgencia, orcamento, servico desejado e contexto.',
    icon: 'nodes',
  },
  {
    title: 'Triagem e prioridade',
    text: 'Separacao entre curiosos, oportunidades reais e demandas urgentes para a equipe agir com foco.',
    icon: 'target',
  },
  {
    title: 'Follow-up estruturado',
    text: 'Lembretes, mensagens e proximos passos visiveis para oportunidades nao sumirem depois do primeiro contato.',
    icon: 'clock',
  },
  {
    title: 'Base de oportunidades',
    text: 'Historico, origem, status e etapa do lead organizados em um fluxo simples de acompanhamento.',
    icon: 'box',
  },
  {
    title: 'Integracoes com IA',
    text: 'Conexao entre formulario, WhatsApp, email, planilha, CRM e automacoes para reduzir tarefas manuais.',
    icon: 'brain',
  },
];

const processSteps = [
  {
    label: '01',
    title: 'Diagnóstico e implementação',
    text: 'Entendemos como o cliente chega hoje, quais etapas travam e quais informacoes precisam virar fluxo.',
  },
  {
    label: '02',
    title: 'Padronização operacional',
    text: 'Transformamos perguntas, mensagens, status e responsabilidades em um roteiro claro para atendimento.',
  },
  {
    label: '03',
    title: 'Automação aplicada',
    text: 'Conectamos canais, formularios, notificacoes e bases para economizar tempo sem perder controle.',
  },
  {
    label: '04',
    title: 'Escala digital',
    text: 'A operacao passa a captar melhor, responder com mais clareza e acompanhar oportunidades com consistencia.',
  },
];

const outcomes = [
  'menos tarefas manuais',
  'mais velocidade no atendimento',
  'lead chegando com contexto',
  'proximo passo visivel',
  'equipe com roteiro claro',
  'operacao pronta para crescer',
];

const brandSignals = ['Estratégia', 'Conexão', 'Resultados', 'Valor'];

const leadFlow = [
  {
    title: 'Entrada',
    text: 'O lead chega por um canal claro, com origem e interesse identificados.',
  },
  {
    title: 'Qualificação',
    text: 'Perguntas certas filtram urgencia, perfil, objetivo e potencial de compra.',
  },
  {
    title: 'Atendimento',
    text: 'A equipe recebe contexto, roteiro e proximo passo para responder melhor.',
  },
  {
    title: 'Conversão',
    text: 'Oportunidades seguem com status, follow-up e caminho comercial visivel.',
  },
];

const comparisonColumns = [
  {
    title: 'Antes da VANT',
    items: [
      'Lead chega sem contexto',
      'Equipe repete perguntas',
      'Retorno depende de memoria',
      'Oportunidade some no WhatsApp',
    ],
  },
  {
    title: 'Depois da VANT',
    items: [
      'Entrada com dados essenciais',
      'Roteiro padronizado de atendimento',
      'Follow-up e status visiveis',
      'Processo pronto para escalar',
    ],
  },
];

const fitCards = [
  {
    title: 'Recebe leads por varios canais',
    text: 'Empresas que precisam organizar WhatsApp, Instagram, site e indicacoes sem perder contexto.',
  },
  {
    title: 'Vende servico, projeto ou diagnostico',
    text: 'Operacoes que dependem de conversa clara, proposta coerente e proximo passo visivel.',
  },
  {
    title: 'Sofre com improviso no atendimento',
    text: 'Equipes que repetem perguntas, demoram a responder ou deixam oportunidades esfriar.',
  },
  {
    title: 'Precisa escalar sem baguncar',
    text: 'Negocios que querem crescer com processo, automacao e acompanhamento simples.',
  },
];

function ConversionIcon({ type }) {
  const common = {
    className: 'h-7 w-7',
    viewBox: '0 0 32 32',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': 'true',
  };

  if (type === 'nodes') {
    return (
      <svg {...common}>
        <circle cx="9" cy="10" r="3.2" stroke="currentColor" strokeWidth="1.35" />
        <circle cx="23" cy="10" r="3.2" stroke="currentColor" strokeWidth="1.35" />
        <circle cx="16" cy="23" r="3.2" stroke="currentColor" strokeWidth="1.35" />
        <path d="M12 11.5h8M10.6 12.8l3.8 7M21.4 12.8l-3.8 7" stroke="currentColor" strokeLinecap="round" strokeWidth="1.35" />
      </svg>
    );
  }

  if (type === 'doc') {
    return (
      <svg {...common}>
        <path d="M9 5.5h10l4 4v17H9v-21Z" stroke="currentColor" strokeWidth="1.35" />
        <path d="M19 5.5v4h4M12 14h8M12 18h8M12 22h5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.35" />
      </svg>
    );
  }

  if (type === 'clock') {
    return (
      <svg {...common}>
        <circle cx="16" cy="16" r="10.5" stroke="currentColor" strokeWidth="1.35" />
        <path d="M16 9.5V16l4.8 3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35" />
        <path d="M7.5 6.8 5.4 9M24.5 6.8 26.6 9" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" opacity="0.55" />
      </svg>
    );
  }

  if (type === 'target') {
    return (
      <svg {...common}>
        <circle cx="16" cy="16" r="10.5" stroke="currentColor" strokeWidth="1.35" />
        <circle cx="16" cy="16" r="5.8" stroke="currentColor" strokeWidth="1.35" />
        <circle cx="16" cy="16" r="1.8" fill="currentColor" />
        <path d="M16 4.5v4M16 23.5v4M4.5 16h4M23.5 16h4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" opacity="0.6" />
      </svg>
    );
  }

  if (type === 'brain') {
    return (
      <svg {...common}>
        <path d="M12 6.5c-2.6 0-4.8 2-4.8 4.5v10c0 2.5 2.2 4.5 4.8 4.5M20 6.5c2.6 0 4.8 2 4.8 4.5v10c0 2.5-2.2 4.5-4.8 4.5M12 6.5v19M20 6.5v19" stroke="currentColor" strokeWidth="1.35" />
        <path d="M9.2 12.2h4.2M9.2 18.8h4.2M18.6 12.2h4.2M18.6 18.8h4.2M13.4 15.5H20" stroke="currentColor" strokeLinecap="round" strokeWidth="1.35" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M16 4.5 26 10v12L16 27.5 6 22V10L16 4.5Z" stroke="currentColor" strokeWidth="1.35" />
      <path d="M6.5 10.2 16 15.7l9.5-5.5M16 15.7v11" stroke="currentColor" strokeWidth="1.35" />
      <path d="m11 7.4 10 5.7M21 7.4l-10 5.7" stroke="currentColor" strokeWidth="1" opacity="0.55" />
    </svg>
  );
}

function RecursosPage() {
  return (
    <div className="conversion-page mx-auto max-w-7xl lg:-mt-6">
      <section className="conversion-hero">
        <div className="conversion-hero-copy">
          <div>
            <div className="conversion-pills flex flex-wrap items-center gap-2">
              <span className="brand-pill px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]">
                Solucoes digitais
              </span>
              <span className="brand-pill px-3 py-1 text-[11px] font-medium">
                Automacao · Atendimento · Escala
              </span>
            </div>

            <h1 className="conversion-title brand-title">
              Soluções digitais que transformam operação em crescimento
            </h1>
            <p className="conversion-lead">
              A VANT estrutura captação, atendimento, automação e escala digital para empresas que querem parar de improvisar e começar a operar com clareza.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {['entrada clara', 'processo visivel', 'proximo passo definido'].map((item) => (
                <span key={item} className="brand-pill px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em]">
                  {item}
                </span>
              ))}
            </div>

            <div className="conversion-actions flex flex-col gap-3 sm:flex-row">
              <Link to="/solucoes-digitais#briefing-form" className="brand-button-primary px-6 py-3 text-xs">
                Solicitar diagnóstico da entrada de leads
              </Link>
              <a href="#solucoes" className="brand-button-secondary px-6 py-3 text-xs">
                Ver exemplos
              </a>
            </div>
          </div>

          <div className="conversion-signature">
            <VantLogo size={42} />
            <span />
            <p>Estratégia · Conexão · Resultados</p>
          </div>
        </div>

        <aside className="conversion-visual">
          <div className="conversion-brand-board" aria-hidden="true">
            <div className="conversion-brand-emblem">
              <VantLogo size={138} />
            </div>
            <p className="conversion-brand-name">VANT.BUSINESS</p>
            <span className="conversion-brand-rule" />
            <p className="conversion-brand-line">Impulsionamos negócios. Geramos valor.</p>

            <div className="conversion-brand-signals">
              {brandSignals.map((signal) => (
                <span key={signal}>{signal}</span>
              ))}
            </div>
          </div>

          <div className="conversion-pipeline">
            <div className="conversion-pipeline-head">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/10 bg-white/[0.04]">
                <VantLogo size={30} />
              </div>
              <div>
                <p className="brand-title text-sm font-bold text-white">VANT.BUSINESS</p>
                <p className="mt-1 text-[0.62rem] uppercase tracking-[0.18em] text-[#7f7f7f]">
                  Lead claro. Processo visivel.
                </p>
              </div>
            </div>

            <div className="conversion-outcomes">
              {leadFlow.map((item, index) => (
                <div key={item.title} className="conversion-outcome-row">
                  <small>{String(index + 1).padStart(2, '0')}</small>
                  <span>
                    <strong>{item.title}</strong>
                    <em>{item.text}</em>
                  </span>
                  <span aria-hidden="true">→</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="conversion-problem">
        <div className="conversion-section-intro">
          <p className="brand-kicker">O problema</p>
          <h2 className="brand-title mt-3 text-3xl font-bold leading-tight text-white">
            Crescer no digital fica caro quando o atendimento depende de improviso.
          </h2>
          <p className="mt-4 text-sm leading-6 text-[#a6a6a6]">
            A VANT organiza a operacao antes de automatizar. Assim, tecnologia entra para sustentar processo, nao para criar mais bagunca.
          </p>

          <div className="conversion-diagnosis-list">
            <div className="conversion-diagnosis-item">
              <p>Leitura rapida</p>
              <span>Se a entrada do lead esta confusa, a venda fica mais lenta e mais cara.</span>
            </div>
            <div className="conversion-diagnosis-item">
              <p>Foco</p>
              <span>A pagina mostra a estrutura antes de pedir o briefing.</span>
            </div>
            <div className="conversion-diagnosis-item">
              <p>Resultado</p>
              <span>Menos improviso, mais contexto e proximo passo visivel.</span>
            </div>
          </div>
        </div>

        <div className="conversion-problem-grid">
          {painPoints.map((item, index) => (
            <article key={item.title} className="conversion-problem-card">
              <div className="conversion-card-head">
                <div className="conversion-icon-frame">
                  <ConversionIcon type={item.icon} />
                </div>
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="text-lg font-semibold leading-tight text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#d8d8d8]">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="solucoes" className="conversion-solutions">
        <div className="conversion-solutions-head">
          <div>
            <p className="brand-kicker">Solucoes que a VANT implementa</p>
            <h2 className="brand-title mt-2 max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl">
              Exemplos reais de estrutura para captar, atender e escalar
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-[#a6a6a6]">
            A tecnologia muda conforme o caso. O que permanece e a estrutura: entrada clara, processo padronizado e acompanhamento consistente.
          </p>
        </div>

        <div className="conversion-solution-grid">
          {solutionBlocks.map((solution, index) => (
            <article key={solution.title} className="conversion-solution-card">
              <div className="conversion-card-head">
                <div className="conversion-icon-frame">
                  <ConversionIcon type={solution.icon} />
                </div>
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="text-lg font-semibold leading-tight text-white">{solution.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#a6a6a6]">{solution.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="conversion-before-after">
        {comparisonColumns.map((column) => (
          <article key={column.title} className="conversion-compare-column">
            <p className="brand-kicker">{column.title}</p>
            <div className="mt-5 grid gap-3">
              {column.items.map((item, index) => (
                <div key={item} className="conversion-compare-row">
                  <small>{String(index + 1).padStart(2, '0')}</small>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="conversion-fit brand-panel p-6 sm:p-8">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="brand-kicker">Para quem faz sentido</p>
            <h2 className="brand-title mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl">A pagina funciona melhor para empresas que precisam de ordem comercial</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-[#a6a6a6]">
            O objetivo nao e impressionar por volume. E qualificar a pessoa certa, rapido o suficiente para virar conversa comercial.
          </p>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {fitCards.map((card) => (
            <article key={card.title} className="brand-card p-4">
              <h3 className="text-base font-semibold leading-tight text-white">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#a6a6a6]">{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="conversion-process">
        {processSteps.map((step) => (
          <article key={step.label} className="conversion-process-card">
            <span className="text-xs font-semibold text-[#a6a6a6]">{step.label}</span>
            <h2 className="mt-4 text-xl font-semibold leading-tight text-white">{step.title}</h2>
            <p className="mt-3 text-sm leading-6 text-[#a6a6a6]">{step.text}</p>
          </article>
        ))}
      </section>

      <section className="conversion-final-cta">
        <p className="brand-kicker">Proximo passo</p>
        <h2 className="brand-title mx-auto mt-3 max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl">
          Voce nao precisa de mais improviso. Precisa de uma entrada de leads que vire processo comercial.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#a6a6a6]">
          A VANT desenha o fluxo, define a tecnologia, implementa automacoes e deixa sua operacao mais preparada para captar, atender e crescer.
        </p>
        <Link to="/solucoes-digitais#briefing-form" className="brand-button-primary mt-6 px-7 py-3 text-xs">
          Criar uma solucao para minha empresa
        </Link>
      </section>
    </div>
  );
}

export default RecursosPage;

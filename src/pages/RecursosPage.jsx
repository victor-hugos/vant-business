import { Link } from 'react-router-dom';
import VantLogo from '../components/VantLogo.jsx';

const painPoints = [
  {
    title: 'Lead sem contexto',
    text: 'Leads chegam por WhatsApp, Instagram, site e indicacoes sem roteiro padrao.',
  },
  {
    title: 'Atendimento repetitivo',
    text: 'A equipe repete perguntas, perde contexto e depende de memoria para dar continuidade.',
  },
  {
    title: 'Follow-up perdido',
    text: 'O cliente interessado esfria porque nao existe retorno, status ou proximo passo claro.',
  },
  {
    title: 'Operacao espalhada',
    text: 'Informacoes ficam espalhadas em conversas, planilhas, emails e processos soltos.',
  },
];

const solutionBlocks = [
  {
    title: 'Roteiro de atendimento padronizado',
    text: 'Perguntas certas, etapas de qualificacao e criterios para cada lead entrar com informacao util.',
  },
  {
    title: 'Pre-briefing comercial',
    text: 'Formulario ou WhatsApp guiado para capturar objetivo, urgencia, orcamento, servico desejado e contexto.',
  },
  {
    title: 'Triagem e prioridade',
    text: 'Separacao entre curiosos, oportunidades reais e demandas urgentes para a equipe agir com foco.',
  },
  {
    title: 'Follow-up estruturado',
    text: 'Lembretes, mensagens e proximos passos visiveis para oportunidades nao sumirem depois do primeiro contato.',
  },
  {
    title: 'Base de oportunidades',
    text: 'Historico, origem, status e etapa do lead organizados em um fluxo simples de acompanhamento.',
  },
  {
    title: 'Integracoes com IA',
    text: 'Conexao entre formulario, WhatsApp, email, planilha, CRM e automacoes para reduzir tarefas manuais.',
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

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="brand-card p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[#7f7f7f]">Leitura rapida</p>
              <p className="mt-3 text-sm leading-6 text-[#d8d8d8]">Se a entrada do lead esta confusa, a venda fica mais lenta e mais cara.</p>
            </div>
            <div className="brand-card p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[#7f7f7f]">Foco</p>
              <p className="mt-3 text-sm leading-6 text-[#d8d8d8]">A pagina mostra a estrutura antes de pedir o briefing.</p>
            </div>
            <div className="brand-card p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[#7f7f7f]">Resultado</p>
              <p className="mt-3 text-sm leading-6 text-[#d8d8d8]">Menos improviso, mais contexto e proximo passo visivel.</p>
            </div>
          </div>
        </div>

        <div className="conversion-problem-grid">
          {painPoints.map((item, index) => (
            <article key={item.title} className="conversion-problem-card">
              <span>{String(index + 1).padStart(2, '0')}</span>
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
              <span>{String(index + 1).padStart(2, '0')}</span>
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

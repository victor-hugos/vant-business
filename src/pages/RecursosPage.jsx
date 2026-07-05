import { Link } from 'react-router-dom';
import VantLogo from '../components/VantLogo.jsx';

const heroSignals = ['Sites', 'Atendimento', 'Automações', 'Sistemas personalizados'];

const journeyBreak = [
  {
    label: '01',
    title: 'O cliente chega',
    text: 'Site, Instagram, anúncio, WhatsApp ou indicação abrem uma oportunidade real.',
  },
  {
    label: '02',
    title: 'A operação se perde',
    text: 'Mensagens, informações e próximos passos ficam espalhados entre canais e pessoas.',
  },
  {
    label: '03',
    title: 'A oportunidade esfria',
    text: 'O retorno depende da memória da equipe e o cliente não sabe o que acontece agora.',
  },
];

const pillars = [
  {
    title: 'Captar',
    text: 'Criamos os pontos de entrada certos para transformar visitantes em oportunidades identificadas.',
    examples: 'Sites • Landing pages • Formulários • Canais digitais',
  },
  {
    title: 'Atender',
    text: 'Organizamos a entrada, as informações e o direcionamento de cada contato.',
    examples: 'WhatsApp • Qualificação • CRM • Agendamentos',
  },
  {
    title: 'Converter',
    text: 'Automatizamos os próximos passos para que oportunidades não sejam esquecidas.',
    examples: 'Follow-ups • Propostas • Lembretes • Dados',
  },
];

const transformations = [
  ['Site apenas apresenta', 'Site também identifica e capta oportunidades'],
  ['WhatsApp acumula mensagens', 'Cada contato entra em um processo e recebe um próximo passo'],
  ['Informações ficam espalhadas', 'Dados importantes ficam organizados'],
  ['A equipe precisa lembrar do follow-up', 'O processo acompanha as oportunidades automaticamente'],
  ['O cliente pergunta o que acontece agora', 'A jornada deixa claro o próximo passo'],
  ['Decisões são tomadas no achismo', 'A operação começa a gerar dados'],
];

function RecursosPage() {
  return (
    <div className="conversion-page mx-auto max-w-7xl lg:-mt-6">
      <section className="conversion-hero">
        <div className="conversion-hero-copy">
          <div>
            <div className="conversion-pills flex flex-wrap items-center gap-2">
              <span className="brand-pill px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]">
                VANT.Business
              </span>
              <span className="brand-pill px-3 py-1 text-[11px] font-medium">
                Presença digital • Atendimento • Automação
              </span>
            </div>

            <h1 className="conversion-title brand-title">
              Sua empresa não precisa de mais ferramentas. Precisa de uma estrutura que faça tudo trabalhar junto.
            </h1>
            <p className="conversion-lead">
              A VANT conecta presença digital, atendimento e automação para transformar contatos em processos organizados e oportunidades em clientes.
            </p>

            <div className="conversion-actions flex flex-col gap-3 sm:flex-row">
              <Link to="/solucoes-digitais#briefing-form" className="brand-button-primary px-6 py-3 text-xs">
                Solicitar análise da operação
              </Link>
              <a href="#como-resolvemos" className="brand-button-secondary px-6 py-3 text-xs">
                Ver a estrutura
              </a>
            </div>

            <div className="conversion-hero-line" aria-label="Serviços conectados">
              {heroSignals.map((signal) => (
                <span key={signal}>{signal}</span>
              ))}
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
          </div>

          <div className="conversion-pipeline" aria-label="Fluxo da VANT">
            <div className="conversion-pipeline-head">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/10 bg-white/[0.04]">
                <VantLogo size={30} />
              </div>
              <div>
                <p className="brand-title text-sm font-bold text-white">Jornada organizada</p>
                <p className="mt-1 text-[0.62rem] uppercase tracking-[0.18em] text-[#7f7f7f]">
                  captar → atender → converter
                </p>
              </div>
            </div>

            <div className="conversion-outcomes">
              {pillars.map((item, index) => (
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

      <section id="como-resolvemos" className="conversion-system">
        <div className="conversion-system-intro">
          <p className="brand-kicker">O problema</p>
          <h2 className="brand-title mt-3 text-3xl font-bold leading-tight text-white">
            Muitas empresas não têm um problema de vendas. Têm um problema entre o interesse e a venda.
          </h2>
          <p className="mt-4 text-sm leading-6 text-[#a6a6a6]">
            O cliente pode chegar pelo site, Instagram, anúncio, WhatsApp ou indicação. O problema começa quando mensagens, informações e próximos passos ficam espalhados.
          </p>
          <p className="conversion-highlight">
            Nós organizamos a jornada inteira: a VANT estrutura exatamente esse espaço entre o cliente demonstrar interesse e a empresa conseguir convertê-lo.
          </p>
        </div>

        <div className="conversion-path-grid">
          {journeyBreak.map((item, index) => {
            const pillar = pillars[index];

            return (
              <article key={item.title} className="conversion-path-card">
                <div>
                  <small>{item.label}</small>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>

                <span className="conversion-path-bridge">A VANT organiza</span>

                <div>
                  <strong>{pillar.title}</strong>
                  <p>{pillar.text}</p>
                  <em>{pillar.examples}</em>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="conversion-before-after">
        <div className="conversion-compare-head">
          <p className="brand-kicker">O que muda na prática</p>
          <h2 className="brand-title mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl">
            A operação deixa de depender de mensagens soltas e passa a conduzir oportunidades.
          </h2>
        </div>

        <div className="conversion-compare-list">
          {transformations.map(([before, after], index) => (
            <article key={before} className="conversion-compare-row">
              <small>{String(index + 1).padStart(2, '0')}</small>
              <p>
                <span>Antes</span>
                {before}
              </p>
              <p>
                <span>Com a VANT</span>
                {after}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="conversion-final-cta">
        <p className="brand-kicker">Próximo passo</p>
        <h2 className="brand-title mx-auto mt-3 max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl">
          Onde sua empresa está perdendo oportunidades hoje?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#a6a6a6]">
          Pode ser no site. No WhatsApp. No atendimento. No acompanhamento. Ou na falta de conexão entre tudo isso.
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#d8d8d8]">
          A VANT analisa a jornada atual e identifica o que realmente precisa ser melhorado.
        </p>
        <Link to="/solucoes-digitais#briefing-form" className="brand-button-primary mt-6 px-7 py-3 text-xs">
          Solicitar uma análise da minha operação
        </Link>
        <span>Sem pacote genérico. Primeiro entendemos o problema.</span>
      </section>
    </div>
  );
}

export default RecursosPage;

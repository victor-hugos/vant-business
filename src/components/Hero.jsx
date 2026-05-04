import ButtonLink from './ui/ButtonLink.jsx';
import Tag from './ui/Tag.jsx';

function Hero() {
  const focusAreas = [
    'Automação de processos',
    'Integração de APIs',
    'Backend e lógica de sistemas',
    'Salesforce e MuleSoft',
    'Produtos digitais e SaaS',
    'Documentação técnica',
  ];

  const highlights = [
    {
      title: 'Automação',
      text: 'Criação de fluxos para reduzir tarefas manuais.',
    },
    {
      title: 'Integrações',
      text: 'Conexão entre sistemas, APIs e ferramentas.',
    },
    {
      title: 'Produto',
      text: 'Construção de MVPs e soluções digitais com visão de negócio.',
    },
  ];

  return (
    <section id="inicio" className="rounded-3xl border border-white/10 bg-slate-900/75 p-6 shadow-2xl shadow-slate-950/50 sm:p-8 lg:p-10">
      <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.85fr)] lg:items-center">
        <div className="min-w-0">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">
            Victor Hugo Santos de Jesus
          </p>
          <h1 className="mt-5 max-w-4xl break-words text-3xl font-bold leading-tight text-white [overflow-wrap:anywhere] sm:text-5xl lg:text-6xl">
            Transformo processos manuais em sistemas, automações e integrações inteligentes.
          </h1>
          <p className="mt-6 max-w-3xl break-words text-base leading-7 text-slate-300 [overflow-wrap:anywhere] sm:text-lg sm:leading-8">
            Sou Victor Hugo, desenvolvedor focado em automação de processos, APIs, backend,
            Salesforce, MuleSoft e produtos digitais. Construo soluções que conectam tecnologia,
            produtividade e resultado.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="#projetos" variant="primary" className="w-full sm:w-auto">
              Ver projetos
            </ButtonLink>
            <ButtonLink href="#modo-recrutador" variant="secondary" className="w-full sm:w-auto">
              Modo Recrutador
            </ButtonLink>
            <ButtonLink href="/curriculo-victor-hugo.pdf" variant="subtle" className="w-full sm:w-auto">
              Baixar currículo
            </ButtonLink>
          </div>
        </div>

        <aside className="rounded-2xl border border-cyan-300/20 bg-slate-950/75 p-6 shadow-xl shadow-slate-950/40">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-300">
            Áreas de atuação
          </p>
          <ul className="mt-5 space-y-3">
            {focusAreas.map((area) => (
              <li key={area} className="flex gap-3 text-sm text-slate-200">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-300" />
                <span>{area}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {highlights.map((highlight) => (
          <article
            key={highlight.title}
            className="rounded-2xl border border-white/10 bg-slate-950/70 p-5 shadow-lg shadow-slate-950/30"
          >
            <h2 className="text-lg font-semibold text-white">{highlight.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">{highlight.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Hero;

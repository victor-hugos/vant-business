import { Link } from 'react-router-dom';
import VantLogo from '../components/VantLogo.jsx';

const examples = [
  {
    title: 'Entrada comercial organizada',
    before: 'Contato chega por Instagram, WhatsApp ou indicacao sem contexto suficiente.',
    after: 'Briefing, origem, objetivo e proximo passo ficam registrados antes da conversa.',
  },
  {
    title: 'Presenca com destino',
    before: 'Site e perfil social apenas apresentam a empresa.',
    after: 'A estrutura digital conduz o visitante para diagnostico, atendimento ou proposta.',
  },
  {
    title: 'Follow-up visivel',
    before: 'A equipe depende de memoria para retomar conversas e oportunidades.',
    after: 'Cada lead tem status, historico minimo e acao seguinte mais clara.',
  },
];

function CasesPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 py-8">
      <section className="grid gap-8 border-y border-white/10 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="flex h-32 w-32 items-center justify-center border border-white/10 bg-white/[0.03]">
          <VantLogo size={96} />
        </div>
        <div>
          <p className="brand-kicker">Provas e exemplos</p>
          <h1 className="brand-title mt-3 max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl">
            Estruturas digitais precisam mostrar o que muda na operacao.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[#a6a6a6]">
            Enquanto cases reais nao entram como vitrine publica, esta pagina organiza exemplos de problemas que a VANT transforma em fluxo, dados e proximo passo comercial.
          </p>
          <Link to="/diagnostico#briefing-form" className="brand-button-primary mt-6 px-6 py-3 text-xs">
            Solicitar diagnostico
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {examples.map((item) => (
          <article key={item.title} className="rounded-lg border border-white/10 bg-white/[0.035] p-5">
            <h2 className="brand-title text-lg font-bold text-white">{item.title}</h2>
            <div className="mt-5 space-y-4 text-sm leading-6">
              <p className="text-[#8f8f8f]">
                <span className="mb-1 block text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#6f6f6f]">Antes</span>
                {item.before}
              </p>
              <p className="text-[#d6d6d6]">
                <span className="mb-1 block text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[var(--vant-accent)]">Com a VANT</span>
                {item.after}
              </p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default CasesPage;

import { agentSchedule, agentSummary, affiliateTools, ebookTools } from '../data/aiPipeline.js';

const statusLabels = {
  aguardando_avaliacao: 'Aguardando avaliacao',
  aprovado: 'Aprovado',
  em_producao: 'Em producao',
};

function ToolQueue({ title, description, tools, accent }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <div className="mb-4">
        <p className={`text-xs font-semibold uppercase tracking-widest ${accent}`}>
          {title}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-slate-500">{description}</p>
      </div>
      <div className="space-y-3">
        {tools.map((tool) => (
          <a
            key={tool.id}
            href={tool.affiliateUrl || tool.url}
            target="_blank"
            rel="noreferrer"
            className="block rounded-xl border border-white/10 bg-slate-950/40 p-4 transition hover:border-cyan-400/30 hover:bg-slate-950/70"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-white">{tool.name}</h3>
                <p className="mt-1 text-xs text-slate-500">{tool.category}</p>
              </div>
              <span className="shrink-0 rounded-full border border-amber-300/25 bg-amber-300/10 px-2.5 py-1 text-[11px] font-medium text-amber-200">
                {statusLabels[tool.status] || tool.status}
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-400">{tool.description}</p>
            <div className="mt-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
              <p className="text-[11px] uppercase tracking-widest text-slate-500">Proximo agente</p>
              <p className="mt-1 text-xs font-medium text-cyan-300">{tool.nextOutput}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function AgentSyncPanel() {
  return (
    <section className="mb-12">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-cyan-400">Central dos agentes</p>
          <h2 className="mt-2 text-xl font-bold text-white">Fila sincronizada para avaliacao</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
            O agente de pesquisa separa as ferramentas. As afiliadas vao para roteiro de video; as sem link configurado vao para ebook e captura de lead.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">
            <p className="text-lg font-bold text-white">{agentSummary.totalTools}</p>
            <p className="text-[11px] text-slate-500">IAs</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">
            <p className="text-lg font-bold text-cyan-300">{agentSummary.affiliateQueue}</p>
            <p className="text-[11px] text-slate-500">Afiliadas</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">
            <p className="text-lg font-bold text-emerald-300">{agentSummary.ebookQueue}</p>
            <p className="text-[11px] text-slate-500">Ebooks</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <ToolQueue
          title="Afiliado -> roteiro"
          description="Entram primeiro em roteiro de video e CTA. O link final so vai ao ar depois da sua avaliacao."
          tools={affiliateTools}
          accent="text-cyan-300"
        />
        <ToolQueue
          title="Sem link -> ebook"
          description="Viraram ideias de ebooks para captar email e WhatsApp antes de qualquer publicacao final."
          tools={ebookTools}
          accent="text-emerald-300"
        />
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-sm font-semibold text-white">Cronograma semanal</h3>
          <p className="text-xs text-slate-500">{agentSummary.reviewStatus}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {agentSchedule.map((item) => (
            <div key={item.day} className="rounded-xl border border-white/10 bg-slate-950/40 p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300">{item.day}</p>
              <p className="mt-2 text-sm font-semibold text-white">{item.owner}</p>
              <p className="mt-1 text-xs text-slate-500">{item.cadence}</p>
              <p className="mt-3 text-xs leading-relaxed text-slate-400">{item.output}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AgentSyncPanel;

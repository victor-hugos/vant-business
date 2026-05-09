import { useMemo } from 'react';

function formatDate(date) {
  if (!date) return 'sem data';
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

function StatCard({ label, value, hint, tone = 'slate' }) {
  const tones = {
    cyan: 'border-cyan-400/25 bg-cyan-400/10 text-cyan-200',
    emerald: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-200',
    amber: 'border-amber-300/25 bg-amber-300/10 text-amber-100',
    slate: 'border-white/10 bg-white/[0.04] text-white',
  };

  return (
    <div className={`rounded-2xl border p-4 ${tones[tone] || tones.slate}`}>
      <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400">{label}</p>
      <p className="mt-3 text-3xl font-bold text-white">{value}</p>
      <p className="mt-2 text-xs leading-relaxed text-slate-400">{hint}</p>
    </div>
  );
}

function AdminOverviewScreen({ data, onLogout }) {
  const stats = useMemo(() => {
    const clicks = data.clicks || [];
    const subscribers = data.subscribers || [];
    const agents = data.agentResponses || [];

    return {
      totalClicks: clicks.length,
      ebookClicks: clicks.filter((item) => item.item_type === 'ebook').length,
      toolClicks: clicks.filter((item) => item.item_type === 'tool').length,
      leads: subscribers.length,
      agents,
    };
  }, [data]);

  const recentEbookClicks = (data.clicks || []).filter((item) => item.item_type === 'ebook').slice(0, 6);
  const recentLeads = (data.subscribers || []).slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section className="news-glow overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]">
        <div className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-10">
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-400">Area administrativa</p>
              <h1 className="font-display mt-4 max-w-3xl text-4xl font-extrabold leading-[0.95] text-white sm:text-6xl">
                Visao
                <span className="block text-cyan-300">geral do fluxo</span>
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Aqui voce le o que entrou no sistema: cliques em ebooks, emails captados e o estado atual dos agentes.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">Leitura do fluxo</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">Acesso rastreado</span>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5 shadow-2xl shadow-cyan-950/20">
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-400">Resumo rapido</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <StatCard label="Cliques totais" value={stats.totalClicks} hint="Todas as interacoes rastreadas" tone="cyan" />
              <StatCard label="Leads captados" value={stats.leads} hint="Emails e contatos salvos" tone="emerald" />
              <StatCard label="Ebook clicks" value={stats.ebookClicks} hint="Interesse em materiais" tone="amber" />
              <StatCard label="Cliques em ferramentas" value={stats.toolClicks} hint="Acessos em cards de ferramentas" tone="slate" />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-400">Cliques em ebooks</p>
              <h2 className="font-display mt-2 text-3xl font-bold text-white">Ultimos materiais acessados</h2>
            </div>
          </div>
          <div className="mt-5 space-y-3">
            {recentEbookClicks.length === 0 ? (
              <p className="rounded-2xl border border-white/10 bg-slate-950/45 p-4 text-sm text-slate-500">Nenhum clique em ebook ainda.</p>
            ) : (
              recentEbookClicks.map((item) => (
                <div key={item.id} className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white">{item.item_title || item.item_id}</p>
                      <p className="mt-1 text-xs text-slate-500">{item.source || 'sem origem'}</p>
                    </div>
                    <p className="text-xs text-slate-500">{formatDate(item.created_at)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-400">Emails captados</p>
              <h2 className="font-display mt-2 text-3xl font-bold text-white">Leads recentes</h2>
            </div>
          </div>
          <div className="mt-5 space-y-3">
            {recentLeads.length === 0 ? (
              <p className="rounded-2xl border border-white/10 bg-slate-950/45 p-4 text-sm text-slate-500">Nenhum email captado ainda.</p>
            ) : (
              recentLeads.map((lead) => (
                <div key={lead.id} className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white">{lead.nome}</p>
                      <p className="mt-1 text-sm text-cyan-300">{lead.email}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {lead.product_title || lead.ebook} · {lead.lead_type} · {lead.source || 'sem origem'}
                      </p>
                    </div>
                    <p className="text-xs text-slate-500">{formatDate(lead.created_at)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-400">Agentes</p>
            <h2 className="font-display mt-2 text-3xl font-bold text-white">Estado atual da fila</h2>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-white/30 hover:text-white"
          >
            Sair
          </button>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {(data.agentWorkflow || []).map((agent) => {
            const response = stats.agents.find((item) => item.item_id === agent.id);
            return (
              <div key={agent.id} className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
                <p className="text-sm font-semibold text-white">{agent.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{agent.goal}</p>
                <p className="mt-3 text-xs font-medium text-cyan-300">
                  {response ? response.title : 'aguardando execucao'}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default AdminOverviewScreen;

import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { affiliateTools, agentSchedule, ebookTools } from '../data/aiPipeline.js';
import AdminLoginScreen from '../components/AdminLoginScreen.jsx';
import AdminOverviewScreen from '../components/AdminOverviewScreen.jsx';

const localAuthKey = 'vant_admin_local_auth';
const localNewsStatusesKey = 'vant_admin_news_statuses';
const localContentDraftStatusKey = 'vant_admin_content_draft_statuses';

const localAgentWorkflow = [
  {
    id: 'pesquisa',
    name: 'Agente de Pesquisa',
    goal: 'Atualiza o lote de IAs e remove duplicidade antes de qualquer producao.',
  },
  {
    id: 'afiliados',
    name: 'Agente de Afiliados',
    goal: 'Confere quais ferramentas tem link ativo, link pendente ou sem afiliado configurado.',
  },
  {
    id: 'ebook',
    name: 'Agente de Ebook',
    goal: 'Transforma ferramentas sem link configurado em ideias de ebook para captura.',
  },
  {
    id: 'roteiro',
    name: 'Agente de Roteiro',
    goal: 'Gera roteiro apenas para ferramentas com potencial de afiliado.',
  },
  {
    id: 'noticias',
    name: 'Agente de Noticias',
    goal: 'Mostra as noticias coletadas e o que esta aguardando aprovacao.',
  },
  {
    id: 'sincronizador',
    name: 'Agente Sincronizador',
    goal: 'Consolida respostas, cliques e proximas acoes antes da publicacao.',
  },
];

function isLocalPreview() {
  return ['localhost', '127.0.0.1'].includes(window.location.hostname);
}

function hasLocalAuth() {
  return window.localStorage.getItem(localAuthKey) === 'true';
}

function readLocalResponses() {
  try {
    return JSON.parse(window.localStorage.getItem('vant_admin_agent_responses') || '[]');
  } catch {
    return [];
  }
}

function saveLocalResponses(responses) {
  window.localStorage.setItem('vant_admin_agent_responses', JSON.stringify(responses));
}

function readLocalNewsStatuses() {
  try {
    return JSON.parse(window.localStorage.getItem(localNewsStatusesKey) || '{}');
  } catch {
    return {};
  }
}

function saveLocalNewsStatus(newsId, status) {
  const current = readLocalNewsStatuses();
  window.localStorage.setItem(localNewsStatusesKey, JSON.stringify({ ...current, [newsId]: status }));
}

function readLocalContentDraftStatuses() {
  try {
    return JSON.parse(window.localStorage.getItem(localContentDraftStatusKey) || '{}');
  } catch {
    return {};
  }
}

function saveLocalContentDraftStatuses(statuses) {
  window.localStorage.setItem(localContentDraftStatusKey, JSON.stringify(statuses));
}

function buildContentDrafts(affiliateItems, ebookItems) {
  const ebookDrafts = ebookItems.map((tool) => ({
    id: `ebook-${tool.id}`,
    kind: 'ebook',
    sourceId: tool.id,
    sourceName: tool.name,
    title: `Ebook: ${tool.name}`,
    audience: tool.category,
    summary: tool.nextOutput || tool.description,
    outline: [
      'Quem deve usar',
      ...(tool.relevantInfo || []).slice(0, 3),
      'CTA de captura com email',
    ],
    focus: 'Rascunho de ebook',
    status: 'rascunho',
  }));

  const videoDrafts = affiliateItems.map((tool) => ({
    id: `video-${tool.id}`,
    kind: 'video',
    sourceId: tool.id,
    sourceName: tool.name,
    title: `Roteiro de video: ${tool.name}`,
    audience: tool.category,
    summary: tool.nextOutput || tool.description,
    outline: [
      'Gancho de abertura',
      'Problema que a ferramenta resolve',
      'Demonstracao pratica',
      'CTA com afiliado',
    ],
    focus: 'Roteiro de video para afiliado',
    status: 'rascunho',
  }));

  return [...ebookDrafts, ...videoDrafts];
}

const draftStatusStyles = {
  rascunho: {
    label: 'rascunho',
    tone: 'slate',
    className: 'border-white/10 bg-white/[0.04] text-slate-300',
  },
  'em revisao': {
    label: 'em revisao',
    tone: 'amber',
    className: 'border-amber-300/20 bg-amber-300/10 text-amber-100',
  },
  'pronto para postar': {
    label: 'pronto para postar',
    tone: 'emerald',
    className: 'border-emerald-300/20 bg-emerald-300/10 text-emerald-100',
  },
};

function formatDraftStatus(status) {
  return draftStatusStyles[status] || draftStatusStyles.rascunho;
}

function ContentLabPanel({ affiliateItems, ebookItems, newsItems, localMode }) {
  const baseDrafts = useMemo(() => buildContentDrafts(affiliateItems, ebookItems), [affiliateItems, ebookItems]);
  const [selectedDraftId, setSelectedDraftId] = useState(null);
  const [drafts, setDrafts] = useState(baseDrafts);
  const [draftWarnings, setDraftWarnings] = useState([]);

  useEffect(() => {
    let cancelled = false;

    async function loadDrafts() {
      if (localMode) {
        const localStatuses = readLocalContentDraftStatuses();
        const localDrafts = baseDrafts.map((draft) => ({
          ...draft,
          status: localStatuses[draft.id] || draft.status,
        }));

        if (!cancelled) {
          setDrafts(localDrafts);
          setDraftWarnings([]);
        }
        return;
      }

      try {
        const response = await fetch('/api/admin-content-drafts', { credentials: 'include' });
        if (!response.ok) {
          throw new Error('Falha ao carregar rascunhos do servidor');
        }

        const payload = await response.json();
        if (!cancelled) {
          setDrafts(payload.items || baseDrafts);
          setDraftWarnings(payload.warnings || []);
        }
      } catch (error) {
        if (!cancelled) {
          setDraftWarnings([error.message]);
          setDrafts(baseDrafts);
        }
      }
    }

    loadDrafts();

    return () => {
      cancelled = true;
    };
  }, [baseDrafts, localMode]);

  useEffect(() => {
    if (!drafts.length) {
      setSelectedDraftId(null);
      return;
    }

    setSelectedDraftId((current) => {
      if (current && drafts.some((draft) => draft.id === current)) {
        return current;
      }
      return drafts[0].id;
    });
  }, [drafts]);

  const selectedDraft = drafts.find((draft) => draft.id === selectedDraftId) || drafts[0] || null;
  const ebookDrafts = drafts.filter((draft) => draft.kind === 'ebook');
  const videoDrafts = drafts.filter((draft) => draft.kind === 'video');
  const pendingNews = (newsItems || []).filter((item) => item.status === 'aguardando_avaliacao');
  const approvedNews = (newsItems || []).filter((item) => item.status === 'aprovada' || item.status === 'approved');

  async function updateDraftStatus(draft, status) {
    if (localMode) {
      const nextStatuses = { ...readLocalContentDraftStatuses(), [draft.id]: status };
      saveLocalContentDraftStatuses(nextStatuses);
      setDrafts((current) => current.map((item) => (item.id === draft.id ? { ...item, status } : item)));
      return;
    }

    try {
      const response = await fetch('/api/admin-content-drafts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ draft, status }),
      });

      if (!response.ok) {
        throw new Error('Nao foi possivel salvar o rascunho');
      }

      const payload = await response.json();
      setDrafts((current) => current.map((item) => (item.id === draft.id ? payload.item : item)));
      setDraftWarnings([]);
    } catch (error) {
      setDraftWarnings([error.message]);
    }
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-cyan-400">Bancada de conteudo</p>
          <h2 className="mt-2 text-xl font-bold text-white">O que o agente criou antes de publicar</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Aqui voce revisa ebooks, roteiros e noticias em estado bruto. Nada segue adiante sem sua leitura.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-3 py-2">
            <p className="text-lg font-bold text-cyan-100">{ebookDrafts.length}</p>
            <p className="text-[11px] text-cyan-100/70">Ebooks</p>
          </div>
          <div className="rounded-xl border border-emerald-300/20 bg-emerald-300/10 px-3 py-2">
            <p className="text-lg font-bold text-emerald-100">{videoDrafts.length}</p>
            <p className="text-[11px] text-emerald-100/70">Roteiros</p>
          </div>
          <div className="rounded-xl border border-amber-300/20 bg-amber-300/10 px-3 py-2">
            <p className="text-lg font-bold text-amber-100">{pendingNews.length}</p>
            <p className="text-[11px] text-amber-100/70">Noticias pendentes</p>
          </div>
        </div>
      </div>

      <div className="mb-5 rounded-xl border border-white/10 bg-slate-950/45 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-cyan-400">Fila de noticias</p>
            <h3 className="mt-1 text-sm font-semibold text-white">Separacao entre o que entra e o que ainda falta avaliar</h3>
          </div>
          <StatusPill tone={pendingNews.length > 0 ? 'amber' : 'emerald'}>
            {pendingNews.length > 0 ? `${pendingNews.length} aguardando` : 'sem pendencias'}
          </StatusPill>
        </div>

        {pendingNews.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">Nenhuma noticia aguardando avaliacao neste momento.</p>
        ) : (
          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            {pendingNews.slice(0, 4).map((item) => (
              <div key={item.id} className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{item.titlePt || item.title}</p>
                    <p className="mt-1 text-xs text-slate-500">{item.source || 'fonte nao informada'}</p>
                  </div>
                  <StatusPill tone="amber">{item.status}</StatusPill>
                </div>
                {item.summaryPt && <p className="mt-3 text-xs leading-relaxed text-slate-400">{item.summaryPt}</p>}
              </div>
            ))}
          </div>
        )}

        {approvedNews.length > 0 && (
          <p className="mt-4 text-xs text-emerald-300">
            {approvedNews.length} noticias ja podem ser publicadas na area publica e no email diario.
          </p>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-xl border border-white/10 bg-slate-950/45 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-widest text-cyan-400">Conteudos gerados</p>
              <h3 className="mt-1 text-sm font-semibold text-white">Ebooks e roteiros</h3>
            </div>
            <StatusPill tone="slate">{drafts.length} itens</StatusPill>
          </div>

          <div className="mt-4 space-y-3">
            {drafts.length === 0 ? (
              <p className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-500">
                Nenhum rascunho gerado ainda.
              </p>
            ) : (
              drafts.map((draft) => {
                const current = formatDraftStatus(draft.status);
                const active = selectedDraft?.id === draft.id;

                return (
                  <button
                    key={draft.id}
                    type="button"
                    onClick={() => setSelectedDraftId(draft.id)}
                    className={`w-full rounded-xl border p-4 text-left transition ${
                      active
                        ? 'border-cyan-400/40 bg-cyan-400/10'
                        : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-white">{draft.title}</p>
                        <p className="mt-1 text-xs text-slate-500">{draft.audience}</p>
                      </div>
                      <StatusPill tone={current.tone}>{current.label}</StatusPill>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-slate-400">{draft.summary}</p>
                    <p className="mt-3 text-[11px] uppercase tracking-widest text-cyan-300">{draft.focus}</p>
                  </button>
                );
              })
            )}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-slate-950/45 p-4">
          {selectedDraft ? (
            <>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-cyan-400">Previa do conteudo</p>
                  <h3 className="mt-1 text-lg font-bold text-white">{selectedDraft.title}</h3>
                  <p className="mt-1 text-xs text-slate-500">{selectedDraft.audience}</p>
                </div>
                <StatusPill tone={formatDraftStatus(selectedDraft.status).tone}>
                  {formatDraftStatus(selectedDraft.status).label}
                </StatusPill>
              </div>

              <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm leading-relaxed text-slate-300">{selectedDraft.summary}</p>
              </div>

              <div className="mt-4">
                <p className="text-xs uppercase tracking-widest text-cyan-400">Estrutura sugerida</p>
                <ul className="mt-3 space-y-2">
                  {selectedDraft.outline.map((step) => (
                    <li key={step} className="rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-slate-300">
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 grid gap-2 sm:grid-cols-3">
                {Object.entries(draftStatusStyles).map(([status, meta]) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => updateDraftStatus(selectedDraft, status)}
                    className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${meta.className}`}
                  >
                    {meta.label}
                  </button>
                ))}
              </div>

              <p className="mt-4 text-xs leading-relaxed text-slate-500">
                O status fica salvo para sua revisao. O conteudo so deve seguir para publicacao depois da aprovacao manual.
              </p>
            </>
          ) : (
            <p className="text-sm text-slate-500">Selecione um rascunho para visualizar a previa.</p>
          )}
        </div>
      </div>

      {draftWarnings.length > 0 && (
        <div className="mt-4 rounded-xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm text-amber-100">
          {draftWarnings.join(' · ')}
        </div>
      )}
    </section>
  );
}

async function loadLocalNewsItems() {
  try {
    const response = await fetch('/data/ai-news.json');
    const payload = response.ok ? await response.json() : { items: [] };
    const statuses = readLocalNewsStatuses();

    return (payload.items || []).map((item) => ({
      ...item,
      status: statuses[item.id] || item.status,
    }));
  } catch {
    return [];
  }
}

function createLocalAgentPayload(agentId) {
  const now = new Date().toISOString();

  const payloads = {
    pesquisa: {
      title: 'Lote inicial organizado',
      summary: `Foram encontrados ${affiliateTools.length + ebookTools.length} itens: ${affiliateTools.length} com fila de afiliado/video e ${ebookTools.length} para ebook.`,
      nextStep: 'Ativar Agente de Afiliados para validar a separacao antes de produzir conteudo.',
    },
    afiliados: {
      title: 'Afiliados separados',
      summary: 'Taskade tem link ativo. ElevenLabs tem programa confirmado, mas ainda precisa do link proprio da VANT.',
      nextStep: 'Aprovar ou ajustar a lista antes de enviar afiliadas para roteiro.',
    },
    ebook: {
      title: 'Fila de ebooks preparada',
      summary: `${ebookTools.length} ferramentas ficaram para ebook porque ainda nao possuem link de afiliado configurado na VANT.`,
      nextStep: 'Escolher a primeira ferramenta para virar ebook completo e landing de captura.',
    },
    roteiro: {
      title: 'Roteiros pendentes de aprovacao',
      summary: 'A fila de roteiro deve comecar por Taskade, porque o link ja esta ativo. ElevenLabs fica aguardando o link proprio.',
      nextStep: 'Depois da aprovacao, gerar roteiro final com hook, demo e CTA rastreavel.',
    },
    noticias: {
      title: 'Noticias prontas para revisao',
      summary: 'As noticias ja ficam em portugues quando houver campos traduzidos no JSON.',
      nextStep: 'Aprovar manualmente as melhores noticias antes de disparar o email diario.',
    },
    sincronizador: {
      title: 'Sincronizacao final do ciclo',
      summary: 'Fluxo correto: pesquisa -> afiliados -> ebook -> roteiro -> noticias -> sincronizador.',
      nextStep: 'Usar cliques e leads capturados para decidir quais ferramentas viram ebook, video ou pagina dedicada.',
    },
  };

  const agent = localAgentWorkflow.find((item) => item.id === agentId);

  return {
    id: `local-${agentId}`,
    agent_name: agent?.name || agentId,
    item_id: agentId,
    title: payloads[agentId]?.title || agentId,
    status: 'aguardando_avaliacao',
    created_at: now,
    updated_at: now,
    payload: {
      agentId,
      agentName: agent?.name || agentId,
      goal: agent?.goal || '',
      generatedAt: now,
      ...payloads[agentId],
    },
  };
}

function StatusPill({ children, tone = 'slate' }) {
  const tones = {
    cyan: 'border-cyan-400/25 bg-cyan-400/10 text-cyan-300',
    emerald: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300',
    amber: 'border-amber-300/25 bg-amber-300/10 text-amber-200',
    slate: 'border-white/10 bg-white/[0.04] text-slate-300',
  };

  return (
    <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${tones[tone] || tones.slate}`}>
      {children}
    </span>
  );
}

function formatDate(date) {
  if (!date) return 'sem data';
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

function QueueColumn({ title, tools, tone }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-base font-bold text-white">{title}</h2>
        <StatusPill tone={tone}>{tools.length} itens</StatusPill>
      </div>
      <div className="space-y-3">
        {tools.map((tool) => (
          <div key={tool.id} className="rounded-xl border border-white/10 bg-slate-950/45 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-white">{tool.name}</h3>
                <p className="mt-1 text-xs text-slate-500">{tool.category}</p>
              </div>
              <StatusPill tone="amber">{tool.status}</StatusPill>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-400">{tool.description}</p>
            <p className="mt-3 text-xs text-cyan-300">{tool.nextOutput}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
              <span>{tool.affiliateStatus}</span>
              <a href={tool.sourceUrl} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">
                fonte
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AgentRunner({ workflow, responses, onRun, running }) {
  const completed = new Set(responses.map((response) => response.item_id));
  const nextIndex = workflow.findIndex((agent) => !completed.has(agent.id));
  const allowedIndex = nextIndex === -1 ? workflow.length - 1 : nextIndex;

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-5">
        <p className="text-xs uppercase tracking-widest text-cyan-400">Execucao sincronizada</p>
        <h2 className="mt-2 text-xl font-bold text-white">Agentes separados por etapa</h2>
        <p className="mt-2 text-sm text-slate-500">
          Ative um agente, revise a resposta e so depois passe para o proximo.
        </p>
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        {workflow.map((agent, index) => {
          const response = responses.find((item) => item.item_id === agent.id);
          const disabled = running === agent.id || (!response && index > allowedIndex);
          const payload = response?.payload;

          return (
            <div key={agent.id} className="rounded-xl border border-white/10 bg-slate-950/45 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">{index + 1}. {agent.name}</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">{agent.goal}</p>
                </div>
                <StatusPill tone={response ? 'emerald' : index === allowedIndex ? 'cyan' : 'slate'}>
                  {response ? 'respondido' : index === allowedIndex ? 'proximo' : 'travado'}
                </StatusPill>
              </div>

              {payload && (
                <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] p-3">
                  <p className="text-xs font-semibold text-cyan-300">{payload.title}</p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">{payload.summary}</p>
                  <p className="mt-2 text-xs leading-relaxed text-emerald-300">{payload.nextStep}</p>
                </div>
              )}

              <button
                type="button"
                disabled={disabled}
                onClick={() => onRun(agent.id)}
                className="mt-4 rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/[0.03] disabled:text-slate-600"
              >
                {running === agent.id ? 'Executando...' : response ? 'Reexecutar agente' : 'Ativar agente'}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ClicksPanel({ clicks }) {
  const counts = useMemo(() => {
    return clicks.reduce((acc, click) => {
      const key = `${click.item_type}:${click.item_id}`;
      acc[key] = acc[key] || { title: click.item_title || click.item_id, type: click.item_type, count: 0 };
      acc[key].count += 1;
      return acc;
    }, {});
  }, [clicks]);

  return (
    <section className="grid gap-4 lg:grid-cols-[0.75fr_1.25fr]">
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <h2 className="text-base font-bold text-white">Resumo de cliques</h2>
        <div className="mt-4 space-y-2">
          {Object.values(counts).length === 0 ? (
            <p className="text-sm text-slate-500">Nenhum clique armazenado ainda.</p>
          ) : (
            Object.values(counts).map((item) => (
              <div key={`${item.type}-${item.title}`} className="flex items-center justify-between rounded-lg bg-slate-950/45 px-3 py-2">
                <span className="text-xs text-slate-300">{item.title}</span>
                <StatusPill tone="cyan">{item.count}</StatusPill>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <h2 className="text-base font-bold text-white">Ultimos eventos</h2>
        <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
          {clicks.length === 0 ? (
            <p className="p-4 text-sm text-slate-500">Aguardando cliques em ferramentas ou ebooks.</p>
          ) : (
            <div className="divide-y divide-white/10">
              {clicks.slice(0, 20).map((click) => (
                <div key={click.id} className="grid gap-2 p-3 text-xs sm:grid-cols-[1fr_auto]">
                  <div>
                    <p className="font-semibold text-white">{click.item_title || click.item_id}</p>
                    <p className="mt-1 text-slate-500">{click.event_type} · {click.item_type} · {click.source || 'sem origem'}</p>
                  </div>
                  <p className="text-slate-500">{formatDate(click.created_at)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function NewsReviewPanel({ items, onReview, reviewing }) {
  const pending = items.filter((item) => item.status === 'aguardando_avaliacao');
  const approved = items.filter((item) => item.status === 'aprovada' || item.status === 'approved');
  const rejected = items.filter((item) => item.status === 'reprovada');

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-cyan-400">Noticias de IA</p>
          <h2 className="mt-2 text-xl font-bold text-white">Fila de avaliacao</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Noticias pendentes ficam apenas aqui. Ao aprovar, elas aparecem na aba publica e entram no email diario.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl border border-amber-300/20 bg-amber-300/10 px-3 py-2">
            <p className="text-lg font-bold text-amber-100">{pending.length}</p>
            <p className="text-[11px] text-amber-200/70">Pendentes</p>
          </div>
          <div className="rounded-xl border border-emerald-300/20 bg-emerald-300/10 px-3 py-2">
            <p className="text-lg font-bold text-emerald-100">{approved.length}</p>
            <p className="text-[11px] text-emerald-200/70">Publicadas</p>
          </div>
          <div className="rounded-xl border border-red-300/20 bg-red-300/10 px-3 py-2">
            <p className="text-lg font-bold text-red-100">{rejected.length}</p>
            <p className="text-[11px] text-red-200/70">Reprovadas</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="rounded-xl border border-white/10 bg-slate-950/45 p-4 text-sm text-slate-500">
            Nenhuma noticia carregada ainda.
          </p>
        ) : (
          items.map((item) => {
            const title = item.titlePt || item.title;
            const summary = item.summaryPt || item.summary;
            const isReviewing = reviewing === item.id;

            return (
              <article key={item.id} className="rounded-xl border border-white/10 bg-slate-950/45 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="mb-2 flex flex-wrap gap-2">
                      <StatusPill tone={item.status === 'aprovada' || item.status === 'approved' ? 'emerald' : item.status === 'reprovada' ? 'slate' : 'amber'}>
                        {item.status}
                      </StatusPill>
                      <StatusPill tone="slate">{item.source}</StatusPill>
                    </div>
                    <h3 className="text-sm font-semibold leading-snug text-white">{title}</h3>
                    {summary && <p className="mt-2 text-xs leading-relaxed text-slate-400">{summary}</p>}
                    <a href={item.link} target="_blank" rel="noreferrer" className="mt-3 inline-block text-xs text-cyan-400 hover:underline">
                      abrir fonte
                    </a>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      disabled={isReviewing}
                      onClick={() => onReview(item, 'aprovada')}
                      className="rounded-lg border border-emerald-300/25 bg-emerald-300/10 px-3 py-2 text-xs font-semibold text-emerald-200 transition hover:bg-emerald-300/20 disabled:opacity-60"
                    >
                      Aprovar
                    </button>
                    <button
                      type="button"
                      disabled={isReviewing}
                      onClick={() => onReview(item, 'reprovada')}
                      className="rounded-lg border border-red-300/25 bg-red-300/10 px-3 py-2 text-xs font-semibold text-red-200 transition hover:bg-red-300/20 disabled:opacity-60"
                    >
                      Reprovar
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}

function AdminPage() {
  const location = useLocation();
  const forceLoginView = new URLSearchParams(location.search).get('view') === 'login';
  const [screen, setScreen] = useState('overview');
  const [auth, setAuth] = useState(() => {
    if (forceLoginView) {
      return 'login';
    }

    if (isLocalPreview()) {
      return hasLocalAuth() ? 'ok' : 'login';
    }

    return 'login';
  });
  const [data, setData] = useState(null);
  const [running, setRunning] = useState(null);
  const [reviewingNews, setReviewingNews] = useState(null);

  async function loadLocalData() {
    const newsItems = await loadLocalNewsItems();

    setData({
      ok: true,
      localPreview: true,
      pipeline: {
        affiliateTools,
        ebookTools,
        agentSchedule,
      },
      agentWorkflow: localAgentWorkflow,
      agentResponses: readLocalResponses(),
      newsItems,
      clicks: [],
      warnings: ['Modo local: login, armazenamento real e cliques dependem das APIs rodando no Vercel/Vercel Dev.'],
    });
    setAuth('ok');
    setScreen('overview');
    return true;
  }

  async function loadFallbackData(message) {
    const newsItems = await loadLocalNewsItems();

    setData({
      ok: true,
      localPreview: true,
      pipeline: {
        affiliateTools,
        ebookTools,
        agentSchedule,
      },
      agentWorkflow: localAgentWorkflow,
      agentResponses: readLocalResponses(),
      newsItems,
      clicks: [],
      warnings: [
        message,
        'Painel em modo local para manter a operacao disponivel enquanto a API nao responde.',
      ],
    });
    setAuth('ok');
    setScreen('overview');
    return true;
  }

  async function loadData() {
    try {
      const response = await fetch('/api/admin-data', { credentials: 'include' });
      const contentType = response.headers.get('content-type') || '';

      if (response.status === 401) {
        setAuth('login');
        return false;
      }

      if (!response.ok || !contentType.includes('application/json')) {
        return await loadFallbackData('Area administrativa sem resposta da API.');
      }

      setData(await response.json());
      setAuth('ok');
      setScreen('overview');
      return true;
    } catch {
      return await loadFallbackData('Area administrativa caiu para modo local por falha de carregamento.');
    }
  }

  async function runAgent(agentId) {
    if (data?.localPreview) {
      const current = readLocalResponses().filter((response) => response.item_id !== agentId);
      saveLocalResponses([createLocalAgentPayload(agentId), ...current]);
      await loadLocalData();
      return;
    }

    setRunning(agentId);
    const response = await fetch('/api/admin-run-agent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ agentId }),
    });

    setRunning(null);
    if (response.ok) {
      await loadData();
    }
  }

  async function reviewNews(item, status) {
    setReviewingNews(item.id);

    if (data?.localPreview) {
      saveLocalNewsStatus(item.id, status);
      await loadLocalData();
      setReviewingNews(null);
      return;
    }

    const response = await fetch('/api/admin-news-update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ item, status }),
    });

    setReviewingNews(null);
    if (response.ok) await loadData();
  }

  async function logout() {
    if (isLocalPreview()) {
      window.localStorage.removeItem(localAuthKey);
      setData(null);
      setAuth('login');
      return;
    }

    await fetch('/api/admin-logout', { method: 'POST', credentials: 'include' });
    setData(null);
    setAuth('login');
  }

  useEffect(() => {
    if (forceLoginView) {
      setAuth('login');
      return;
    }

    if (isLocalPreview()) {
      if (hasLocalAuth()) {
        loadLocalData();
      } else {
        setAuth('login');
      }
      return;
    }

    loadData();
  }, [forceLoginView]);

  if (auth === 'login') {
    return <AdminLoginScreen onAuthenticated={isLocalPreview() ? loadLocalData : loadData} />;
  }

  if (!data) {
    return <div className="py-20 text-center text-slate-500">Carregando painel administrativo...</div>;
  }

  if (screen === 'overview') {
    return <AdminOverviewScreen data={data} onOpenOperations={() => setScreen('operations')} />;
  }

  const { affiliateTools, ebookTools, agentSchedule } = data.pipeline;

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-cyan-400">Admin VANT</p>
          <h1 className="mt-2 text-3xl font-bold text-white">Central de avaliacao dos agentes</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
            Painel privado para revisar fila, ativar agentes em ordem e acompanhar cliques por ferramenta ou ebook.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setScreen('overview')}
            className="rounded-full border border-cyan-400/30 px-4 py-2 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400/10"
          >
            Visao geral
          </button>
          <button
            type="button"
            onClick={logout}
            className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-white/30 hover:text-white"
          >
            Sair
          </button>
        </div>
      </header>

      {data.warnings?.length > 0 && (
        <div className="rounded-xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm text-amber-100">
          {data.warnings.join(' · ')}
        </div>
      )}

      <section className="grid gap-4 lg:grid-cols-2">
        <QueueColumn title="Afiliadas / roteiro" tools={affiliateTools} tone="cyan" />
        <QueueColumn title="Sem afiliado configurado / ebook" tools={ebookTools} tone="emerald" />
      </section>

      <AgentRunner workflow={data.agentWorkflow} responses={data.agentResponses} onRun={runAgent} running={running} />

      <ContentLabPanel
        affiliateItems={affiliateTools}
        ebookItems={ebookTools}
        newsItems={data.newsItems || []}
        localMode={Boolean(data.localPreview)}
      />

      <NewsReviewPanel items={data.newsItems || []} onReview={reviewNews} reviewing={reviewingNews} />

      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <h2 className="text-base font-bold text-white">Cronograma operacional</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {agentSchedule.map((item) => (
            <div key={item.day} className="rounded-xl border border-white/10 bg-slate-950/45 p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300">{item.day}</p>
              <p className="mt-2 text-sm font-semibold text-white">{item.owner}</p>
              <p className="mt-1 text-xs text-slate-500">{item.cadence}</p>
              <p className="mt-3 text-xs leading-relaxed text-slate-400">{item.output}</p>
            </div>
          ))}
        </div>
      </section>

      <ClicksPanel clicks={data.clicks || []} />
    </div>
  );
}

export default AdminPage;

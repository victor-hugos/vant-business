import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { affiliateTools, agentSchedule, ebookTools } from '../data/aiPipeline.js';
import AdminLoginScreen from '../components/AdminLoginScreen.jsx';
import AdminOverviewScreen from '../components/AdminOverviewScreen.jsx';

const localAuthKey = 'vant_admin_local_auth';
const localNewsStatusesKey = 'vant_admin_news_statuses';
const localNewsSendTimeKey = 'vant_admin_news_send_time';
const localContentDraftStatusKey = 'vant_admin_content_draft_statuses';
const localAgentReviewsKey = 'vant_admin_agent_reviews';

const localAgentWorkflow = [
  {
    id: 'pesquisa',
    name: 'Pesquisador',
    goal: 'Busca ferramentas de IA novas, remove duplicadas e entrega o lote bruto para triagem.',
  },
  {
    id: 'afiliados',
    name: 'Separador',
    goal: 'Marca cada ferramenta com a etiqueta de afiliados ou sem afiliados antes de enviar para as filas.',
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

function readLocalNewsSendTime() {
  return window.localStorage.getItem(localNewsSendTimeKey) || '08:00';
}

function saveLocalNewsSendTime(time) {
  window.localStorage.setItem(localNewsSendTimeKey, time);
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

function readLocalAgentReviews() {
  try {
    return JSON.parse(window.localStorage.getItem(localAgentReviewsKey) || '{}');
  } catch {
    return {};
  }
}

function saveLocalAgentReviews(reviews) {
  window.localStorage.setItem(localAgentReviewsKey, JSON.stringify(reviews));
}

function buildContentDrafts(affiliateItems, ebookItems) {
  const allTools = [...affiliateItems, ...ebookItems];
  const ebookDrafts = allTools.map((tool) => ({
    id: `ebook-${tool.id}`,
    kind: 'ebook',
    sourceId: tool.id,
    sourceName: tool.name,
    title: `Ebook: ${tool.name}`,
    audience: tool.category,
    summary: tool.nextOutput || tool.description,
    outline: ['Quem deve usar', ...(tool.relevantInfo || []).slice(0, 3), 'CTA de captura com email'],
    focus: 'Fila para ebook',
    status: 'rascunho',
  }));

  const videoDrafts = allTools.map((tool) => ({
    id: `video-${tool.id}`,
    kind: 'video',
    sourceId: tool.id,
    sourceName: tool.name,
    title: `Roteiro de video: ${tool.name}`,
    audience: tool.category,
    summary: tool.nextOutput || tool.description,
    outline: ['Gancho de abertura', 'Problema que a ferramenta resolve', 'Demonstracao pratica', 'CTA rastreavel'],
    focus: 'Fila para conteudo/roteiro',
    status: 'rascunho',
  }));

  return [...ebookDrafts, ...videoDrafts];
}

function buildRoutingDraft(tool, kind) {
  const baseOutline =
    kind === 'ebook'
      ? ['Quem deve usar', ...(tool.relevantInfo || []).slice(0, 3), 'CTA de captura com email']
      : ['Gancho de abertura', 'Problema que a ferramenta resolve', 'Demonstracao pratica', 'CTA rastreavel'];

  return {
    id: `${kind}-${tool.id}`,
    kind,
    sourceId: tool.id,
    sourceName: tool.name,
    title: kind === 'ebook' ? `Ebook: ${tool.name}` : `Roteiro de video: ${tool.name}`,
    audience: tool.category,
    summary: tool.nextOutput || tool.description,
    outline: baseOutline,
    focus: kind === 'ebook' ? 'Fila para ebook' : 'Fila para conteudo/roteiro',
    status: 'em revisao',
  };
}

function readLocalToolRouting() {
  try {
    return JSON.parse(window.localStorage.getItem('vant_admin_tool_routing') || '{}');
  } catch {
    return {};
  }
}

function saveLocalToolRouting(routing) {
  window.localStorage.setItem('vant_admin_tool_routing', JSON.stringify(routing));
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
  publicado: {
    label: 'publicado',
    tone: 'emerald',
    className: 'border-emerald-300/20 bg-emerald-300/10 text-emerald-100',
  },
};

function formatDraftStatus(status) {
  return draftStatusStyles[status] || draftStatusStyles.rascunho;
}

function formatLogTime(date = new Date()) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

function WeekScheduleRail({ schedule, activeDay, onSelectDay }) {
  const active = schedule.find((item) => item.day === activeDay) || schedule[0];

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-cyan-400">Organizacao da semana</p>
          <h2 className="mt-2 text-xl font-bold text-white">Dias da semana em ordem de trabalho</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Cada dia mostra o agente principal e o que fica pronto para a bancada.
          </p>
        </div>
        <StatusPill tone="slate">{schedule.length} dias</StatusPill>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {schedule.map((item) => {
          const isActive = item.day === activeDay;
          return (
            <button
              key={item.day}
              type="button"
              onClick={() => onSelectDay(item.day)}
              className={`rounded-xl border px-4 py-3 text-left transition ${
                isActive
                  ? 'border-cyan-400/30 bg-cyan-400/10'
                  : 'border-white/10 bg-slate-950/45 hover:border-white/20 hover:bg-white/[0.04]'
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300">{item.day}</p>
              <p className="mt-2 text-sm font-semibold text-white">{item.owner}</p>
              <p className="mt-1 text-xs text-slate-500">{item.cadence}</p>
            </button>
          );
        })}
      </div>

      {active && (
        <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/45 p-4">
          <p className="text-xs uppercase tracking-widest text-cyan-400">Dia ativo</p>
          <h3 className="mt-2 text-sm font-semibold text-white">{active.day} - {active.owner}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{active.output}</p>
        </div>
      )}
    </section>
  );
}

function ToolRoutingBoard({ affiliateItems, ebookItems, localMode, onSaved }) {
  const initialRouting = useMemo(() => {
    const routing = {};

    for (const tool of [...affiliateItems, ...ebookItems]) {
      routing[tool.id] = {
        ebook: tool.affiliateStatus !== 'com_link_configurado',
        content: tool.affiliateStatus === 'com_link_configurado',
        affiliateStatus: tool.affiliateStatus,
      };
    }

    return routing;
  }, [affiliateItems, ebookItems]);

  const [routing, setRouting] = useState(() => {
    const stored = readLocalToolRouting();
    return Object.keys(stored).length ? { ...initialRouting, ...stored } : initialRouting;
  });
  const [savingId, setSavingId] = useState(null);
  const [message, setMessage] = useState('');
  const [researchOpen, setResearchOpen] = useState(true);

  useEffect(() => {
    const stored = readLocalToolRouting();
    setRouting(Object.keys(stored).length ? { ...initialRouting, ...stored } : initialRouting);
  }, [initialRouting]);

  function updateTool(toolId, field, value) {
    setRouting((current) => ({
      ...current,
      [toolId]: {
        ...(current[toolId] || { ebook: false, content: false }),
        [field]: value,
      },
    }));
  }

  async function saveTool(tool) {
    const selected = routing[tool.id] || { ebook: false, content: false };
    const drafts = [];
    const logEntries = [];

    if (selected.ebook) {
      drafts.push(buildRoutingDraft(tool, 'ebook'));
      logEntries.push(`Fila de ebook salva: ${tool.name}`);
    }
    if (selected.content) {
      drafts.push(buildRoutingDraft(tool, 'video'));
      logEntries.push(`Fila de roteiro salva: ${tool.name}`);
    }
    if (!drafts.length) {
      setMessage(`Marque ebook ou conteudo para ${tool.name} antes de salvar.`);
      return;
    }

    setSavingId(tool.id);
    setMessage('');

    try {
      if (localMode) {
        saveLocalToolRouting({ ...routing, [tool.id]: selected });
        const nextStatuses = readLocalContentDraftStatuses();
        for (const draft of drafts) {
          nextStatuses[draft.id] = draft.status;
        }
        saveLocalContentDraftStatuses(nextStatuses);
        setMessage(`${tool.name} enviado para a fila selecionada.`);
        onSaved?.(logEntries);
        return;
      }

      for (const draft of drafts) {
        const response = await fetch('/api/admin-content-drafts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ draft, status: 'em revisao' }),
        });

        if (!response.ok) {
          throw new Error('Nao foi possivel salvar a fila');
        }
      }

      setMessage(`${tool.name} enviado para a fila selecionada.`);
      onSaved?.(logEntries);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSavingId(null);
    }
  }

  const cards = [...affiliateItems, ...ebookItems];
  const ebookQueueCount = cards.filter((tool) => (routing[tool.id] || {}).ebook).length;
  const contentQueueCount = cards.filter((tool) => (routing[tool.id] || {}).content).length;

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-cyan-400">Central de avaliacao</p>
          <h2 className="mt-2 text-xl font-bold text-white">Pesquisador em botao, com triagem imediata</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Clique no Pesquisador para abrir o lote encontrado. Cada card mostra descricao, etiqueta de afiliado e os dois checks de rota.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setResearchOpen((current) => !current)}
          className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/20"
        >
          Pesquisador {researchOpen ? 'aberto' : 'fechado'}
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-cyan-400/15 bg-cyan-400/8 p-4">
          <p className="text-xs uppercase tracking-widest text-cyan-300">Pesquisador</p>
          <p className="mt-2 text-sm font-semibold text-white">Descobre ferramentas novas</p>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">Entrega o lote bruto para triagem antes da classificacao.</p>
        </div>
        <div className="rounded-xl border border-amber-300/15 bg-amber-300/8 p-4">
          <p className="text-xs uppercase tracking-widest text-amber-200">Separador</p>
          <p className="mt-2 text-sm font-semibold text-white">Etiqueta afiliados</p>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">Cada card mostra se a ferramenta tem ou nao programa de afiliados.</p>
        </div>
        <div className="rounded-xl border border-emerald-300/15 bg-emerald-300/8 p-4">
          <p className="text-xs uppercase tracking-widest text-emerald-200">Rotas ativas</p>
          <p className="mt-2 text-sm font-semibold text-white">{ebookQueueCount} ebooks e {contentQueueCount} conteudos</p>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">As duas caixas podem ser marcadas ao mesmo tempo.</p>
        </div>
      </div>

      {researchOpen ? (
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {cards.map((tool) => {
            const selected = routing[tool.id] || { ebook: false, content: false };

            return (
              <article key={tool.id} className="rounded-xl border border-white/10 bg-slate-950/45 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-cyan-300">{tool.category}</p>
                    <h3 className="mt-1 text-base font-semibold text-white">{tool.name}</h3>
                  </div>
                  <StatusPill tone={tool.affiliateStatus === 'sem_link_configurado' ? 'amber' : 'emerald'}>
                    {tool.affiliateStatus === 'sem_link_configurado'
                      ? 'nao tem programa de afiliados'
                      : 'tem programa de afiliados'}
                  </StatusPill>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-slate-300">{tool.description}</p>

                <div className="mt-4 grid gap-2 rounded-lg border border-white/10 bg-white/[0.03] p-3">
                  <label className="flex items-center gap-3 text-sm text-slate-200">
                    <input
                      type="checkbox"
                      checked={selected.ebook}
                      onChange={(event) => updateTool(tool.id, 'ebook', event.target.checked)}
                      className="h-4 w-4 rounded border-white/20 bg-slate-950 text-cyan-400 focus:ring-cyan-400/30"
                    />
                    Entrar na fila para virar ebook
                  </label>
                  <label className="flex items-center gap-3 text-sm text-slate-200">
                    <input
                      type="checkbox"
                      checked={selected.content}
                      onChange={(event) => updateTool(tool.id, 'content', event.target.checked)}
                      className="h-4 w-4 rounded border-white/20 bg-slate-950 text-cyan-400 focus:ring-cyan-400/30"
                    />
                    Entrar na fila para virar roteiro
                  </label>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-400">
                  {selected.ebook && <StatusPill tone="cyan">ebook marcado</StatusPill>}
                  {selected.content && <StatusPill tone="emerald">roteiro marcado</StatusPill>}
                  {tool.relevantInfo?.slice(0, 2).map((info) => (
                    <span key={info} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1">
                      {info}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => saveTool(tool)}
                  disabled={savingId === tool.id}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-cyan-400 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-60"
                >
                  {savingId === tool.id ? 'Salvando...' : 'Salvar e enviar para conteudo'}
                </button>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="mt-5 rounded-xl border border-white/10 bg-slate-950/45 p-4 text-sm text-slate-500">
          O lote pesquisado esta recolhido. Clique no botao do Pesquisador para abrir novamente.
        </div>
      )}

      {message && <p className="mt-4 text-sm text-slate-400">{message}</p>}
    </section>
  );
}

function ContentLabPanel({ affiliateItems, ebookItems, newsItems, localMode, refreshSignal = 0, onAction }) {
  const baseDrafts = useMemo(() => buildContentDrafts(affiliateItems, ebookItems), [affiliateItems, ebookItems]);
  const [selectedDraftId, setSelectedDraftId] = useState(null);
  const [drafts, setDrafts] = useState(baseDrafts);
  const [draftWarnings, setDraftWarnings] = useState([]);
  const [activeDraftKind, setActiveDraftKind] = useState('ebook');

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
  }, [baseDrafts, localMode, refreshSignal]);

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
  const visibleDrafts = activeDraftKind === 'video' ? videoDrafts : ebookDrafts;

  async function updateDraftStatus(draft, status) {
    const logLabel =
      status === 'pronto para postar'
        ? `Liberado para publicar no site: ${draft.title}`
        : status === 'em revisao'
          ? `Enviado para revisao: ${draft.title}`
          : `Mantido como rascunho: ${draft.title}`;

    if (localMode) {
      const nextStatuses = { ...readLocalContentDraftStatuses(), [draft.id]: status };
      saveLocalContentDraftStatuses(nextStatuses);
      setDrafts((current) => current.map((item) => (item.id === draft.id ? { ...item, status } : item)));
      onAction?.(logLabel);
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
      onAction?.(logLabel);
    } catch (error) {
      setDraftWarnings([error.message]);
    }
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-cyan-400">Bancada de conteudo</p>
          <h2 className="mt-2 text-xl font-bold text-white">Publicacao em etapas</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Selecione a fila, revise o rascunho e libere somente o que estiver pronto para o site.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusPill tone="cyan">{ebookDrafts.length} ebooks</StatusPill>
          <StatusPill tone="emerald">{videoDrafts.length} roteiros</StatusPill>
          <StatusPill tone="amber">{drafts.filter((item) => item.status === 'pronto para postar').length} prontos</StatusPill>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-slate-950/45 p-4">
          <p className="text-xs uppercase tracking-widest text-cyan-400">Etapa 1</p>
          <p className="mt-2 text-sm font-semibold text-white">Selecionar fila</p>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">Escolha entre ebooks e roteiros para ver apenas um fluxo por vez.</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-slate-950/45 p-4">
          <p className="text-xs uppercase tracking-widest text-cyan-400">Etapa 2</p>
          <p className="mt-2 text-sm font-semibold text-white">Revisar a saida</p>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">Abra um card, confira descricao, estrutura e status antes de agir.</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-slate-950/45 p-4">
          <p className="text-xs uppercase tracking-widest text-cyan-400">Etapa 3</p>
          <p className="mt-2 text-sm font-semibold text-white">Publicar no site</p>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">Quando estiver pronto para postar, confirme a liberacao manualmente.</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.84fr_1.16fr]">
        <div className="rounded-xl border border-white/10 bg-slate-950/45 p-4">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveDraftKind('ebook')}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeDraftKind === 'ebook'
                  ? 'bg-cyan-400/15 text-cyan-200'
                  : 'border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              Ebooks
            </button>
            <button
              type="button"
              onClick={() => setActiveDraftKind('video')}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeDraftKind === 'video'
                  ? 'bg-emerald-400/15 text-emerald-200'
                  : 'border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              Roteiros
            </button>
            <StatusPill tone="slate">{visibleDrafts.length} itens</StatusPill>
          </div>

          <div className="mt-4 grid gap-2">
            {visibleDrafts.slice(0, 8).map((draft) => (
              <button
                key={draft.id}
                type="button"
                onClick={() => setSelectedDraftId(draft.id)}
                className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-3 text-left transition hover:border-cyan-400/30 hover:bg-cyan-400/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">{draft.sourceName}</p>
                    <p className="mt-1 text-xs text-slate-500">{draft.title}</p>
                  </div>
                  <StatusPill tone={formatDraftStatus(draft.status).tone}>{formatDraftStatus(draft.status).label}</StatusPill>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-slate-950/45 p-4">
          {selectedDraft ? (
            <>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-cyan-400">Previa</p>
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

              <button
                type="button"
                onClick={() => updateDraftStatus(selectedDraft, 'pronto para postar')}
                className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-300/20"
              >
                Publicar no site
              </button>

              <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-widest text-cyan-400">Como usar</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Primeiro a fila, depois a revisao e por ultimo a publicacao. Assim o fluxo fica controlado e cada conteudo entra no site na hora certa.
                </p>
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
    </section>
  );
}

function PublishApprovalPanel({ affiliateItems, ebookItems, localMode, refreshSignal = 0, onAction }) {
  const baseDrafts = useMemo(() => buildContentDrafts(affiliateItems, ebookItems), [affiliateItems, ebookItems]);
  const [drafts, setDrafts] = useState(baseDrafts);
  const [selectedDraftIds, setSelectedDraftIds] = useState([]);
  const [loadingError, setLoadingError] = useState('');
  const [publishing, setPublishing] = useState(false);

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
          setLoadingError('');
        }
        return;
      }

      try {
        const response = await fetch('/api/admin-content-drafts', { credentials: 'include' });
        if (!response.ok) {
          throw new Error('Falha ao carregar fila de publicação');
        }

        const payload = await response.json();
        if (!cancelled) {
          setDrafts(payload.items || baseDrafts);
          setLoadingError('');
        }
      } catch (error) {
        if (!cancelled) {
          setLoadingError(error.message);
          setDrafts(baseDrafts);
        }
      }
    }

    loadDrafts();

    return () => {
      cancelled = true;
    };
  }, [baseDrafts, localMode, refreshSignal]);

  const readyDrafts = drafts.filter(
    (draft) => draft.status === 'pronto para postar' || draft.status === 'publicado'
  );
  const selectedDrafts = readyDrafts.filter((draft) => selectedDraftIds.includes(draft.id));

  function toggleDraft(draftId) {
    setSelectedDraftIds((current) =>
      current.includes(draftId) ? current.filter((item) => item !== draftId) : [...current, draftId]
    );
  }

  async function publishSelected() {
    if (!selectedDrafts.length) return;

    setPublishing(true);
    const logEntries = [];

    try {
      for (const draft of selectedDrafts) {
        if (localMode) {
          const nextStatuses = { ...readLocalContentDraftStatuses(), [draft.id]: 'publicado' };
          saveLocalContentDraftStatuses(nextStatuses);
          logEntries.push(`Liberado para publicar no site: ${draft.title}`);
          continue;
        }

        const response = await fetch('/api/admin-content-drafts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ draft, status: 'publicado' }),
        });

        if (!response.ok) {
          throw new Error(`Falha ao publicar ${draft.title}`);
        }

        logEntries.push(`Liberado para publicar no site: ${draft.title}`);
      }

      setDrafts((current) =>
        current.map((item) => (selectedDraftIds.includes(item.id) ? { ...item, status: 'publicado' } : item))
      );
      setSelectedDraftIds([]);
      onAction?.(logEntries);
    } catch (error) {
      setLoadingError(error.message);
    } finally {
      setPublishing(false);
    }
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-cyan-400">Avaliação</p>
          <h2 className="mt-2 text-xl font-bold text-white">Fila final de publicação</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Selecione os ebooks e roteiros já aprovados para colocar capa, revisar link de afiliado e subir no site.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusPill tone="emerald">{readyDrafts.length} prontos</StatusPill>
          <StatusPill tone="cyan">{selectedDraftIds.length} selecionados</StatusPill>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-slate-950/45 p-4">
          <p className="text-xs uppercase tracking-widest text-cyan-400">Etapa 1</p>
          <p className="mt-2 text-sm font-semibold text-white">Escolher itens aprovados</p>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">Aqui entram somente itens prontos para publicação.</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-slate-950/45 p-4">
          <p className="text-xs uppercase tracking-widest text-cyan-400">Etapa 2</p>
          <p className="mt-2 text-sm font-semibold text-white">Marcar com checkbox</p>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">Selecione um ou vários itens para o site.</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-slate-950/45 p-4">
          <p className="text-xs uppercase tracking-widest text-cyan-400">Etapa 3</p>
          <p className="mt-2 text-sm font-semibold text-white">Aprovar e publicar</p>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">O comando confirma o que entra no ar.</p>
        </div>
      </div>

      {loadingError && (
        <p className="mt-4 rounded-xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm text-amber-100">
          {loadingError}
        </p>
      )}

      <div className="mt-5 grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs uppercase tracking-widest text-cyan-400">Itens prontos</p>
            <StatusPill tone="slate">{readyDrafts.length}</StatusPill>
          </div>

          <div className="mt-4 grid gap-3">
            {readyDrafts.length === 0 ? (
              <p className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-500">
                Nenhum ebook ou roteiro aprovado ainda.
              </p>
            ) : (
              readyDrafts.map((draft) => {
                const isSelected = selectedDraftIds.includes(draft.id);

                return (
                  <label
                    key={draft.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                      isSelected
                        ? 'border-cyan-400/30 bg-cyan-400/10'
                        : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleDraft(draft.id)}
                      className="mt-1 h-4 w-4 rounded border-white/20 bg-slate-950 text-cyan-400 focus:ring-cyan-400/30"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-white">{draft.title}</p>
                        <StatusPill tone={draft.kind === 'ebook' ? 'cyan' : 'emerald'}>
                          {draft.kind === 'ebook' ? 'ebook' : 'roteiro'}
                        </StatusPill>
                        <StatusPill tone="slate">{draft.sourceName}</StatusPill>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-slate-400">{draft.summary}</p>
                      <p className="mt-2 text-[11px] uppercase tracking-widest text-slate-600">
                        Pronto para subir no site
                      </p>
                    </div>
                  </label>
                );
              })
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
          <p className="text-xs uppercase tracking-widest text-cyan-400">Publicação final</p>
          <h3 className="mt-2 text-lg font-bold text-white">Confirmar o que entra no ar</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Depois da seleção, você confirma a publicação e o item fica liberado para o site.
          </p>

          <div className="mt-4 space-y-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-sm font-semibold text-white">Selecionados</p>
            {selectedDrafts.length === 0 ? (
              <p className="text-sm text-slate-500">Nenhum item escolhido ainda.</p>
            ) : (
              selectedDrafts.map((draft) => (
                <div key={draft.id} className="rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2">
                  <p className="text-sm text-white">{draft.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{draft.sourceName}</p>
                </div>
              ))
            )}
          </div>

          <button
            type="button"
            disabled={!selectedDrafts.length || publishing}
            onClick={publishSelected}
            className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-300/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {publishing ? 'Publicando...' : 'Aprovar e publicar no site'}
          </button>

          <p className="mt-4 text-xs leading-relaxed text-slate-500">
            O painel confirma quais peças vão para o site antes da publicação.
          </p>
        </div>
      </div>
    </section>
  );
}

function AgentManagementPanel({
  workflow = [],
  responses = [],
  schedule = [],
  activeDay,
  onSelectDay,
  onRun,
  running,
  activityLog = [],
  onLog,
}) {
  const [activeAgentId, setActiveAgentId] = useState(workflow[0]?.id || '');
  const [reviews, setReviews] = useState(() => readLocalAgentReviews());

  useEffect(() => {
    if (workflow.length > 0 && !workflow.some((agent) => agent.id === activeAgentId)) {
      setActiveAgentId(workflow[0].id);
    }
  }, [workflow, activeAgentId]);

  useEffect(() => {
    setReviews(readLocalAgentReviews());
  }, []);

  const activeAgent = workflow.find((agent) => agent.id === activeAgentId) || workflow[0];
  const activeResponse = responses.find((item) => item.item_id === activeAgentId);
  const activeIndex = workflow.findIndex((agent) => agent.id === activeAgentId);
  const nextAgent = workflow[activeIndex + 1] || null;
  const selectedDay = schedule.find((item) => item.day === activeDay) || schedule[0];
  const review = reviews[activeAgentId] || {
    outcome: 'bom',
    notes: '',
    nextStep: activeResponse?.payload?.nextStep || '',
  };

  function updateReview(field, value) {
    setReviews((current) => {
      const next = {
        ...current,
        [activeAgentId]: {
          ...(current[activeAgentId] || review),
          [field]: value,
        },
      };
      saveLocalAgentReviews(next);
      return next;
    });
  }

  function saveReview() {
    const selected = reviews[activeAgentId] || review;
    const outcomeLabel = selected.outcome === 'refazer' ? 'deve ser refeito' : 'bem feito';
    const nextStepLabel = selected.nextStep?.trim() || activeResponse?.payload?.nextStep || 'sem próximo passo';
    onLog?.(
      `Revisão salva: ${activeAgent?.name} · ${outcomeLabel} · próximo passo: ${nextStepLabel}`
    );
  }

  const currentLogCount = activityLog.length;

  return (
    <section className="space-y-4">
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-cyan-400">Cronograma</p>
            <h3 className="mt-2 text-xl font-bold text-white">Primeiro elemento da tela</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              O cronograma abre a área de gerenciamento e orienta a ordem dos agentes.
            </p>
          </div>
          <StatusPill tone="slate">{schedule.length} dias</StatusPill>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {schedule.map((item) => (
            <button
              key={item.day}
              type="button"
              onClick={() => onSelectDay(item.day)}
              className={`rounded-xl border px-4 py-3 text-left transition ${
                item.day === activeDay
                  ? 'border-cyan-400/30 bg-cyan-400/10'
                  : 'border-white/10 bg-slate-950/45 hover:border-white/20 hover:bg-white/[0.04]'
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300">{item.day}</p>
              <p className="mt-2 text-sm font-semibold text-white">{item.owner}</p>
              <p className="mt-1 text-xs text-slate-500">{item.cadence}</p>
              <p className="mt-3 text-xs leading-relaxed text-slate-400">{item.output}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-cyan-400">Gerenciamento</p>
            <h3 className="mt-2 text-xl font-bold text-white">Agentes, execução e revisão</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Clique em um agente, rode a execução e marque o que ficou bom ou o que precisa ser refeito.
            </p>
          </div>
          <StatusPill tone={activeResponse ? 'emerald' : 'cyan'}>
            {activeResponse ? 'resposta disponível' : 'aguardando execução'}
          </StatusPill>
        </div>

        <div className="mt-5 grid gap-4 xl:grid-cols-[0.86fr_1.14fr]">
          <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
            <p className="text-xs uppercase tracking-widest text-cyan-400">Agentes</p>
            <div className="mt-4 space-y-2">
              {workflow.map((agent, index) => {
                const response = responses.find((item) => item.item_id === agent.id);
                return (
                  <button
                    key={agent.id}
                    type="button"
                    onClick={() => setActiveAgentId(agent.id)}
                    className={`w-full rounded-xl border px-3 py-3 text-left transition ${
                      activeAgentId === agent.id
                        ? 'border-cyan-400/30 bg-cyan-400/10'
                        : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {index + 1}. {agent.name}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-slate-500">{agent.goal}</p>
                        <p className="mt-2 text-[11px] uppercase tracking-widest text-slate-600">
                          Próxima: {workflow[index + 1]?.name || 'fim da fila'}
                        </p>
                      </div>
                      <StatusPill tone={response ? 'emerald' : 'slate'}>
                        {response ? 'respondido' : 'pendente'}
                      </StatusPill>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
            <div className="flex flex-wrap gap-2">
              <StatusPill tone="cyan">Agente em foco</StatusPill>
              <StatusPill tone={activeResponse ? 'emerald' : 'amber'}>
                {activeResponse ? 'saída carregada' : 'aguardando geração'}
              </StatusPill>
              <StatusPill tone="slate">Próxima: {nextAgent?.name || 'fim da fila'}</StatusPill>
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-widest text-cyan-400">O que este agente faz</p>
              <h4 className="mt-2 text-lg font-bold text-white">{activeAgent?.name}</h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{activeAgent?.goal}</p>
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-widest text-cyan-400">Execução</p>
              {activeResponse?.payload ? (
                <>
                  <p className="mt-2 text-sm font-semibold text-white">{activeResponse.payload.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{activeResponse.payload.summary}</p>
                  <p className="mt-3 text-sm leading-relaxed text-emerald-100">
                    Próximo passo sugerido: {activeResponse.payload.nextStep}
                  </p>
                  <p className="mt-3 text-xs text-slate-500">
                    Atualizado em {formatDate(activeResponse.updated_at || activeResponse.created_at)}
                  </p>
                </>
              ) : (
                <p className="mt-2 text-sm text-slate-500">
                  Nenhuma saída registrada ainda. Ative este agente para gerar a primeira resposta.
                </p>
              )}
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-widest text-cyan-400">Revisão</p>
              <div className="mt-3 grid gap-3">
                <label className="flex items-center gap-3 text-sm text-slate-200">
                  <input
                    type="checkbox"
                    checked={review.outcome === 'bom'}
                    onChange={(event) => updateReview('outcome', event.target.checked ? 'bom' : 'refazer')}
                    className="h-4 w-4 rounded border-white/20 bg-slate-950 text-cyan-400 focus:ring-cyan-400/30"
                  />
                  Foi bem feito
                </label>
                <label className="flex items-center gap-3 text-sm text-slate-200">
                  <input
                    type="checkbox"
                    checked={review.outcome === 'refazer'}
                    onChange={(event) => updateReview('outcome', event.target.checked ? 'refazer' : 'bom')}
                    className="h-4 w-4 rounded border-white/20 bg-slate-950 text-cyan-400 focus:ring-cyan-400/30"
                  />
                  Deve ser refeito
                </label>

                <div>
                  <label className="mb-1 block text-xs uppercase tracking-widest text-slate-500">
                    Próximo passo
                  </label>
                  <textarea
                    value={review.nextStep || ''}
                    onChange={(event) => updateReview('nextStep', event.target.value)}
                    rows={4}
                    className="w-full rounded-xl border border-white/15 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30"
                    placeholder="Descreva o próximo passo do fluxo"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={saveReview}
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/20"
              >
                Salvar revisão
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-widest text-cyan-400">Fluxo sugerido</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            {activeResponse?.payload?.nextStep || 'Execute o agente selecionado para ver o próximo passo do fluxo.'}
          </p>
        </div>
      </section>
    </section>
  );
}

function ActivityLogPanel({ entries }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-widest text-cyan-400">Log da bancada</p>
          <h2 className="mt-2 text-xl font-bold text-white">Confirmação do que vai publicar</h2>
        </div>
        <StatusPill tone="slate">{entries.length} eventos</StatusPill>
      </div>

      <div className="mt-4 space-y-2">
        {entries.length === 0 ? (
          <p className="rounded-xl border border-white/10 bg-slate-950/45 p-4 text-sm text-slate-500">
            Nenhuma acao registrada ainda.
          </p>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-slate-950/45 p-4">
              <p className="text-sm leading-relaxed text-slate-200">{entry.message}</p>
              <span className="shrink-0 text-xs text-slate-500">{formatLogTime(entry.at)}</span>
            </div>
          ))
        )}
      </div>
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
      title: 'Ferramentas descobertas',
      summary: `Foram encontrados ${affiliateTools.length + ebookTools.length} itens candidatos para IA, antes da classificacao.`,
      nextStep: 'Ativar o separador para marcar tem afiliado ou nao tem afiliado.',
    },
    afiliados: {
      title: 'Ferramentas classificadas',
      summary: 'Taskade e ElevenLabs ficaram na rota de afiliados; as demais seguem para ebook.',
      nextStep: 'Revisar a separacao antes de enviar cada grupo para sua rota de conteudo.',
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

function AdminSidebar({
  sidebarOpen,
  onToggleSidebar,
  activeTab,
  onSelectTab,
  workflow = [],
  activeAgentId,
  onSelectAgent,
  activeDay,
  selectedDay,
}) {
  const tabs = [
    {
      id: 'avaliacao',
      label: 'Avaliação',
      hint: 'Agentes e triagem',
      description: 'Fila dos agentes, leitura da próxima etapa e saída de cada agente.',
    },
    {
      id: 'gerenciamento',
      label: 'Gerenciamento',
      hint: 'Publicação e revisão',
      description: 'Cronograma, agentes, notícias, resposta executada, revisão e próximo passo do fluxo.',
    },
  ];

  return (
    <aside className={`border-b border-white/10 bg-slate-950/45 p-4 lg:border-b-0 lg:border-r ${sidebarOpen ? 'lg:w-[288px]' : 'lg:w-[88px]'}`}>
      <div className="flex items-start justify-between gap-3">
        <div className={sidebarOpen ? 'block' : 'hidden lg:block'}>
          <p className="text-xs uppercase tracking-widest text-cyan-400">Navegação</p>
          <h2 className="mt-2 text-xl font-bold text-white">Barra lateral</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Recolha ou abra a lateral e troque entre as áreas do admin.
          </p>
        </div>
        <button
          type="button"
          onClick={onToggleSidebar}
          className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-slate-300 transition hover:border-cyan-400/30 hover:text-white"
        >
          {sidebarOpen ? 'Recolher' : 'Abrir'}
        </button>
      </div>

      <div className="mt-4 space-y-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectTab(tab.id)}
            className={`w-full rounded-xl border px-3 py-3 text-left transition ${
              activeTab === tab.id
                ? 'border-cyan-400/30 bg-cyan-400/10'
                : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]'
            }`}
          >
            <p className="text-sm font-semibold text-white">{tab.label}</p>
            <p className="mt-1 text-xs text-slate-500">{tab.hint}</p>
            {sidebarOpen && <p className="mt-2 text-xs leading-relaxed text-slate-600">{tab.description}</p>}
          </button>
        ))}
      </div>

      {sidebarOpen && activeTab === 'avaliacao' && (
        <div className="mt-4 space-y-2">
          <p className="pt-2 text-[11px] uppercase tracking-widest text-slate-600">Agentes</p>
          {workflow.map((agent, index) => {
            const isActive = activeAgentId === agent.id;
            const nextName = workflow[index + 1]?.name || 'fim da fila';
            return (
              <button
                key={agent.id}
                type="button"
                onClick={() => onSelectAgent(agent.id)}
                className={`w-full rounded-xl border px-3 py-3 text-left transition ${
                  isActive
                    ? 'border-cyan-400/30 bg-cyan-400/10'
                    : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {index + 1}. {agent.name}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">{agent.goal}</p>
                    <p className="mt-2 text-[11px] uppercase tracking-widest text-slate-600">Próxima: {nextName}</p>
                  </div>
                  <StatusPill tone={isActive ? 'cyan' : 'slate'}>{isActive ? 'ativo' : 'fila'}</StatusPill>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {sidebarOpen && activeTab === 'gerenciamento' && (
        <div className="mt-4 space-y-2">
          <p className="pt-2 text-[11px] uppercase tracking-widest text-slate-600">Funções</p>
          <button
            type="button"
            onClick={() => onSelectTab('gerenciamento')}
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-left transition hover:border-white/20 hover:bg-white/[0.06]"
          >
            <p className="text-sm font-semibold text-white">Publicação</p>
            <p className="mt-1 text-xs text-slate-500">Fila de ebooks, roteiros e liberação para o site.</p>
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('gerenciamento')}
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-left transition hover:border-white/20 hover:bg-white/[0.06]"
          >
            <p className="text-sm font-semibold text-white">Avaliação de notícias</p>
            <p className="mt-1 text-xs text-slate-500">Aprovar ou reprovar antes do blog e do email.</p>
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('gerenciamento')}
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-left transition hover:border-white/20 hover:bg-white/[0.06]"
          >
            <p className="text-sm font-semibold text-white">Cronograma</p>
            <p className="mt-1 text-xs text-slate-500">{selectedDay?.day || activeDay || 'sem dia ativo'}</p>
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('gerenciamento')}
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-left transition hover:border-white/20 hover:bg-white/[0.06]"
          >
            <p className="text-sm font-semibold text-white">Interação</p>
            <p className="mt-1 text-xs text-slate-500">Cliques, logs e rastreamento do que foi consumido.</p>
          </button>
        </div>
      )}

      {!sidebarOpen && (
        <div className="mt-4 hidden lg:flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[11px] font-semibold uppercase tracking-widest text-slate-300 transition hover:border-cyan-400/30 hover:text-white"
          >
            Abrir
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('avaliacao')}
            className={`rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-widest transition ${
              activeTab === 'avaliacao' ? 'bg-cyan-400/15 text-cyan-200' : 'text-slate-400 hover:text-white'
            }`}
          >
            Av
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('gerenciamento')}
            className={`rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-widest transition ${
              activeTab === 'gerenciamento' ? 'bg-cyan-400/15 text-cyan-200' : 'text-slate-400 hover:text-white'
            }`}
          >
            Ge
          </button>
        </div>
      )}
    </aside>
  );
}

function AgentWorkspace({
  workflow = [],
  responses = [],
  schedule = [],
  clicks = [],
  activityLog = [],
  toolAffiliateItems = [],
  toolEbookItems = [],
  toolLocalMode = false,
  onToolSaved,
  newsItems = [],
  newsSendTime = '08:00',
  onChangeNewsSendTime,
  contentRefreshSignal = 0,
  onContentAction,
  onReviewNews,
  reviewingNews = null,
  onRun,
  running,
  activeDay,
  onSelectDay,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('avaliacao');
  const [activeAgentId, setActiveAgentId] = useState(workflow[0]?.id || '');

  useEffect(() => {
    if (workflow.length > 0 && !workflow.some((agent) => agent.id === activeAgentId)) {
      setActiveAgentId(workflow[0].id);
    }
  }, [workflow, activeAgentId]);

  const completed = new Set(responses.map((response) => response.item_id));
  const nextIndex = workflow.findIndex((agent) => !completed.has(agent.id));
  const allowedIndex = nextIndex === -1 ? workflow.length - 1 : nextIndex;
  const activeAgent = workflow.find((agent) => agent.id === activeAgentId) || workflow[0];
  const activeResponse = responses.find((item) => item.item_id === activeAgentId);
  const activeIndex = workflow.findIndex((agent) => agent.id === activeAgentId);
  const nextAgent = workflow[activeIndex + 1] || null;
  const previousAgent = workflow[activeIndex - 1] || null;
  const selectedDay = schedule.find((item) => item.day === activeDay) || schedule[0];

  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <div className="grid lg:grid-cols-[auto_1fr]">
        <AdminSidebar
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((current) => !current)}
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          workflow={workflow}
          activeAgentId={activeAgentId}
          onSelectAgent={(id) => {
            setActiveTab('avaliacao');
            setActiveAgentId(id);
          }}
          activeDay={activeDay}
          selectedDay={selectedDay}
        />

        <div className="min-w-0 p-5">
          {activeTab === 'avaliacao' ? (
            <div className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-cyan-400">Avaliação</p>
                  <h3 className="mt-2 text-xl font-bold text-white">Fila final de publicação</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    Aqui ficam os ebooks e roteiros já aprovados. Marque o que vai para o site e publique em lote.
                  </p>
                </div>
                <StatusPill tone="emerald">itens prontos para publicar</StatusPill>
              </div>

              <PublishApprovalPanel
                affiliateItems={toolAffiliateItems}
                ebookItems={toolEbookItems}
                localMode={toolLocalMode}
                refreshSignal={contentRefreshSignal}
                onAction={onToolSaved}
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-cyan-400">Gerenciamento</p>
                  <h3 className="mt-2 text-xl font-bold text-white">Cronograma e agentes</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    O cronograma vem primeiro. Depois cada agente abre sua tela com saída, revisão e próximo passo.
                  </p>
                </div>
                <StatusPill tone={activeResponse ? 'emerald' : 'cyan'}>
                  {activeResponse ? 'resposta carregada' : 'aguardando execução'}
                </StatusPill>
              </div>

              <AgentManagementPanel
                workflow={workflow}
                responses={responses}
                schedule={schedule}
                activeDay={activeDay}
                onSelectDay={onSelectDay}
                onRun={onRun}
                running={running}
                activityLog={activityLog}
                onLog={onContentAction}
              />

              <NewsDispatchPanel value={newsSendTime} onChange={onChangeNewsSendTime} items={newsItems} />
              <NewsOutputPanel items={newsItems} />
              <NewsReviewPanel items={newsItems} onReview={onReviewNews} reviewing={reviewingNews} />
              <ClicksPanel clicks={clicks} />
              <ActivityLogPanel entries={activityLog} />
            </div>
          )}
        </div>
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

function NewsOutputPanel({ items }) {
  const outputItems = items
    .filter((item) => item.status === 'aprovada' || item.status === 'approved' || item.status === 'aguardando_avaliacao')
    .slice(0, 6);

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-cyan-400">Saida das noticias</p>
          <h2 className="mt-2 text-xl font-bold text-white">O que vai alimentar o site</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Aqui voce enxerga o conteudo traduzido e a situacao de cada item antes de entrar no blog e no email diario.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl border border-emerald-300/20 bg-emerald-300/10 px-3 py-2">
            <p className="text-lg font-bold text-emerald-100">
              {items.filter((item) => item.status === 'aprovada' || item.status === 'approved').length}
            </p>
            <p className="text-[11px] text-emerald-200/70">Prontas</p>
          </div>
          <div className="rounded-xl border border-amber-300/20 bg-amber-300/10 px-3 py-2">
            <p className="text-lg font-bold text-amber-100">
              {items.filter((item) => item.status === 'aguardando_avaliacao').length}
            </p>
            <p className="text-[11px] text-amber-200/70">Aguardando</p>
          </div>
          <div className="rounded-xl border border-red-300/20 bg-red-300/10 px-3 py-2">
            <p className="text-lg font-bold text-red-100">
              {items.filter((item) => item.status === 'reprovada').length}
            </p>
            <p className="text-[11px] text-red-200/70">Paradas</p>
          </div>
        </div>
      </div>

      {outputItems.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-slate-950/45 p-4 text-sm text-slate-500">
          Nenhuma noticia para exibir ainda.
        </div>
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {outputItems.map((item) => {
            const title = item.titlePt || item.title;
            const summary = item.summaryPt || item.summary;
            const approved = item.status === 'aprovada' || item.status === 'approved';

            return (
              <article key={item.id} className="rounded-xl border border-white/10 bg-slate-950/45 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-cyan-300">saida pronta</p>
                    <h3 className="mt-1 text-sm font-semibold leading-snug text-white">{title}</h3>
                  </div>
                  <StatusPill tone={approved ? 'emerald' : 'amber'}>{item.status}</StatusPill>
                </div>
                {summary && <p className="mt-3 text-xs leading-relaxed text-slate-400">{summary}</p>}
                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                  <StatusPill tone="slate">{item.source || 'fonte nao informada'}</StatusPill>
                  <StatusPill tone={approved ? 'emerald' : 'amber'}>
                    {approved ? 'entra no blog e no email' : 'aguarda liberacao'}
                  </StatusPill>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

function NewsDispatchPanel({ value, onChange, items = [] }) {
  const approvedCount = items.filter((item) => item.status === 'aprovada' || item.status === 'approved').length;
  const pendingCount = items.filter((item) => item.status === 'aguardando_avaliacao').length;

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-cyan-400">Noticias de IA</p>
          <h2 className="mt-2 text-xl font-bold text-white">Horario de envio</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Defina a hora em que o email diario com as noticias aprovadas deve sair.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusPill tone="emerald">{approvedCount} aprovadas</StatusPill>
          <StatusPill tone="amber">{pendingCount} aguardando</StatusPill>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="rounded-xl border border-white/10 bg-slate-950/45 p-4">
          <p className="text-xs uppercase tracking-widest text-cyan-400">Agendamento</p>
          <label className="mt-3 block text-sm font-semibold text-white">Hora de envio</label>
          <input
            type="time"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="mt-2 w-full rounded-xl border border-white/15 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30"
          />
          <p className="mt-3 text-xs leading-relaxed text-slate-500">
            Esse horário organiza a rotina do email com as noticias aprovadas do dia.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-slate-950/45 p-4">
          <p className="text-xs uppercase tracking-widest text-cyan-400">Destino</p>
          <p className="mt-2 text-sm font-semibold text-white">Blog e email diario</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            O que estiver aprovado entra na publicacao do blog e na remessa para os cadastros do canal.
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
              <p className="text-xs uppercase tracking-widest text-slate-500">Publicacao</p>
              <p className="mt-1 text-sm text-white">Aprovar no admin antes de subir</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
              <p className="text-xs uppercase tracking-widest text-slate-500">Envio</p>
              <p className="mt-1 text-sm text-white">Saida automatica no horario definido</p>
            </div>
          </div>
        </div>
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
  const [contentRefreshKey, setContentRefreshKey] = useState(0);
  const [selectedWeekday, setSelectedWeekday] = useState(agentSchedule[0]?.day || 'Segunda');
  const [newsSendTime, setNewsSendTime] = useState(() => readLocalNewsSendTime());
  const [activityLog, setActivityLog] = useState([]);

  function appendActivityLog(message) {
    if (!message) return;
    const messages = Array.isArray(message) ? message : [message];
    setActivityLog((current) => {
      const next = messages
        .filter(Boolean)
        .map((item) => ({
          id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
          message: item,
          at: new Date().toISOString(),
        }));
      return [...next, ...current].slice(0, 12);
    });
  }

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
      activityLog: [],
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
    const contentType = response.headers.get('content-type') || '';

    if (response.ok && contentType.includes('application/json')) {
      const payload = await response.json();

      if (payload?.response) {
        setData((current) => {
          if (!current) return current;
          const nextResponses = [
            payload.response,
            ...(current.agentResponses || []).filter((item) => item.item_id !== agentId),
          ];
          return {
            ...current,
            agentResponses: nextResponses,
          };
        });
      }

      if (payload?.stored) {
        await loadData();
      }
      return;
    }

    const fallbackPayload = createLocalAgentPayload(agentId);
    const currentResponses = readLocalResponses().filter((item) => item.item_id !== agentId);
    saveLocalResponses([fallbackPayload, ...currentResponses]);

    setData((current) => {
      if (!current) return current;

      const nextResponses = [
        fallbackPayload,
        ...(current.agentResponses || []).filter((item) => item.item_id !== agentId),
      ];

      return {
        ...current,
        agentResponses: nextResponses,
        warnings: [
          ...(current.warnings || []),
          'A API publica de execucao ainda nao respondeu; foi usado o modo de fallback para manter a bancada funcional.',
        ],
      };
    });
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

  function changeNewsSendTime(time) {
    setNewsSendTime(time);
    saveLocalNewsSendTime(time);
    appendActivityLog(`Horario das noticias ajustado para ${time}.`);
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

  const pipeline = data.pipeline || { affiliateTools: [], ebookTools: [], agentSchedule: [] };
  const affiliateToolsSafe = pipeline.affiliateTools || [];
  const ebookToolsSafe = pipeline.ebookTools || [];
  const agentScheduleSafe = pipeline.agentSchedule || [];
  const workflow = data.agentWorkflow || localAgentWorkflow;
  const responses = data.agentResponses || [];
  const newsItems = data.newsItems || [];
  const clicks = data.clicks || [];

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

      {workflow.length === 0 ? (
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-slate-400">
          Nenhum agente carregado ainda.
        </section>
      ) : (
        <AgentWorkspace
          workflow={workflow}
          responses={responses}
          schedule={agentScheduleSafe}
          clicks={clicks}
          activityLog={activityLog}
          toolAffiliateItems={affiliateToolsSafe}
          toolEbookItems={ebookToolsSafe}
          toolLocalMode={Boolean(data.localPreview)}
          onToolSaved={(entries) => {
            appendActivityLog(entries);
            setContentRefreshKey((value) => value + 1);
          }}
          newsItems={newsItems}
          newsSendTime={newsSendTime}
          onChangeNewsSendTime={changeNewsSendTime}
          contentRefreshSignal={contentRefreshKey}
          onContentAction={appendActivityLog}
          onReviewNews={reviewNews}
          reviewingNews={reviewingNews}
          onRun={runAgent}
          running={running}
          activeDay={selectedWeekday}
          onSelectDay={setSelectedWeekday}
        />
      )}
    </div>
  );
}

export default AdminPage;

import { useEffect, useMemo, useState } from 'react';
import ToolLogo from '../components/ToolLogo.jsx';
import VantLogo from '../components/VantLogo.jsx';
import { recursos as staticTools, categorias as staticCategories } from '../data/recursos.js';
import { trackedToolHref } from '../utils/tracking.js';

const badgeStyles = {
  'Que uso': 'bg-white/[0.06] text-white border border-white/25',
  'Afiliado': 'bg-white/[0.035] text-[#c9c9c9] border border-white/15',
};

const categoriaColors = {
  IA: 'bg-white/[0.045] text-[#f0f0f0] border-white/20',
  Produtividade: 'bg-white/[0.045] text-[#c9c9c9] border-white/20',
  Automação: 'bg-white/[0.045] text-[#f0f0f0] border-white/20',
  Marketing: 'bg-white/[0.045] text-[#c9c9c9] border-white/20',
  Vídeo: 'bg-white/[0.045] text-[#c9c9c9] border-white/20',
  'E-commerce': 'bg-white/[0.045] text-[#c9c9c9] border-white/20',
};

function AiIcon() {
  return (
    <svg viewBox="0 0 240 240" className="h-24 w-24 text-[#f0f0f0] sm:h-28 sm:w-28" aria-hidden="true">
      <defs>
        <linearGradient id="aiNodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#a6a6a6" stopOpacity="0.58" />
        </linearGradient>
      </defs>
      <rect x="44" y="44" width="152" height="152" rx="34" fill="url(#aiNodeGradient)" fillOpacity="0.09" stroke="currentColor" strokeOpacity="0.4" strokeWidth="3" />
      <rect x="64" y="64" width="112" height="112" rx="26" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" strokeDasharray="8 10" />
      <path d="M84 120h72M120 84v72M92 92l56 56M148 92l-56 56" stroke="currentColor" strokeOpacity="0.82" strokeWidth="4.5" strokeLinecap="round" />
      <circle cx="84" cy="120" r="8" fill="currentColor" fillOpacity="0.98" />
      <circle cx="120" cy="84" r="8" fill="currentColor" fillOpacity="0.98" />
      <circle cx="156" cy="120" r="8" fill="currentColor" fillOpacity="0.98" />
      <circle cx="120" cy="156" r="8" fill="currentColor" fillOpacity="0.98" />
      <circle cx="120" cy="120" r="16" fill="none" stroke="currentColor" strokeOpacity="0.95" strokeWidth="4" />
      <circle cx="120" cy="120" r="3.5" fill="currentColor" />
    </svg>
  );
}

function ToolCard({ tool }) {
  return (
    <a
      href={trackedToolHref(tool.id, 'recursos-tool-card')}
      target="_blank"
      rel="noreferrer"
      className="brand-card group flex flex-col p-6"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <ToolLogo tool={tool} className="h-12 w-12 shrink-0" />
        <div className="flex flex-wrap gap-1.5">
          {tool.badge && (
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${badgeStyles[tool.badge]}`}>
              {tool.badge}
            </span>
          )}
          {tool.gratis && (
            <span className="rounded-full border border-white/15 bg-white/[0.035] px-2.5 py-0.5 text-xs text-[#a6a6a6]">
              Grátis
            </span>
          )}
        </div>
      </div>

      <h3 className="font-display text-2xl font-bold leading-tight text-white">
        {tool.name}
      </h3>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-[#a6a6a6]">
        {tool.description}
      </p>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
        <span className={`rounded-full border px-2.5 py-0.5 text-xs ${categoriaColors[tool.categoria] || 'bg-white/[0.035] text-[#a6a6a6] border-white/10'}`}>
          {tool.categoria}
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-white">
          Abrir referência →
        </span>
      </div>
    </a>
  );
}

function RecursosPage() {
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas');
  const [tools, setTools] = useState(staticTools);
  const [categories, setCategories] = useState(staticCategories);

  useEffect(() => {
    let active = true;

    fetch('/api/news?kind=tools')
      .then((response) => {
        const contentType = response.headers.get('content-type') || '';
        if (!response.ok || !contentType.includes('application/json')) {
          throw new Error('tools-api-unavailable');
        }
        return response.json();
      })
      .then((payload) => {
        if (!active) return;
        setTools(payload.items?.length ? payload.items : staticTools);
        setCategories(payload.categorias?.length ? payload.categorias : staticCategories);
      })
      .catch(() => {
        if (!active) return;
        setTools(staticTools);
        setCategories(staticCategories);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!categories.includes(categoriaAtiva)) {
      setCategoriaAtiva('Todas');
    }
  }, [categories, categoriaAtiva]);

  const filtrados = categoriaAtiva === 'Todas'
    ? tools
    : tools.filter((r) => r.categoria === categoriaAtiva);

  const categoryCounts = useMemo(() => {
    return tools.reduce((acc, tool) => {
      acc[tool.categoria] = (acc[tool.categoria] || 0) + 1;
      return acc;
    }, {});
  }, [tools]);

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section className="brand-panel">
        <div className="brand-mark-panel grid gap-6 px-6 py-7 sm:px-8 lg:grid-cols-[1.25fr_0.75fr] lg:px-10 lg:py-8">
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="brand-pill px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]">
                  Ferramentas de IA
                </span>
                <span className="brand-pill px-3 py-1 text-[11px] font-medium">
                  Curadoria para pesquisa e operação
                </span>
              </div>

              <h1 className="brand-title mt-5 max-w-3xl text-4xl font-bold leading-[0.95] text-white sm:text-6xl lg:text-7xl">
                Ferramentas
                <span className="brand-metal block">de IA</span>
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#c9c9c9] sm:text-lg">
                Um acervo prático das ferramentas que entram no radar da VANT. Filtre por categoria, compare opções e siga para os tutoriais quando precisar de contexto aplicado.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="brand-pill px-4 py-2 text-sm">
                Curadoria ativa
              </span>
              <span className="brand-pill px-4 py-2 text-sm">
                Foco em uso real
              </span>
              <span className="brand-pill px-4 py-2 text-sm">
                Tutoriais e ebooks
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative flex h-full min-h-[240px] w-full items-center justify-center border border-white/10 bg-black/45 px-5 py-6">
              <div className="absolute inset-x-10 top-6 h-px bg-white/25" />
              <div className="absolute inset-x-10 bottom-6 h-px bg-white/15" />

              <div className="flex flex-col items-center gap-3">
                <div className="flex h-36 w-36 items-center justify-center border border-white/15 bg-white/[0.03] sm:h-40 sm:w-40">
                  <VantLogo size={118} />
                </div>
                <div className="text-center">
                  <p className="brand-kicker">IA em destaque</p>
                  <p className="mt-1 max-w-xs text-sm leading-relaxed text-[#a6a6a6]">
                    O espaço visual aqui reforça que o catálogo é focado em inteligência artificial e uso prático.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="brand-panel px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden border border-white/15 bg-white/[0.03] sm:h-11 sm:w-11">
            <img
              src="/assets/vant-logo-white.png"
              alt=""
              className="h-14 w-14 max-w-none object-contain"
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="brand-kicker text-[0.62rem]">Navegação rápida</p>
            <h2 className="brand-title mt-0.5 text-lg font-bold leading-tight text-white sm:text-xl">
              Escolha o filtro certo
            </h2>
            <p className="mt-0.5 max-w-2xl text-xs leading-relaxed text-[#a6a6a6] sm:text-sm">
              Use os filtros para encontrar referências, comparar categorias e abrir a ferramenta certa no momento certo.
            </p>
          </div>
        </div>

        <div className="mt-3 overflow-x-auto pb-1">
          <div className="flex min-w-max flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaAtiva(cat)}
                className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                  categoriaAtiva === cat
                    ? 'border-white/45 bg-white/[0.08] text-white'
                    : 'border-white/15 bg-white/[0.03] text-[#a6a6a6] hover:border-white/30 hover:text-white'
                }`}
              >
                {cat}
                {cat !== 'Todas' && (
                  <span className="ml-1.5 text-xs opacity-60">
                    {categoryCounts[cat] || 0}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="brand-kicker">Curadoria em destaque</p>
          <h2 className="brand-title mt-2 text-3xl font-bold text-white">
            Ferramentas em destaque
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-[#a6a6a6]">
          Cada card leva direto para a ferramenta rastreada. A seleção foi organizada para pesquisa, operação e produção de conteúdo, conforme o caso.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtrados.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>

      <div className="brand-panel px-6 py-7 text-center sm:px-8">
        <p className="brand-title text-2xl font-bold text-white">Quer saber como usar cada ferramenta?</p>
        <p className="mt-2 text-sm text-[#a6a6a6]">
          Cada ferramenta pode ser aprofundada no blog com passo a passo, contexto e guias práticos.
        </p>
        <a
          href="/sobre"
          className="brand-button-secondary mt-5 px-6 py-2.5 text-xs"
        >
          Conhecer a VANT →
        </a>
      </div>
    </div>
  );
}

export default RecursosPage;

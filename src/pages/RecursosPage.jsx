import { useState } from 'react';
import { recursos, categorias } from '../data/recursos.js';
import { trackedToolHref } from '../utils/tracking.js';

const badgeStyles = {
  'Que uso': 'bg-emerald-400/15 text-emerald-300 border border-emerald-400/25',
  'Afiliado': 'bg-amber-400/15 text-amber-300 border border-amber-400/25',
};

const categoriaColors = {
  IA: 'bg-purple-400/15 text-purple-300 border-purple-400/20',
  Produtividade: 'bg-blue-400/15 text-blue-300 border-blue-400/20',
  Automação: 'bg-cyan-400/15 text-cyan-300 border-cyan-400/20',
  Marketing: 'bg-pink-400/15 text-pink-300 border-pink-400/20',
  Vídeo: 'bg-orange-400/15 text-orange-300 border-orange-400/20',
  'E-commerce': 'bg-green-400/15 text-green-300 border-green-400/20',
};

function AiIcon() {
  return (
    <svg viewBox="0 0 240 240" className="h-24 w-24 text-cyan-300 sm:h-28 sm:w-28" aria-hidden="true">
      <defs>
        <linearGradient id="aiNodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.58" />
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
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition duration-200 hover:-translate-y-1 hover:border-cyan-400/35 hover:bg-white/[0.07] hover:shadow-[0_18px_60px_rgba(8,145,178,0.12)]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className="text-4xl leading-none">{tool.emoji}</span>
        <div className="flex flex-wrap gap-1.5">
          {tool.badge && (
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${badgeStyles[tool.badge]}`}>
              {tool.badge}
            </span>
          )}
          {tool.gratis && (
            <span className="rounded-full bg-slate-700/60 px-2.5 py-0.5 text-xs text-slate-400 border border-white/10">
              Grátis
            </span>
          )}
        </div>
      </div>

      <h3 className="font-display text-2xl font-bold leading-tight text-white transition group-hover:text-cyan-300">
        {tool.name}
      </h3>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">
        {tool.description}
      </p>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
        <span className={`rounded-full border px-2.5 py-0.5 text-xs ${categoriaColors[tool.categoria] || 'bg-slate-700/60 text-slate-400 border-white/10'}`}>
          {tool.categoria}
        </span>
        <span className="text-xs font-semibold text-cyan-400 transition group-hover:text-cyan-300">
          Acessar →
        </span>
      </div>
    </a>
  );
}

function RecursosPage() {
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas');

  const filtrados = categoriaAtiva === 'Todas'
    ? recursos
    : recursos.filter((r) => r.categoria === categoriaAtiva);

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section className="news-glow overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]">
        <div className="news-grid grid gap-6 px-6 py-7 sm:px-8 lg:grid-cols-[1.25fr_0.75fr] lg:px-10 lg:py-8">
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-300">
                  Ferramentas de IA
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-slate-300">
                  Curadoria para uso real
                </span>
              </div>

              <h1 className="font-display mt-4 max-w-3xl text-4xl font-extrabold leading-[0.95] text-white sm:text-6xl lg:text-7xl">
                Ferramentas
                <span className="block text-cyan-300">de IA</span>
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Uma vitrine direta das ferramentas que entram no fluxo da VANT. Filtre por categoria, acesse o que interessa e siga para os tutoriais quando precisar de contexto prático.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
                Curadoria ativa
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                Foco em uso real
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                Tutoriais e ebooks
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative flex h-full min-h-[200px] w-full items-center justify-center rounded-[1.5rem] border border-white/10 bg-slate-950/50 px-5 py-6">
              <div className="absolute inset-x-10 top-6 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
              <div className="absolute inset-x-10 bottom-6 h-px bg-gradient-to-r from-transparent via-cyan-300/25 to-transparent" />
              <div className="absolute left-7 top-7 h-2 w-2 rounded-full bg-cyan-300/80 shadow-[0_0_20px_rgba(34,211,238,0.9)]" />
              <div className="absolute right-7 bottom-7 h-2 w-2 rounded-full bg-cyan-300/60 shadow-[0_0_18px_rgba(34,211,238,0.7)]" />

              <div className="flex flex-col items-center gap-3">
                <div className="flex h-36 w-36 items-center justify-center rounded-full border border-cyan-400/25 bg-cyan-400/10 shadow-[0_0_55px_rgba(34,211,238,0.14)] sm:h-40 sm:w-40">
                  <AiIcon />
                </div>
                <div className="text-center">
                  <p className="text-xs uppercase tracking-[0.24em] text-cyan-400">IA em destaque</p>
                  <p className="mt-1 max-w-xs text-sm leading-relaxed text-slate-400">
                    O espaço visual aqui reforça que o catálogo é focado em inteligência artificial e uso prático.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-white/10 bg-slate-950/65 px-5 py-4 shadow-2xl shadow-cyan-950/20">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
            <AiIcon />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[11px] uppercase tracking-[0.24em] text-cyan-400">Navegação rápida</p>
            <h2 className="font-display mt-1 text-xl font-bold leading-tight text-white sm:text-2xl">
              Escolha o filtro certo
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-400">
              Use as categorias para ir direto ao tipo de ferramenta que você quer testar ou vender.
            </p>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto pb-1">
          <div className="flex min-w-max flex-wrap gap-2">
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaAtiva(cat)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  categoriaAtiva === cat
                    ? 'border-cyan-400/50 bg-cyan-400/15 text-cyan-300'
                    : 'border-white/15 bg-white/[0.03] text-slate-400 hover:border-white/30 hover:text-white'
                }`}
              >
                {cat}
                {cat !== 'Todas' && (
                  <span className="ml-1.5 text-xs opacity-60">
                    {recursos.filter((r) => r.categoria === cat).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-400">Catálogo aprovado</p>
          <h2 className="font-display mt-2 text-3xl font-bold text-white">
            Ferramentas em destaque
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-slate-400">
          Cada card leva direto para a ferramenta rastreada. A curadoria é pensada para operação, ebook ou vídeo, conforme o caso.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtrados.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>

      <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-6 py-7 text-center sm:px-8">
        <p className="font-display text-2xl font-bold text-white">Quer saber como usar cada ferramenta?</p>
        <p className="mt-2 text-sm text-slate-400">
          Cada ferramenta tem um tutorial no blog com passo a passo e ebook grátis.
        </p>
        <a
          href="/blog"
          className="mt-5 inline-flex items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-6 py-2.5 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400/20"
        >
          Ver tutoriais →
        </a>
      </div>
    </div>
  );
}

export default RecursosPage;

import { useState } from 'react';
import { recursos, categorias } from '../data/recursos.js';

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

function ToolCard({ tool }) {
  const href = tool.link + (tool.utm || '');
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-400/30 hover:bg-white/[0.08]"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="text-3xl">{tool.emoji}</span>
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

      <h3 className="font-bold text-white text-base group-hover:text-cyan-300 transition">
        {tool.name}
      </h3>

      <p className="mt-1.5 text-sm text-slate-400 leading-relaxed flex-1">
        {tool.description}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span className={`rounded-full border px-2.5 py-0.5 text-xs ${categoriaColors[tool.categoria] || 'bg-slate-700/60 text-slate-400 border-white/10'}`}>
          {tool.categoria}
        </span>
        <span className="text-xs text-cyan-400 group-hover:underline font-medium">
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
    <div>
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest text-cyan-400 mb-2">Repositório</p>
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          Ferramentas de IA
        </h1>
        <p className="mt-3 text-slate-400 text-base max-w-2xl">
          As melhores ferramentas de IA testadas e curadas. Filtre por categoria e encontre o que precisa para sua operação digital.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaAtiva(cat)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              categoriaAtiva === cat
                ? 'border-cyan-400/50 bg-cyan-400/15 text-cyan-300'
                : 'border-white/15 text-slate-400 hover:border-white/30 hover:text-white'
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtrados.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
        <p className="text-slate-300 font-medium">Quer saber como usar cada ferramenta?</p>
        <p className="mt-1 text-sm text-slate-500">
          Cada ferramenta tem um tutorial no blog com passo a passo e ebook grátis.
        </p>
        <a
          href="/blog"
          className="mt-4 inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-6 py-2.5 text-sm font-semibold text-cyan-300 hover:bg-cyan-400/20 transition"
        >
          Ver tutoriais →
        </a>
      </div>
    </div>
  );
}

export default RecursosPage;

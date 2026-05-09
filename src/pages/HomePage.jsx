import { Link } from 'react-router-dom';
import { getAllPosts } from '../utils/posts.js';
import { recursos } from '../data/recursos.js';
import { trackEvent, trackedToolHref } from '../utils/tracking.js';

function HomePage() {
  const ebookPosts = getAllPosts().filter((post) => post.ebook !== undefined).slice(0, 3);
  const featuredTools = recursos.filter((r) => r.badge === 'Que uso').slice(0, 4);
  const guideTools = recursos.filter((r) => ['IA', 'Produtividade', 'Automação'].includes(r.categoria)).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section className="news-glow overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]">
        <div className="news-grid grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1.35fr_0.65fr] lg:px-10 lg:py-10">
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-300">
                  Guias de IA
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-slate-300">
                  Ebooks e tutoriais gravados
                </span>
              </div>

              <h1 className="font-display mt-5 max-w-3xl text-4xl font-extrabold leading-[0.95] text-white sm:text-6xl lg:text-7xl">
                Guias
                <span className="block text-cyan-300">de IA</span>
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Uma base organizada de ebooks, tutoriais gravados e materiais práticos sobre ferramentas de IA.
                O foco aqui é ensinar, demonstrar e acelerar o uso real.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/blog"
                className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-7 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                Ver notícias e capturas →
              </Link>
              <Link
                to="/recursos"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/30 hover:bg-cyan-400/10"
              >
                Explorar ferramentas
              </Link>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/65 p-5 shadow-2xl shadow-cyan-950/20">
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-400">O que você encontra</p>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm font-semibold text-white">Ebooks por ferramenta</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">
                  Materiais curtos e objetivos, prontos para captura de email.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm font-semibold text-white">Tutoriais gravados</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">
                  Guias em vídeo para mostrar uso real, passo a passo e aplicação prática.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm font-semibold text-white">Ferramentas conectadas</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">
                  Acesso rápido às IAs que entram no fluxo de estudo e produção.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-400">Guias práticos</p>
              <h2 className="font-display mt-2 text-3xl font-bold text-white">
                Ebooks disponíveis
              </h2>
            </div>
            <Link to="/blog" className="text-sm text-cyan-400 hover:underline">
              Ver todos →
            </Link>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {ebookPosts.map((post) => {
              const tags = post.tags ? post.tags.split(',') : [];
              return (
                <Link
                  key={post.slug}
                  to={`/ebook/${post.slug}`}
                  onClick={() =>
                    trackEvent({
                      eventType: 'click',
                      itemType: 'ebook',
                      itemId: post.slug,
                      itemTitle: post.title,
                      source: 'home-guide-ebook-card',
                    })
                  }
                  className="group rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-0.5 hover:border-cyan-400/35 hover:bg-white/[0.07]"
                >
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {tags.slice(0, 2).map((t) => (
                      <span key={t} className="rounded-full bg-cyan-400/10 px-2 py-0.5 text-xs text-cyan-300 border border-cyan-400/20">
                        {t.trim()}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-display text-xl font-bold leading-snug text-white transition group-hover:text-cyan-300">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="mt-2 text-sm leading-relaxed text-slate-400 line-clamp-3">
                      {post.description}
                    </p>
                  )}
                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                    <span className="text-xs text-slate-500">{post.date}</span>
                    <span className="text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
                      Receber guia →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-400">Guias em vídeo</p>
              <h2 className="font-display mt-2 text-3xl font-bold text-white">
                Ferramentas para tutorial
              </h2>
            </div>
            <Link to="/recursos" className="text-sm text-cyan-400 hover:underline">
              Explorar →
            </Link>
          </div>
          <div className="mt-5 space-y-3">
            {guideTools.map((tool) => (
              <a
                key={tool.id}
                href={trackedToolHref(tool.id, 'home-guide-tool')}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-cyan-400/35 hover:bg-white/[0.07]"
              >
                <span className="text-2xl leading-none">{tool.emoji}</span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-lg font-bold text-white group-hover:text-cyan-300">
                    {tool.name}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400 line-clamp-2">
                    {tool.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-cyan-400">Ferramentas conectadas</p>
            <h2 className="font-display mt-2 text-3xl font-bold text-white">
              Base de apoio para os guias
            </h2>
          </div>
          <Link to="/recursos" className="text-sm text-cyan-400 hover:underline">
            Ver todas →
          </Link>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {featuredTools.map((tool) => (
            <a
              key={tool.id}
              href={trackedToolHref(tool.id, 'home-featured-tool')}
              target="_blank"
              rel="noreferrer"
              className="group rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-0.5 hover:border-cyan-400/35 hover:bg-white/[0.07]"
            >
              <span className="text-2xl">{tool.emoji}</span>
              <p className="mt-3 font-display text-xl font-bold text-white group-hover:text-cyan-300 transition">
                {tool.name}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-400 line-clamp-3">
                {tool.description}
              </p>
            </a>
          ))}
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-cyan-400/20 bg-cyan-400/5 p-7 text-center">
        <p className="font-display text-3xl font-bold text-white">Precisa automatizar algo?</p>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-400">
          Bots de WhatsApp, integrações entre sistemas e fluxos automáticos continuam aqui, no mesmo ecossistema dos guias.
        </p>
        <Link
          to="/automatize"
          className="mt-5 inline-flex items-center justify-center rounded-full bg-cyan-400 px-8 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
        >
          Falar com Victor →
        </Link>
      </section>
    </div>
  );
}

export default HomePage;

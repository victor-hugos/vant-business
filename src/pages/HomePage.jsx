import { Link } from 'react-router-dom';
import { getAllPosts } from '../utils/posts.js';
import { recursos } from '../data/recursos.js';

function HomePage() {
  const recentPosts = getAllPosts().slice(0, 3);
  const featuredTools = recursos.filter((r) => r.badge === 'Que uso').slice(0, 4);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero */}
      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-12 mb-10">
        <p className="text-xs uppercase tracking-widest text-cyan-400 mb-4">
          Victor Hugo · Automação &amp; IA
        </p>
        <h1 className="text-4xl font-bold text-white leading-tight sm:text-5xl max-w-3xl">
          Ferramentas de IA, tutoriais gratuitos e automações para seu negócio
        </h1>
        <p className="mt-5 text-lg text-slate-400 max-w-2xl leading-relaxed">
          Aqui você encontra os melhores recursos de IA curados, tutoriais com ebook e consultoria de automação para pequenos negócios.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            to="/recursos"
            className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-7 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-300 transition"
          >
            Ver ferramentas IA →
          </Link>
          <Link
            to="/blog"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-semibold text-slate-200 hover:border-cyan-400/30 hover:bg-cyan-400/10 transition"
          >
            Tutoriais gratuitos
          </Link>
          <Link
            to="/automatize"
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-3 text-sm font-semibold text-slate-400 hover:text-white hover:border-white/30 transition"
          >
            Automatize seu negócio
          </Link>
        </div>
      </section>

      {/* Posts recentes */}
      {recentPosts.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-white">Tutoriais recentes</h2>
            <Link to="/blog" className="text-sm text-cyan-400 hover:underline">
              Ver todos →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => {
              const tags = post.tags ? post.tags.split(',') : [];
              return (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-400/30 hover:bg-white/[0.07]"
                >
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {tags.slice(0, 2).map((t) => (
                      <span key={t} className="rounded-full bg-cyan-400/10 px-2 py-0.5 text-xs text-cyan-300 border border-cyan-400/20">
                        {t.trim()}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-semibold text-white text-sm group-hover:text-cyan-300 transition leading-snug">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-500">{post.date}</p>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Ferramentas em destaque */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-white">Ferramentas que uso</h2>
          <Link to="/recursos" className="text-sm text-cyan-400 hover:underline">
            Ver todas →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredTools.map((tool) => (
            <a
              key={tool.id}
              href={tool.link + (tool.utm || '')}
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-400/30 hover:bg-white/[0.07]"
            >
              <span className="text-2xl">{tool.emoji}</span>
              <p className="mt-2 font-semibold text-sm text-white group-hover:text-cyan-300 transition">
                {tool.name}
              </p>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed line-clamp-2">
                {tool.description}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* CTA Automatize */}
      <section className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-8 text-center">
        <p className="text-xl font-bold text-white">Precisa automatizar algo?</p>
        <p className="mt-2 text-slate-400 text-sm max-w-lg mx-auto">
          Bots de WhatsApp, integrações entre sistemas, fluxos automáticos. Me conta o que precisa.
        </p>
        <Link
          to="/automatize"
          className="mt-5 inline-block rounded-full bg-cyan-400 px-8 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-300 transition"
        >
          Falar com Victor →
        </Link>
      </section>
    </div>
  );
}

export default HomePage;

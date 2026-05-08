import { useParams, Link } from 'react-router-dom';
import { getPostBySlug } from '../utils/posts.js';

function BlogPostPage() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center">
        <p className="text-slate-400 text-lg">Post não encontrado.</p>
        <Link to="/blog" className="mt-4 inline-block text-cyan-400 hover:underline text-sm">
          ← Voltar ao blog
        </Link>
      </div>
    );
  }

  const tags = post.tags ? post.tags.split(',') : [];

  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-cyan-300 transition mb-8">
        ← Blog
      </Link>

      <article>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-cyan-400/10 px-2.5 py-0.5 text-xs font-medium text-cyan-300 border border-cyan-400/20"
            >
              {t.trim()}
            </span>
          ))}
          {post.tempo && (
            <span className="rounded-full bg-slate-700/60 px-2.5 py-0.5 text-xs text-slate-400">
              ⏱ {post.tempo}
            </span>
          )}
        </div>

        <h1 className="text-3xl font-bold text-white leading-tight sm:text-4xl">
          {post.title}
        </h1>

        {post.description && (
          <p className="mt-4 text-lg text-slate-400 leading-relaxed">{post.description}</p>
        )}

        <p className="mt-3 text-xs text-slate-500">{post.date}</p>

        {post.ebook && (
          <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-cyan-300">📥 Ebook grátis</p>
              <p className="text-xs text-slate-400 mt-0.5">
                Guia completo com prompts e fluxos prontos para usar.
              </p>
            </div>
            <a
              href={post.ebook}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-cyan-300 transition text-center"
            >
              Baixar grátis
            </a>
          </div>
        )}

        <div
          className="mt-10 prose-blog"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        {post.ebook && (
          <div className="mt-12 rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 to-slate-900/80 p-8 text-center">
            <p className="text-xl font-bold text-white">Quer o guia completo?</p>
            <p className="mt-2 text-slate-400 text-sm">
              Baixe o ebook com passo a passo, prompts prontos e fluxos de automação.
            </p>
            <a
              href={post.ebook}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-block rounded-full bg-cyan-400 px-8 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-300 transition"
            >
              Baixar ebook grátis →
            </a>
          </div>
        )}
      </article>
    </div>
  );
}

export default BlogPostPage;

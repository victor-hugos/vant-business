import { useParams, Link } from 'react-router-dom';
import { getPostBySlug } from '../utils/posts.js';

function BlogPostPage() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center">
        <p className="text-[#a6a6a6] text-lg">Post não encontrado.</p>
        <Link to="/blog" className="mt-4 inline-block text-sm text-white hover:underline">
          ← Voltar ao blog
        </Link>
      </div>
    );
  }

  const tags = post.tags ? post.tags.split(',') : [];

  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/blog" className="mb-8 inline-flex items-center gap-1 text-sm text-[#a6a6a6] transition hover:text-white">
        ← Blog
      </Link>

      <article className="brand-panel p-5 sm:p-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((t) => (
            <span
              key={t}
              className="brand-pill px-2.5 py-0.5 text-xs font-medium"
            >
              {t.trim()}
            </span>
          ))}
          {post.tempo && (
            <span className="brand-pill px-2.5 py-0.5 text-xs">
              ⏱ {post.tempo}
            </span>
          )}
        </div>

        <h1 className="brand-title text-3xl font-bold leading-tight text-white sm:text-4xl">
          {post.title}
        </h1>

        {post.description && (
          <p className="mt-4 text-lg leading-relaxed text-[#a6a6a6]">{post.description}</p>
        )}

        <p className="mt-3 text-xs text-[#6f6f6f]">{post.date}</p>

        {post.ebook !== undefined && (
          <div className="brand-card mt-6 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">📥 Ebook grátis</p>
              <p className="mt-0.5 text-xs text-[#a6a6a6]">
                Guia completo com prompts e fluxos prontos para usar.
              </p>
            </div>
            <Link
              to={`/ebook/${post.slug}`}
              className="brand-button-primary shrink-0 px-5 py-2.5 text-center text-xs"
            >
              Baixar grátis
            </Link>
          </div>
        )}

        <div
          className="mt-10 prose-blog"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        {post.ebook !== undefined && (
          <div className="brand-card mt-12 p-8 text-center">
            <p className="text-xl font-bold text-white">Quer o guia completo?</p>
            <p className="mt-2 text-sm text-[#a6a6a6]">
              Baixe o ebook com passo a passo, prompts prontos e fluxos de automação.
            </p>
            <Link
              to={`/ebook/${post.slug}`}
              className="brand-button-primary mt-5 px-8 py-3 text-xs"
            >
              Baixar ebook grátis →
            </Link>
          </div>
        )}
      </article>
    </div>
  );
}

export default BlogPostPage;

import { Link } from 'react-router-dom';
import { getAllPosts } from '../utils/posts.js';

function TagPill({ tag }) {
  return (
    <span className="rounded-full bg-cyan-400/10 px-2.5 py-0.5 text-xs font-medium text-cyan-300 border border-cyan-400/20">
      {tag}
    </span>
  );
}

function PostCard({ post }) {
  const tags = post.tags ? post.tags.split(',') : [];
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-cyan-400/30 hover:bg-white/[0.07]"
    >
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((t) => (
          <TagPill key={t} tag={t.trim()} />
        ))}
        {post.tempo && (
          <span className="rounded-full bg-slate-700/60 px-2.5 py-0.5 text-xs text-slate-400">
            ⏱ {post.tempo}
          </span>
        )}
      </div>
      <h2 className="text-lg font-bold text-white group-hover:text-cyan-300 transition leading-snug">
        {post.title}
      </h2>
      {post.description && (
        <p className="mt-2 text-sm text-slate-400 leading-relaxed line-clamp-2">
          {post.description}
        </p>
      )}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-slate-500">{post.date}</span>
        <span className="text-xs font-medium text-cyan-400 group-hover:underline">
          Ler tutorial →
        </span>
      </div>
    </Link>
  );
}

function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-cyan-400 mb-2">Blog</p>
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          Tutoriais gratuitos de IA
        </h1>
        <p className="mt-3 text-slate-400 text-base max-w-2xl">
          Guias práticos sobre ferramentas de IA, automação e estratégias digitais. Cada post vem com ebook para download.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-slate-400">
          Em breve — novos tutoriais chegando.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default BlogPage;

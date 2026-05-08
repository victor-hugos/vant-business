import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAllPosts } from '../utils/posts.js';
import EbookCover from '../components/EbookCover.jsx';

function EbookPage() {
  const { slug } = useParams();
  const post = getAllPosts().find((p) => p.slug === slug);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const ebookFile = `/ebooks/${slug}.pdf`;

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: name, email, ebook: slug }),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (!post) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center">
        <p className="text-slate-400">Ebook não encontrado.</p>
        <Link to="/blog" className="mt-4 inline-block text-cyan-400 hover:underline text-sm">
          ← Ver tutoriais
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto py-8">
      {status === 'success' ? (
        <div className="rounded-2xl border border-emerald-400/25 bg-emerald-400/5 p-10 text-center">
          <p className="text-4xl mb-4">📥</p>
          <h2 className="text-2xl font-bold text-white">Ebook liberado!</h2>
          <p className="mt-2 text-slate-400 text-sm">
            Clica no botão abaixo para baixar.
          </p>
          <a
            href={ebookFile}
            download
            className="mt-6 inline-block rounded-full bg-cyan-400 px-8 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-300 transition"
          >
            Baixar PDF agora →
          </a>
          <div className="mt-6">
            <Link to={`/blog/${slug}`} className="text-xs text-slate-500 hover:text-slate-400 transition">
              ← Voltar ao tutorial
            </Link>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <div className="flex justify-center mb-6">
            <EbookCover width={200} />
          </div>
          <p className="text-xs uppercase tracking-widest text-cyan-400 mb-3">Ebook grátis</p>
          <h1 className="text-2xl font-bold text-white leading-snug">
            {post.title}
          </h1>
          <p className="mt-2 text-slate-400 text-sm leading-relaxed">
            Guia completo com prompts prontos, passo a passo e fluxos de automação. Grátis.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1.5" htmlFor="nome">
                Seu nome
              </label>
              <input
                id="nome"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Victor"
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/30 transition"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1.5" htmlFor="email">
                Seu melhor e-mail
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@email.com"
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/30 transition"
              />
            </div>

            {status === 'error' && (
              <p className="text-xs text-red-400">
                Erro ao enviar. Tenta de novo.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="rounded-full bg-cyan-400 px-8 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-300 transition disabled:opacity-50"
            >
              {status === 'loading' ? 'Enviando...' : 'Quero o ebook grátis →'}
            </button>
          </form>

          <p className="mt-4 text-xs text-slate-600 text-center">
            Sem spam. Só conteúdo útil sobre IA e automação.
          </p>
        </div>
      )}
    </div>
  );
}

export default EbookPage;

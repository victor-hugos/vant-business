import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAllPosts } from '../utils/posts.js';
import EbookCover from '../components/EbookCover.jsx';
import { trackEvent } from '../utils/tracking.js';

function EbookPage() {
  const { slug } = useParams();
  const post = getAllPosts().find((p) => p.slug === slug);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [newsletterOptIn, setNewsletterOptIn] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const ebookFile = `/ebooks/${slug}.pdf`;

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: name,
          email,
          whatsapp,
          ebook: slug,
          productTitle: post.title,
          leadType: 'ebook',
          newsletterOptIn,
          source: 'ebook-page',
        }),
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
        <p className="text-[#a6a6a6]">Ebook não encontrado.</p>
        <Link to="/blog" className="mt-4 inline-block text-sm text-white hover:underline">
          ← Ver tutoriais
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto py-8">
      {status === 'success' ? (
        <div className="brand-panel p-10 text-center">
          <p className="text-4xl mb-4">📥</p>
          <h2 className="brand-title text-2xl font-bold text-white">Ebook liberado!</h2>
          <p className="mt-2 text-sm text-[#a6a6a6]">
            Clica no botão abaixo para baixar. Tambem enviamos a confirmacao para seu email.
          </p>
          <a
            href={ebookFile}
            download
            onClick={() =>
              trackEvent({
                eventType: 'download',
                itemType: 'ebook',
                itemId: slug,
                itemTitle: post.title,
                source: 'ebook-download-button',
              })
            }
            className="brand-button-primary mt-6 px-8 py-3 text-xs"
          >
            Baixar PDF agora →
          </a>
          <div className="mt-6">
            <Link to={`/blog/${slug}`} className="text-xs text-[#6f6f6f] transition hover:text-[#a6a6a6]">
              ← Voltar ao tutorial
            </Link>
          </div>
        </div>
      ) : (
        <div className="brand-panel p-8">
          <div className="flex justify-center mb-6">
            <EbookCover width={200} />
          </div>
          <p className="brand-kicker mb-3">Ebook grátis</p>
          <h1 className="brand-title text-2xl font-bold leading-snug text-white">
            {post.title}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[#a6a6a6]">
            Guia completo com prompts prontos, passo a passo e fluxos de automação. Grátis.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
            <div>
              <label className="block text-sm text-[#c9c9c9] mb-1.5" htmlFor="nome">
                Seu nome
              </label>
              <input
                id="nome"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Victor"
                className="brand-input px-4 py-3 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-[#c9c9c9] mb-1.5" htmlFor="email">
                Seu melhor e-mail
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@email.com"
                className="brand-input px-4 py-3 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-[#c9c9c9] mb-1.5" htmlFor="whatsapp">
                WhatsApp com DDD
              </label>
              <input
                id="whatsapp"
                type="tel"
                required
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="(11) 99999-9999"
                className="brand-input px-4 py-3 text-sm"
              />
            </div>

            <label className="flex items-start gap-3 border border-white/10 bg-white/[0.03] p-4 text-left">
              <input
                type="checkbox"
                checked={newsletterOptIn}
                onChange={(e) => setNewsletterOptIn(e.target.checked)}
                className="mt-1 h-4 w-4 border-white/20 bg-black text-white focus:ring-white"
              />
              <span>
                <span className="block text-sm font-medium text-[#f0f0f0]">
                  Quero tambem entrar no canal diario de noticias de IA
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-[#6f6f6f]">
                  Se deixar desmarcado, voce recebe apenas este ebook.
                </span>
              </span>
            </label>

            {status === 'error' && (
              <p className="text-xs text-red-400">
                Erro ao enviar. Tenta de novo.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="brand-button-primary px-8 py-3 text-xs disabled:opacity-50"
            >
              {status === 'loading' ? 'Enviando...' : 'Quero o ebook grátis →'}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-[#6f6f6f]">
            Sem spam. O cadastro identifica qual ebook foi solicitado.
          </p>
        </div>
      )}
    </div>
  );
}

export default EbookPage;

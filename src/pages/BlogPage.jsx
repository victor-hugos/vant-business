import { useEffect, useState } from 'react';
function TagPill({ tag }) {
  return (
    <span className="rounded-full bg-cyan-400/10 px-2.5 py-0.5 text-xs font-medium text-cyan-300 border border-cyan-400/20">
      {tag}
    </span>
  );
}

function formatDate(date) {
  if (!date) return 'Data pendente';
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return 'Data pendente';

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(parsed);
}

function withLocalNewsStatuses(items) {
  if (!['localhost', '127.0.0.1'].includes(window.location.hostname)) return items;

  try {
    const statuses = JSON.parse(window.localStorage.getItem('vant_admin_news_statuses') || '{}');
    return items.map((item) => ({ ...item, status: statuses[item.id] || item.status }));
  } catch {
    return items;
  }
}

function NewsCard({ item }) {
  const title = item.titlePt || item.title;
  const summary = item.summaryPt || item.summary;

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noreferrer"
      className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition duration-200 hover:-translate-y-1 hover:border-cyan-400/35 hover:bg-white/[0.07] hover:shadow-[0_18px_60px_rgba(8,145,178,0.12)]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
      <div className="flex flex-wrap items-center gap-2">
        <TagPill tag={item.category || 'IA'} />
        <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-0.5 text-xs text-emerald-200">
          Publicada
        </span>
      </div>
      <h2 className="font-display mt-4 text-2xl font-bold leading-tight text-white transition group-hover:text-cyan-300">
        {title}
      </h2>
      {summary && (
        <p className="mt-3 text-sm leading-relaxed text-slate-300 line-clamp-3">
          {summary}
        </p>
      )}
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Fonte</p>
          <span className="text-sm text-slate-200">{item.source}</span>
        </div>
        <span className="text-xs font-semibold text-cyan-400 transition group-hover:text-cyan-300">
          Ler agora →
        </span>
      </div>
      <p className="mt-3 text-xs text-slate-500">{formatDate(item.publishedAt)}</p>
    </a>
  );
}

function BlogPage() {
  const [news, setNews] = useState([]);
  const [generatedAt, setGeneratedAt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ nome: '', email: '', whatsapp: '' });
  const [submitting, setSubmitting] = useState(false);
  const [newsletterStatus, setNewsletterStatus] = useState('idle');

  useEffect(() => {
    let active = true;

    fetch('/api/news')
      .then((response) => {
        const contentType = response.headers.get('content-type') || '';
        if (!response.ok || !contentType.includes('application/json')) {
          return fetch('/data/ai-news.json').then((fallback) => (fallback.ok ? fallback.json() : { items: [] }));
        }
        return response.json();
      })
      .then((payload) => {
        if (!active) return;
        setNews(
          withLocalNewsStatuses(payload.items || []).filter(
            (item) => item.status === 'aprovada' || item.status === 'approved'
          )
        );
        setGeneratedAt(payload.generatedAt || null);
      })
      .catch(() => {
        if (active) setNews([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleNewsletterSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setNewsletterStatus('idle');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: form.nome,
          email: form.email,
          whatsapp: form.whatsapp,
          ebook: 'daily-ai-news',
          productTitle: 'Canal diario de noticias de IA',
          leadType: 'newsletter',
          newsletterOptIn: true,
          source: 'blog-hero',
        }),
      });

      setNewsletterStatus(response.ok ? 'success' : 'error');
    } catch {
      setNewsletterStatus('error');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section className="news-glow overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]">
        <div className="news-grid grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1.3fr_0.9fr] lg:px-10 lg:py-10">
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-300">
                  Últimas notícias de IA
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-slate-300">
                  Curadoria liberada no admin
                </span>
              </div>

              <h1 className="font-display mt-5 max-w-3xl text-4xl font-extrabold leading-[0.95] text-white sm:text-6xl lg:text-7xl">
                Últimas
                <span className="block text-cyan-300">notícias de IA</span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Uma seleção direta do que importa, traduzida para português e liberada só depois da avaliação.
                Entre no canal por email e receba o resumo diário sem ruído.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
                Email diário
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                10 notícias selecionadas
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                Conteúdo aprovado
              </span>
            </div>

            <p className="mt-6 text-xs uppercase tracking-[0.22em] text-slate-500">
              {generatedAt ? `Atualizado em ${formatDate(generatedAt)}` : 'Atualização contínua via admin'}
            </p>
          </div>

          <div className="self-start rounded-[1.5rem] border border-white/10 bg-slate-950/65 p-5 shadow-2xl shadow-cyan-950/20">
            <div className="mb-4">
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-400">Entrar no canal</p>
              <h2 className="font-display mt-2 text-2xl font-bold text-white">
                Receba a curadoria de IA por email
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Cadastre nome, email e WhatsApp para entrar no fluxo diário de notícias aprovadas.
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="text"
                required
                value={form.nome}
                onChange={(event) => updateField('nome', event.target.value)}
                placeholder="Seu nome"
                className="w-full rounded-xl border border-white/15 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30"
              />
              <input
                type="email"
                required
                value={form.email}
                onChange={(event) => updateField('email', event.target.value)}
                placeholder="Seu email"
                className="w-full rounded-xl border border-white/15 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30"
              />
              <input
                type="tel"
                required
                value={form.whatsapp}
                onChange={(event) => updateField('whatsapp', event.target.value)}
                placeholder="WhatsApp"
                className="w-full rounded-xl border border-white/15 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30"
              />
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-60"
              >
                {submitting ? 'Enviando...' : 'Entrar no canal de notícias'}
              </button>
              {newsletterStatus === 'success' && (
                <p className="text-xs text-emerald-300">Cadastro recebido. Você entrou no canal diário.</p>
              )}
              {newsletterStatus === 'error' && (
                <p className="text-xs text-red-300">Não foi possível cadastrar agora. Tente novamente.</p>
              )}
            </form>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-slate-400">
          Carregando notícias...
        </div>
      ) : news.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-slate-400">
          Nenhuma notícia aprovada ainda. A curadoria aparece aqui depois da avaliação no admin.
        </div>
      ) : (
        <section className="space-y-4">
          <div className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-400">Feed aprovado</p>
              <h2 className="font-display mt-2 text-3xl font-bold text-white">
                O que entrou hoje no ar
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-slate-400">
              Cada card abaixo é uma notícia liberada no admin e pronta para leitura. Entre no canal para receber o resumo por email.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {news.map((item) => (
              <NewsCard key={item.id || item.link} item={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default BlogPage;

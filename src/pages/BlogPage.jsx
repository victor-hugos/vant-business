import { useEffect, useState } from 'react';
import VantLogo from '../components/VantLogo.jsx';

function TagPill({ tag }) {
  return (
    <span className="brand-pill px-2.5 py-0.5 text-xs font-medium">
      {tag}
    </span>
  );
}

function FieldIcon({ type }) {
  if (type === 'user') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-[#8f8f8f]">
        <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.2 0-7 2.14-7 4.2A.8.8 0 0 0 5.8 19h12.4a.8.8 0 0 0 .8-.8c0-2.06-2.8-4.2-7-4.2Z" fill="currentColor" />
      </svg>
    );
  }

  if (type === 'mail') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-[#8f8f8f]">
        <path d="M4.5 6.75h15a1.25 1.25 0 0 1 1.25 1.25v8a1.25 1.25 0 0 1-1.25 1.25h-15A1.25 1.25 0 0 1 3.25 16V8A1.25 1.25 0 0 1 4.5 6.75Zm0 1.5v.19l7.5 4.84 7.5-4.84v-.19Zm15 7.5v-5.53l-7.09 4.58a.75.75 0 0 1-.82 0L4.5 10.22v5.53Z" fill="currentColor" />
      </svg>
    );
  }

  if (type === 'phone') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-[#8f8f8f]">
        <path d="M7.75 2.75h8.5A1.75 1.75 0 0 1 18 4.5v15a1.75 1.75 0 0 1-1.75 1.75h-8.5A1.75 1.75 0 0 1 6 19.5v-15a1.75 1.75 0 0 1 1.75-1.75Zm0 1.5a.25.25 0 0 0-.25.25v15c0 .14.11.25.25.25h8.5a.25.25 0 0 0 .25-.25v-15a.25.25 0 0 0-.25-.25Zm4.25 13.9a.95.95 0 1 1 0 1.9.95.95 0 0 1 0-1.9Z" fill="currentColor" />
      </svg>
    );
  }

  if (type === 'email-premium') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-white">
        <path d="M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5Zm1.5 0v.23L12 11l6.5-4.27V6.5Zm13 11v-8.98l-6.09 4a.75.75 0 0 1-.82 0l-6.09-4v8.98Z" fill="currentColor" />
      </svg>
    );
  }

  if (type === 'arrow') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 text-current">
        <path d="M5 12h12.17l-3.58 3.59L15 17l6-6-6-6-1.41 1.41L17.17 10H5Z" fill="currentColor" />
      </svg>
    );
  }

  return null;
}

function FeatureIcon({ type }) {
  const classes = 'flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/90';

  if (type === 'tools') {
    return (
      <div className={classes}>
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4.5 w-4.5">
          <path d="M4.75 5.5A.75.75 0 0 1 5.5 4.75h4.25a.75.75 0 0 1 .75.75v4.25a.75.75 0 0 1-.75.75H5.5a.75.75 0 0 1-.75-.75V5.5Zm8.75 0a.75.75 0 0 1 .75-.75h4.25a.75.75 0 0 1 .75.75v4.25a.75.75 0 0 1-.75.75h-4.25a.75.75 0 0 1-.75-.75V5.5ZM4.75 14.25a.75.75 0 0 1 .75-.75h4.25a.75.75 0 0 1 .75.75v4.25a.75.75 0 0 1-.75.75H5.5a.75.75 0 0 1-.75-.75v-4.25Zm8.75 0a.75.75 0 0 1 .75-.75h4.25a.75.75 0 0 1 .75.75v4.25a.75.75 0 0 1-.75.75h-4.25a.75.75 0 0 1-.75-.75v-4.25Z" fill="currentColor" />
        </svg>
      </div>
    );
  }

  if (type === 'insights') {
    return (
      <div className={classes}>
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4.5 w-4.5">
          <path d="M5 19.25h14v1.5H5v-1.5Zm1-3.25h2.5V9H6v7Zm4.75 0h2.5V5h-2.5v11Zm4.75 0H18v-5h-2.5v5Z" fill="currentColor" />
        </svg>
      </div>
    );
  }

  if (type === 'opportunities') {
    return (
      <div className={classes}>
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4.5 w-4.5">
          <path d="M13.1 2.75 6.7 12.2h4.18l-1.05 9.05 7.47-10.83h-4.16l-.04-.18 1.26-7.49h-1.26Z" fill="currentColor" />
        </svg>
      </div>
    );
  }

  return (
    <div className={classes}>
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4.5 w-4.5">
        <path d="M6 4.75h12A1.75 1.75 0 0 1 19.75 6.5v12A1.75 1.75 0 0 1 18 20.25H6A1.75 1.75 0 0 1 4.25 18.5v-12A1.75 1.75 0 0 1 6 4.75Zm0 1.5a.25.25 0 0 0-.25.25v12c0 .14.11.25.25.25h12a.25.25 0 0 0 .25-.25v-12a.25.25 0 0 0-.25-.25Zm2.25 2.5h7.5v1.5h-7.5v-1.5Zm0 3.5h7.5v1.5h-7.5v-1.5Zm0 3.5h5v1.5h-5v-1.5Z" fill="currentColor" />
      </svg>
    </div>
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
      className="brand-card group block p-6"
    >
      <div className="flex flex-wrap items-center gap-2">
        <TagPill tag={item.category || 'IA'} />
        <span className="rounded-full border border-white/20 bg-white/[0.05] px-2.5 py-0.5 text-xs text-white">
          Publicada
        </span>
      </div>
      <h2 className="font-display mt-4 text-2xl font-bold leading-tight text-white">
        {title}
      </h2>
      {summary && (
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#a6a6a6]">
          {summary}
        </p>
      )}
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#6f6f6f]">Fonte</p>
          <span className="text-sm text-[#f0f0f0]">{item.source}</span>
        </div>
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-white">
          Abrir matéria →
        </span>
      </div>
      <p className="mt-3 text-xs text-[#6f6f6f]">{formatDate(item.publishedAt)}</p>
    </a>
  );
}

function BlogPage() {
  const [news, setNews] = useState([]);
  const [generatedAt, setGeneratedAt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ nome: '', email: '', whatsapp: '' });
  const [submitting, setSubmitting] = useState(false);
  const [signupFeedback, setSignupFeedback] = useState({ tone: 'idle', message: '' });

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
    setSignupFeedback({ tone: 'idle', message: '' });

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

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        setSignupFeedback({ tone: 'error', message: payload.error || 'Nao foi possivel cadastrar agora. Tente novamente.' });
        return;
      }

      setSignupFeedback({
        tone: 'success',
        message: 'Cadastro recebido. Seu email entrou na lista de noticias de IA e ebooks gratuitos.',
      });
    } catch {
      setSignupFeedback({ tone: 'error', message: 'Nao foi possivel cadastrar agora. Tente novamente.' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
      <section className="brand-panel px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 sm:gap-5 lg:gap-6 xl:gap-7 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
          <div className="brand-card relative overflow-hidden p-4 sm:p-7 lg:p-8 xl:p-9">
            <div className="pointer-events-none absolute inset-y-0 right-[-18%] w-[78%] rounded-full border border-white/10 opacity-80 blur-[0.2px]" />
            <div className="pointer-events-none absolute right-[6%] top-[9%] h-[82%] w-[66%] rounded-full border border-white/[0.08]" />
            <div className="pointer-events-none absolute left-[28%] top-[15%] h-[58%] w-[58%] rounded-full border border-white/[0.07]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_32%,rgba(255,255,255,0.13),transparent_0,transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_46%)]" />

            <div className="relative z-[1] flex h-full flex-col justify-between">
              <div>
                <p className="brand-kicker">Curadoria · IA · Oportunidades</p>
                <h1 className="font-display mt-4 max-w-xl text-[2.35rem] font-bold uppercase leading-[0.92] tracking-[0.03em] text-white sm:mt-5 sm:text-5xl sm:tracking-normal lg:text-6xl">
                  Entre no
                  <span className="brand-metal block">ecossistema</span>
                  da VANT.
                </h1>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-[#b8b8b8] sm:mt-5 sm:text-base">
                  Receba noticias de IA, ferramentas, ebooks gratuitos e oportunidades por email. O WhatsApp fica reservado para contato futuro e conversas comerciais.
                </p>

                <div className="mt-6 grid max-w-xl grid-cols-2 gap-3 sm:mt-7 sm:gap-4 sm:grid-cols-4">
                  <div className="flex min-h-[102px] flex-col gap-2 rounded-2xl border border-white/8 bg-white/[0.02] p-3 sm:min-h-[116px] sm:p-3.5">
                    <FeatureIcon type="tools" />
                    <p className="text-[10px] font-medium uppercase leading-tight tracking-[0.14em] text-[#9f9f9f] sm:text-[11px] sm:tracking-[0.18em]">Ferramentas IA</p>
                  </div>
                  <div className="flex min-h-[102px] flex-col gap-2 rounded-2xl border border-white/8 bg-white/[0.02] p-3 sm:min-h-[116px]">
                    <FeatureIcon type="insights" />
                    <p className="text-[10px] font-medium uppercase leading-tight tracking-[0.14em] text-[#9f9f9f] sm:text-[11px] sm:tracking-[0.18em]">Noticias de IA</p>
                  </div>
                  <div className="flex min-h-[102px] flex-col gap-2 rounded-2xl border border-white/8 bg-white/[0.02] p-3 sm:min-h-[116px]">
                    <FeatureIcon type="opportunities" />
                    <p className="text-[10px] font-medium uppercase leading-tight tracking-[0.14em] text-[#9f9f9f] sm:text-[11px] sm:tracking-[0.18em]">Oportunidades relevantes</p>
                  </div>
                  <div className="flex min-h-[102px] flex-col gap-2 rounded-2xl border border-white/8 bg-white/[0.02] p-3 sm:min-h-[116px]">
                    <FeatureIcon type="curation" />
                    <p className="text-[10px] font-medium uppercase leading-tight tracking-[0.14em] text-[#9f9f9f] sm:text-[11px] sm:tracking-[0.18em]">Ebooks gratuitos</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-4 lg:mt-10 sm:grid-cols-2">
                <article className="rounded-[1.15rem] border border-white/10 bg-black/35 p-4 sm:p-[1.125rem] shadow-[0_20px_45px_rgba(0,0,0,0.22)] backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.08] shadow-[0_10px_35px_rgba(0,0,0,0.32)]">
                      <FieldIcon type="email-premium" />
                    </div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Noticias por email</p>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[#aaaaaa]">
                    Resumos, lancamentos e sinais de mercado para acompanhar IA com menos ruido.
                  </p>
                  <div className="mt-5 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d5d5d5]">
                    Lista editorial
                  </div>
                </article>

                <article className="rounded-[1.15rem] border border-white/10 bg-black/35 p-4 shadow-[0_20px_45px_rgba(0,0,0,0.22)] backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.08] shadow-[0_10px_35px_rgba(0,0,0,0.32)]">
                      <FieldIcon type="email-premium" />
                    </div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Ebooks gratuitos</p>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[#aaaaaa]">
                    Guias, curadorias e materiais praticos para transformar conteudo em acao.
                  </p>
                  <div className="mt-5 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d5d5d5]">
                    Materiais por email
                  </div>
                </article>
              </div>
            </div>
          </div>

          <div className="brand-card p-4 sm:p-6 lg:p-7 xl:p-8">
            <form onSubmit={handleNewsletterSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <p className="brand-kicker">Seu acesso comeca aqui</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">
                  Preencha seus dados
                </h2>
                <p className="text-sm text-[#9f9f9f]">
                  para receber noticias de IA e ebooks gratuitos por email.
                </p>
              </div>

              <label className="block">
                <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.18em] text-[#7f7f7f]">Nome</span>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                    <FieldIcon type="user" />
                  </span>
                  <input
                    id="blog-signup-name"
                    type="text"
                    required
                    value={form.nome}
                    onChange={(event) => updateField('nome', event.target.value)}
                    placeholder="Como posso te chamar?"
                    className="brand-input px-11 py-3 text-sm"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.18em] text-[#7f7f7f]">Email</span>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                    <FieldIcon type="mail" />
                  </span>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    placeholder="Seu melhor e-mail"
                    className="brand-input px-11 py-3 text-sm"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.18em] text-[#7f7f7f]">WhatsApp opcional</span>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                    <FieldIcon type="phone" />
                  </span>
                  <input
                    type="tel"
                    value={form.whatsapp}
                    onChange={(event) => updateField('whatsapp', event.target.value)}
                    placeholder="Numero com DDD"
                    className="brand-input px-11 py-3 text-sm"
                  />
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-[#747474]">
                  Usaremos o WhatsApp apenas para contato futuro, nao como canal atual de noticias.
                </p>
              </label>

              <div className="rounded-[1.1rem] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm font-semibold text-white">Seu cadastro vira acesso a curadoria aplicada</p>
                <p className="mt-2 text-xs leading-relaxed text-[#979797]">
                  Receba sinais importantes de IA, ferramentas selecionadas e materiais gratuitos para transformar novidades em ideias, automacoes e oportunidades praticas.
                </p>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="brand-button-primary flex w-full items-center justify-center gap-3 px-5 py-4 text-xs disabled:opacity-60"
              >
                <span>{submitting ? 'Enviando...' : 'Entrar no ecossistema por email'}</span>
                {!submitting ? <FieldIcon type="arrow" /> : null}
              </button>
              {signupFeedback.tone === 'success' && (
                <p className="text-xs text-white">{signupFeedback.message}</p>
              )}
              {signupFeedback.tone === 'error' && (
                <p className="text-xs text-red-300">{signupFeedback.message}</p>
              )}

              <p className="text-[11px] text-[#747474]">
                Seus dados estao protegidos com seguranca.
              </p>
            </form>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="brand-panel p-10 text-center text-[#a6a6a6]">
          Carregando notícias...
        </div>
      ) : news.length === 0 ? (
        <div className="brand-panel p-10 text-center text-[#a6a6a6]">
          Nenhuma notícia aprovada ainda. A curadoria aparece aqui depois da avaliação no admin.
        </div>
      ) : (
        <section className="space-y-4">
          <div className="flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="brand-kicker">Feed aprovado</p>
              <h2 className="brand-title mt-2 text-3xl font-bold text-white">
                O que entrou hoje no ar
              </h2>
            </div>
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

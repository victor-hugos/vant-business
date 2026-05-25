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

  if (type === 'whatsapp') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 text-white">
        <path d="M12.03 3.25a8.73 8.73 0 0 0-7.54 13.13L3.25 20.75l4.5-1.18A8.75 8.75 0 1 0 12.03 3.25Zm0 15.83a7.1 7.1 0 0 1-3.62-.99l-.26-.15-2.67.7.71-2.6-.17-.27a7.1 7.1 0 1 1 6.01 3.31Zm3.9-5.3c-.22-.11-1.3-.64-1.5-.71-.2-.07-.35-.11-.5.11-.15.22-.57.71-.7.86-.13.15-.26.17-.48.06-.22-.11-.92-.34-1.75-1.09-.65-.58-1.08-1.3-1.2-1.52-.13-.22-.01-.34.09-.45.09-.09.22-.24.33-.36.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.39-.06-.11-.5-1.21-.69-1.65-.18-.44-.36-.38-.5-.39h-.42c-.15 0-.39.06-.59.28-.2.22-.77.75-.77 1.84 0 1.09.79 2.14.9 2.29.11.15 1.56 2.38 3.78 3.33.53.23.95.36 1.27.46.53.17 1.01.15 1.39.09.42-.06 1.3-.53 1.48-1.04.19-.51.19-.95.13-1.04-.06-.09-.2-.15-.42-.26Z" fill="currentColor" />
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

function FeatureIcon({ tone = 'default' }) {
  const classes = tone === 'filled'
    ? 'flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.08] shadow-[0_10px_35px_rgba(0,0,0,0.32)]'
    : 'flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]';

  return <div className={classes} />;
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

function getContentSignupProductTitle({ emailEbooksOptIn, whatsappNewsOptIn }) {
  if (emailEbooksOptIn && whatsappNewsOptIn) {
    return 'Noticias diarias no WhatsApp + ebooks gratuitos por email';
  }

  if (whatsappNewsOptIn) {
    return 'Grupo de WhatsApp com noticias diarias sobre IA';
  }

  return 'Ebooks gratuitos e oportunidades por email';
}

function BlogPage() {
  const [news, setNews] = useState([]);
  const [generatedAt, setGeneratedAt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    emailEbooksOptIn: true,
    whatsappNewsOptIn: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [signupFeedback, setSignupFeedback] = useState({ tone: 'idle', message: '' });
  const [whatsappGroupUrl, setWhatsappGroupUrl] = useState('');

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

    if (!form.emailEbooksOptIn && !form.whatsappNewsOptIn) {
      setSubmitting(false);
      setSignupFeedback({ tone: 'error', message: 'Selecione pelo menos um canal para continuar.' });
      return;
    }

    try {
      setWhatsappGroupUrl('');
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: form.nome,
          email: form.email,
          whatsapp: form.whatsapp,
          ebook: 'vant-news-access',
          productTitle: getContentSignupProductTitle(form),
          leadType: 'content',
          emailEbooksOptIn: form.emailEbooksOptIn,
          whatsappNewsOptIn: form.whatsappNewsOptIn,
          source: 'blog-dual-signup',
        }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        setSignupFeedback({ tone: 'error', message: payload.error || 'Nao foi possivel cadastrar agora. Tente novamente.' });
        return;
      }

      const nextWhatsappGroupUrl = payload.whatsappGroupUrl || '';
      setWhatsappGroupUrl(nextWhatsappGroupUrl);

      setSignupFeedback({
        tone: 'success',
        message: form.emailEbooksOptIn && form.whatsappNewsOptIn
          ? 'Cadastro recebido. Email e WhatsApp foram registrados nos dois canais.'
          : form.whatsappNewsOptIn
            ? 'Cadastro recebido. Seu WhatsApp entrou na trilha diaria de noticias de IA.'
            : 'Cadastro recebido. Seu email entrou na trilha de ebooks gratuitos e oportunidades.',
      });

      if (form.whatsappNewsOptIn && nextWhatsappGroupUrl) {
        window.open(nextWhatsappGroupUrl, '_blank', 'noopener,noreferrer');
      }
    } catch {
      setSignupFeedback({ tone: 'error', message: 'Nao foi possivel cadastrar agora. Tente novamente.' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section className="brand-panel px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-5 lg:gap-6 xl:gap-7 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
          <div className="brand-card relative overflow-hidden p-5 sm:p-7 lg:p-8 xl:p-9">
            <div className="pointer-events-none absolute inset-y-0 right-[-18%] w-[78%] rounded-full border border-white/10 opacity-80 blur-[0.2px]" />
            <div className="pointer-events-none absolute right-[6%] top-[9%] h-[82%] w-[66%] rounded-full border border-white/[0.08]" />
            <div className="pointer-events-none absolute left-[28%] top-[15%] h-[58%] w-[58%] rounded-full border border-white/[0.07]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_32%,rgba(255,255,255,0.13),transparent_0,transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_46%)]" />

            <div className="relative z-[1] flex h-full flex-col justify-between">
              <div>
                <p className="brand-kicker">Curadoria · IA · Oportunidades</p>
                <h1 className="font-display mt-5 max-w-xl text-4xl font-bold uppercase leading-[0.94] text-white sm:text-5xl lg:text-6xl">
                  Entre no
                  <span className="brand-metal block">ecossistema</span>
                  da VANT.
                </h1>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-[#b8b8b8] sm:text-base">
                  Receba ferramentas, noticias, insights e oportunidades sobre IA, automacao e crescimento digital.
                </p>

                <div className="mt-7 grid max-w-xl grid-cols-2 gap-3 sm:gap-4 text-[11px] uppercase tracking-[0.18em] text-[#9f9f9f] sm:grid-cols-4">
                  <div className="space-y-2 rounded-2xl border border-white/8 bg-white/[0.02] p-3 sm:p-3.5">
                    <FeatureIcon />
                    <p>Ferramentas IA</p>
                  </div>
                  <div className="space-y-2 rounded-2xl border border-white/8 bg-white/[0.02] p-3">
                    <FeatureIcon />
                    <p>Insights exclusivos</p>
                  </div>
                  <div className="space-y-2 rounded-2xl border border-white/8 bg-white/[0.02] p-3">
                    <FeatureIcon />
                    <p>Oportunidades relevantes</p>
                  </div>
                  <div className="space-y-2 rounded-2xl border border-white/8 bg-white/[0.02] p-3">
                    <FeatureIcon />
                    <p>Curadoria premium</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-4 lg:mt-10 sm:grid-cols-2">
                <article className="rounded-[1.15rem] border border-white/10 bg-black/35 p-4 sm:p-[1.125rem] shadow-[0_20px_45px_rgba(0,0,0,0.22)] backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.08] shadow-[0_10px_35px_rgba(0,0,0,0.32)]">
                      <FieldIcon type="whatsapp" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white">WhatsApp Insider</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[#aaaaaa]">
                    Atualizacoes rapidas, noticias, ferramentas e tendencias de IA em ritmo diario.
                  </p>
                  <div className="mt-5 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d5d5d5]">
                    Melhor para consumo rapido
                  </div>
                </article>

                <article className="rounded-[1.15rem] border border-white/10 bg-black/35 p-4 shadow-[0_20px_45px_rgba(0,0,0,0.22)] backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.08] shadow-[0_10px_35px_rgba(0,0,0,0.32)]">
                      <FieldIcon type="email-premium" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Email Premium</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[#aaaaaa]">
                    Ebooks, curadorias, oportunidades e materiais estrategicos com mais profundidade.
                  </p>
                  <div className="mt-5 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d5d5d5]">
                    Melhor para aprofundar
                  </div>
                </article>
              </div>
            </div>
          </div>

          <div className="brand-card p-5 sm:p-6 lg:p-7 xl:p-8">
            <form onSubmit={handleNewsletterSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <p className="brand-kicker">Seu acesso começa aqui</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">
                  Preencha seus dados
                </h2>
                <p className="text-sm text-[#9f9f9f]">
                  e escolha como deseja receber.
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
                    value={form.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    placeholder="Seu melhor e-mail"
                    className="brand-input px-11 py-3 text-sm"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.18em] text-[#7f7f7f]">WhatsApp</span>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                    <FieldIcon type="phone" />
                  </span>
                  <input
                    type="tel"
                    value={form.whatsapp}
                    onChange={(event) => updateField('whatsapp', event.target.value)}
                    placeholder="Seu numero com DDD"
                    className="brand-input px-11 py-3 text-sm"
                  />
                </div>
              </label>

              <div>
                <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#7f7f7f]">Escolha seus canais</p>
                <div className="space-y-4">
                  <label className="flex cursor-pointer items-start gap-4 rounded-[1.1rem] border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/20">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.08]">
                      <FieldIcon type="whatsapp" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-white">Entrar no grupo do WhatsApp com noticias diarias sobre IA</p>
                          <p className="mt-1 text-xs leading-relaxed text-[#979797]">
                            Noticias diarias, ferramentas e oportunidades em tempo real.
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={form.whatsappNewsOptIn}
                          onChange={(event) => updateField('whatsappNewsOptIn', event.target.checked)}
                          className="mt-1 h-4 w-4 rounded border-white/20 bg-black accent-white"
                        />
                      </div>
                    </div>
                  </label>

                  <label className="flex cursor-pointer items-start gap-4 rounded-[1.1rem] border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/20">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.08]">
                      <FieldIcon type="email-premium" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-white">Receber ebooks gratuitos e oportunidades por email</p>
                          <p className="mt-1 text-xs leading-relaxed text-[#979797]">
                            Ebooks, guias, curadorias e materiais exclusivos com profundidade.
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={form.emailEbooksOptIn}
                          onChange={(event) => updateField('emailEbooksOptIn', event.target.checked)}
                          className="mt-1 h-4 w-4 rounded border-white/20 bg-black accent-white"
                        />
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="brand-button-primary flex w-full items-center justify-center gap-3 px-5 py-4 text-xs disabled:opacity-60"
              >
                <span>{submitting ? 'Enviando...' : 'Entrar no ecossistema'}</span>
                {!submitting ? <FieldIcon type="arrow" /> : null}
              </button>

              {signupFeedback.tone === 'success' && (
                <div className="space-y-3">
                  <p className="text-xs text-white">{signupFeedback.message}</p>
                  {whatsappGroupUrl ? (
                    <a
                      href={whatsappGroupUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="brand-button-secondary inline-flex w-full items-center justify-center gap-2 px-5 py-3 text-xs"
                    >
                      <span>Abrir grupo do WhatsApp</span>
                      <FieldIcon type="arrow" />
                    </a>
                  ) : null}
                </div>
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

      <section className="brand-panel">
        <div className="brand-mark-panel px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="brand-pill px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]">
                    Últimas notícias de IA
                  </span>
                  <span className="brand-pill px-3 py-1 text-[11px] font-medium">
                    Curadoria editorial de IA
                  </span>
                </div>

                <h1 className="brand-title mt-5 max-w-3xl text-4xl font-bold leading-[0.95] text-white sm:text-6xl lg:text-7xl">
                  Últimas
                  <span className="brand-metal block">notícias de IA</span>
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#c9c9c9] sm:text-lg">
                  Uma leitura contínua do que importa, traduzida para português e liberada só depois da avaliação.
                  Escolha acompanhar pelo WhatsApp para noticias diarias ou pelo email para receber ebooks gratuitos e oportunidades com mais contexto.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="brand-pill px-4 py-2 text-sm">
                  WhatsApp diario
                </span>
                <span className="brand-pill px-4 py-2 text-sm">
                  Ebooks gratuitos
                </span>
                <span className="brand-pill px-4 py-2 text-sm">
                  Conteúdo aprovado
                </span>
              </div>

              <p className="mt-6 text-xs uppercase tracking-[0.22em] text-[#6f6f6f]">
                {generatedAt ? `Atualizado em ${formatDate(generatedAt)}` : 'Atualização contínua via admin'}
              </p>
            </div>
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
            <p className="max-w-xl text-sm leading-relaxed text-[#a6a6a6]">
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

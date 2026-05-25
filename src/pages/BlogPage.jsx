import { useEffect, useState } from 'react';
import VantLogo from '../components/VantLogo.jsx';

function TagPill({ tag }) {
  return (
    <span className="brand-pill px-2.5 py-0.5 text-xs font-medium">
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

      setSignupFeedback({
        tone: 'success',
        message: form.emailEbooksOptIn && form.whatsappNewsOptIn
          ? 'Cadastro recebido. Email e WhatsApp foram registrados nos dois canais.'
          : form.whatsappNewsOptIn
            ? 'Cadastro recebido. Seu WhatsApp entrou na trilha diaria de noticias de IA.'
            : 'Cadastro recebido. Seu email entrou na trilha de ebooks gratuitos e oportunidades.',
      });
    } catch {
      setSignupFeedback({ tone: 'error', message: 'Nao foi possivel cadastrar agora. Tente novamente.' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section className="brand-panel px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
          <div className="brand-card flex flex-col p-5 sm:p-6 lg:p-7">
            <div className="mb-5 flex items-center gap-3">
              <VantLogo size={44} />
              <div>
                <p className="brand-kicker">Dois canais de acompanhamento</p>
                <h2 className="brand-title mt-1 text-xl font-bold text-white">
                  Curadoria, noticias e oportunidades
                </h2>
              </div>
            </div>

            <div>
              <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                Acompanhe a VANT pelo canal que faz mais sentido para voce
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#a6a6a6] sm:text-base">
                No WhatsApp, o foco e noticia diaria de IA com ritmo rapido. No email, o foco e material gratuito, ebooks e oportunidades com contexto mais formal.
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
                <p className="brand-kicker">Canal 1</p>
                <h4 className="mt-2 text-lg font-bold text-white">
                  Entrar no grupo do WhatsApp com noticias diarias sobre IA
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-[#a6a6a6]">
                  Melhor para alertas rapidos, leitura recorrente e acompanhamento diario do que esta acontecendo em IA.
                </p>
              </article>

              <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
                <p className="brand-kicker">Canal 2</p>
                <h4 className="mt-2 text-lg font-bold text-white">
                  Receber ebooks gratuitos e oportunidades por email
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-[#a6a6a6]">
                  Melhor para aprofundar o tema, receber materiais gratuitos e usar um canal mais formal para estudar ou aproveitar oportunidades.
                </p>
              </article>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="brand-pill px-4 py-2 text-sm">WhatsApp diario</span>
              <span className="brand-pill px-4 py-2 text-sm">Ebooks gratuitos</span>
              <span className="brand-pill px-4 py-2 text-sm">Curadoria aprovada</span>
            </div>
          </div>

          <div className="brand-card p-5 sm:p-6 lg:p-7">
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.08em] text-[#b7b7b7]" htmlFor="blog-signup-name">
                  Seu nome
                </label>
                <input
                  id="blog-signup-name"
                  type="text"
                  required
                  value={form.nome}
                  onChange={(event) => updateField('nome', event.target.value)}
                  placeholder="Como posso te chamar?"
                  className="brand-input px-4 py-3 text-sm"
                />
              </div>

              <div className="grid gap-4 xl:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">Email</p>
                      <p className="mt-1 text-xs leading-relaxed text-[#8f8f8f]">
                        Canal mais formal para ebooks gratuitos, listas e oportunidades.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={form.emailEbooksOptIn}
                      onChange={(event) => updateField('emailEbooksOptIn', event.target.checked)}
                      className="mt-1 h-4 w-4 accent-white"
                    />
                  </div>

                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => updateField('email', event.target.value)}
                    placeholder="Seu email"
                    className="brand-input mt-4 px-4 py-3 text-sm"
                  />
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">WhatsApp</p>
                      <p className="mt-1 text-xs leading-relaxed text-[#8f8f8f]">
                        Trilha rapida para noticias diarias e atualizacoes mais recorrentes.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={form.whatsappNewsOptIn}
                      onChange={(event) => updateField('whatsappNewsOptIn', event.target.checked)}
                      className="mt-1 h-4 w-4 accent-white"
                    />
                  </div>

                  <input
                    type="tel"
                    value={form.whatsapp}
                    onChange={(event) => updateField('whatsapp', event.target.value)}
                    placeholder="WhatsApp com DDD"
                    className="brand-input mt-4 px-4 py-3 text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="brand-button-primary w-full px-5 py-3 text-xs disabled:opacity-60"
              >
                {submitting ? 'Enviando...' : 'Ativar canais selecionados'}
              </button>

              {signupFeedback.tone === 'success' && (
                <p className="text-xs text-white">{signupFeedback.message}</p>
              )}
              {signupFeedback.tone === 'error' && (
                <p className="text-xs text-red-300">{signupFeedback.message}</p>
              )}
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

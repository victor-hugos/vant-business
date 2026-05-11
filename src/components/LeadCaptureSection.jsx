import { useMemo, useState } from 'react';
import { leadMagnets } from '../data/leadMagnets.js';
import SectionHeader from './ui/SectionHeader.jsx';

const initialFormState = {
  name: '',
  email: '',
  whatsapp: '',
  consent: false,
  company: '',
};

function LeadCaptureSection() {
  const [newsletterForm, setNewsletterForm] = useState(initialFormState);
  const [ebookForm, setEbookForm] = useState(initialFormState);
  const [selectedEbook, setSelectedEbook] = useState('ebook-ia-tools-starter');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const newsletter = leadMagnets.find((item) => item.id === 'daily-ai-news');
  const ebooks = useMemo(() => leadMagnets.filter((item) => item.type === 'ebook'), []);
  const activeEbook = ebooks.find((item) => item.id === selectedEbook) || ebooks[0];

  function updateForm(setter, field, value) {
    setter((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function submitLead(event, product, form, resetForm) {
    event.preventDefault();
    setStatus({ type: '', message: '' });

    if (!form.consent) {
      setStatus({
        type: 'error',
        message: 'Confirme o consentimento para receber o material e comunicacoes da VANT Business.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          productId: product.id,
          source: 'vant-business-site',
        }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.error || 'Nao foi possivel processar seu cadastro agora.');
      }

      setStatus({
        type: 'success',
        message:
          product.type === 'newsletter'
            ? 'Cadastro recebido. Voce entrara na lista das melhores noticias de IA.'
            : `Cadastro recebido. O material "${product.title}" sera enviado para seu email.`,
      });
      resetForm(initialFormState);
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass =
    'w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition focus:border-cyan-300/60 focus:outline-none focus:ring-2 focus:ring-cyan-300/20';

  return (
    <section id="base-ia" className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6">
      <SectionHeader
        eyebrow="Base de IA"
        title="Receba noticias, guias e ferramentas antes de virar video"
        subtitle="A VANT Business usa essa base para entregar curadoria diaria, ebooks e testes praticos de ferramentas de IA. Cada cadastro registra o material solicitado, email e WhatsApp para acompanhamento."
      />

      <div className="mt-7 grid gap-5 lg:grid-cols-2">
        <article className="rounded-2xl border border-cyan-300/20 bg-slate-950/70 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            {newsletter.label}
          </p>
          <h3 className="mt-3 text-2xl font-semibold leading-tight text-white">
            {newsletter.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">{newsletter.description}</p>
          <p className="mt-4 text-sm font-semibold text-cyan-100">{newsletter.delivery}</p>

          <form
            className="mt-5 grid gap-3"
            onSubmit={(event) =>
              submitLead(event, newsletter, newsletterForm, setNewsletterForm)
            }
          >
            <input
              className={inputClass}
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Seu nome"
              value={newsletterForm.name}
              onChange={(event) => updateForm(setNewsletterForm, 'name', event.target.value)}
              required
            />
            <input
              className={inputClass}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Seu melhor email"
              value={newsletterForm.email}
              onChange={(event) => updateForm(setNewsletterForm, 'email', event.target.value)}
              required
            />
            <input
              className={inputClass}
              name="whatsapp"
              type="tel"
              autoComplete="tel"
              placeholder="WhatsApp com DDD"
              value={newsletterForm.whatsapp}
              onChange={(event) => updateForm(setNewsletterForm, 'whatsapp', event.target.value)}
              required
            />
            <input
              className="hidden"
              name="company"
              type="text"
              tabIndex="-1"
              autoComplete="off"
              value={newsletterForm.company}
              onChange={(event) => updateForm(setNewsletterForm, 'company', event.target.value)}
            />
            <label className="flex gap-3 text-xs leading-5 text-slate-400">
              <input
                className="mt-1 h-4 w-4 rounded border-white/20 bg-slate-950 text-cyan-300"
                type="checkbox"
                checked={newsletterForm.consent}
                onChange={(event) =>
                  updateForm(setNewsletterForm, 'consent', event.target.checked)
                }
              />
              Aceito receber emails da VANT Business com noticias, materiais e oportunidades de IA.
            </label>
            <button
              className="rounded-full bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : newsletter.cta}
            </button>
          </form>
        </article>

        <article className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Biblioteca gratuita
          </p>
          <h3 className="mt-3 text-2xl font-semibold leading-tight text-white">
            Receba um ebook por email
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Escolha o material. O sistema registra exatamente qual produto foi solicitado para
            entregar o email correto e medir interesse por tema.
          </p>

          <div className="mt-5 grid gap-3">
            {ebooks.map((ebook) => (
              <button
                key={ebook.id}
                type="button"
                onClick={() => setSelectedEbook(ebook.id)}
                className={`rounded-2xl border p-4 text-left transition ${
                  selectedEbook === ebook.id
                    ? 'border-cyan-300/60 bg-cyan-300/10'
                    : 'border-white/10 bg-slate-900/70 hover:border-cyan-300/30'
                }`}
              >
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                  {ebook.label}
                </span>
                <span className="mt-2 block text-base font-semibold text-white">
                  {ebook.title}
                </span>
                <span className="mt-1 block text-sm leading-6 text-slate-300">
                  {ebook.description}
                </span>
              </button>
            ))}
          </div>

          <form
            className="mt-5 grid gap-3"
            onSubmit={(event) => submitLead(event, activeEbook, ebookForm, setEbookForm)}
          >
            <input
              className={inputClass}
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Seu nome"
              value={ebookForm.name}
              onChange={(event) => updateForm(setEbookForm, 'name', event.target.value)}
              required
            />
            <input
              className={inputClass}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Seu melhor email"
              value={ebookForm.email}
              onChange={(event) => updateForm(setEbookForm, 'email', event.target.value)}
              required
            />
            <input
              className={inputClass}
              name="whatsapp"
              type="tel"
              autoComplete="tel"
              placeholder="WhatsApp com DDD"
              value={ebookForm.whatsapp}
              onChange={(event) => updateForm(setEbookForm, 'whatsapp', event.target.value)}
              required
            />
            <input
              className="hidden"
              name="company"
              type="text"
              tabIndex="-1"
              autoComplete="off"
              value={ebookForm.company}
              onChange={(event) => updateForm(setEbookForm, 'company', event.target.value)}
            />
            <label className="flex gap-3 text-xs leading-5 text-slate-400">
              <input
                className="mt-1 h-4 w-4 rounded border-white/20 bg-slate-950 text-cyan-300"
                type="checkbox"
                checked={ebookForm.consent}
                onChange={(event) => updateForm(setEbookForm, 'consent', event.target.checked)}
              />
              Aceito receber o material solicitado e comunicacoes relacionadas da VANT Business.
            </label>
            <button
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : activeEbook.cta}
            </button>
          </form>
        </article>
      </div>

      {status.message ? (
        <div
          className={`mt-5 rounded-2xl border px-4 py-3 text-sm leading-6 ${
            status.type === 'success'
              ? 'border-emerald-300/30 bg-emerald-300/10 text-emerald-100'
              : 'border-rose-300/30 bg-rose-300/10 text-rose-100'
          }`}
        >
          {status.message}
        </div>
      ) : null}
    </section>
  );
}

export default LeadCaptureSection;

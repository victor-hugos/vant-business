import { useState } from 'react';

function NewsletterSignup() {
  const [form, setForm] = useState({ nome: '', email: '', whatsapp: '' });
  const [status, setStatus] = useState('idle');

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('loading');

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
          source: 'home-newsletter',
        }),
      });

      setStatus(response.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="mb-12 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-6 sm:p-8">
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="text-xs uppercase tracking-widest text-cyan-300">Canal diario</p>
          <h2 className="mt-2 text-2xl font-bold text-white">Receba as 10 melhores noticias de IA por email</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            A curadoria diaria nasce do agente de noticias: ele busca 20 novidades, deixa em avaliacao e envia somente o pacote aprovado.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-2">
          <input
            type="text"
            required
            value={form.nome}
            onChange={(event) => updateField('nome', event.target.value)}
            placeholder="Seu nome"
            className="rounded-xl border border-white/15 bg-slate-950/50 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30"
          />
          <input
            type="email"
            required
            value={form.email}
            onChange={(event) => updateField('email', event.target.value)}
            placeholder="voce@email.com"
            className="rounded-xl border border-white/15 bg-slate-950/50 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30"
          />
          <input
            type="tel"
            required
            value={form.whatsapp}
            onChange={(event) => updateField('whatsapp', event.target.value)}
            placeholder="WhatsApp com DDD"
            className="rounded-xl border border-white/15 bg-slate-950/50 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-60"
          >
            {status === 'loading' ? 'Enviando...' : 'Entrar no canal'}
          </button>

          {status === 'success' && (
            <p className="sm:col-span-2 text-xs text-emerald-300">
              Cadastro recebido. Voce entrou na lista diaria de noticias de IA.
            </p>
          )}
          {status === 'error' && (
            <p className="sm:col-span-2 text-xs text-red-300">
              Nao foi possivel cadastrar agora. Confira os dados e tente novamente.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default NewsletterSignup;

import { useState } from 'react';

function AutomatizePage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    fetch('https://formspree.io/f/placeholder', {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    }).then(() => setSent(true));
  }

  return (
    <div className="max-w-2xl mx-auto">
      <p className="text-xs uppercase tracking-widest text-cyan-400 mb-2">Automação</p>
      <h1 className="text-3xl font-bold text-white sm:text-4xl">
        Automatize seu negócio
      </h1>
      <p className="mt-3 text-slate-400 text-base">
        Me conta o que você precisa automatizar. Vejo se consigo te ajudar com bots, integrações ou fluxos automáticos.
      </p>

      {sent ? (
        <div className="mt-10 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-8 text-center">
          <p className="text-2xl mb-2">✅</p>
          <p className="text-emerald-300 font-semibold">Recebi sua mensagem!</p>
          <p className="text-slate-400 text-sm mt-1">Entro em contato em breve.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <div>
            <label className="block text-sm text-slate-300 mb-1.5" htmlFor="nome">Nome</label>
            <input
              id="nome"
              name="nome"
              type="text"
              required
              placeholder="Seu nome"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/30 transition"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1.5" htmlFor="email">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="seu@email.com"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/30 transition"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1.5" htmlFor="descricao">
              O que você quer automatizar?
            </label>
            <textarea
              id="descricao"
              name="descricao"
              required
              rows={5}
              placeholder="Ex: Quero automatizar o atendimento no WhatsApp e capturar leads..."
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/30 transition resize-none"
            />
          </div>
          <button
            type="submit"
            className="rounded-full bg-cyan-400 px-8 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-300 transition self-start"
          >
            Enviar →
          </button>
        </form>
      )}
    </div>
  );
}

export default AutomatizePage;

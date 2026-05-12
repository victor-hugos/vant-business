import { useState } from 'react';
import VantLogo from '../components/VantLogo.jsx';

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
    <div className="mx-auto max-w-5xl">
      <section className="brand-panel">
        <div className="brand-mark-panel grid gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-10">
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-white/40" />
                <p className="brand-kicker">Automação · IA · Escala</p>
              </div>
              <h1 className="brand-title mt-5 text-4xl font-bold leading-tight text-white sm:text-5xl">
                Automatize
                <span className="brand-metal block">seu negócio</span>
              </h1>
              <p className="mt-4 text-base leading-8 text-[#c9c9c9]">
                Me conta o que você precisa automatizar. Vejo se consigo te ajudar com bots, integrações ou fluxos automáticos.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-5">
              <VantLogo size={58} />
              <div>
                <p className="brand-title text-sm font-bold text-white">VANT.BUSINESS</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#6f6f6f]">
                  Estratégia · Conexão · Resultados
                </p>
              </div>
            </div>
          </div>

          {sent ? (
            <div className="brand-card flex min-h-[320px] flex-col items-center justify-center p-8 text-center">
              <VantLogo size={82} />
              <p className="brand-title mt-6 text-2xl font-bold text-white">Recebi sua mensagem</p>
              <p className="mt-2 text-sm text-[#a6a6a6]">Entro em contato em breve.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="brand-card flex flex-col gap-5 p-5 sm:p-6">
              <div>
                <label className="mb-1.5 block text-sm text-[#c9c9c9]" htmlFor="nome">Nome</label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  required
                  placeholder="Seu nome"
                  className="brand-input px-4 py-3 text-sm"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-[#c9c9c9]" htmlFor="email">E-mail</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="seu@email.com"
                  className="brand-input px-4 py-3 text-sm"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-[#c9c9c9]" htmlFor="descricao">
                  O que você quer automatizar?
                </label>
                <textarea
                  id="descricao"
                  name="descricao"
                  required
                  rows={5}
                  placeholder="Ex: Quero automatizar o atendimento no WhatsApp e capturar leads..."
                  className="brand-input resize-none px-4 py-3 text-sm"
                />
              </div>
              <button
                type="submit"
                className="brand-button-primary self-start px-8 py-3 text-xs"
              >
                Enviar
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

export default AutomatizePage;

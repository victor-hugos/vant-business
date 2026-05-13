import { useState } from 'react';
import VantLogo from '../components/VantLogo.jsx';

const serviceOptions = [
  'Identidade digital',
  'Site profissional',
  'Organizacao de Instagram',
  'Google Meu Negocio',
  'Funil de captacao',
  'Sistema ou integracao',
  'Ainda nao sei',
];

const stageOptions = [
  'Preciso comecar do zero',
  'Ja tenho algo, mas preciso melhorar',
  'Quero reposicionar minha marca',
  'Tenho uma demanda urgente',
];

const budgetOptions = [
  'Ainda quero entender valores',
  'Ate R$ 1.500',
  'R$ 1.500 a R$ 3.000',
  'R$ 3.000 a R$ 6.000',
  'Acima de R$ 6.000',
];

function AutomatizePage() {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const form = e.target;
    const data = new FormData(form);

    const payload = {
      nome: data.get('nome'),
      email: data.get('email'),
      whatsapp: data.get('whatsapp'),
      ebook: 'solucoes-digitais',
      productTitle: 'Identidade digital e soluções digitais',
      leadType: 'service',
      source: 'digital-solutions-page',
      metadata: {
        businessName: data.get('empresa'),
        solutionType: data.get('solucao'),
        projectStage: data.get('momento'),
        budgetRange: data.get('orcamento'),
        message: data.get('descricao'),
      },
    };

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error || 'Nao foi possivel enviar agora.');
      }

      form.reset();
      setSent(true);
    } catch (err) {
      setError(err.message || 'Nao foi possivel enviar agora.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl">
      <section className="brand-panel">
        <div className="brand-mark-panel grid gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-10">
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-white/40" />
                <p className="brand-kicker">Identidade digital · Sites · Presença</p>
              </div>
              <h1 className="brand-title mt-5 text-4xl font-bold leading-tight text-white sm:text-5xl">
                Crie uma presença digital
                <span className="brand-metal block">com percepção premium</span>
              </h1>
              <p className="mt-4 text-base leading-8 text-[#c9c9c9]">
                Preencha o briefing para eu entender sua empresa, seu momento e o tipo de solução digital que você precisa: identidade visual, Instagram, site, Google Meu Negócio, funil ou sistema.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  'Identidade visual e posicionamento',
                  'Site profissional e páginas de conversão',
                  'Instagram organizado para gerar confiança',
                  'Soluções digitais sob medida para o negócio',
                ].map((item) => (
                  <div key={item} className="border border-white/10 bg-white/[0.035] px-4 py-3 text-sm leading-6 text-[#d8d8d8]">
                    {item}
                  </div>
                ))}
              </div>
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
            <div className="brand-card flex min-h-[420px] flex-col items-center justify-center p-8 text-center">
              <VantLogo size={82} />
              <p className="brand-title mt-6 text-2xl font-bold text-white">Recebi seu briefing</p>
              <p className="mt-3 max-w-md text-sm leading-6 text-[#a6a6a6]">
                Vou analisar sua necessidade e responder com o melhor caminho para identidade digital ou solução digital da sua empresa.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="brand-button-secondary mt-7 px-6 py-3 text-xs"
              >
                Enviar outro briefing
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="brand-card flex flex-col gap-5 p-5 sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
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
                  <label className="mb-1.5 block text-sm text-[#c9c9c9]" htmlFor="empresa">Empresa ou projeto</label>
                  <input
                    id="empresa"
                    name="empresa"
                    type="text"
                    placeholder="Nome da empresa"
                    className="brand-input px-4 py-3 text-sm"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
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
                  <label className="mb-1.5 block text-sm text-[#c9c9c9]" htmlFor="whatsapp">WhatsApp</label>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    required
                    placeholder="(00) 00000-0000"
                    className="brand-input px-4 py-3 text-sm"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm text-[#c9c9c9]" htmlFor="solucao">O que você precisa?</label>
                  <select id="solucao" name="solucao" required className="brand-input px-4 py-3 text-sm">
                    <option value="">Selecione uma opção</option>
                    {serviceOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-[#c9c9c9]" htmlFor="momento">Momento do projeto</label>
                  <select id="momento" name="momento" required className="brand-input px-4 py-3 text-sm">
                    <option value="">Selecione uma opção</option>
                    {stageOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm text-[#c9c9c9]" htmlFor="orcamento">Faixa de investimento</label>
                <select id="orcamento" name="orcamento" className="brand-input px-4 py-3 text-sm">
                  {budgetOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm text-[#c9c9c9]" htmlFor="descricao">
                  Descreva o que você quer construir ou melhorar
                </label>
                <textarea
                  id="descricao"
                  name="descricao"
                  required
                  rows={5}
                  placeholder="Ex: preciso criar uma identidade visual, organizar meu Instagram e ter uma página profissional para receber clientes..."
                  className="brand-input resize-none px-4 py-3 text-sm"
                />
              </div>

              {error ? (
                <p className="border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-100">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="brand-button-primary self-start px-8 py-3 text-xs disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar briefing'}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

export default AutomatizePage;

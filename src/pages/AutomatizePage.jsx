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

const goalOptions = [
  'Parecer mais profissional e confiavel',
  'Gerar mais contatos e oportunidades',
  'Organizar melhor a presenca digital',
  'Criar base para automacao e escala',
  'Ainda estou definindo isso',
];

const processSteps = [
  {
    title: '1. Diagnóstico',
    text: 'Você envia o briefing com contexto, objetivo e momento do projeto.',
  },
  {
    title: '2. Direção',
    text: 'A VANT analisa a demanda e define o caminho mais coerente para sua presença digital.',
  },
  {
    title: '3. Próximo passo',
    text: 'Você recebe retorno com recomendação, escopo inicial e melhor formato de execução.',
  },
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
        mainGoal: data.get('objetivo'),
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
    <div className="mx-auto max-w-6xl space-y-6">
      <section className="brand-panel">
        <div className="brand-mark-panel px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.92fr] lg:items-center">
            <div className="flex flex-col">
              <div className="flex items-start gap-4">
                <VantLogo size={40} className="mt-0.5 opacity-95" />
                <div>
                  <p className="brand-title text-[1.35rem] font-bold tracking-[0.08em] text-white sm:text-[1.55rem]">
                    VANT.BUSINESS
                  </p>
                  <p className="mt-2 text-[0.68rem] uppercase tracking-[0.34em] text-[#8b8479] sm:text-[0.76rem]">
                    Estrategia · Conexao · Resultados
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-4">
                <span className="h-px w-10 bg-white/40" />
                <p className="brand-kicker">Identidade digital · Sites · Presença</p>
              </div>
              <h1 className="brand-title mt-5 max-w-2xl text-4xl font-bold leading-[0.93] text-white sm:text-5xl lg:text-6xl xl:text-[4.75rem]">
                Empresas fortes
                <span className="brand-metal block">parecem fortes.</span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-[#c9c9c9] sm:text-lg">
                Criamos identidades digitais, sites e estruturas visuais que aumentam percepção de valor, autoridade e confiança.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#briefing-form" className="brand-button-primary px-7 py-3 text-xs">
                  Solicitar análise
                </a>
              </div>
            </div>

            <div className="hidden lg:flex lg:items-center lg:justify-center">
              <div className="relative flex w-full max-w-[34rem] items-center justify-center">
                <div className="absolute inset-8 rounded-full border border-white/8" />
                <div className="absolute inset-14 rounded-full border border-white/5" />
                <VantLogo size={460} className="relative z-10 opacity-95" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="brand-panel px-6 py-7 sm:px-8">
        <div className="max-w-3xl">
          <p className="brand-kicker">Briefing comercial</p>
          <h2 className="brand-title mt-2 text-2xl font-bold text-white">
            Apresente seu projeto com clareza
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#a6a6a6]">
            Responda o essencial para eu entender prioridade, momento e melhor próximo passo.
          </p>
        </div>

        {sent ? (
          <div className="brand-card mt-6 flex min-h-[320px] flex-col items-center justify-center p-8 text-center">
            <VantLogo size={82} />
            <p className="brand-title mt-6 text-2xl font-bold text-white">Recebi seu briefing</p>
            <p className="mt-3 max-w-md text-sm leading-6 text-[#a6a6a6]">
              Vou analisar sua necessidade e responder com a direção mais coerente para posicionamento, presença digital ou solução operacional da sua empresa.
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
          <form id="briefing-form" onSubmit={handleSubmit} className="brand-card mt-6 flex flex-col gap-4 p-4 sm:p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.08em] text-[#b7b7b7]" htmlFor="nome">Seu nome</label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  required
                  placeholder="Como posso te chamar?"
                  className="brand-input rounded-xl px-3.5 py-2.5 text-sm text-[#f3f3f3] placeholder:text-[#7a7a7a]"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.08em] text-[#b7b7b7]" htmlFor="empresa">Empresa ou projeto</label>
                <input
                  id="empresa"
                  name="empresa"
                  type="text"
                  placeholder="Nome da empresa, marca ou projeto"
                  className="brand-input rounded-xl px-3.5 py-2.5 text-sm text-[#f3f3f3] placeholder:text-[#7a7a7a]"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.08em] text-[#b7b7b7]" htmlFor="email">E-mail</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="seu@email.com"
                  className="brand-input rounded-xl px-3.5 py-2.5 text-sm text-[#f3f3f3] placeholder:text-[#7a7a7a]"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.08em] text-[#b7b7b7]" htmlFor="whatsapp">WhatsApp</label>
                <input
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  required
                  placeholder="Número para contato"
                  className="brand-input rounded-xl px-3.5 py-2.5 text-sm text-[#f3f3f3] placeholder:text-[#7a7a7a]"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.08em] text-[#b7b7b7]" htmlFor="solucao">Qual solução parece mais próxima do que você precisa?</label>
                <select id="solucao" name="solucao" required className="brand-input rounded-xl px-3.5 py-2.5 text-sm text-[#f3f3f3] placeholder:text-[#7a7a7a]">
                  <option value="">Selecione uma opção</option>
                  {serviceOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.08em] text-[#b7b7b7]" htmlFor="momento">Em que momento o projeto está hoje?</label>
                <select id="momento" name="momento" required className="brand-input rounded-xl px-3.5 py-2.5 text-sm text-[#f3f3f3] placeholder:text-[#7a7a7a]">
                  <option value="">Selecione uma opção</option>
                  {stageOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.08em] text-[#b7b7b7]" htmlFor="objetivo">Qual é o principal objetivo agora?</label>
                <select id="objetivo" name="objetivo" className="brand-input rounded-xl px-3.5 py-2.5 text-sm text-[#f3f3f3] placeholder:text-[#7a7a7a]">
                  <option value="">Selecione uma opção</option>
                  {goalOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.08em] text-[#b7b7b7]" htmlFor="orcamento">Faixa de investimento</label>
                <select id="orcamento" name="orcamento" className="brand-input rounded-xl px-3.5 py-2.5 text-sm text-[#f3f3f3] placeholder:text-[#7a7a7a]">
                  {budgetOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.08em] text-[#b7b7b7]" htmlFor="descricao">
                Descreva o que você quer construir ou melhorar
              </label>
              <textarea
                id="descricao"
                name="descricao"
                required
                rows={5}
                placeholder="Ex: hoje meu negócio depende de indicação, meu Instagram está desorganizado e eu preciso parecer mais profissional para gerar contatos pelo digital."
                className="brand-input min-h-[132px] rounded-2xl resize-none px-3.5 py-3 text-sm text-[#f3f3f3] placeholder:text-[#7a7a7a]"
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
              className="brand-button-primary self-start px-7 py-2.5 text-xs disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar briefing'}
            </button>
          </form>
        )}
      </section>

      <section className="brand-panel px-6 py-7 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="brand-kicker">Como funciona</p>
            <h2 className="brand-title mt-3 text-3xl font-bold text-white">Diagnóstico curto, direção clara.</h2>
          </div>
          <div className="grid gap-3">
            {processSteps.map((step) => (
              <div key={step.title} className="border-l border-white/15 pl-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[#8f8f8f]">{step.title}</p>
                <p className="mt-1 text-sm leading-6 text-[#c9c9c9]">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AutomatizePage;

import { useState } from 'react';
import VantLogo from '../components/VantLogo.jsx';
import { buildBriefingWhatsAppUrl } from '../utils/briefingWhatsApp.js';

const defaultVantWhatsAppNumber = '5561981663028';

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
    title: '1. Diagnostico',
    text: 'Voce envia o briefing com contexto, objetivo e momento do projeto.',
  },
  {
    title: '2. Direcao',
    text: 'A VANT analisa a demanda e define o caminho mais coerente para sua presenca digital.',
  },
  {
    title: '3. Proximo passo',
    text: 'Voce recebe retorno com recomendacao, escopo inicial e melhor formato de execucao.',
  },
];

const inputClassName = 'brand-input min-h-[44px] rounded-2xl border-white/12 bg-white/[0.04] px-3.5 py-2 text-sm text-white placeholder:text-[#707070]';
const labelClassName = 'mb-1.5 block text-[0.8rem] font-medium text-[#d1d1d1]';

function AutomatizePage() {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [deliveryWarning, setDeliveryWarning] = useState('');
  const [whatsAppUrl, setWhatsAppUrl] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setDeliveryWarning('');
    setIsSubmitting(true);

    const form = e.target;
    const data = new FormData(form);

    const formValues = {
      nome: data.get('nome'),
      empresa: data.get('empresa'),
      email: data.get('email'),
      whatsapp: data.get('whatsapp'),
      solucao: data.get('solucao'),
      momento: data.get('momento'),
      objetivo: data.get('objetivo'),
      orcamento: data.get('orcamento'),
      descricao: data.get('descricao'),
    };
    const nextWhatsAppUrl = buildBriefingWhatsAppUrl(
      formValues,
      import.meta.env.VITE_VANT_WHATSAPP_NUMBER || defaultVantWhatsAppNumber
    );

    const payload = {
      nome: formValues.nome,
      email: formValues.email,
      whatsapp: formValues.whatsapp,
      ebook: 'solucoes-digitais',
      productTitle: 'Identidade digital e solucoes digitais',
      leadType: 'service',
      source: 'digital-solutions-page',
      metadata: {
        businessName: formValues.empresa,
        solutionType: formValues.solucao,
        mainGoal: formValues.objetivo,
        projectStage: formValues.momento,
        budgetRange: formValues.orcamento,
        message: formValues.descricao,
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

      setWhatsAppUrl(nextWhatsAppUrl);
      form.reset();
      setSent(true);
    } catch (err) {
      setWhatsAppUrl(nextWhatsAppUrl);
      setDeliveryWarning('Nao consegui registrar automaticamente agora, mas seu briefing ja esta pronto para continuar pelo WhatsApp.');
      form.reset();
      setSent(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-5 sm:space-y-7">
      <section className="brand-panel">
        <div className="brand-mark-panel px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
          <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-4">
                  <span className="h-px w-10 bg-white/40" />
                  <p className="brand-kicker">Identidade digital · Sites · Presenca</p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">
                  <VantLogo size={24} />
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#d7d7d7]">
                    VANT.BUSINESS
                  </span>
                </div>
              </div>

              <h1 className="brand-title mt-5 max-w-3xl text-4xl font-bold leading-tight text-white sm:text-5xl">
                Estruture uma presenca digital
                <span className="brand-metal block">com percepcao premium</span>
              </h1>
              <p className="mt-4 max-w-2xl text-[0.98rem] leading-7 text-[#c9c9c9]">
                A VANT responde com a direcao mais coerente para posicionamento, presenca digital ou estrutura operacional,
                sem transformar seu primeiro contato em um formulario pesado.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {processSteps.map((step) => (
                  <div
                    key={step.title}
                    className="rounded-[1.35rem] border border-white/10 bg-white/[0.03] px-4 py-4 backdrop-blur-sm"
                  >
                    <p className="text-[0.66rem] uppercase tracking-[0.18em] text-[#8f8f8f]">{step.title}</p>
                    <p className="mt-2 text-sm leading-6 text-[#c9c9c9]">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="brand-card rounded-[1.7rem] p-5 sm:p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] shadow-[0_18px_45px_rgba(0,0,0,0.22)]">
                  <VantLogo size={44} />
                </div>
                <div>
                  <p className="brand-title text-sm font-bold text-white">VANT.BUSINESS</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#6f6f6f]">
                    Estrategia · Conexao · Resultados
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-6 text-[#bdbdbd]">
                Se o seu foco agora e parecer mais forte, comunicar melhor e estruturar sua presenca digital, esse briefing e o ponto de partida.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href="#briefing-form" className="brand-button-primary px-7 py-3 text-xs">
                  Quero apresentar meu projeto
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="brand-panel px-5 py-6 sm:px-8 lg:px-10">
        {sent ? (
          <div className="mx-auto max-w-3xl">
            <div className="brand-card flex min-h-[300px] flex-col items-center justify-center rounded-[1.8rem] p-8 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-[1.6rem] border border-white/10 bg-white/[0.05] shadow-[0_18px_45px_rgba(0,0,0,0.22)]">
                <VantLogo size={56} />
              </div>
              <p className="brand-title mt-6 text-2xl font-bold text-white">Recebi seu briefing</p>
              <p className="mt-3 max-w-md text-sm leading-6 text-[#a6a6a6]">
                Vou analisar sua necessidade e responder com a direcao mais coerente para posicionamento,
                presenca digital ou solucao operacional da sua empresa.
              </p>
              {deliveryWarning ? (
                <p className="mt-5 max-w-md rounded-2xl border border-amber-300/20 bg-amber-400/10 px-4 py-3 text-sm leading-6 text-amber-100">
                  {deliveryWarning}
                </p>
              ) : null}
              {whatsAppUrl ? (
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="brand-button-primary mt-7 px-7 py-3 text-xs"
                >
                  Continuar no WhatsApp
                </a>
              ) : null}
              <button
                type="button"
                onClick={() => {
                  setSent(false);
                  setDeliveryWarning('');
                  setWhatsAppUrl('');
                }}
                className="brand-button-secondary mt-3 px-6 py-3 text-xs"
              >
                Enviar outro briefing
              </button>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-4xl space-y-4 sm:space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="brand-kicker">Briefing comercial</p>
                <h2 className="brand-title mt-2 text-[1.7rem] font-bold text-white sm:text-[1.95rem]">
                  Apresente seu projeto com clareza
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#a6a6a6]">
                  Responda o essencial para eu entender prioridade, momento e melhor proximo passo.
                </p>
              </div>
              <p className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[0.7rem] uppercase tracking-[0.14em] text-[#9d9d9d]">
                Diagnostico objetivo · sem excesso de friccao
              </p>
            </div>

            <form id="briefing-form" onSubmit={handleSubmit} className="brand-card flex flex-col gap-3.5 rounded-[1.8rem] p-4 sm:p-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className={labelClassName} htmlFor="nome">Seu nome</label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    required
                    placeholder="Como posso te chamar?"
                    className={inputClassName}
                  />
                </div>
                <div>
                  <label className={labelClassName} htmlFor="empresa">Empresa ou projeto</label>
                  <input
                    id="empresa"
                    name="empresa"
                    type="text"
                    placeholder="Nome da empresa, marca ou projeto"
                    className={inputClassName}
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className={labelClassName} htmlFor="email">E-mail</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="seu@email.com"
                    className={inputClassName}
                  />
                </div>
                <div>
                  <label className={labelClassName} htmlFor="whatsapp">WhatsApp</label>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    required
                    placeholder="Numero para contato"
                    className={inputClassName}
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className={labelClassName} htmlFor="solucao">Qual solucao parece mais proxima do que voce precisa?</label>
                  <select id="solucao" name="solucao" required className={`${inputClassName} appearance-none`}>
                    <option value="">Selecione uma opcao</option>
                    {serviceOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClassName} htmlFor="momento">Em que momento o projeto esta hoje?</label>
                  <select id="momento" name="momento" required className={`${inputClassName} appearance-none`}>
                    <option value="">Selecione uma opcao</option>
                    {stageOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className={labelClassName} htmlFor="objetivo">Qual e o principal objetivo agora?</label>
                  <select id="objetivo" name="objetivo" className={`${inputClassName} appearance-none`}>
                    <option value="">Selecione uma opcao</option>
                    {goalOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClassName} htmlFor="orcamento">Faixa de investimento</label>
                  <select id="orcamento" name="orcamento" className={`${inputClassName} appearance-none`}>
                    {budgetOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClassName} htmlFor="descricao">
                  Descreva o que voce quer construir ou melhorar
                </label>
                <textarea
                  id="descricao"
                  name="descricao"
                  required
                  rows={5}
                  placeholder="Ex: hoje meu negocio depende de indicacao, meu Instagram esta desorganizado e eu preciso parecer mais profissional para gerar contatos pelo digital."
                  className={`${inputClassName} min-h-[128px] resize-none py-3`}
                />
              </div>

              {error ? (
                <p className="rounded-2xl border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-100">
                  {error}
                </p>
              ) : null}

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="brand-button-primary px-7 py-3 text-xs disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar briefing'}
                </button>
                <p className="text-xs leading-5 text-[#7f7f7f]">
                  Quanto mais objetivo, melhor a direcao inicial.
                </p>
              </div>
            </form>
          </div>
        )}
      </section>

      <section className="brand-panel px-6 py-7 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="brand-kicker">Como funciona</p>
            <h2 className="brand-title mt-3 text-3xl font-bold text-white">Diagnostico curto, direcao clara.</h2>
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

import { Link } from 'react-router-dom';

const pillars = [
  {
    title: 'Estrutura Comercial',
    text: 'Sites e jornadas configuradas para gerar confiança e converter visitantes em clientes.',
  },
  {
    title: 'Processo e Atendimento',
    text: 'Fluxos padronizados de pré-atendimento e operação para reduzir atrito e garantir seguimento.',
  },
  {
    title: 'Automação Estratégica',
    text: 'Automações orientadas por objetivo, integradas a canais reais de atendimento e vendas.',
  },
];

function SobrePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <section className="brand-panel px-4 py-6 sm:px-8 lg:px-10 lg:py-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <p className="brand-kicker">Quem somos</p>
            <h1 className="brand-title mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              VANT.Business — estratégia, tecnologia e execução para crescimento consistente.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-[#bdbdbd] sm:text-base">
              Atuamos na interseção entre marca, produto e operação. Desenhamos presença digital, estruturas comerciais e automações que tornam a operação previsível, escalável e mensurável.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#bdbdbd] sm:text-base">
              Nosso foco é reduzir ruído operacional e transformar intenção em resultado: sites profissionais, pré-atendimento organizado e fluxos automatizados que mantêm continuidade no relacionamento.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/solucoes-digitais" className="brand-button-primary px-5 py-3 text-xs">
                Falar sobre seu projeto
              </Link>
              <Link to="/recursos" className="brand-button-secondary px-5 py-3 text-xs">
                Ver ferramentas e recursos
              </Link>
            </div>
          </div>

          <div className="rounded-[1.4rem] border border-white/10 bg-black/35 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur-sm sm:p-6 lg:p-7">
            <p className="brand-kicker">Nosso método</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              Estrutura, execução e acompanhamento para escalar com previsibilidade.
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-[#bdbdbd]">
              <li>• Posicionamento e identidade que transmitem autoridade.</li>
              <li>• Jornadas comerciais e pré-atendimento padronizadas.</li>
              <li>• Automações que aceleram resposta e reduzem trabalho manual.</li>
              <li>• Entregas orientadas a operação, com acompanhamento contínuo.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {pillars.map((item) => (
          <article key={item.title} className="brand-card rounded-[1.25rem] p-5">
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[#9f9f9f]">{item.text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

export default SobrePage;

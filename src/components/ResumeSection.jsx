import { experiences } from '../data/experiences.js';
import ButtonLink from './ui/ButtonLink.jsx';
import SectionHeader from './ui/SectionHeader.jsx';
import Tag from './ui/Tag.jsx';

const currentFocus = [
  'Automação de processos',
  'Backend e APIs REST',
  'Integração de sistemas',
  'Salesforce e MuleSoft',
  'Produtos digitais e SaaS',
  'Documentação técnica',
];

const educationItems = [
  {
    title: 'Análise e Desenvolvimento de Sistemas',
    institution: 'UDF — em andamento',
    description:
      'Formação superior em andamento, com foco em desenvolvimento de sistemas, lógica de programação, modelagem, banco de dados, engenharia de software e construção de soluções digitais.',
  },
  {
    title: 'Salesforce Trailhead',
    link: 'https://www.salesforce.com/trailblazer/kzu5z6w88yrh1i1bvz',
    description:
      'Estudos práticos em automação, Flow Builder, integração, APIs e cenários de negócio dentro do ecossistema Salesforce.',
  },
  {
    title: 'MuleSoft e Hyperautomation',
    description:
      'Estudos voltados à integração de sistemas, API-led connectivity, MuleSoft Composer, automação corporativa e hiperautomação.',
  },
  {
    title: 'Projetos práticos de portfólio',
    description:
      'Construção de projetos próprios com foco em backend, APIs, automação comercial, produtos digitais, Supabase, Vercel e GitHub.',
  },
];

const professionalLinks = [
  {
    label: 'Portfólio',
    text: 'vant.business',
    href: 'https://vant.business',
    external: true,
  },
  {
    label: 'GitHub',
    text: 'github.com/victor-hugos',
    href: 'https://github.com/victor-hugos',
    external: true,
  },
  {
    label: 'LinkedIn',
    text: 'linkedin.com/in/victor-hugos',
    href: 'https://www.linkedin.com/in/victor-hugos',
    external: true,
  },
  {
    label: 'Trailhead',
    text: 'Perfil Trailblazer',
    href: 'https://www.salesforce.com/trailblazer/kzu5z6w88yrh1i1bvz',
    external: true,
  },
  {
    label: 'Currículo PDF',
    text: 'Baixar currículo',
    href: '/curriculo-victor-hugo.pdf',
    external: false,
  },
];

function ResumeSection() {
  const availableLinks = professionalLinks.filter((link) => link.href);

  return (
    <section
      id="curriculo"
      className="rounded-3xl border border-white/10 bg-slate-900/75 p-6 shadow-xl shadow-slate-950/30 sm:p-8"
    >
      <SectionHeader
        eyebrow="Currículo"
        title="Currículo e trajetória"
        subtitle="Meu currículo em PDF apresenta uma visão objetiva da minha trajetória. Este site complementa o documento com projetos, links, estudos de caso e habilidades organizadas por área."
      />

      <div className="mt-6 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-5 text-sm leading-6 text-cyan-50">
        Este portfólio foi criado para manter meu currículo mais objetivo e estático, enquanto os
        detalhes dos projetos, estudos de caso, links e atualizações profissionais ficam
        centralizados no site.
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="rounded-2xl border border-white/10 bg-slate-950/70 p-5 shadow-lg shadow-slate-950/20">
          <h3 className="text-xl font-semibold text-white">Perfil profissional</h3>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            Desenvolvedor com foco em automação de processos, integração de sistemas e criação de
            soluções digitais. Atuo na construção de fluxos, APIs, lógicas de backend e produtos
            web que reduzem tarefas manuais, organizam dados e aumentam a eficiência operacional.
          </p>

          <div className="mt-5">
            <p className="text-sm font-semibold text-white">Foco atual</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {currentFocus.map((focus) => (
                <Tag key={focus} variant="accent">{focus}</Tag>
              ))}
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-white/10 bg-slate-950/70 p-5 shadow-lg shadow-slate-950/20">
          <h3 className="text-xl font-semibold text-white">Links profissionais</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Acesso rápido aos perfis, projetos e currículo em PDF.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {availableLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noreferrer' : undefined}
                className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
              >
                <p className="text-sm font-semibold text-white">{link.label}</p>
                <p className="mt-1 break-words text-sm text-cyan-200">{link.text}</p>
              </a>
            ))}
          </div>
        </article>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/70 p-5 shadow-lg shadow-slate-950/20">
        <h3 className="text-xl font-semibold text-white">Linha do tempo de experiências</h3>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          Experiências profissionais organizadas por atuação, responsabilidades e áreas conectadas.
        </p>

        <div className="mt-6 space-y-5">
          {experiences.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/15 bg-slate-900/80 p-5 text-slate-300">
              Nenhuma experiência cadastrada ainda.
            </div>
          ) : (
            experiences.map((experience) => (
              <article key={`${experience.company}-${experience.period}`} className="relative pl-6">
                <span className="absolute left-0 top-2 h-full w-px bg-white/10" />
                <span className="absolute left-[-5px] top-2 h-3 w-3 rounded-full border border-cyan-200 bg-cyan-300 shadow-lg shadow-cyan-950/50" />

                <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-white">{experience.company}</h4>
                      <p className="mt-1 text-sm font-medium text-cyan-300">{experience.role}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-300 md:justify-end">
                      {experience.period ? (
                        <Tag>{experience.period}</Tag>
                      ) : null}
                      {experience.type ? (
                        <Tag variant="accent">{experience.type}</Tag>
                      ) : null}
                    </div>
                  </div>

                  {experience.description ? (
                    <p className="mt-4 text-sm leading-6 text-slate-300">
                      {experience.description}
                    </p>
                  ) : null}

                  {experience.activities?.length > 0 ? (
                    <div className="mt-5">
                      <p className="text-sm font-semibold text-white">Atividades principais</p>
                      <ul className="mt-3 grid gap-2 text-sm text-slate-300 md:grid-cols-2">
                        {experience.activities.map((activity) => (
                          <li key={activity} className="flex gap-3">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {experience.relatedAreas?.length > 0 ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {experience.relatedAreas.map((area) => (
                        <Tag key={area}>{area}</Tag>
                      ))}
                    </div>
                  ) : null}
                </div>
              </article>
            ))
          )}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/70 p-5 shadow-lg shadow-slate-950/20">
        <h3 className="text-xl font-semibold text-white">Formação e aperfeiçoamentos</h3>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {educationItems.map((item) => (
            <article key={item.title} className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
              <div className="flex flex-col gap-2">
                <h4 className="font-semibold text-white">{item.title}</h4>
                {item.institution ? (
                  <p className="text-sm font-medium text-cyan-300">{item.institution}</p>
                ) : null}
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{item.description}</p>
              {item.link ? (
                <ButtonLink href={item.link} external variant="secondary" className="mt-4 px-4 py-2">
                  Ver perfil
                </ButtonLink>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ResumeSection;

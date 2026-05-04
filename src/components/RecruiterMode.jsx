import { useState } from 'react';
import { experiences } from '../data/experiences.js';
import { projects } from '../data/projects.js';
import { roles } from '../data/roles.js';
import { skills } from '../data/skills.js';
import ButtonLink from './ui/ButtonLink.jsx';
import SectionHeader from './ui/SectionHeader.jsx';
import Tag from './ui/Tag.jsx';

function RecruiterMode() {
  const roleOptions = Object.entries(roles);
  const [selectedRoleKey, setSelectedRoleKey] = useState('');
  const selectedRole = roles[selectedRoleKey];

  const relevantSkills = selectedRole
    ? skills.filter((skill) => selectedRole.prioritySkills?.includes(skill.name))
    : [];

  const relevantProjects = selectedRole
    ? projects.filter((project) => selectedRole.priorityProjects?.includes(project.id))
    : [];

  const relevantExperiences = selectedRole
    ? experiences.filter((experience) =>
        selectedRole.relatedExperiences?.includes(experience.company),
      )
    : [];

  return (
    <section
      id="modo-recrutador"
      className="rounded-3xl border border-white/10 bg-slate-900/75 p-6 shadow-xl shadow-slate-950/30 sm:p-8"
    >
      <SectionHeader
        eyebrow="Análise guiada"
        title="Modo Recrutador"
        subtitle="Selecione a área da vaga e veja automaticamente meus projetos, habilidades e experiências mais relevantes para o cargo."
      />

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {roleOptions.map(([roleKey, role]) => {
          const isSelected = selectedRoleKey === roleKey;

          return (
            <button
              key={roleKey}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setSelectedRoleKey(roleKey)}
              className={`rounded-2xl border p-5 text-left shadow-lg shadow-slate-950/20 transition ${
                isSelected
                  ? 'border-cyan-300/60 bg-cyan-300/10 ring-2 ring-cyan-300/20'
                  : 'border-white/10 bg-slate-950/70 hover:border-cyan-300/35 hover:bg-cyan-300/5'
              } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300`}
            >
              <h3 className="text-lg font-semibold text-white">{role.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{role.description}</p>
            </button>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-slate-950/70 p-5 shadow-lg shadow-slate-950/30 sm:p-6">
        {!selectedRole ? (
          <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-6 text-slate-300">
            Escolha uma área acima para visualizar uma versão personalizada do meu perfil.
          </div>
        ) : (
          <div className="space-y-8">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-cyan-300">
                Perfil personalizado
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-white">
                Perfil recomendado para: {selectedRole.title}
              </h3>
              <p className="mt-4 max-w-4xl text-base leading-7 text-slate-300">
                {selectedRole.recommendedSummary}
              </p>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-white">Habilidades mais relevantes</h4>
              <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {relevantSkills.length > 0 ? (
                  relevantSkills.map((skill) => (
                    <article
                      key={skill.name}
                      className="rounded-2xl border border-white/10 bg-slate-900/80 p-5"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h5 className="font-semibold text-white">{skill.name}</h5>
                          <p className="mt-1 text-sm text-cyan-300">{skill.category}</p>
                        </div>
                        <Tag variant="accent" className="w-fit shrink-0">{skill.level}</Tag>
                      </div>
                      <p className="mt-4 text-sm leading-6 text-slate-300">{skill.description}</p>
                    </article>
                  ))
                ) : (
                  <p className="rounded-2xl border border-dashed border-white/15 p-5 text-sm text-slate-300 md:col-span-2 xl:col-span-3">
                    Nenhuma habilidade relacionada encontrada.
                  </p>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-white">Projetos mais alinhados</h4>
              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                {relevantProjects.length > 0 ? (
                  relevantProjects.map((project) => (
                    <article
                      key={project.id}
                      className="flex flex-col rounded-2xl border border-white/10 bg-slate-900/80 p-5"
                    >
                      <p className="text-sm font-medium text-cyan-300">{project.type}</p>
                      <h5 className="mt-2 text-lg font-semibold text-white">{project.name}</h5>
                      <p className="mt-3 text-sm leading-6 text-slate-300">
                        {project.shortDescription}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.technologies?.slice(0, 5).map((technology) => (
                          <Tag key={technology}>{technology}</Tag>
                        ))}
                      </div>

                      <ul className="mt-4 space-y-2 text-sm text-slate-300">
                        {project.highlights?.slice(0, 3).map((highlight) => (
                          <li key={highlight} className="flex gap-3">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5 flex flex-wrap gap-3">
                        <ButtonLink href={project.githubUrl} external className="w-full px-4 py-2 sm:w-auto">
                          GitHub
                        </ButtonLink>
                        <ButtonLink href={project.liveUrl} external variant="primary" className="w-full px-4 py-2 sm:w-auto">
                          Ver projeto
                        </ButtonLink>
                      </div>
                    </article>
                  ))
                ) : (
                  <p className="rounded-2xl border border-dashed border-white/15 p-5 text-sm text-slate-300 lg:col-span-2">
                    Nenhum projeto relacionado encontrado.
                  </p>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-white">Experiências relacionadas</h4>
              <div className="mt-4 space-y-4">
                {relevantExperiences.length > 0 ? (
                  relevantExperiences.map((experience) => (
                    <article
                      key={`${experience.company}-${experience.period}`}
                      className="rounded-2xl border border-white/10 bg-slate-900/80 p-5"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <h5 className="text-lg font-semibold text-white">
                            {experience.company}
                          </h5>
                          <p className="mt-1 text-sm font-medium text-cyan-300">
                            {experience.role}
                          </p>
                        </div>
                        <Tag className="w-fit">{experience.period}</Tag>
                      </div>

                      <p className="mt-4 text-sm leading-6 text-slate-300">
                        {experience.description}
                      </p>

                      <ul className="mt-4 grid gap-2 text-sm text-slate-300 md:grid-cols-2">
                        {experience.activities?.slice(0, 3).map((activity) => (
                          <li key={activity} className="flex gap-3">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))
                ) : (
                  <p className="rounded-2xl border border-dashed border-white/15 p-5 text-sm text-slate-300">
                    Nenhuma experiência relacionada encontrada.
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-5 sm:flex-row sm:flex-wrap">
              <ButtonLink href="https://github.com/victor-hugos" external className="w-full sm:w-auto">
                Ver GitHub
              </ButtonLink>
              <ButtonLink href="https://www.linkedin.com/in/victor-hugos" external className="w-full sm:w-auto">
                Ver LinkedIn
              </ButtonLink>
              <ButtonLink href="/curriculo-victor-hugo.pdf" variant="primary" className="w-full sm:w-auto">
                Baixar currículo
              </ButtonLink>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default RecruiterMode;

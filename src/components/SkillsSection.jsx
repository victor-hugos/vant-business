import { skills } from '../data/skills.js';
import SectionHeader from './ui/SectionHeader.jsx';
import Tag from './ui/Tag.jsx';

function SkillsSection() {
  const groupedSkills = skills.reduce((groups, skill) => {
    const categorySkills = groups[skill.category] || [];
    return {
      ...groups,
      [skill.category]: [...categorySkills, skill],
    };
  }, {});

  return (
    <section id="habilidades" className="rounded-3xl border border-white/10 bg-slate-900/75 p-6 shadow-xl shadow-slate-950/30 sm:p-8">
      <SectionHeader
        eyebrow="Habilidades"
        title="Competências técnicas"
        subtitle="Ferramentas, plataformas e conceitos aplicados em automação, backend, integração e produto."
      />

      <div className="mt-6 space-y-6">
        {skills.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 bg-slate-950/70 p-5 text-sm text-slate-300">
            Nenhuma skill cadastrada ainda.
          </div>
        ) : (
          Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
                {category}
              </h3>
              <div className="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {categorySkills.map((skill) => (
                  <article
                    key={skill.name}
                    className="rounded-2xl border border-white/10 bg-slate-950/70 p-5 shadow-lg shadow-slate-950/20"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="font-semibold text-white">{skill.name}</h4>
                      <Tag variant="accent" className="shrink-0">{skill.level}</Tag>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{skill.description}</p>
                  </article>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default SkillsSection;

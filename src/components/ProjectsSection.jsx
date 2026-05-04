import { useMemo, useState } from 'react';
import { projects } from '../data/projects.js';
import ProjectCard from './ProjectCard.jsx';
import ProjectModal from './ProjectModal.jsx';
import SectionHeader from './ui/SectionHeader.jsx';

const allProjectsFilter = 'Todos';

function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState(allProjectsFilter);
  const [selectedProject, setSelectedProject] = useState(null);

  const filters = useMemo(() => {
    const relatedAreas = projects.flatMap((project) => project.relatedAreas || []);
    return [allProjectsFilter, ...Array.from(new Set(relatedAreas)).sort()];
  }, []);

  const filteredProjects =
    activeFilter === allProjectsFilter
      ? projects
      : projects.filter((project) => project.relatedAreas?.includes(activeFilter));

  return (
    <section
      id="projetos"
      className="rounded-3xl border border-white/10 bg-slate-900/75 p-6 shadow-xl shadow-slate-950/30 sm:p-8"
    >
      <SectionHeader
        eyebrow="Projetos"
        title="Projetos em destaque"
        subtitle="Projetos desenvolvidos para demonstrar automação, integração de sistemas, backend, produto digital e visão de negócio."
      />

      <div className="mt-6 flex gap-3 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible sm:pb-0">
        {filters.map((filter) => {
          const isActive = activeFilter === filter;

          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? 'border-cyan-300/60 bg-cyan-300 text-slate-950'
                  : 'border-white/10 bg-slate-950/70 text-slate-300 hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-white'
              } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onViewDetails={setSelectedProject}
            />
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-white/15 bg-slate-950/70 p-5 text-slate-300 lg:col-span-2">
            Nenhum projeto encontrado para este filtro.
          </div>
        )}
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}

export default ProjectsSection;

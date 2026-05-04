import { useEffect } from 'react';
import ButtonLink from './ui/ButtonLink.jsx';
import Tag from './ui/Tag.jsx';

function ProjectModal({ project, onClose }) {
  const technologies = project?.technologies || [];
  const highlights = project?.highlights || [];
  const relatedAreas = project?.relatedAreas || [];

  useEffect(() => {
    if (!project) {
      return undefined;
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose, project]);

  if (!project) {
    return null;
  }

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-slate-950/85 p-3 backdrop-blur-sm sm:p-4"
      onClick={handleBackdropClick}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-white/10 bg-slate-950 p-5 shadow-2xl shadow-slate-950 sm:p-7"
      >
        <div className="flex flex-col gap-4 border-b border-white/10 pb-5 md:flex-row md:items-start md:justify-between">
          <div>
            {project.type ? (
              <p className="text-sm font-medium text-cyan-300">{project.type}</p>
            ) : null}
            <h3 id="project-modal-title" className="mt-2 text-2xl font-semibold text-white">
              {project.name}
            </h3>
          </div>

          {project.status ? (
            <Tag variant="accent" className="w-fit">{project.status}</Tag>
          ) : null}
        </div>

        <div className="space-y-6 py-6">
          {project.fullDescription ? (
            <p className="text-base leading-7 text-slate-300">{project.fullDescription}</p>
          ) : null}

          <div className="grid gap-4 md:grid-cols-2">
            {project.problem ? (
              <section className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
                <h4 className="font-semibold text-white">Problema</h4>
                <p className="mt-3 text-sm leading-6 text-slate-300">{project.problem}</p>
              </section>
            ) : null}

            {project.solution ? (
              <section className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
                <h4 className="font-semibold text-white">Solução</h4>
                <p className="mt-3 text-sm leading-6 text-slate-300">{project.solution}</p>
              </section>
            ) : null}
          </div>

          {technologies.length > 0 ? (
            <section>
              <h4 className="font-semibold text-white">Tecnologias utilizadas</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {technologies.map((technology) => (
                  <Tag key={technology}>{technology}</Tag>
                ))}
              </div>
            </section>
          ) : null}

          {highlights.length > 0 ? (
            <section>
              <h4 className="font-semibold text-white">Destaques técnicos</h4>
              <ul className="mt-3 grid gap-2 text-sm text-slate-300 md:grid-cols-2">
                {highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {relatedAreas.length > 0 ? (
            <section>
              <h4 className="font-semibold text-white">Áreas relacionadas</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {relatedAreas.map((area) => (
                  <Tag key={area} variant="accent">{area}</Tag>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:flex-wrap">
          <ButtonLink href={project.githubUrl} external className="w-full sm:w-auto">
            GitHub
          </ButtonLink>

          <ButtonLink href={project.liveUrl} external variant="primary" className="w-full sm:w-auto">
            Ver projeto
          </ButtonLink>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-white/30 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 sm:w-auto"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;

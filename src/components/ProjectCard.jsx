import ButtonLink from './ui/ButtonLink.jsx';
import Tag from './ui/Tag.jsx';

function ProjectCard({ project, onViewDetails }) {
  const technologies = project.technologies || [];
  const highlights = project.highlights || [];

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-slate-950/75 p-5 shadow-lg shadow-slate-950/30 transition hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-slate-950/90">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-cyan-300">{project.type}</p>
          <h3 className="mt-2 text-xl font-semibold text-white">{project.name}</h3>
        </div>

        {project.status ? (
          <Tag variant="accent" className="w-fit">{project.status}</Tag>
        ) : null}
      </div>

      {project.shortDescription ? (
        <p className="mt-4 text-sm leading-6 text-slate-300">{project.shortDescription}</p>
      ) : null}

      {technologies.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {technologies.map((technology) => (
            <Tag key={technology}>{technology}</Tag>
          ))}
        </div>
      ) : null}

      {highlights.length > 0 ? (
        <div className="mt-5">
          <p className="text-sm font-semibold text-white">Destaques principais</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {highlights.slice(0, 3).map((highlight) => (
              <li key={highlight} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-auto flex flex-wrap gap-3 pt-6">
        <button
          type="button"
          onClick={() => onViewDetails(project)}
          className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-cyan-300 bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 sm:w-auto"
        >
          Ver estudo de caso
        </button>

        <ButtonLink href={project.githubUrl} external className="w-full px-4 py-2 sm:w-auto">
          GitHub
        </ButtonLink>

        <ButtonLink href={project.liveUrl} external className="w-full px-4 py-2 sm:w-auto">
          Ver projeto
        </ButtonLink>
      </div>
    </article>
  );
}

export default ProjectCard;

import Link from 'next/link';
import SiteFrame from '../../components/SiteFrame';

const projects = [
  {
    name: 'Inference Atelier',
    focus: 'AI Systems',
    summary:
      'Designed a calm, resilient inference layer with graceful fallback behavior, structured evaluation, and production observability.',
    stack: 'Python · FastAPI · Kubernetes · OpenTelemetry',
  },
  {
    name: 'Research Current',
    focus: 'Applied ML',
    summary:
      'Built an evidence-first research assistant for synthesis workflows, with careful ranking logic and clear audit trails.',
    stack: 'TypeScript · Retrieval · Postgres · Graph workflows',
  },
  {
    name: 'System Cartography',
    focus: 'Architecture',
    summary:
      'Created a service relationship map that helps teams reason about migration, reliability, and risk before changes land.',
    stack: 'React · GraphQL · Event streams · Platform tooling',
  },
];

export default function ProjectsPage() {
  return (
    <SiteFrame shellClassName="projects-page">
      <section className="route-section">
        <article className="crystal panel route-panel">
          <p className="section-label">Projects</p>
          <h1>Selected work, broken out as its own route.</h1>
          <div className="project-list project-list--route">
            {projects.map((project) => (
              <div key={project.name} className="project-row project-row--route">
                <div className="project-meta">
                  <h3>{project.name}</h3>
                  <span>{project.focus}</span>
                </div>
                <p>{project.summary}</p>
                <p className="project-stack">{project.stack}</p>
              </div>
            ))}
          </div>
          <Link className="button button-primary route-back" href="/">
            Back to Home
          </Link>
        </article>
      </section>
    </SiteFrame>
  );
}

import Link from 'next/link';
import SiteFrame from '../../components/SiteFrame';

export default function ResearchPage() {
  return (
    <SiteFrame shellClassName="research-page">
      <section className="route-section">
        <article className="crystal panel route-panel">
          <p className="section-label">Research</p>
          <h1>Evidence-first methods for dependable AI behavior, retrieval, and orchestration.</h1>
          <div className="split-grid route-split">
            <div className="flat-panel sub-panel">
              <h3>Research focus</h3>
              <p>
                Current areas include local RAG pipelines, semantic retrieval quality, multi-agent orchestration, and evaluation systems for LLM behavior.
              </p>
            </div>
            <div className="flat-panel sub-panel">
              <h3>Skills</h3>
              <p className="skills-line">
                LLM systems · Applied ML · Platform engineering · Distributed systems · Python · FastAPI · Observability
              </p>
            </div>
          </div>
          <Link className="button button-primary route-back" href="/">
            Back to Home
          </Link>
        </article>
      </section>
    </SiteFrame>
  );
}

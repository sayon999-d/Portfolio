import Link from 'next/link';
import SiteFrame from '../../components/SiteFrame';

export default function ResearchPage() {
  return (
    <SiteFrame shellClassName="research-page">
      <section className="route-section">
        <article className="crystal panel route-panel">
          <p className="section-label">Research</p>
          <h1>Evidence-first methods for dependable AI behavior.</h1>
          <div className="split-grid route-split">
            <div className="flat-panel sub-panel">
              <h3>Research focus</h3>
              <p>
                Current areas include confidence calibration, retrieval quality assessment, and human-in-the-loop evaluation frameworks.
              </p>
            </div>
            <div className="flat-panel sub-panel">
              <h3>Skills</h3>
              <p className="skills-line">
                LLM systems · Applied ML · Platform engineering · Distributed systems · TypeScript · Python · Observability
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

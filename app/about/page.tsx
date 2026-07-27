import Link from 'next/link';
import SiteFrame from '../../components/SiteFrame';

export default function AboutPage() {
  return (
    <SiteFrame shellClassName="about-page">
      <section className="route-section">
        <article className="flat-panel route-panel about-panel">
          <p className="section-label">About</p>
          <h1>Minimal interfaces, robust systems, and human-centered machine intelligence.</h1>
          <p className="lead">
            My work sits at the intersection of research and product engineering: designing model behavior, building runtime systems,
            and shaping user experiences where trust and clarity matter.
          </p>
          <div className="route-text-grid">
            <p>
              I focus on systems that stay calm under pressure. That means clear structure, resilient runtime behavior, and surfaces that
              guide people without friction.
            </p>
            <p>
              The visual language here is intentionally wider and cleaner than the old layout. There are no side-corner lines, no stacked
              chrome, and no competing frames around the content.
            </p>
          </div>
          <Link className="button button-primary route-back" href="/">
            Back to Home
          </Link>
        </article>
      </section>
    </SiteFrame>
  );
}

import Link from 'next/link';
import SiteFrame from '../../components/SiteFrame';

export default function AboutPage() {
  return (
    <SiteFrame shellClassName="about-page">
      <section className="route-section">
        <article className="flat-panel route-panel about-panel">
          <p className="section-label">About</p>
          <h1>AI &amp; ML Engineer | Backend Systems | LLM Orchestration | RAG Pipelines</h1>
          <p className="lead">
            I am a Bachelor of Technology student in Artificial Intelligence and Machine Learning (2024-2028) at Jain (Deemed-to-be
            University) in Bengaluru. I specialize in building local RAG pipelines, omni-agent orchestration systems, and
            high-performance backend infrastructure with Python and FastAPI.
          </p>
          <div className="route-text-grid">
            <p>
              My work sits at the intersection of applied AI and production engineering: designing model behavior, orchestrating agent
              systems, and building reliable backend layers that stay understandable under pressure.
            </p>
            <p>
              I care about products that feel calm, practical, and durable. That means clear structure, resilient runtime behavior, and
              interfaces that help people move quickly without losing trust.
            </p>
          </div>
          <div className="flat-panel sub-panel">
            <h3>Location</h3>
            <p>Bengaluru, Karnataka</p>
          </div>
          <Link className="button button-primary route-back" href="/">
            Back to Home
          </Link>
        </article>
      </section>
    </SiteFrame>
  );
}

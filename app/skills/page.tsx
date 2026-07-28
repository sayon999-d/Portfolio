import Link from 'next/link';
import SiteFrame from '../../components/SiteFrame';

const skillGroups = [
  {
    category: 'Languages & Frameworks',
    items: ['Python', 'FastAPI', 'Django REST', 'GraphQL'],
  },
  {
    category: 'AI / ML & NLP',
    items: ['LangChain', 'LangGraph', 'PyTorch', 'TensorFlow', 'Streamlit', 'RAG Pipelines', 'Prompt Engineering', 'MLflow'],
  },
  {
    category: 'Agent Orchestration',
    items: ['Multi-Agent Systems', 'MCP Server Protocol', 'Agent Registry Design', 'Graph Session Memory', 'LLM Provider Abstraction', 'Structured Audit Logging', 'PyPI Package Publishing', 'VS Code Extension Development'],
  },
  {
    category: 'Databases',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'Cassandra', 'ChromaDB'],
  },
  {
    category: 'DevOps, Streaming & Cloud',
    items: ['Docker', 'Kubernetes', 'Apache Kafka', 'Prometheus', 'Grafana', 'GitHub Actions', 'GitLab CI', 'Vercel'],
  },
  {
    category: 'Foundations',
    items: ['Data Structures & Algorithms', 'Systems-Level Problem Solving', 'OOP Design Patterns', 'Linux & CLI'],
  },
];

export default function SkillsPage() {
  return (
    <SiteFrame shellClassName="skills-page">
      <section className="route-section">
        <article className="flat-panel route-panel">
          <p className="section-label">Skills</p>
          <h1>Core skills shaped for AI systems, backend engineering, and production delivery.</h1>
          <p className="lead">
            This chapter keeps the skill story separate from the homepage, while the full breakdown lives in its own route.
          </p>
          <div className="split-grid route-split">
            {skillGroups.map((skillGroup) => (
              <div key={skillGroup.category} className="flat-panel sub-panel">
                <h3>{skillGroup.category}</h3>
                <ul className="detail-list detail-list--chips">
                  {skillGroup.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
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

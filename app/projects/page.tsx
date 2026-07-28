import Link from 'next/link';
import SiteFrame from '../../components/SiteFrame';

const projects = [
  {
    name: 'Limbi',
    focus: 'Featured platform',
    summary:
      'A production-grade multi-agent orchestration platform with 89 specialized agents and 435 available actions across engineering, security, cloud, DevOps, finance, and domain-specific agents.',
    highlight: '89 agents · 435 actions',
    features: [
      'Supports 19 LLM provider modes across local and cloud providers.',
      'Graph-backed session memory, RAG pipelines, FastAPI backend, MCP server, and a VS Code extension.',
      'Published on PyPI as pip install limbi.',
    ],
    stack: 'Python · FastAPI · LangChain · ChromaDB · MCP Server · PyPI',
    size: 'large',
  },
  {
    name: 'Multi-AI-Models Chat Support System',
    focus: 'Parallel orchestration',
    summary:
      'A platform orchestrating parallel responses from multiple LLMs simultaneously with built-in web research capabilities.',
    highlight: 'Live research support',
    features: [
      'Unified API abstraction across Groq, OpenRouter, Bytez, and Chutes.',
      'Real-time web research integration via Tavily.',
    ],
    stack: 'Python · LangChain · Tavily',
    demo: 'https://ai-chat-debate-arena.onrender.com',
    size: 'wide',
  },
  {
    name: 'Hike.ai',
    focus: 'Production suite',
    summary:
      'An all-in-one AI platform featuring five distinct production modules under one roof.',
    highlight: '5 modules',
    features: [
      'Modules include News Flow with semantic search, multi-model Debate Arena, Regret AI, and Empathy AI.',
      'Authentication secured via Google OAuth 2.0 and bcrypt.',
    ],
    stack: 'FastAPI · Google OAuth 2.0 · NewsAPI',
    demo: 'https://hike-ai.onrender.com',
    size: 'tall',
  },
  {
    name: 'Local Knowledge Chatbot',
    focus: 'Offline RAG',
    summary:
      'A fully offline RAG chatbot running entirely on-device with zero external API dependencies.',
    highlight: '100% local',
    features: [
      'Automated scraping pipelines feeding vector embeddings into ChromaDB.',
      'Serves local LLMs such as Mistral and LLaMA using Ollama.',
      'One-command containerized deployment via Docker.',
    ],
    stack: 'Python · Docker · ChromaDB · Ollama',
    demo: 'https://local-knowledge-chatbot.streamlit.app',
    size: 'compact',
  },
  {
    name: 'Sales Forecasting ML Pipeline',
    focus: 'Data science',
    summary:
      'An end-to-end machine learning pipeline reading directly from structured databases without manual data exports.',
    highlight: 'Automation first',
    features: [
      'Automated feature engineering and evaluation loops benchmark regression and tree-based models on sales time-series data.',
    ],
    stack: 'PyTorch · PostgreSQL · SQL',
    demo: 'https://sales-forecasting-prediction-model-n.streamlit.app',
    size: 'compact',
  },
  {
    name: 'NLP Transformation Engine',
    focus: 'Humanization engine',
    summary:
      'An advanced NLP pipeline designed to transform AI-generated text into natural, human-like writing.',
    highlight: '18 signal types',
    features: [
      'Real-time AI pattern detection across 18 signal types.',
      'Configurable humanization, summarization, readability optimization, and style-adaptive output.',
    ],
    stack: 'Python · LangChain · Streamlit · Groq',
    demo: 'https://nlp-transformation-engine.streamlit.app',
    size: 'wide',
  },
];

export default function ProjectsPage() {
  return (
    <SiteFrame shellClassName="projects-page">
      <section className="route-section">
        <article className="crystal panel route-panel">
          <p className="section-label">Projects</p>
          <h1>Production projects, organized into their own route.</h1>
          <p className="lead">
            A bento-style portfolio board for the projects that matter most, with a larger frame for the flagship work and tighter
            cards for supporting experiments.
          </p>
          <div className="project-bento-grid">
            {projects.map((project) => (
              <div
                key={project.name}
                className={`project-bento-card project-bento-card--${project.size ?? 'compact'}`}
              >
                <div className="project-bento-top">
                  <div className="project-meta">
                    <h3>{project.name}</h3>
                    <span>{project.focus}</span>
                  </div>
                  <p className="project-highlight">{project.highlight}</p>
                </div>
                <p className="project-summary">{project.summary}</p>
                <ul className="detail-list detail-list--bento">
                  {project.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <div className="project-footer">
                  <p className="project-stack">{project.stack}</p>
                  {project.demo ? (
                    <a className="project-link" href={project.demo} target="_blank" rel="noreferrer">
                      Live demo
                    </a>
                  ) : null}
                </div>
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

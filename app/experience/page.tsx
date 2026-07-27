import Link from 'next/link';
import SiteFrame from '../../components/SiteFrame';

const experiences = [
  {
    period: '2022 - Present',
    role: 'Principal AI Engineer, Northstar Systems',
    detail: 'Leading inference architecture, evaluation systems, and platform reliability across enterprise AI products.',
  },
  {
    period: '2018 - 2022',
    role: 'Staff Engineer, Atlas Compute',
    detail: 'Built distributed software services and ML infrastructure with a focus on performance and operational simplicity.',
  },
  {
    period: '2014 - 2018',
    role: 'Research Engineer, Cloudwave Lab',
    detail: 'Delivered applied machine learning research and translated prototypes into reliable production systems.',
  },
];

export default function ExperiencePage() {
  return (
    <SiteFrame shellClassName="experience-page">
      <section className="route-section">
        <article className="crystal panel route-panel">
          <p className="section-label">Experience</p>
          <h1>Work history, separated into its own chapter.</h1>
          <div className="timeline-list">
            {experiences.map((entry) => (
              <div key={entry.period} className="timeline-entry timeline-entry--route">
                <span>{entry.period}</span>
                <h3>{entry.role}</h3>
                <p>{entry.detail}</p>
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

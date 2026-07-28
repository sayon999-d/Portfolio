import Link from 'next/link';
import SiteFrame from '../../components/SiteFrame';

const experiences = [
  {
    period: 'June 2026 - July 2026',
    role: 'Data Analyst Intern | Bluestock Fintech',
    detail: 'Remote',
    accomplishments: [
      'Analyzed mutual fund and financial datasets to identify key market trends and support data-driven analytics initiatives.',
      'Built and maintained reporting dashboards using SQL and Excel, improving the accuracy and accessibility of core performance metrics.',
      'Collaborated with cross-functional teams to convert raw financial data into clear summaries for stakeholders.',
    ],
  },
];

export default function ExperiencePage() {
  return (
    <SiteFrame shellClassName="experience-page">
      <section className="route-section">
        <article className="crystal panel route-panel">
          <p className="section-label">Experience</p>
          <h1>Professional experience, separated into its own chapter.</h1>
          <div className="timeline-list">
            {experiences.map((entry) => (
              <div key={entry.period} className="timeline-entry timeline-entry--route">
                <span>{entry.period}</span>
                <h3>{entry.role}</h3>
                <p>{entry.detail}</p>
                <ul className="detail-list">
                  {entry.accomplishments.map((item) => (
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

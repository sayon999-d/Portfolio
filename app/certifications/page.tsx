import Link from 'next/link';
import SiteFrame from '../../components/SiteFrame';

const certifications = [
  'Computer Vision – Kaggle',
  'Deep Learning Essentials – IBM',
  'Build a Machine Learning Web App with Streamlit & Python – Coursera',
  'Introduction to Artificial Intelligence (AI) – IBM',
  'Data Warehousing: Schema, ETL, Optimal Performance – Coursera',
  'Machine Learning with Python – IBM',
  'REST API (Intermediate) – HackerRank',
  'Containers & Kubernetes Essentials – IBM',
  'AWS Knowledge: Cloud Essentials – Amazon Web Services (AWS)',
  'Introduction to Generative AI – Google',
  'Intro to Operating Systems 1: Virtualization – Codio',
];

export default function CertificationsPage() {
  return (
    <SiteFrame shellClassName="certifications-page">
      <section className="route-section">
        <article className="flat-panel route-panel">
          <p className="section-label">Certifications</p>
          <h1>A separate space for verified certificates and learning credentials.</h1>
          <p className="lead">
            This route keeps certifications isolated from the homepage so the landing page can stay focused on navigation and personality.
          </p>
          <div className="timeline-list certification-list">
            {certifications.map((item) => (
              <div key={item} className="timeline-entry timeline-entry--route">
                <h3>{item}</h3>
                <p>Issuer platform and credential details can be expanded here as needed.</p>
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

import Link from 'next/link';
import SiteFrame from '../../components/SiteFrame';

export default function ContactPage() {
  return (
    <SiteFrame shellClassName="contact-page">
      <section className="route-section">
        <article className="crystal panel route-panel">
          <p className="section-label">Contact</p>
          <h1>Let’s craft intelligent products with clarity and restraint.</h1>
          <p className="lead">
            Reach out if you want to build a calm, resilient portfolio, AI product, or systems-focused interface.
          </p>
          <div className="contact-actions">
            <a className="button button-primary" href="mailto:hello@example.com">
              hello@example.com
            </a>
            <Link className="button button-secondary" href="/">
              Back to Home
            </Link>
          </div>
        </article>
      </section>
    </SiteFrame>
  );
}

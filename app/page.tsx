import Link from 'next/link';
import SiteFrame from '../components/SiteFrame';
import VaporizeTextCycle from '../components/VaporizeTextCycle';

const sections = [
  {
    href: '/about',
    title: 'About',
    summary: 'A wider, cleaner introduction with no corner lines.',
  },
  {
    href: '/experience',
    title: 'Experience',
    summary: 'A separate timeline page for roles and career history.',
  },
  {
    href: '/projects',
    title: 'Projects',
    summary: 'Project case highlights in their own dedicated view.',
  },
  {
    href: '/research',
    title: 'Research',
    summary: 'Research focus and skills broken out into their own page.',
  },
  {
    href: '/contact',
    title: 'Contact',
    summary: 'A direct call-to-action page with a calm closing note.',
  },
];

export default function Page() {
  return (
    <SiteFrame shellClassName="home-page">
      <section className="landing-hero">
        <div className="home-intro">
          <div className="vaporize-stage">
            <VaporizeTextCycle
              texts={['SAYON MANNA', 'SAYON MANNA']}
              color="#17324d"
              spread={5.4}
              density={9}
              alignment="center"
              tag="div"
              font={{
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif',
                fontWeight: 700,
                fontSize: 154,
                lineHeight: 1,
                letterSpacing: 0,
              }}
              style={{
                width: 'min(100%, 1140px)',
                minHeight: '220px',
                margin: '0 auto',
              }}
            />
          </div>
          <p className="eyebrow">Portfolio chapters</p>
          <h1>Separate pages for every section.</h1>
          <p className="lead">
            Click any section to open its own dedicated page. The title stays centered above the hub, and the cards below stay clean.
          </p>
        </div>

        <div className="section-card-grid">
          {sections.map((section) => (
            <Link key={section.href} href={section.href} className="section-card flat-panel">
              <p className="section-label">{section.title}</p>
              <h2>{section.title}</h2>
              <p>{section.summary}</p>
              <span className="card-link">Open section</span>
            </Link>
          ))}
        </div>
      </section>
    </SiteFrame>
  );
}

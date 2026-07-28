import Link from 'next/link';
import SiteFrame from '../../components/SiteFrame';

type ProfileLink = {
  href: string;
  label: string;
  title: string;
  external?: boolean;
  icon: 'linkedin' | 'github' | 'mail' | 'instagram' | 'facebook' | 'x';
};

const profiles: ProfileLink[] = [
  {
    href: 'https://linkedin.com/in/sayonmanna',
    label: 'LinkedIn',
    title: 'LinkedIn Profile',
    external: true,
    icon: 'linkedin',
  },
  {
    href: 'https://github.com/sayon999-d',
    label: 'GitHub',
    title: 'GitHub Profile',
    external: true,
    icon: 'github',
  },
  {
    href: 'mailto:sayonmana@gmail.com',
    label: 'Email',
    title: 'Send Email',
    icon: 'mail',
  },
  {
    href: 'https://www.instagram.com/sayon._015/',
    label: 'Instagram',
    title: 'Instagram Profile',
    external: true,
    icon: 'instagram',
  },
  {
    href: 'https://www.facebook.com/sayon.manna.1460/',
    label: 'Facebook',
    title: 'Facebook Profile',
    external: true,
    icon: 'facebook',
  },
  {
    href: 'https://x.com/MannaSayo',
    label: 'X',
    title: 'X Profile',
    external: true,
    icon: 'x',
  },
];

function ProfileIcon({ icon }: { icon: ProfileLink['icon'] }) {
  switch (icon) {
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4.98 3.5A2.48 2.48 0 1 0 4.98 8a2.48 2.48 0 0 0 0-4.5ZM3 9h3.95v12H3V9Zm7.2 0h3.79v1.64h.05c.53-1 1.83-2.06 3.77-2.06C21.06 8.58 22 10.53 22 13.06V21h-3.95v-6.98c0-1.67-.03-3.82-2.33-3.82-2.34 0-2.69 1.83-2.69 3.7V21H10.2V9Z" />
        </svg>
      );
    case 'github':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.42c.58.1.79-.25.79-.55v-2c-3.2.7-3.88-1.35-3.88-1.35-.52-1.32-1.28-1.67-1.28-1.67-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.44.11-3 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.56.23 2.71.11 3 .73.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.27 5.68.41.35.78 1.04.78 2.1v3.11c0 .31.21.66.8.55A11.5 11.5 0 0 0 12 .5Z" />
        </svg>
      );
    case 'mail':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm16 3.18-7.38 5.1a1 1 0 0 1-1.24 0L4 8.18V17h16V8.18ZM5.6 7 12 11.42 18.4 7H5.6Z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm10.52 1.98a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1ZM12 7.1A4.9 4.9 0 1 1 7.1 12 4.9 4.9 0 0 1 12 7.1Zm0 1.8A3.1 3.1 0 1 0 15.1 12 3.1 3.1 0 0 0 12 8.9Z" />
        </svg>
      );
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M13.5 22v-8.1h2.72l.41-3.15H13.5V8.74c0-.91.25-1.53 1.56-1.53h1.67V4.39A22 22 0 0 0 14.32 4c-2.46 0-4.15 1.5-4.15 4.24v2.51H7.5v3.15h2.67V22h3.33Z" />
        </svg>
      );
    case 'x':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.9 3H22l-7.78 8.9L23.4 21H17l-5.2-6.06L6.5 21H3.4l8.22-9.4L.62 3H7.2l4.75 5.5L18.9 3Zm-1.12 16h1.72L6.26 4.92H4.42L17.78 19Z" />
        </svg>
      );
  }
}

export default function ContactPage() {
  return (
    <SiteFrame shellClassName="contact-page">
      <section className="route-section">
        <article className="crystal panel route-panel">
          <p className="section-label">Contact</p>
          <h1>Open to roles in AI/ML engineering, backend system architecture, and LLM orchestration.</h1>
          <p className="lead">
            Reach out if you want to build a calm, resilient AI product or systems-focused interface.
          </p>
          <div className="split-grid route-split contact-grid">
            <div className="flat-panel sub-panel">
              <h3>Direct contact</h3>
              <p>Email: sayonmana@gmail.com</p>
              <p>Phone: +91-8310407015</p>
              <p>Location: Bengaluru, Karnataka 560100</p>
            </div>
            <div className="flat-panel sub-panel">
              <h3>Profiles</h3>
              <div className="profile-icon-row" role="list" aria-label="Social profile links">
                {profiles.map((profile) => {
                  const externalProps = profile.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {};

                  return (
                    <a
                      key={profile.label}
                      className="profile-icon-button"
                      href={profile.href}
                      aria-label={profile.title}
                      title={profile.title}
                      role="listitem"
                      {...externalProps}
                    >
                      <span className="profile-icon">
                        <ProfileIcon icon={profile.icon} />
                      </span>
                      <span className="profile-icon-label">{profile.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="contact-actions">
            <Link className="button button-primary" href="/">
              Back to Home
            </Link>
          </div>
        </article>
      </section>
    </SiteFrame>
  );
}

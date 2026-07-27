'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import KineticGrid from './KineticGrid';
import Sparkles from './Sparkles';

type SiteFrameProps = {
  children: ReactNode;
  shellClassName?: string;
};

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/experience', label: 'Experience' },
  { href: '/projects', label: 'Projects' },
  { href: '/research', label: 'Research' },
  { href: '/contact', label: 'Contact' },
];

export default function SiteFrame({ children, shellClassName = '' }: SiteFrameProps) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <div className={`page-shell site-frame ${shellClassName}`.trim()} data-page={pathname?.slice(1) || 'home'}>
      <KineticGrid
        background="rgba(0, 0, 0, 0)"
        dotColor="rgba(255, 255, 255, 0.96)"
        lineColor="#69BBE0"
        trailColor="rgba(41, 117, 186, 0.55)"
        spacing={36}
        radius={340}
        strength={6}
        trail={false}
        showLines={true}
        showDots={true}
        showCursorGlow={isHome}
        style={{
          opacity: isHome ? 0.95 : 0.5,
          mixBlendMode: 'screen',
          zIndex: 0,
        }}
      />
      <Sparkles
        background="rgba(0, 0, 0, 0)"
        particleColor={isHome ? 'rgba(68, 175, 220, 0.98)' : 'rgba(86, 198, 215, 0.98)'}
        particleDensity={isHome ? 4.1 : 3.4}
        minSize={isHome ? 1.4 : 1.2}
        maxSize={isHome ? 3.4 : 3}
        speed={0.9}
        particleSpeed={isHome ? 0.95 : 0.8}
        movement={isHome ? 1.2 : 1.1}
        angle={180}
        allowCorners={!isHome}
        style={{
          opacity: isHome ? 0.84 : 0.7,
          mixBlendMode: 'screen',
          zIndex: 1,
        }}
      />
      <header className="site-header is-visible">
        <nav className="nav crystal" aria-label="Primary">
          <Link className="brand" href="/">
            A. Engineer
          </Link>
          <div className="nav-links nav-links--route">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname?.startsWith(item.href);

              return (
                <Link key={item.href} href={item.href} className={isActive ? 'is-active' : ''}>
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </header>
      <main className="site-main">
        <div key={pathname} className="page-surface">
          {children}
        </div>
      </main>
    </div>
  );
}

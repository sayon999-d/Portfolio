'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import KineticGrid from './KineticGrid';
import Sparkles from './Sparkles';

type SiteFrameProps = {
  children: ReactNode;
  shellClassName?: string;
};

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
  { href: '/research', label: 'Research' },
  { href: '/experience', label: 'Experience' },
  { href: '/certifications', label: 'Certifications' },
  { href: '/contact', label: 'Contact' },
];

export default function SiteFrame({ children, shellClassName = '' }: SiteFrameProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';
  const [navTransition, setNavTransition] = useState<'none' | 'next' | 'prev'>('none');
  const lastGestureAtRef = useRef(0);

  const currentRouteIndex = useMemo(
    () => navItems.findIndex((item) => item.href === pathname),
    [pathname]
  );

  const goToRelativeRoute = useCallback(
    (direction: 'next' | 'prev') => {
      const delta = direction === 'next' ? 1 : -1;
      const targetIndex = currentRouteIndex + delta;
      const target = navItems[targetIndex];

      if (!target || target.href === pathname) return;

      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem('nav-transition', direction);
      }
      setNavTransition(direction);
      router.push(target.href);
    },
    [currentRouteIndex, pathname, router]
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedTransition = window.sessionStorage.getItem('nav-transition');
    if (storedTransition === 'next' || storedTransition === 'prev') {
      setNavTransition(storedTransition);
      window.sessionStorage.removeItem('nav-transition');
      const timeoutId = window.setTimeout(() => setNavTransition('none'), 720);
      return () => window.clearTimeout(timeoutId);
    }

    setNavTransition('none');
    return undefined;
  }, [pathname]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const onWheel = (event: WheelEvent) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (event.ctrlKey) return;

      const target = event.target as HTMLElement | null;
      if (target?.closest('input, textarea, select, [contenteditable="true"]')) return;

      const dominantAxis = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      const magnitude = Math.abs(dominantAxis);
      const now = window.performance.now();

      if (magnitude < 56 || now - lastGestureAtRef.current < 720) return;

      const direction = dominantAxis > 0 ? 'next' : 'prev';
      const hasTarget = direction === 'next' ? currentRouteIndex < navItems.length - 1 : currentRouteIndex > 0;
      if (!hasTarget) return;

      event.preventDefault();
      lastGestureAtRef.current = now;
      goToRelativeRoute(direction);
    };

    window.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', onWheel);
    };
  }, [currentRouteIndex, goToRelativeRoute]);

  return (
    <div
      className={`page-shell site-frame ${shellClassName}`.trim()}
      data-page={pathname?.slice(1) || 'home'}
      data-nav-transition={navTransition}
    >
      <KineticGrid
        background="rgba(0, 0, 0, 0)"
        dotColor="rgba(255, 255, 255, 1)"
        lineColor="#4FAFE6"
        trailColor="rgba(41, 117, 186, 0.72)"
        spacing={34}
        radius={420}
        strength={8}
        trail={false}
        showLines={true}
        showDots={true}
        showCursorGlow={isHome}
        style={{
          opacity: isHome ? 0.88 : 0.5,
          mixBlendMode: isHome ? 'normal' : 'screen',
          zIndex: 0,
        }}
      />
      <Sparkles
        background="rgba(0, 0, 0, 0)"
        particleColor={isHome ? 'rgba(56, 171, 220, 1)' : 'rgba(86, 198, 215, 0.98)'}
        particleDensity={isHome ? 5.8 : 3.4}
        minSize={isHome ? 1.5 : 1.2}
        maxSize={isHome ? 4.2 : 3}
        speed={0.9}
        particleSpeed={isHome ? 1.05 : 0.8}
        movement={isHome ? 1.35 : 1.1}
        angle={180}
        allowCorners={true}
        style={{
          opacity: isHome ? 0.9 : 0.7,
          mixBlendMode: isHome ? 'normal' : 'screen',
          zIndex: 1,
        }}
      />
      <header className="site-header is-visible">
        <nav className="nav crystal" aria-label="Primary">
          <a
            className="brand brand-icon-link"
            href="https://github.com/sayon999-d"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            title="GitHub Profile"
          >
            <span className="sr-only">GitHub Profile</span>
            <svg viewBox="0 0 24 24" aria-hidden="true" className="brand-icon-svg">
              <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.42c.58.1.79-.25.79-.55v-2c-3.2.7-3.88-1.35-3.88-1.35-.52-1.32-1.28-1.67-1.28-1.67-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.44.11-3 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.56.23 2.71.11 3 .73.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.27 5.68.41.35.78 1.04.78 2.1v3.11c0 .31.21.66.8.55A11.5 11.5 0 0 0 12 .5Z" />
            </svg>
          </a>
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

'use client';

import { useEffect, useRef, type CSSProperties } from 'react';

interface Rgba {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  opacityVel: number;
}

interface CornerGlow {
  x: number;
  y: number;
  radius: number;
  alpha: number;
}

interface SparklesProps {
  background?: string;
  particleColor?: string;
  particleDensity?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleSpeed?: number;
  movement?: number;
  angle?: number;
  allowCorners?: boolean;
  style?: CSSProperties;
}

const DEFAULTS = {
  background: 'rgba(0, 0, 0, 0)',
  particleColor: '#56C6D7',
  particleDensity: 2.4,
  minSize: 1.1,
  maxSize: 2.4,
  speed: 1,
  particleSpeed: 0.7,
  movement: 0.9,
  angle: 180,
};

function parseColorToRgba(input: string): Rgba {
  if (!input) return { r: 0, g: 0, b: 0, a: 0 };

  const str = input.trim();
  const rgbaMatch = str.match(
    /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)/i
  );

  if (rgbaMatch) {
    return {
      r: Math.max(0, Math.min(255, parseFloat(rgbaMatch[1]))) / 255,
      g: Math.max(0, Math.min(255, parseFloat(rgbaMatch[2]))) / 255,
      b: Math.max(0, Math.min(255, parseFloat(rgbaMatch[3]))) / 255,
      a: rgbaMatch[4] !== undefined ? Math.max(0, Math.min(1, parseFloat(rgbaMatch[4]))) : 1,
    };
  }

  const hex = str.replace(/^#/, '');
  if (hex.length === 8) {
    return {
      r: parseInt(hex.slice(0, 2), 16) / 255,
      g: parseInt(hex.slice(2, 4), 16) / 255,
      b: parseInt(hex.slice(4, 6), 16) / 255,
      a: parseInt(hex.slice(6, 8), 16) / 255,
    };
  }
  if (hex.length === 6) {
    return {
      r: parseInt(hex.slice(0, 2), 16) / 255,
      g: parseInt(hex.slice(2, 4), 16) / 255,
      b: parseInt(hex.slice(4, 6), 16) / 255,
      a: 1,
    };
  }
  if (hex.length === 4) {
    return {
      r: parseInt(hex[0] + hex[0], 16) / 255,
      g: parseInt(hex[1] + hex[1], 16) / 255,
      b: parseInt(hex[2] + hex[2], 16) / 255,
      a: parseInt(hex[3] + hex[3], 16) / 255,
    };
  }
  if (hex.length === 3) {
    return {
      r: parseInt(hex[0] + hex[0], 16) / 255,
      g: parseInt(hex[1] + hex[1], 16) / 255,
      b: parseInt(hex[2] + hex[2], 16) / 255,
      a: 1,
    };
  }

  return { r: 0, g: 0, b: 0, a: 0 };
}

function rgbaToCanvasColor(rgba: Rgba): string {
  const r = Math.round(rgba.r * 255);
  const g = Math.round(rgba.g * 255);
  const b = Math.round(rgba.b * 255);
  if (rgba.a === 1) return `rgb(${r}, ${g}, ${b})`;
  return `rgba(${r}, ${g}, ${b}, ${rgba.a})`;
}

function angleToDrift(angleDeg: number): { vx: number; vy: number } {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { vx: Math.cos(rad), vy: Math.sin(rad) };
}

export default function Sparkles({
  background = DEFAULTS.background,
  particleColor = DEFAULTS.particleColor,
  particleDensity = DEFAULTS.particleDensity,
  minSize = DEFAULTS.minSize,
  maxSize = DEFAULTS.maxSize,
  speed = DEFAULTS.speed,
  particleSpeed = DEFAULTS.particleSpeed,
  movement = DEFAULTS.movement,
  angle = DEFAULTS.angle,
  allowCorners = true,
  style,
}: SparklesProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);
  const widthRef = useRef(0);
  const heightRef = useRef(0);
  const dprRef = useRef(1);
  const isVisibleRef = useRef(true);

  const createCornerParticle = (width: number, height: number) => {
    const edgeX = width * 0.18;
    const edgeY = height * 0.18;
    const corner = Math.floor(Math.random() * 4);
    const pull = () => Math.pow(Math.random(), 1.8);

    switch (corner) {
      case 0:
        return { x: pull() * edgeX, y: pull() * edgeY };
      case 1:
        return { x: width - pull() * edgeX, y: pull() * edgeY };
      case 2:
        return { x: pull() * edgeX, y: height - pull() * edgeY };
      default:
        return { x: width - pull() * edgeX, y: height - pull() * edgeY };
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root) return;

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;

    const backgroundRgba = parseColorToRgba(background);
    const particleRgba = parseColorToRgba(particleColor);
    const particleBaseColor = rgbaToCanvasColor({ ...particleRgba, a: 1 });
    const backgroundColor = rgbaToCanvasColor(backgroundRgba);
    const paintBackground = backgroundRgba.a > 0;
    const flickerScale = Math.max(0.1, Math.min(2, speed));
    const velocityScale = Math.max(0.15, Math.min(2, particleSpeed));
    const driftMag = Math.max(0, movement) * 0.08;
    const { vx: driftDirX, vy: driftDirY } = angleToDrift(angle);
    const driftVx = driftDirX * driftMag;
    const driftVy = driftDirY * driftMag;

    const initParticles = (width: number, height: number) => {
      const area = width * height;
      const count = Math.max(48, Math.min(900, Math.floor((area / 12000) * particleDensity * 2.5)));
      const particles: Particle[] = [];
      const edgeCount = allowCorners ? Math.max(16, Math.floor(count * 0.4)) : Math.floor(count * 0.2);

      for (let i = 0; i < count; i += 1) {
        const cornerSeed = allowCorners && i < edgeCount;
        const edgeSeed = i >= edgeCount && i < edgeCount + Math.floor(count * 0.25);
        const cornerPoint = cornerSeed ? createCornerParticle(width, height) : null;
        const edgeBand = Math.max(24, Math.min(width, height) * 0.16);
        const x = cornerSeed
          ? cornerPoint!.x
          : edgeSeed
            ? Math.random() < 0.5
              ? Math.random() * width
              : Math.random() < 0.5
                ? Math.random() * edgeBand
                : width - Math.random() * edgeBand
            : Math.random() * width;
        const y = cornerSeed
          ? cornerPoint!.y
          : edgeSeed
            ? Math.random() < 0.5
              ? Math.random() * edgeBand
              : height - Math.random() * edgeBand
            : Math.random() * height;

        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * velocityScale * 0.35,
          vy: (Math.random() - 0.5) * velocityScale * 0.35,
          size: minSize + Math.random() * Math.max(0.25, maxSize - minSize),
          opacity: 0.35 + Math.random() * 0.65,
          opacityVel: (Math.random() - 0.5) * 0.02,
        });
      }

      particlesRef.current = particles;
    };

    const resize = () => {
      const width = Math.max(1, root.clientWidth || root.offsetWidth || 1);
      const height = Math.max(1, root.clientHeight || root.offsetHeight || 1);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      widthRef.current = width;
      heightRef.current = height;
      dprRef.current = dpr;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initParticles(width, height);
    };

    const draw = () => {
      const width = widthRef.current;
      const height = heightRef.current;

      if (paintBackground) {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);
      } else {
        ctx.clearRect(0, 0, width, height);
      }

      ctx.fillStyle = particleBaseColor;
      ctx.globalCompositeOperation = 'lighter';

      for (const particle of particlesRef.current) {
        particle.x += particle.vx + driftVx;
        particle.y += particle.vy + driftVy;

        if (particle.x < -2) particle.x = width + 2;
        if (particle.x > width + 2) particle.x = -2;
        if (particle.y < -2) particle.y = height + 2;
        if (particle.y > height + 2) particle.y = -2;

        particle.opacity += particle.opacityVel * flickerScale;
        if (particle.opacity <= 0.1 || particle.opacity >= 1) {
          particle.opacityVel *= -1;
        }
        particle.opacity = Math.max(0.1, Math.min(1, particle.opacity));

        ctx.globalAlpha = particleRgba.a * particle.opacity;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (allowCorners) {
        const cornerGlows: CornerGlow[] = [
          { x: 0, y: 0, radius: Math.max(180, Math.min(width, height) * 0.28), alpha: 0.18 },
          { x: width, y: 0, radius: Math.max(180, Math.min(width, height) * 0.28), alpha: 0.16 },
          { x: 0, y: height, radius: Math.max(180, Math.min(width, height) * 0.28), alpha: 0.16 },
          { x: width, y: height, radius: Math.max(180, Math.min(width, height) * 0.28), alpha: 0.18 },
        ];

        for (const glow of cornerGlows) {
          const gradient = ctx.createRadialGradient(glow.x, glow.y, 0, glow.x, glow.y, glow.radius);
          gradient.addColorStop(0, rgbaToCanvasColor({ ...particleRgba, a: glow.alpha }));
          gradient.addColorStop(0.55, rgbaToCanvasColor({ ...particleRgba, a: glow.alpha * 0.35 }));
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.globalAlpha = 1;
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(glow.x, glow.y, glow.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    };

    const animate = () => {
      if (!isVisibleRef.current) {
        animationRef.current = null;
        return;
      }

      draw();
      animationRef.current = window.requestAnimationFrame(animate);
    };

    const start = () => {
      if (animationRef.current !== null || !isVisibleRef.current) return;
      animationRef.current = window.requestAnimationFrame(animate);
    };

    const stop = () => {
      if (animationRef.current === null) return;
      window.cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    };

    resizeObserverRef.current = new ResizeObserver(() => {
      resize();
      start();
    });
    resizeObserverRef.current.observe(root);

    intersectionObserverRef.current = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          start();
        } else {
          stop();
        }
      },
      { threshold: 0.01 }
    );
    intersectionObserverRef.current.observe(root);

    const onVisibilityChange = () => {
      if (document.hidden) {
        stop();
      } else if (isVisibleRef.current) {
        start();
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    resize();
    start();

    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      resizeObserverRef.current?.disconnect();
      intersectionObserverRef.current?.disconnect();
      resizeObserverRef.current = null;
      intersectionObserverRef.current = null;
    };
  }, [
    angle,
    background,
    maxSize,
    minSize,
    movement,
    particleColor,
    particleDensity,
    particleSpeed,
    speed,
  ]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </div>
  );
}

Sparkles.displayName = 'Sparkles';

'use client';

import { useEffect, useRef, type CSSProperties } from 'react';

interface GridNode {
  hx: number;
  hy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface TrailPoint {
  x: number;
  y: number;
  t: number;
}

interface KineticGridProps {
  background?: string;
  dotColor?: string;
  lineColor?: string;
  trailColor?: string;
  spacing?: number;
  radius?: number;
  strength?: number;
  trail?: boolean;
  showLines?: boolean;
  showDots?: boolean;
  showCursorGlow?: boolean;
  style?: CSSProperties;
}

const COMPONENT_DEFAULTS = {
  background: 'rgba(0, 0, 0, 0)',
  dotColor: '#FFFFFF',
  lineColor: '#80ACFF',
  trailColor: '#2664EB',
  spacing: 30,
  radius: 400,
  strength: 4,
  trail: true,
};

function useIsStaticRenderer() {
  return false;
}

export default function KineticGrid(props: KineticGridProps) {
  props = { ...COMPONENT_DEFAULTS, ...props };
  const {
    background = '#000000',
    dotColor = '#FFFFFF',
    lineColor = '#2563EB',
    trailColor = '#2664EB',
    spacing = 50,
    radius = 200,
    strength = 4,
    trail = true,
    showLines = true,
    showDots = true,
    showCursorGlow = true,
    style,
  } = props;

  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const trailRef = useRef<TrailPoint[]>([]);
  const isStatic = useIsStaticRenderer();

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const GAP = Math.max(8, spacing);
    const R = Math.max(1, radius);
    const PULL = (Math.max(1, Math.min(10, strength)) / 10) * 4;

    let W = 1;
    let H = 1;
    let cols: GridNode[][] = [];
    let dots: GridNode[] = [];
    let raf = 0;
    let visible = true;

    const build = (mw?: number, mh?: number) => {
      const rect = host.getBoundingClientRect();
      W = Math.max(1, Math.floor(mw ?? rect.width));
      H = Math.max(1, Math.floor(mh ?? rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = [];
      dots = [];

      const nCols = Math.floor(W / GAP) + 2;
      const nRows = Math.floor(H / GAP) + 2;

      for (let c = 0; c < nCols; c += 1) {
        const col: GridNode[] = [];
        for (let rIdx = 0; rIdx < nRows; rIdx += 1) {
          const hx = c * GAP;
          const hy = rIdx * GAP;
          const d = { hx, hy, x: hx, y: hy, vx: 0, vy: 0 };
          col.push(d);
          dots.push(d);
        }
        cols.push(col);
      }
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, W, H);
      if (showLines) {
        ctx.globalAlpha = 0.14;
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 0.75;

        for (let c = 0; c < cols.length; c += 1) {
          for (let rIdx = 0; rIdx < cols[c].length; rIdx += 1) {
            const d = cols[c][rIdx];
            const right = cols[c + 1]?.[rIdx];
            const down = cols[c]?.[rIdx + 1];
            if (right) {
              ctx.beginPath();
              ctx.moveTo(d.hx, d.hy);
              ctx.lineTo(right.hx, right.hy);
              ctx.stroke();
            }
            if (down) {
              ctx.beginPath();
              ctx.moveTo(d.hx, d.hy);
              ctx.lineTo(down.hx, down.hy);
              ctx.stroke();
            }
          }
        }
      }

      if (showDots) {
        ctx.globalAlpha = 0.4;
        ctx.fillStyle = dotColor;
        for (const d of dots) {
          ctx.beginPath();
          ctx.arc(d.hx, d.hy, 1.2, 0, 2 * Math.PI);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
    };

    build();

    const ro =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver((entries) => {
            const cr = entries[0]?.contentRect;
            build(cr?.width, cr?.height);
            if (isStatic) drawStatic();
          })
        : null;
    ro?.observe(host);

    const setMouse = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const mx = clientX - rect.left;
      const my = clientY - rect.top;
      mouseRef.current.x = mx;
      mouseRef.current.y = my;
      mouseRef.current.active = true;

      const now = performance.now();
      const trail = trailRef.current;
      trail.push({ x: mx, y: my, t: now });
      if (trail.length > 80) trail.shift();
    };

    const onMove = (event: MouseEvent) => setMouse(event.clientX, event.clientY);
    const onLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };
    const onTouch = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) setMouse(touch.clientX, touch.clientY);
    };

    const frame = () => {
      if (!visible) {
        raf = 0;
        return;
      }

      const m = mouseRef.current;
      ctx.clearRect(0, 0, W, H);

      for (const d of dots) {
        let ax = (d.hx - d.x) * 0.08;
        let ay = (d.hy - d.y) * 0.08;

        if (m.active) {
          const dx = m.x - d.x;
          const dy = m.y - d.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < R && dist > 0.001) {
            const force = (1 - dist / R) * PULL;
            ax += (dx / dist) * force;
            ay += (dy / dist) * force;
          }
        }

        d.vx = (d.vx + ax) * 0.82;
        d.vy = (d.vy + ay) * 0.82;
        d.x += d.vx;
        d.y += d.vy;
      }

      if (showLines) {
        for (let c = 0; c < cols.length; c += 1) {
          for (let rIdx = 0; rIdx < cols[c].length; rIdx += 1) {
            const d = cols[c][rIdx];
            const right = cols[c + 1]?.[rIdx];
            const down = cols[c]?.[rIdx + 1];
            const prox = m.active ? Math.max(0, 1 - Math.sqrt((m.x - d.x) ** 2 + (m.y - d.y) ** 2) / R) : 0;

            if (right) {
              ctx.globalAlpha = 0.06 + prox * 0.7;
              ctx.strokeStyle = lineColor;
              ctx.lineWidth = 0.5 + prox * 1.5;
              ctx.beginPath();
              ctx.moveTo(d.x, d.y);
              ctx.lineTo(right.x, right.y);
              ctx.stroke();
            }

            if (down) {
              ctx.globalAlpha = 0.06 + prox * 0.7;
              ctx.strokeStyle = lineColor;
              ctx.lineWidth = 0.5 + prox * 1.5;
              ctx.beginPath();
              ctx.moveTo(d.x, d.y);
              ctx.lineTo(down.x, down.y);
              ctx.stroke();
            }
          }
        }
      }

      if (showDots) {
        for (const d of dots) {
          const prox = m.active ? Math.max(0, 1 - Math.sqrt((m.x - d.x) ** 2 + (m.y - d.y) ** 2) / R) : 0;
          ctx.globalAlpha = 0.22 + prox * 0.78;
          ctx.fillStyle = dotColor;
          ctx.beginPath();
          ctx.arc(d.x, d.y, 0.8 + prox * 2.2, 0, 2 * Math.PI);
          ctx.fill();
        }
      }

      if (trail) {
        const now = performance.now();
        const tr = trailRef.current;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        for (let i = 1; i < tr.length; i += 1) {
          const a = tr[i - 1];
          const b = tr[i];
          const age = now - b.t;
          if (age > 260) continue;
          ctx.globalAlpha = Math.max(0, 1 - age / 260) * 0.85;
          ctx.strokeStyle = trailColor;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      if (showCursorGlow && m.active) {
        const glow = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, R * 0.7);
        glow.addColorStop(0, 'rgba(255,255,255,0.42)');
        glow.addColorStop(0.2, 'rgba(105,187,224,0.34)');
        glow.addColorStop(0.45, 'rgba(105,187,224,0.22)');
        glow.addColorStop(1, 'rgba(105,187,224,0)');
        ctx.globalAlpha = 1;
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(m.x, m.y, R * 0.9, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      raf = window.requestAnimationFrame(frame);
    };

    const start = () => {
      if (raf !== 0 || !visible) return;
      raf = window.requestAnimationFrame(frame);
    };

    const stop = () => {
      if (raf === 0) return;
      window.cancelAnimationFrame(raf);
      raf = 0;
    };

    const intersectionObserver =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            ([entry]) => {
              visible = entry.isIntersecting;
              if (entry.isIntersecting) start();
              else stop();
            },
            { threshold: 0.01 }
          )
        : null;

    const visibilityChange = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };

    intersectionObserver?.observe(host);
    document.addEventListener('visibilitychange', visibilityChange);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('touchend', onLeave);
    window.addEventListener('blur', onLeave);
    document.addEventListener('mouseleave', onLeave);

    if (isStatic) {
      drawStatic();
    } else {
      start();
    }

    return () => {
      stop();
      document.removeEventListener('visibilitychange', visibilityChange);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('touchend', onLeave);
      window.removeEventListener('blur', onLeave);
      document.removeEventListener('mouseleave', onLeave);
      ro?.disconnect();
      intersectionObserver?.disconnect();
    };
  }, [background, dotColor, lineColor, radius, showCursorGlow, showDots, showLines, spacing, strength, trail, trailColor, isStatic]);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background,
        cursor: 'default',
        pointerEvents: 'none',
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
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

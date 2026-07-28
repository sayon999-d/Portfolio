"use client";

import { useEffect, useRef, type CSSProperties } from 'react';
import {
  AdditiveBlending,
  Color,
  Group,
  InstancedMesh,
  Matrix4,
  MeshBasicMaterial,
  Mesh,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  WebGLRenderer,
} from 'three';

interface ParticleSphereProps {
  sphereColor?: string;
  particlesCount?: number;
  particleScale?: number;
  speed?: number;
  scale?: number;
  style?: CSSProperties;
  className?: string;
}

function parseColor(input: string | undefined) {
  const fallback = { r: 0.39, g: 0.71, b: 0.79, a: 1 };
  if (!input) return fallback;

  const trimmed = input.trim();
  const rgbaMatch = trimmed.match(
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

  const hex = trimmed.replace(/^#/, '');
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

  return fallback;
}

function fibonacciSphere(count: number, radius: number) {
  const points: number[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i += 1) {
    const t = count === 1 ? 0 : i / (count - 1);
    const y = 1 - t * 2;
    const ringRadius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;

    points.push(
      Math.cos(theta) * ringRadius * radius,
      y * radius,
      Math.sin(theta) * ringRadius * radius
    );
  }

  return points;
}

export default function ParticleSphere({
  sphereColor = '#64B5CA',
  particlesCount = 1200,
  particleScale = 0.085,
  speed = 0.28,
  scale = 1,
  style,
  className,
}: ParticleSphereProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const scene = new Scene();
    const camera = new PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.z = 3.9;

    const renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = 'srgb';

    const canvas = renderer.domElement;
    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    host.appendChild(canvas);

    const group = new Group();
    scene.add(group);

    const color = parseColor(sphereColor);
    const coreColor = new Color(color.r, color.g, color.b);
    const opacity = color.a;

    const outerGeometry = new SphereGeometry(1.08 * scale, 32, 24);
    const outerMaterial = new MeshBasicMaterial({
      color: coreColor,
      transparent: true,
      opacity: Math.max(0.08, opacity * 0.14),
      wireframe: true,
    });

    const outerShell = new Mesh(outerGeometry, outerMaterial);
    group.add(outerShell);

    const particleGeometry = new SphereGeometry(particleScale, 6, 6);
    const particleMaterial = new MeshBasicMaterial({
      color: coreColor,
      transparent: true,
      opacity: Math.max(0.28, opacity * 0.7),
      blending: AdditiveBlending,
      depthWrite: false,
    });

    const particles = new InstancedMesh(particleGeometry, particleMaterial, particlesCount);
    const matrix = new Matrix4();
    const spherePoints = fibonacciSphere(particlesCount, 1.02 * scale);

    for (let i = 0; i < particlesCount; i += 1) {
      const index = i * 3;
      matrix.setPosition(
        spherePoints[index],
        spherePoints[index + 1],
        spherePoints[index + 2]
      );
      particles.setMatrixAt(i, matrix);
    }

    particles.instanceMatrix.needsUpdate = true;
    group.add(particles);

    const wireGeometry = new SphereGeometry(0.98 * scale, 18, 14);
    const wireMaterial = new MeshBasicMaterial({
      color: new Color(0xffffff),
      transparent: true,
      opacity: 0.04,
      wireframe: true,
    });
    const wireShell = new Mesh(wireGeometry, wireMaterial);
    group.add(wireShell);

    const updateSize = () => {
      const width = Math.max(1, host.clientWidth || host.offsetWidth || 1);
      const height = Math.max(1, host.clientHeight || host.offsetHeight || 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    updateSize();

    const animate = () => {
      group.rotation.y += speed * 0.012;
      group.rotation.x = Math.sin(performance.now() * 0.00035) * 0.08;
      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    };

    const start = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(animate);
    };

    const stop = () => {
      if (rafRef.current === null) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };

    if (typeof IntersectionObserver !== 'undefined') {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            start();
          } else {
            stop();
          }
        },
        { threshold: 0.08 }
      );
      observerRef.current.observe(host);
    } else {
      start();
    }

    const onWindowResize = () => {
      updateSize();
    };

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserverRef.current = new ResizeObserver(() => {
        updateSize();
      });
      resizeObserverRef.current.observe(host);
    } else {
      window.addEventListener('resize', onWindowResize);
    }

    start();

    return () => {
      stop();
      observerRef.current?.disconnect();
      resizeObserverRef.current?.disconnect();
      window.removeEventListener('resize', onWindowResize);
      renderer.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      outerGeometry.dispose();
      outerMaterial.dispose();
      wireGeometry.dispose();
      wireMaterial.dispose();
      host.removeChild(canvas);
      scene.clear();
    };
  }, [particleScale, particlesCount, scale, speed, sphereColor]);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
        ...style,
      }}
    />
  );
}

'use client';

import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const visibleRef = useRef(false);

  useEffect(() => {
    // Respect reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) return;

    // Only render on devices with a hover pointer (desktop)
    const hoverQuery = window.matchMedia('(hover: hover)');
    if (!hoverQuery.matches) return;

    const el = glowRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;

      if (!visibleRef.current) {
        visibleRef.current = true;
        // Snap to initial position without lerp
        posRef.current.x = e.clientX;
        posRef.current.y = e.clientY;
        el.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      visibleRef.current = false;
      if (el) el.style.opacity = '0';
    };

    const animate = () => {
      // Lerp factor for smooth trailing (0.12 = subtle lag)
      const lerp = 0.12;
      posRef.current.x += (targetRef.current.x - posRef.current.x) * lerp;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * lerp;

      if (el) {
        el.style.transform = `translate(${posRef.current.x - 75}px, ${posRef.current.y - 75}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 150,
        height: 150,
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: 0,
        transition: 'opacity 0.3s ease',
        background:
          'radial-gradient(circle, rgba(128, 0, 255, 0.1) 0%, rgba(128, 0, 255, 0.04) 40%, transparent 70%)',
        willChange: 'transform',
      }}
    />
  );
}

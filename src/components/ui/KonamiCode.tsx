'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const KONAMI_SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
];

export default function KonamiCode() {
  const indexRef = useRef(0);
  const [activated, setActivated] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const trigger = useCallback(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    setActivated(true);

    if (!motionQuery.matches) {
      document.documentElement.classList.add('konami-active');
    }

    timeoutRef.current = setTimeout(() => {
      setActivated(false);
      document.documentElement.classList.remove('konami-active');
    }, 4500);
  }, []);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleKeyDown = (e: KeyboardEvent) => {
      const expected = KONAMI_SEQUENCE[indexRef.current];

      if (e.code === expected) {
        indexRef.current++;
        if (indexRef.current === KONAMI_SEQUENCE.length) {
          indexRef.current = 0;
          trigger();
        }
      } else {
        indexRef.current = e.code === KONAMI_SEQUENCE[0] ? 1 : 0;
      }
    };

    if (!motionQuery.matches) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      document.documentElement.classList.remove('konami-active');
    };
  }, [trigger]);

  if (!activated) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: '6rem',
        pointerEvents: 'none',
        animation: 'konami-flash 0.6s ease-out forwards',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8125rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--color-brand)',
          padding: '0.75rem 1.5rem',
          borderRadius: 'var(--radius-pill)',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          animation: 'konami-text 1.6s ease-out forwards',
        }}
      >
        Access granted
      </div>
    </div>
  );
}

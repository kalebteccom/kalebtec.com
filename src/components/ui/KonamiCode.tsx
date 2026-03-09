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
    // Respect reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    setActivated(true);

    // Add cyan override class to html
    if (!motionQuery.matches) {
      document.documentElement.classList.add('konami-active');
    }

    // Remove after 5 seconds
    timeoutRef.current = setTimeout(() => {
      setActivated(false);
      document.documentElement.classList.remove('konami-active');
    }, 5000);
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
        // Reset on wrong key, but check if this key starts the sequence
        indexRef.current = e.code === KONAMI_SEQUENCE[0] ? 1 : 0;
      }
    };

    // Only add listener if motion is allowed or if we just show static overlay
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
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        animation: 'konami-flash 0.8s ease-out forwards',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.5rem, 4vw, 3rem)',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          color: '#00ffff',
          textShadow:
            '0 0 10px rgba(0, 255, 255, 0.8), 0 0 30px rgba(0, 255, 255, 0.5), 0 0 60px rgba(0, 255, 255, 0.3)',
          animation: 'konami-text 0.8s ease-out forwards',
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7em', opacity: 0.7 }}>
          [SYS]
        </span>{' '}
        // ACCESS_GRANTED
      </div>
    </div>
  );
}

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface UseCardFlipOptions {
  /** Maximum tilt in degrees on mouse-move. Default 3. */
  maxTilt?: number;
}

/**
 * useCardFlip — gentle 3D tilt + click/keyboard flip behaviour for a
 * single card surface. Originally extracted from TeamSection so we have
 * one tested implementation of the flip-card UX.
 *
 * The card itself is two stacked faces with `backface-visibility: hidden`;
 * this hook owns the rotation state and event wiring. Touch devices skip
 * the tilt (preserves scroll feel) but still flip on tap.
 *
 * Returns:
 *   cardRef          — attach to the rotating element
 *   isFlipped        — current flip state (for ARIA labels)
 *   handleMouseMove  — wire to onMouseMove on the perspective wrapper
 *   handleMouseLeave — wire to onMouseLeave on the perspective wrapper
 *   handleTouchStart — wire to onTouchStart so we know to disable tilt
 *   handleClick      — flips the card
 *   handleKeyDown    — Enter / Space flips the card
 */
export function useCardFlip(options: UseCardFlipOptions = {}) {
  const { maxTilt = 3 } = options;
  const cardRef = useRef<HTMLDivElement>(null);
  const flippedRef = useRef(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const rafRef = useRef(0);
  const reducedMotionRef = useRef(false);
  const isTouchRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleTouchStart = useCallback(() => {
    isTouchRef.current = true;
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouchRef.current || reducedMotionRef.current) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top) / rect.height;

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const card = cardRef.current;
        if (!card) return;
        const tiltX = (0.5 - ny) * maxTilt;
        const flip = flippedRef.current;
        const tiltY = (nx - 0.5) * maxTilt * (flip ? -1 : 1);
        const baseY = flip ? 180 : 0;
        card.style.transition = 'transform 0.2s ease-out';
        card.style.transform = `rotateX(${tiltX}deg) rotateY(${baseY + tiltY}deg)`;
      });
    },
    [maxTilt],
  );

  const handleMouseLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = 'transform 0.5s ease-out';
    card.style.transform = flippedRef.current
      ? 'rotateX(0deg) rotateY(180deg)'
      : 'rotateX(0deg) rotateY(0deg)';
  }, []);

  const handleClick = useCallback(() => {
    const next = !flippedRef.current;
    flippedRef.current = next;
    setIsFlipped(next);
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
    card.style.transform = `rotateX(0deg) rotateY(${next ? 180 : 0}deg)`;
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      }
    },
    [handleClick],
  );

  return {
    cardRef,
    isFlipped,
    handleMouseMove,
    handleMouseLeave,
    handleTouchStart,
    handleClick,
    handleKeyDown,
  };
}

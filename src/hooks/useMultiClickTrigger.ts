'use client';

import { useCallback, useRef, useState } from 'react';

interface UseMultiClickTriggerOptions {
  /** How many clicks within the window are needed to fire. */
  count: number;
  /** Time window in ms during which the clicks must occur. */
  window: number;
  /** Cooldown after a successful trigger during which the visual feedback stays on. */
  cooldown?: number;
  /** Honor `prefers-reduced-motion` and skip the trigger entirely when reduced. */
  respectReducedMotion?: boolean;
  /** Side effect to run when the threshold is reached (e.g. an analytics event). */
  onTrigger?: (e: React.MouseEvent) => void;
  /**
   * Whether to call `e.preventDefault()` on the click that crossed the
   * threshold. Useful for logo links where we don't want the link to
   * navigate when the user is intentionally rapid-clicking it.
   */
  preventDefaultOnTrigger?: boolean;
}

/**
 * useMultiClickTrigger — detect rapid N-click patterns on an element.
 *
 * Originally extracted from the Header logo's 5-click easter egg. Returns
 * a click handler to spread on the target plus a `triggered` boolean that
 * stays true for `cooldown` ms so consumers can swap classNames / play a
 * one-shot animation.
 *
 * Example:
 *   const { onClick, triggered } = useMultiClickTrigger({
 *     count: 5, window: 2000, cooldown: 500, preventDefaultOnTrigger: true,
 *   });
 *   <Link onClick={onClick} className={cn(triggered && 'logo-glitch-active')} />
 */
export function useMultiClickTrigger({
  count,
  window: windowMs,
  cooldown = 500,
  respectReducedMotion = true,
  onTrigger,
  preventDefaultOnTrigger,
}: UseMultiClickTriggerOptions) {
  const clicksRef = useRef<number[]>([]);
  const [triggered, setTriggered] = useState(false);

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      const now = Date.now();
      clicksRef.current.push(now);
      clicksRef.current = clicksRef.current.filter((t) => now - t < windowMs);

      if (clicksRef.current.length >= count) {
        clicksRef.current = [];

        if (respectReducedMotion) {
          const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
          if (motionQuery.matches) return;
        }

        if (preventDefaultOnTrigger) e.preventDefault();
        setTriggered(true);
        onTrigger?.(e);
        setTimeout(() => setTriggered(false), cooldown);
      }
    },
    [count, windowMs, cooldown, respectReducedMotion, onTrigger, preventDefaultOnTrigger],
  );

  return { onClick, triggered };
}

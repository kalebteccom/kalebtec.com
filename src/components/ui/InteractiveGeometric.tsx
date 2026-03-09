'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

/**
 * Interactive cyberpunk geometric graphic for the About section.
 * Tracks mouse position and applies parallax transforms to layers.
 * Click triggers a "data pulse" glitch effect.
 */
export default function InteractiveGeometric() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [glitching, setGlitching] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);

  // Raw mouse position relative to container center (-1 to 1)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring values for parallax
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transform values for different depth layers
  const outerRotateX = useTransform(smoothY, [-1, 1], [8, -8]);
  const outerRotateY = useTransform(smoothX, [-1, 1], [-12, 12]);
  const innerRotateX = useTransform(smoothY, [-1, 1], [12, -12]);
  const innerRotateY = useTransform(smoothX, [-1, 1], [-18, 18]);

  // Parallax translations for data points
  const dataX1 = useTransform(smoothX, [-1, 1], [-8, 8]);
  const dataY1 = useTransform(smoothY, [-1, 1], [-6, 6]);
  const dataX2 = useTransform(smoothX, [-1, 1], [6, -6]);
  const dataY2 = useTransform(smoothY, [-1, 1], [4, -4]);
  const dataX3 = useTransform(smoothX, [-1, 1], [-12, 12]);
  const dataY3 = useTransform(smoothY, [-1, 1], [-10, 10]);

  // Grid shift
  const gridX = useTransform(smoothX, [-1, 1], [-4, 4]);
  const gridY = useTransform(smoothY, [-1, 1], [-3, 3]);

  // Accent dot glow
  const dotX = useTransform(smoothX, [-1, 1], [-6, 6]);
  const dotY = useTransform(smoothY, [-1, 1], [-4, 4]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const handleClick = useCallback(() => {
    // Check reduced motion
    if (typeof window !== 'undefined') {
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (motionQuery.matches) return;
    }

    setGlitching(true);
    setPulseCount((c) => c + 1);
    setTimeout(() => setGlitching(false), 600);
  }, []);

  // Cycle hex values for decorative text
  const [hexValues, setHexValues] = useState(['0x4F2A', '128.00', 'node_03', '0xFF00']);

  useEffect(() => {
    if (!glitching) return;
    const interval = setInterval(() => {
      setHexValues([
        '0x' + Math.floor(Math.random() * 0xffff).toString(16).toUpperCase().padStart(4, '0'),
        (Math.random() * 256).toFixed(2),
        'node_' + String(Math.floor(Math.random() * 99)).padStart(2, '0'),
        '0x' + Math.floor(Math.random() * 0xffff).toString(16).toUpperCase().padStart(4, '0'),
      ]);
    }, 80);
    return () => clearInterval(interval);
  }, [glitching]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center h-56 lg:h-64 cursor-pointer select-none"
      aria-hidden="true"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ perspective: '800px' }}
    >
      {/* Outer wireframe cube — depth layer 1 */}
      <motion.div
        className="absolute w-36 h-36 md:w-44 md:h-44 border border-cyber-border transition-colors duration-300"
        style={{
          rotateX: outerRotateX,
          rotateY: outerRotateY,
          translateZ: 0,
          borderColor: glitching ? 'rgba(0,255,255,0.5)' : undefined,
        }}
      />

      {/* Inner wireframe cube — depth layer 2 (more movement) */}
      <motion.div
        className="absolute w-36 h-36 md:w-44 md:h-44 border border-cyber-border transition-colors duration-300"
        style={{
          rotateX: innerRotateX,
          rotateY: innerRotateY,
          translateZ: 40,
          borderColor: glitching ? 'rgba(128,0,255,0.6)' : undefined,
        }}
      />

      {/* Grid pattern overlay — subtle shift */}
      <motion.div
        className="absolute w-28 h-28 md:w-36 md:h-36 opacity-20 transition-opacity duration-300"
        style={{
          x: gridX,
          y: gridY,
          backgroundImage:
            'linear-gradient(rgba(128,0,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(128,0,255,0.3) 1px, transparent 1px)',
          backgroundSize: '10px 10px',
          opacity: glitching ? 0.5 : 0.2,
        }}
      />

      {/* Floating data points — parallax layers */}
      <motion.span
        className="absolute top-4 left-8 font-mono text-[10px] text-cyber-faint/40 transition-colors duration-200"
        style={{ x: dataX1, y: dataY1, color: glitching ? 'rgba(0,255,255,0.8)' : undefined }}
      >
        {hexValues[0]}
      </motion.span>
      <motion.span
        className="absolute top-12 right-6 font-mono text-[10px] text-cyber-cyan/20 transition-colors duration-200"
        style={{ x: dataX2, y: dataY2, color: glitching ? 'rgba(128,0,255,0.8)' : undefined }}
      >
        {hexValues[1]}
      </motion.span>
      <motion.span
        className="absolute bottom-12 left-12 font-mono text-[10px] text-cyber-faint/30 transition-colors duration-200"
        style={{ x: dataX3, y: dataY3, color: glitching ? 'rgba(0,255,255,0.7)' : undefined }}
      >
        {hexValues[2]}
      </motion.span>
      <motion.span
        className="absolute bottom-4 right-8 font-mono text-[10px] text-cyber-cyan/25 transition-colors duration-200"
        style={{ x: dataX1, y: dataY2, color: glitching ? 'rgba(128,0,255,0.7)' : undefined }}
      >
        {hexValues[3]}
      </motion.span>

      {/* Accent square — slight depth offset */}
      <motion.div
        className="absolute w-16 h-16 md:w-20 md:h-20 bg-cyber-faint/5 border border-cyber-border transition-all duration-300"
        style={{
          rotateX: outerRotateX,
          rotateY: outerRotateY,
          translateZ: 20,
          borderColor: glitching ? 'rgba(0,255,255,0.4)' : undefined,
          backgroundColor: glitching ? 'rgba(128,0,255,0.1)' : undefined,
        }}
      />

      {/* Thin horizontal line */}
      <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
      {/* Thin vertical line */}
      <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-cyber-cyan/10 to-transparent left-1/2" />

      {/* Accent dot — follows mouse more aggressively */}
      <motion.div
        className="absolute top-6 right-10 md:right-14 w-2 h-2 transition-all duration-300"
        style={{
          x: dotX,
          y: dotY,
          backgroundColor: glitching ? '#00ffff' : 'var(--color-cyber-muted)',
          boxShadow: glitching ? '0 0 12px rgba(0,255,255,0.6)' : 'none',
        }}
      />

      {/* Pulse ring on click */}
      {pulseCount > 0 && (
        <motion.div
          key={pulseCount}
          className="absolute w-20 h-20 border border-cyber-cyan/60 pointer-events-none"
          initial={{ scale: 0.5, opacity: 0.8 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        />
      )}

      {/* Glitch flash overlay */}
      {glitching && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.04) 2px, rgba(0,255,255,0.04) 4px)',
            animation: 'rgb-split 0.3s steps(3) infinite',
          }}
        />
      )}

      {/* "CLICK TO INTERACT" hint — fades after first click */}
      {pulseCount === 0 && (
        <motion.span
          className="absolute -bottom-2 font-mono text-[9px] text-cyber-faint/30 tracking-widest uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.15, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          [ click ]
        </motion.span>
      )}
    </div>
  );
}

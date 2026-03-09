'use client';

import dynamic from 'next/dynamic';
import { motion, type Variants } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-cyber-bg" />,
});

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: EASE,
    },
  },
};

const lineVariants: Variants = {
  hidden: {
    scaleX: 0,
    opacity: 0,
  },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 1.0,
      ease: EASE,
    },
  },
};

const glowVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: EASE,
    },
  },
};

export default function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section aria-label={t('ariaLabel')} className="relative min-h-screen w-full overflow-hidden bg-cyber-bg">
      {/* Three.js Canvas Background — theme-aware, interactive (draggable geometries) */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <HeroScene />
      </div>

      {/* Radial gradient for text readability */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none hero-text-backdrop"
        aria-hidden="true"
      />
      {/* Bottom fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-[1] pointer-events-none hero-bottom-fade"
        aria-hidden="true"
      />

      {/* Decorative HUD elements */}
      <div className="absolute inset-0 z-[2] pointer-events-none" aria-hidden="true">
        {/* Top-left: SYS.ACTIVE */}
        <div className="absolute top-6 left-6 font-mono text-[10px] text-cyber-faint/40 tracking-wider">
          {t('sysActive')}
        </div>
        {/* Top-right: Coordinates */}
        <div className="absolute top-6 right-6 font-mono text-[10px] text-cyber-faint/40 tracking-wider">
          LAT: 00.0000 | LNG: 00.0000
        </div>
      </div>

      {/* Text Content Overlay — pointer-events-none so canvas receives drag events */}
      <div className="relative z-[2] flex min-h-screen items-center justify-center px-6 pointer-events-none">
        <motion.div
          className="flex flex-col items-center text-center max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo */}
          <motion.div variants={glowVariants} className="mb-8">
            <Image
              src="/logo.svg"
              alt="Kalebtec"
              width={56}
              height={56}
              className="opacity-80"
              priority
            />
          </motion.div>

          {/* Company Name */}
          <motion.h1
            variants={fadeUpVariants}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-wider text-cyber-heading neon-glow glitch-hover break-words"
          >
            KALEBTEC
          </motion.h1>

          {/* Sharp separator line with blinking dot */}
          <motion.div
            variants={lineVariants}
            className="mt-5 mb-6 flex items-center gap-0 origin-center"
            aria-hidden="true"
          >
            <div className="h-px w-12 bg-cyber-muted/40" />
            <motion.div
              className="w-1.5 h-1.5 bg-brand shadow-[0_0_6px_rgba(128,0,255,0.6)]"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="h-px w-12 bg-cyber-muted/40" />
          </motion.div>

          {/* Monospace Tagline with blinking cursor */}
          <motion.p
            variants={fadeUpVariants}
            className="font-mono text-sm sm:text-base md:text-lg tracking-[0.2em] text-cyber-cyan"
          >
            {t('tagline')}
            <span className="typing-cursor" />
          </motion.p>

          {/* Value Proposition */}
          <motion.p
            variants={fadeUpVariants}
            className="mt-6 max-w-xl text-base sm:text-lg text-cyber-muted leading-relaxed font-mono"
          >
            {t('valueProp')}
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={fadeUpVariants} className="mt-10 pointer-events-auto">
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 border border-cyber-muted/30 bg-transparent px-8 py-3.5 font-mono text-sm uppercase tracking-widest text-cyber-heading transition-all duration-300 hover:border-cyber-heading/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyber-heading/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cyber-bg"
            >
              <span>{t('cta')}</span>
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-[2] -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        aria-hidden="true"
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="font-mono text-xs text-cyber-faint tracking-wider">{t('scroll')}</span>
          <svg
            className="h-4 w-4 text-cyber-faint"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="square" strokeLinejoin="miter" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

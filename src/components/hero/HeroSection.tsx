'use client';

import dynamic from 'next/dynamic';
import { motion, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-bg" />,
});

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export default function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section
      aria-label={t('ariaLabel')}
      className="relative min-h-[92vh] w-full overflow-hidden bg-bg"
    >
      {/* Three.js background — quiet, monochrome ambient texture */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <HeroScene />
      </div>

      {/* Readability fade — keeps headline crisp over the colored gradient */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none hero-readability-fade"
        aria-hidden="true"
      />

      {/* Decorative brand accent — large vertical bar near the left edge */}
      <div
        className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-brand z-[1] pointer-events-none hidden md:block"
        aria-hidden="true"
      />

      {/* Content overlay */}
      <div className="relative z-[2] flex min-h-[92vh] items-center pointer-events-none">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 py-24 md:py-32">
          <motion.div
            className="max-w-4xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Small label */}
            <motion.p
              variants={fadeUpVariants}
              className="font-mono text-xs tracking-[0.18em] uppercase mb-6 flex items-center gap-2.5"
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-brand"
                aria-hidden="true"
              />
              <span className="text-muted">{t('eyebrow')}</span>
            </motion.p>

            {/* Massive editorial headline */}
            <motion.h1
              variants={fadeUpVariants}
              className="text-display-xl text-heading mb-8 max-w-[14ch]"
            >
              {t('headline')}
            </motion.h1>

            {/* Supporting paragraph */}
            <motion.p
              variants={fadeUpVariants}
              className="editorial-lead text-body max-w-2xl mb-10"
            >
              {t('subhead')}
            </motion.p>

            {/* CTA pair */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-wrap items-center gap-4 pointer-events-auto"
            >
              <a href="#contact" className="btn-pill btn-primary">
                {t('primaryCta')}
              </a>
              <a href="#projects" className="btn-pill btn-secondary">
                {t('secondaryCta')}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

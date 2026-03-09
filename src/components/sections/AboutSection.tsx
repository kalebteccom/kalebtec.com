'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedReveal from '@/components/ui/AnimatedReveal';
import InteractiveGeometric from '@/components/ui/InteractiveGeometric';
import { cn } from '@/lib/utils';

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const stats = [
  { label: 'UPTIME', value: '99.9%', code: 'SYS_RELIABILITY', ariaKey: 'statUptime' as const },
  { label: 'STACK_DEPTH', value: 'FULL', code: 'END_TO_END', ariaKey: 'statStackDepth' as const },
  { label: 'RESPONSE_TIME', value: '<24h', code: 'CLIENT_COMMS', ariaKey: 'statResponseTime' as const },
  { label: 'CLEARANCE', value: 'MAX', code: 'SECURITY_LVL', ariaKey: 'statClearance' as const },
];

export default function AboutSection() {
  const t = useTranslations('about');
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.2 });

  return (
    <section
      id="about"
      aria-label={t('ariaLabel')}
      className="relative py-32 overflow-hidden cyber-grid-bg"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading title={t('sectionTitle')} sectionNumber="01" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Text Column */}
          <div className="space-y-8">
            <AnimatedReveal delay={0.15}>
              <div className="space-y-6">
                {/* Terminal-style intro block */}
                <div className="border border-cyber-border bg-cyber-surface p-5 md:p-6 cyber-corners">
                  <div className="flex items-center gap-2 mb-4" aria-hidden="true">
                    <div className="w-2 h-2 bg-cyber-cyan" />
                    <span className="font-mono text-[10px] text-cyber-faint tracking-wider uppercase">
                      sys.about // kalebtec_init
                    </span>
                  </div>
                  <p className="text-lg md:text-xl leading-relaxed text-cyber-body">
                    <span className="text-cyber-cyan font-mono mr-2" aria-hidden="true">
                      {'>'}
                    </span>
                    {t('originStory')}
                  </p>
                </div>

                <p className="text-lg md:text-xl leading-relaxed text-cyber-body">
                  <span className="text-brand-light font-mono mr-2" aria-hidden="true">
                    {'//'}
                  </span>
                  {t.rich('teamDescription', {
                    rowin: (chunks) => (
                      <strong className="text-cyber-heading">{chunks}</strong>
                    ),
                    mari: (chunks) => (
                      <strong className="text-cyber-heading">{chunks}</strong>
                    ),
                  })}
                </p>

                <p className="text-base md:text-lg leading-relaxed text-cyber-muted">
                  <span className="text-cyber-faint font-mono mr-2" aria-hidden="true">
                    {'$'}
                  </span>
                  {t.rich('directAttention', {
                    em: (chunks) => (
                      <em className="text-cyber-body not-italic font-medium">{chunks}</em>
                    ),
                  })}
                </p>
              </div>
            </AnimatedReveal>

            {/* Philosophy block */}
            <AnimatedReveal delay={0.3}>
              <div className="border-l-2 border-brand/40 pl-5 space-y-3">
                <p className="font-mono text-xs text-cyber-faint tracking-wider uppercase">
                  // operating_philosophy
                </p>
                <p className="text-base leading-relaxed text-cyber-muted">
                  {t('philosophy')}
                </p>
              </div>
            </AnimatedReveal>
          </div>

          {/* Right Column: Stats Panel + Decorative Element */}
          <div className="space-y-8">
            {/* Stats Grid */}
            <AnimatedReveal delay={0.25}>
              <div ref={statsRef}>
                <div className="flex items-center gap-2 mb-4" aria-hidden="true">
                  <div className="w-1.5 h-1.5 bg-brand" />
                  <span className="font-mono text-[10px] text-cyber-faint tracking-wider uppercase">
                    status_readout
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.1 * index,
                        ease: EASE,
                      }}
                      className={cn(
                        'border border-cyber-border bg-cyber-surface p-4',
                        'cyber-border-glow',
                        'transition-all duration-300',
                      )}
                      aria-label={t(stat.ariaKey)}
                    >
                      <span
                        className="font-mono text-[9px] text-cyber-faint/50 tracking-widest block mb-2"
                        aria-hidden="true"
                      >
                        {stat.code}
                      </span>
                      <span className="font-display text-2xl font-bold text-cyber-heading block mb-1 tracking-wide">
                        {stat.value}
                      </span>
                      <span className="font-mono text-[10px] text-cyber-cyan tracking-wider">
                        {stat.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedReveal>

            {/* Interactive Cyberpunk Geometric Element */}
            <AnimatedReveal delay={0.4}>
              <InteractiveGeometric />
            </AnimatedReveal>
          </div>
        </div>
      </div>

      {/* Section divider: gradient line */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl px-6 lg:px-8"
        aria-hidden="true"
      >
        <div className="h-px bg-gradient-to-r from-transparent via-brand to-cyber-cyan/50 to-transparent" />
      </div>
    </section>
  );
}

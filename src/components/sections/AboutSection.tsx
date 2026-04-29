'use client';

import { useTranslations } from 'next-intl';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedReveal from '@/components/ui/AnimatedReveal';

const stats = [
  { value: '99.9%', label: 'Uptime', ariaKey: 'statUptime' as const },
  { value: 'End-to-end', label: 'Stack depth', ariaKey: 'statStackDepth' as const },
  { value: '< 24h', label: 'Response time', ariaKey: 'statResponseTime' as const },
  { value: 'Direct', label: 'Communication', ariaKey: 'statClearance' as const },
];

export default function AboutSection() {
  const t = useTranslations('about');

  return (
    <section
      id="about"
      aria-label={t('ariaLabel')}
      className="relative py-24 md:py-32 bg-bg"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading title={t('sectionTitle')} sectionNumber={t('sectionNumber')} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Lead column */}
          <div className="lg:col-span-7 space-y-6">
            <AnimatedReveal delay={0.1}>
              <p className="editorial-lead text-heading">
                {t('originStory')}
              </p>
            </AnimatedReveal>

            <AnimatedReveal delay={0.2}>
              <p className="text-lg text-body leading-relaxed">
                {t.rich('teamDescription', {
                  rowin: (chunks) => <strong className="text-heading">{chunks}</strong>,
                  mari: (chunks) => <strong className="text-heading">{chunks}</strong>,
                })}
              </p>
            </AnimatedReveal>

            <AnimatedReveal delay={0.3}>
              <p className="text-lg text-muted leading-relaxed">
                {t.rich('directAttention', {
                  em: (chunks) => (
                    <em className="text-body not-italic font-medium">{chunks}</em>
                  ),
                })}
              </p>
            </AnimatedReveal>
          </div>

          {/* Side: philosophy + stats */}
          <div className="lg:col-span-5 space-y-12">
            <AnimatedReveal delay={0.25}>
              <div className="border-l-2 border-border-strong pl-6">
                <p className="text-xs font-medium uppercase tracking-wider text-faint mb-3">
                  Operating philosophy
                </p>
                <p className="text-base text-body leading-relaxed">
                  {t('philosophy')}
                </p>
              </div>
            </AnimatedReveal>

            <AnimatedReveal delay={0.4}>
              <div className="grid grid-cols-2 gap-x-8 gap-y-8 pt-8 border-t border-border">
                {stats.map((stat, i) => (
                  <div key={stat.label} aria-label={t(stat.ariaKey)}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-brand"
                        aria-hidden="true"
                      />
                      <span className="font-mono text-[10px] uppercase tracking-widest text-brand font-semibold">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="font-display text-3xl font-bold tracking-tight text-heading mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs font-medium uppercase tracking-wider text-faint">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

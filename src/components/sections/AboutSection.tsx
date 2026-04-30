'use client';

import { useTranslations } from 'next-intl';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedReveal from '@/components/ui/AnimatedReveal';
import { Section, SectionContainer } from '@/components/ui/Section';
import { Stat, StatGrid } from '@/components/ui/Stat';

// Order is intentional — these are the four signals we want a visitor to
// take away from the section: how we work, how fast we reply, who shows
// up, and how long we stay. The keys map to about.stats.{key}.{value,label}
// in each locale.
const STAT_KEYS = ['process', 'response', 'team', 'partnership'] as const;

export default function AboutSection() {
  const t = useTranslations('about');

  return (
    <Section id="about" tone="bg" aria-label={t('ariaLabel')}>
      <SectionContainer>
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
                  {t('philosophyLabel')}
                </p>
                <p className="text-base text-body leading-relaxed">
                  {t('philosophy')}
                </p>
              </div>
            </AnimatedReveal>

            <AnimatedReveal delay={0.4}>
              <StatGrid columns={2} bordered>
                {STAT_KEYS.map((key, i) => (
                  <Stat
                    key={key}
                    value={t(`stats.${key}.value`)}
                    label={t(`stats.${key}.label`)}
                    index={String(i + 1).padStart(2, '0')}
                  />
                ))}
              </StatGrid>
            </AnimatedReveal>
          </div>
        </div>
      </SectionContainer>
    </Section>
  );
}

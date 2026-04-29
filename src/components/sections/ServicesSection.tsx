'use client';

import { useTranslations } from 'next-intl';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedReveal from '@/components/ui/AnimatedReveal';

const serviceKeys = [
  'softwareArchitecture',
  'webDevelopment',
  'aiAutomation',
  'cloudInfrastructure',
  'technicalStrategy',
  'teamAugmentation',
] as const;

const serviceIcons = [
  // Software Architecture
  <svg key="arch" width="32" height="32" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <rect x="8" y="8" width="10" height="10" />
    <rect x="22" y="8" width="10" height="10" />
    <rect x="15" y="22" width="10" height="10" />
    <line x1="13" y1="18" x2="13" y2="22" />
    <line x1="27" y1="18" x2="27" y2="22" />
    <line x1="13" y1="22" x2="20" y2="22" />
    <line x1="27" y1="22" x2="20" y2="22" />
  </svg>,
  // Web Development
  <svg key="web" width="32" height="32" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <rect x="6" y="10" width="28" height="20" />
    <line x1="6" y1="16" x2="34" y2="16" />
    <circle cx="10" cy="13" r="0.8" fill="currentColor" />
    <circle cx="13" cy="13" r="0.8" fill="currentColor" />
    <polyline points="15,24 19,20 15,20" fill="none" />
    <line x1="22" y1="26" x2="28" y2="26" />
  </svg>,
  // AI & Automation
  <svg key="ai" width="32" height="32" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <rect x="8" y="8" width="24" height="24" />
    <circle cx="20" cy="20" r="4" />
    <line x1="20" y1="8" x2="20" y2="4" />
    <line x1="20" y1="36" x2="20" y2="32" />
    <line x1="8" y1="20" x2="4" y2="20" />
    <line x1="36" y1="20" x2="32" y2="20" />
  </svg>,
  // Cloud Infrastructure
  <svg key="cloud" width="32" height="32" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M12 28C8.68629 28 6 25.3137 6 22C6 19.2386 7.88056 16.9263 10.4009 16.2188C10.1392 15.5305 10 14.7822 10 14C10 10.6863 12.6863 8 16 8C18.3643 8 20.4105 9.35634 21.3944 11.3396C22.1327 10.9095 22.9896 10.6667 23.9 10.6667C26.8823 10.6667 29.3 13.0844 29.3 16.0667C29.3 16.3718 29.2762 16.6714 29.2302 16.9637C31.9 17.5 34 19.8 34 22.5C34 25.5376 31.5376 28 28.5 28H12Z" />
  </svg>,
  // Technical Strategy
  <svg key="strategy" width="32" height="32" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <polyline points="6,30 14,22 20,26 28,14 34,10" fill="none" />
    <circle cx="34" cy="10" r="2.5" />
    <line x1="6" y1="34" x2="34" y2="34" />
  </svg>,
  // Team Augmentation
  <svg key="team" width="32" height="32" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <circle cx="15" cy="14" r="4" />
    <path d="M8 28C8 23.5817 11.1340 20 15 20C18.866 20 22 23.5817 22 28" />
    <circle cx="27" cy="14" r="3" />
    <path d="M22 28C22 24.134 24.2386 21 27 21C29.7614 21 32 24.134 32 28" />
  </svg>,
];

function ServiceCard({
  index,
  serviceKey,
  t,
}: {
  index: number;
  serviceKey: (typeof serviceKeys)[number];
  t: ReturnType<typeof useTranslations<'services'>>;
}) {
  const num = String(index + 1).padStart(2, '0');

  return (
    <article className="group relative h-full p-8 border border-border bg-surface transition-colors duration-300 hover:bg-surface-bright">
      <div className="flex items-start justify-between mb-8">
        <div className="text-heading">{serviceIcons[index]}</div>
        <span className="font-mono text-xs uppercase tracking-wider text-faint">
          {num} / {t(`${serviceKey}.name`).split(' ')[0]}
        </span>
      </div>

      <h3 className="text-2xl font-semibold tracking-tight text-heading mb-3">
        {t(`${serviceKey}.name`)}
      </h3>

      <p className="text-base text-muted leading-relaxed">
        {t(`${serviceKey}.description`)}
      </p>
    </article>
  );
}

export default function ServicesSection() {
  const t = useTranslations('services');

  return (
    <section
      id="services"
      aria-label={t('ariaLabel')}
      className="relative py-24 md:py-32 section-tint"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading title={t('sectionTitle')} sectionNumber={t('sectionNumber')} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {serviceKeys.map((key, index) => (
            <AnimatedReveal key={key} delay={0.05 * index} className="h-full">
              <ServiceCard index={index} serviceKey={key} t={t} />
            </AnimatedReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

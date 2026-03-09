'use client';

import { useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedReveal from '@/components/ui/AnimatedReveal';
import { cn } from '@/lib/utils';

type GlitchState = 'idle' | 'enter' | 'exit';

function useCardGlitch() {
  const [state, setState] = useState<GlitchState>('idle');

  const onMouseEnter = useCallback(() => setState('enter'), []);
  const onMouseLeave = useCallback(() => setState('exit'), []);
  const onAnimationEnd = useCallback(
    (e: React.AnimationEvent<HTMLDivElement>) => {
      // Only respond to our own card glitch animations, not bubbled child events
      if (e.target !== e.currentTarget) return;
      if (e.animationName !== 'card-glitch' && e.animationName !== 'card-glitch-exit') return;
      setState('idle');
    },
    [],
  );

  return { glitchState: state, onMouseEnter, onMouseLeave, onAnimationEnd };
}

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
  <svg
    key="arch"
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect x="8" y="8" width="10" height="10" stroke="currentColor" strokeWidth="1.5" />
    <rect x="22" y="8" width="10" height="10" stroke="currentColor" strokeWidth="1.5" />
    <rect x="15" y="22" width="10" height="10" stroke="currentColor" strokeWidth="1.5" />
    <line x1="13" y1="18" x2="13" y2="22" stroke="currentColor" strokeWidth="1.5" />
    <line x1="27" y1="18" x2="27" y2="22" stroke="currentColor" strokeWidth="1.5" />
    <line x1="13" y1="22" x2="20" y2="22" stroke="currentColor" strokeWidth="1.5" />
    <line x1="27" y1="22" x2="20" y2="22" stroke="currentColor" strokeWidth="1.5" />
  </svg>,
  // Web Development
  <svg
    key="web"
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect x="6" y="10" width="28" height="20" stroke="currentColor" strokeWidth="1.5" />
    <line x1="6" y1="16" x2="34" y2="16" stroke="currentColor" strokeWidth="1.5" />
    <rect x="9" y="12" width="2" height="2" fill="currentColor" />
    <rect x="13" y="12" width="2" height="2" fill="currentColor" />
    <polyline
      points="15,24 19,20 15,20"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="square"
      strokeLinejoin="miter"
    />
    <line
      x1="22"
      y1="26"
      x2="28"
      y2="26"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
    />
  </svg>,
  // AI & Automation
  <svg
    key="ai"
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect x="8" y="8" width="24" height="24" stroke="currentColor" strokeWidth="1.5" />
    <rect x="16" y="16" width="8" height="8" stroke="currentColor" strokeWidth="1.5" />
    <line x1="20" y1="8" x2="20" y2="4" stroke="currentColor" strokeWidth="1.5" />
    <line x1="20" y1="36" x2="20" y2="32" stroke="currentColor" strokeWidth="1.5" />
    <line x1="8" y1="20" x2="4" y2="20" stroke="currentColor" strokeWidth="1.5" />
    <line x1="36" y1="20" x2="32" y2="20" stroke="currentColor" strokeWidth="1.5" />
  </svg>,
  // Cloud Infrastructure
  <svg
    key="cloud"
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M12 28C8.68629 28 6 25.3137 6 22C6 19.2386 7.88056 16.9263 10.4009 16.2188C10.1392 15.5305 10 14.7822 10 14C10 10.6863 12.6863 8 16 8C18.3643 8 20.4105 9.35634 21.3944 11.3396C22.1327 10.9095 22.9896 10.6667 23.9 10.6667C26.8823 10.6667 29.3 13.0844 29.3 16.0667C29.3 16.3718 29.2762 16.6714 29.2302 16.9637C31.9 17.5 34 19.8 34 22.5C34 25.5376 31.5376 28 28.5 28H12Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <line
      x1="16"
      y1="32"
      x2="24"
      y2="32"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
    />
    <line
      x1="18"
      y1="35"
      x2="22"
      y2="35"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
    />
  </svg>,
  // Technical Strategy
  <svg
    key="strategy"
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <polyline
      points="6,30 14,22 20,26 28,14 34,10"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="square"
      strokeLinejoin="miter"
    />
    <rect x="31" y="7" width="6" height="6" stroke="currentColor" strokeWidth="1.5" />
    <line
      x1="6"
      y1="34"
      x2="34"
      y2="34"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
    />
  </svg>,
  // Team Augmentation
  <svg
    key="team"
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect x="11" y="10" width="8" height="8" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M8 28C8 23.5817 11.1340 20 15 20C18.866 20 22 23.5817 22 28"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
    />
    <rect x="24" y="11" width="6" height="6" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M22 28C22 24.134 24.2386 21 27 21C29.7614 21 32 24.134 32 28"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
    />
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
  const { glitchState, onMouseEnter, onMouseLeave, onAnimationEnd } = useCardGlitch();

  return (
    <div
      className="group h-full"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        data-glitch={glitchState}
        onAnimationEnd={onAnimationEnd}
        className={cn(
          'relative p-6 md:p-8 border border-cyber-border',
          'bg-cyber-surface',
          'cyber-corners cyber-border-glow',
          'cyber-scan-hover',
          'transition-[border-color,box-shadow] duration-500 ease-out',
          'group-hover:border-cyber-muted/30',
          'h-full',
        )}
      >
        {/* Scan line sweep on hover */}
        <div className="scan-line" aria-hidden="true" />

        {/* Data stream background on hover */}
        <div
          className="absolute inset-0 cyber-data-stream-hover pointer-events-none"
          aria-hidden="true"
        />

        {/* Card index number */}
        <span
          className="relative z-10 absolute top-4 right-4 font-mono text-[11px] text-cyber-faint/40 cyber-text-flicker-hover"
          aria-hidden="true"
        >
          [{String(index + 1).padStart(2, '0')}]
        </span>

        {/* Icon */}
        <div className="relative z-10 text-cyber-cyan mb-6 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.4)] cyber-glitch-icon">
          {serviceIcons[index]}
        </div>

        {/* Service name */}
        <h3 className="relative z-10 font-display text-lg font-semibold tracking-wide text-cyber-heading mb-3">
          {t(`${serviceKey}.name`)}
        </h3>

        {/* Description */}
        <p className="relative z-10 text-sm leading-relaxed text-cyber-muted">
          {t(`${serviceKey}.description`)}
        </p>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const t = useTranslations('services');

  return (
    <section id="services" aria-label={t('ariaLabel')} className="relative py-32">
      {/* Gradient top divider */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl px-6 lg:px-8"
        aria-hidden="true"
      >
        <div className="h-px bg-gradient-to-r from-transparent via-brand to-cyber-cyan/50 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading title={t('sectionTitle')} sectionNumber={t('sectionNumber')} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceKeys.map((key, index) => (
            <AnimatedReveal key={key} delay={0.1 * index}>
              <ServiceCard index={index} serviceKey={key} t={t} />
            </AnimatedReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

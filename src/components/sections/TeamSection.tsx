'use client';

import Image, { type StaticImageData } from 'next/image';
import { useTranslations } from 'next-intl';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedReveal from '@/components/ui/AnimatedReveal';
import { Section, SectionContainer } from '@/components/ui/Section';
import { useCardFlip } from '@/hooks/useCardFlip';
import rowinPhoto from '../../../public/team/rowin.jpg';
import mariPhoto from '../../../public/team/mari.jpeg';

interface TeamMemberStatic {
  name: string;
  initials: string;
  photo: StaticImageData;
  /** Translation key prefix: 'rowin' | 'mari' */
  tKey: 'rowin' | 'mari';
}

const teamStatic: TeamMemberStatic[] = [
  { name: 'Rowin Hernandez', initials: 'RH', photo: rowinPhoto, tKey: 'rowin' },
  { name: 'Mari Hernandez', initials: 'MH', photo: mariPhoto, tKey: 'mari' },
];

function TeamMemberCard({
  member,
  t,
}: {
  member: TeamMemberStatic;
  t: ReturnType<typeof useTranslations<'team'>>;
}) {
  const {
    cardRef,
    isFlipped,
    handleMouseMove,
    handleMouseLeave,
    handleTouchStart,
    handleClick,
    handleKeyDown,
  } = useCardFlip();

  const role = t(`${member.tKey}.role`);
  const description = t(`${member.tKey}.description`);
  const specialty = t(`${member.tKey}.specSpecialty`);
  const focus = t(`${member.tKey}.specFocus`);
  const mode = t(`${member.tKey}.specMode`);

  return (
    <div
      className="h-full relative group"
      style={{ perspective: '1400px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
    >
      <div
        ref={cardRef}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={
          isFlipped
            ? `${member.name} bio — click to show portrait`
            : `${member.name} — click to show bio`
        }
        className="relative w-full cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        {/* Front: editorial portrait */}
        <div
          className="relative w-full bg-surface overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={member.photo}
              alt={member.name}
              fill
              placeholder="blur"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover team-photo"
            />
          </div>

          <div className="p-8 space-y-2">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-heading">
              {member.name}
            </h3>
            <p className="text-xs font-medium uppercase tracking-wider text-faint">
              {role}
            </p>
          </div>
        </div>

        {/* Back: quiet editorial bio panel */}
        <div
          className="absolute inset-0 w-full bg-surface overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="h-full flex flex-col p-8 sm:p-10" aria-hidden="true">
            <div className="mb-6">
              <p className="text-xs font-medium uppercase tracking-wider text-faint mb-3">
                {role}
              </p>
              {/* Back-face name uses <p>, not <h3>, so the same heading isn't
                  emitted twice in the DOM (front already exposes it). */}
              <p className="font-display text-2xl font-semibold tracking-tight text-heading">
                {member.name}
              </p>
            </div>

            <p className="text-sm leading-relaxed text-body mb-8 flex-1">
              {description}
            </p>

            <dl className="space-y-3 pt-6 border-t border-border">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-xs font-medium uppercase tracking-wider text-faint shrink-0">
                  Specialty
                </dt>
                <dd className="text-sm text-body text-right">{specialty}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-xs font-medium uppercase tracking-wider text-faint shrink-0">
                  Focus
                </dt>
                <dd className="text-sm text-body text-right">{focus}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-xs font-medium uppercase tracking-wider text-faint shrink-0">
                  Mode
                </dt>
                <dd className="text-sm text-body text-right">{mode}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TeamSection() {
  const t = useTranslations('team');
  return (
    <Section id="team" tone="dark" aria-label={t('ariaLabel')}>
      <SectionContainer>
        <SectionHeading title={t('sectionTitle')} sectionNumber={t('sectionNumber')} />

        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {teamStatic.map((member, index) => (
            <AnimatedReveal key={member.name} delay={0.1 * index}>
              <TeamMemberCard member={member} t={t} />
            </AnimatedReveal>
          ))}
        </div>
      </SectionContainer>
    </Section>
  );
}

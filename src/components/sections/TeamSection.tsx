'use client';

import Image, { type StaticImageData } from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedReveal from '@/components/ui/AnimatedReveal';
import { cn } from '@/lib/utils';
import rowinPhoto from '../../../public/team/rowin.jpg';
import mariPhoto from '../../../public/team/mari.jpeg';

interface TeamMemberStatic {
  name: string;
  handle: string;
  initials: string;
  photo: StaticImageData;
  id: string;
  roleCode: string;
  /** Translation key prefix: 'rowin' | 'mari' */
  tKey: 'rowin' | 'mari';
  specLabels: string[];
  skills: { name: string; level: number }[];
}

const teamStatic: TeamMemberStatic[] = [
  {
    name: 'Rowin Hernandez',
    handle: '@r0win',
    initials: 'RH',
    photo: rowinPhoto,
    id: 'RH-001',
    roleCode: 'LEAD_ENGINEER',
    tKey: 'rowin',
    specLabels: ['SPECIALTY', 'FOCUS', 'MODE'],
    skills: [
      { name: 'SYSTEMS_ARCH', level: 95 },
      { name: 'FRONTEND', level: 90 },
      { name: 'BACKEND', level: 95 },
      { name: 'DEVOPS', level: 85 },
    ],
  },
  {
    name: 'Mari Hernandez',
    handle: '@mari_ops',
    initials: 'MH',
    photo: mariPhoto,
    id: 'MH-002',
    roleCode: 'OPS_LEAD',
    tKey: 'mari',
    specLabels: ['SPECIALTY', 'FOCUS', 'MODE'],
    skills: [
      { name: 'OPS_MGMT', level: 95 },
      { name: 'STRATEGY', level: 90 },
      { name: 'CLIENT_REL', level: 95 },
      { name: 'LOGISTICS', level: 90 },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════
   useCardTilt — mouse-tracking 3D tilt + click-to-flip
   Uses refs for direct DOM manipulation (no re-renders on mousemove)
   ═══════════════════════════════════════════════════════════════ */

function useCardTilt(maxTilt = 12) {
  const cardRef = useRef<HTMLDivElement>(null);
  const flippedRef = useRef(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const rafRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const isTouchRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleTouchStart = useCallback(() => {
    isTouchRef.current = true;
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouchRef.current || isAnimatingRef.current || reducedMotionRef.current) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const { clientX, clientY } = e;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const card = cardRef.current;
        if (!card) return;
        const x = (clientX - rect.left) / rect.width;
        const y = (clientY - rect.top) / rect.height;
        const tiltX = (0.5 - y) * maxTilt;
        const flip = flippedRef.current;
        const tiltY = (x - 0.5) * maxTilt * (flip ? -1 : 1);
        const baseY = flip ? 180 : 0;
        card.style.transition = 'none';
        card.style.transform = `rotateX(${tiltX}deg) rotateY(${baseY + tiltY}deg)`;

        // Shine overlays
        const frontShine = card.querySelector<HTMLElement>('[data-shine="front"]');
        const backShine = card.querySelector<HTMLElement>('[data-shine="back"]');
        if (frontShine) {
          frontShine.style.opacity = '1';
          frontShine.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.12) 0%, transparent 60%)`;
        }
        if (backShine) {
          backShine.style.opacity = '1';
          const bx = (1 - x) * 100;
          backShine.style.background = `radial-gradient(circle at ${bx}% ${y * 100}%, rgba(0,255,255,0.1) 0%, rgba(128,0,255,0.06) 30%, transparent 60%)`;
        }
      });
    },
    [maxTilt],
  );

  const handleMouseLeave = useCallback(() => {
    if (isAnimatingRef.current) return;
    cancelAnimationFrame(rafRef.current);
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = 'transform 0.4s ease-out';
    card.style.transform = flippedRef.current
      ? 'rotateX(0deg) rotateY(180deg)'
      : 'rotateX(0deg) rotateY(0deg)';

    const shines = card.querySelectorAll<HTMLElement>('[data-shine]');
    shines.forEach((s) => {
      s.style.opacity = '0';
    });
  }, []);

  const handleClick = useCallback(() => {
    const next = !flippedRef.current;
    flippedRef.current = next;
    setIsFlipped(next);
    isAnimatingRef.current = true;
    const card = cardRef.current;
    if (!card) return;

    // Hide shines during flip
    const shines = card.querySelectorAll<HTMLElement>('[data-shine]');
    shines.forEach((s) => {
      s.style.opacity = '0';
    });

    if (reducedMotionRef.current) {
      card.style.transition = 'none';
    } else {
      card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    }
    card.style.transform = next
      ? 'rotateX(0deg) rotateY(180deg)'
      : 'rotateX(0deg) rotateY(0deg)';

    setTimeout(() => {
      isAnimatingRef.current = false;
    }, reducedMotionRef.current ? 0 : 600);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      }
    },
    [handleClick],
  );

  return {
    cardRef,
    isFlipped,
    handleMouseMove,
    handleMouseLeave,
    handleTouchStart,
    handleClick,
    handleKeyDown,
  };
}

/* ═══════════════════════════════════════════════════════════════
   TeamMemberCard — 3D tilt + flip with trading card back
   ═══════════════════════════════════════════════════════════════ */

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
  } = useCardTilt();

  const role = t(`${member.tKey}.role`);
  const description = t(`${member.tKey}.description`);
  const specValues = [
    t(`${member.tKey}.specSpecialty`),
    t(`${member.tKey}.specFocus`),
    t(`${member.tKey}.specMode`),
  ];

  return (
    <div
      className="h-full"
      style={{ perspective: '1200px' }}
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
            ? `${member.name} stats card — click to show profile`
            : `${member.name} — click to show stats`
        }
        className="relative w-full cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-cyber-bg"
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {/* ═══ FRONT FACE ═══ */}
        <div
          className={cn(
            'relative w-full border border-cyber-border',
            'bg-cyber-surface',
            'cyber-corners cyber-border-glow',
            'overflow-hidden',
          )}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Holographic shine overlay */}
          <div
            data-shine="front"
            className="absolute inset-0 pointer-events-none z-20 opacity-0 transition-opacity duration-300"
          />

          {/* Photo with HUD overlay */}
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={member.photo}
              alt={member.name}
              fill
              placeholder="blur"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover team-photo"
            />
            {/* Gradient fade to card bg */}
            <div
              className="absolute inset-0 team-photo-fade bg-gradient-to-t from-cyber-surface via-transparent to-transparent"
              aria-hidden="true"
            />
            {/* Scanline overlay */}
            <div className="absolute inset-0 scanlines opacity-30" aria-hidden="true" />
            {/* HUD metadata */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5" aria-hidden="true">
              <span className="font-mono text-[10px] text-cyber-cyan/70 tracking-wider">
                ID: {member.id}
              </span>
              <span className="font-mono text-[10px] text-cyber-cyan/70 tracking-wider">
                ROLE: {member.roleCode}
              </span>
              <span className="font-mono text-[10px] text-cyber-cyan/70 tracking-wider">
                HANDLE: {member.handle}
              </span>
            </div>
            {/* Status indicator */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5" aria-hidden="true">
              <div className="w-1.5 h-1.5 bg-green-400" />
              <span className="font-mono text-[10px] text-green-400/80 tracking-wider">
                {t('statusOnline')}
              </span>
            </div>
            {/* Corner brackets */}
            <div
              className="absolute top-2 right-2 w-4 h-4 border-t border-r border-cyber-cyan/40"
              aria-hidden="true"
            />
            <div
              className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-cyber-cyan/40"
              aria-hidden="true"
            />
          </div>

          {/* Info section */}
          <div className="p-6 md:p-8 space-y-4">
            <div>
              <h3 className="font-display text-xl font-semibold tracking-wide text-cyber-heading">
                {member.name}
              </h3>
              <p className="font-mono text-xs text-cyber-cyan tracking-wide mt-1.5">
                [{role.toUpperCase()}]
              </p>
            </div>
            <p className="text-sm leading-relaxed text-cyber-muted">{description}</p>

            {/* Flip hint */}
            <div className="flex items-center gap-2 pt-2" aria-hidden="true">
              <span className="font-mono text-[10px] text-cyber-faint/40 tracking-wider cyber-text-flicker">
                // ACCESS_STATS ▸
              </span>
              <div className="flex-1 h-px bg-cyber-border" />
            </div>
          </div>
        </div>

        {/* ═══ BACK FACE — TRADING CARD ═══ */}
        <div
          className={cn(
            'absolute inset-0 w-full border',
            'bg-cyber-surface',
            'cyber-grid-bg',
            'overflow-hidden',
            'card-back-shimmer',
          )}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Holographic shine overlay */}
          <div
            data-shine="back"
            className="absolute inset-0 pointer-events-none z-20 opacity-0 transition-opacity duration-300"
          />

          {/* Scanlines */}
          <div className="absolute inset-0 scanlines opacity-15" aria-hidden="true" />

          {/* Card frame corners */}
          <div
            className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-brand/50"
            aria-hidden="true"
          />
          <div
            className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-brand/50"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-brand/50"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-brand/50"
            aria-hidden="true"
          />

          {/* Card content */}
          <div className="relative z-10 h-full flex flex-col p-6 md:p-8">
            {/* Header bar */}
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] text-cyber-cyan tracking-widest">
                KALEBTEC // OPERATIVE_CARD
              </span>
              <div className="flex gap-0.5" aria-label="5 star rating" role="img">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-[10px] text-brand-light">
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div
              className="h-px bg-gradient-to-r from-brand via-cyber-cyan to-brand mb-5"
              aria-hidden="true"
            />

            {/* Photo + Name plate */}
            <div className="flex items-center gap-4 mb-5">
              <div className="relative w-20 h-20 shrink-0 border border-cyber-cyan/30 overflow-hidden">
                <Image
                  src={member.photo}
                  alt=""
                  fill
                  placeholder="blur"
                  sizes="80px"
                  className="object-cover team-photo"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold tracking-wide text-cyber-heading">
                  {member.name}
                </h3>
                <p className="font-mono text-[11px] text-cyber-cyan tracking-wide mt-1">
                  [{role.toUpperCase()}]
                </p>
                <p className="font-mono text-[10px] text-cyber-faint tracking-wider mt-1">
                  {member.handle}
                </p>
              </div>
            </div>

            {/* Skill Matrix */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="font-mono text-[9px] text-cyber-faint/50 tracking-widest uppercase"
                  aria-hidden="true"
                >
                  // skill_matrix
                </span>
                <div className="flex-1 h-px bg-cyber-border" aria-hidden="true" />
              </div>
              <div className="space-y-2">
                {member.skills.map((skill, i) => (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-cyber-faint tracking-wider">
                        {skill.name}
                      </span>
                      <span className="font-mono text-[10px] text-cyber-cyan tracking-wider">
                        {skill.level}%
                      </span>
                    </div>
                    <div
                      className="h-1.5 w-full bg-cyber-border overflow-hidden"
                      role="progressbar"
                      aria-valuenow={skill.level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={skill.name}
                    >
                      <div
                        className="h-full bg-gradient-to-r from-brand to-cyber-cyan"
                        style={{
                          width: isFlipped ? `${skill.level}%` : '0%',
                          transition: isFlipped
                            ? `width 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.6 + i * 0.1}s`
                            : 'width 0s',
                          boxShadow: '0 0 6px rgba(128,0,255,0.3)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Spec Sheet */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="font-mono text-[9px] text-cyber-faint/50 tracking-widest uppercase"
                  aria-hidden="true"
                >
                  // spec_sheet
                </span>
                <div className="flex-1 h-px bg-cyber-border" aria-hidden="true" />
              </div>
              <div className="space-y-1.5">
                {member.specLabels.map((label, specIndex) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-cyber-faint tracking-wider">
                      {label}
                    </span>
                    <span className="font-mono text-[10px] text-cyber-body tracking-wider">
                      {specValues[specIndex]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Bottom bar */}
            <div className="pt-3 border-t border-cyber-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-cyber-faint/50 tracking-wider">
                    ID: {member.id}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-400" />
                    <span className="font-mono text-[10px] text-green-400/80 tracking-wider">
                      {t('statusOnline')}
                    </span>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-cyber-faint/40 tracking-wider cyber-text-flicker">
                  // RETURN ▸
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TeamSection
   ═══════════════════════════════════════════════════════════════ */

export default function TeamSection() {
  const t = useTranslations('team');
  return (
    <section id="team" aria-label={t('ariaLabel')} className="relative py-32">
      {/* Gradient top divider */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl px-6 lg:px-8"
        aria-hidden="true"
      >
        <div className="h-px bg-gradient-to-r from-transparent via-brand to-cyber-cyan/50 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading title={t('sectionTitle')} sectionNumber="04" />

        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamStatic.map((member, index) => (
            <AnimatedReveal key={member.name} delay={0.15 * index}>
              <TeamMemberCard member={member} t={t} />
            </AnimatedReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

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
  const flashRef = useRef<HTMLDivElement>(null);
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
          backShine.style.background = `radial-gradient(circle at ${bx}% ${y * 100}%, rgba(255,248,220,0.2) 0%, rgba(201,168,76,0.08) 30%, transparent 60%)`;
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
    card.querySelectorAll<HTMLElement>('[data-shine]').forEach((s) => {
      s.style.opacity = '0';
    });

    if (reducedMotionRef.current) {
      card.style.transition = 'none';
      card.style.transform = next
        ? 'rotateX(0deg) rotateY(180deg)'
        : 'rotateX(0deg) rotateY(0deg)';
      isAnimatingRef.current = false;
      return;
    }

    // Animated flip with scale bump via CSS keyframes
    card.style.transition = 'none';
    card.classList.remove('card-flip-to-back', 'card-flip-to-front');
    void card.offsetHeight;
    card.classList.add(next ? 'card-flip-to-back' : 'card-flip-to-front');

    // Flash
    const flash = flashRef.current;
    if (flash) {
      flash.classList.remove('flip-flash');
      void flash.offsetHeight;
      flash.classList.add('flip-flash');
    }

    const cleanup = (e: Event) => {
      const ae = e as AnimationEvent;
      if (ae.animationName !== 'card-flip-to-back' && ae.animationName !== 'card-flip-to-front')
        return;
      card.style.transform = next
        ? 'rotateX(0deg) rotateY(180deg)'
        : 'rotateX(0deg) rotateY(0deg)';
      card.classList.remove('card-flip-to-back', 'card-flip-to-front');
      isAnimatingRef.current = false;
      card.removeEventListener('animationend', cleanup);
    };
    card.addEventListener('animationend', cleanup);
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
    flashRef,
    isFlipped,
    handleMouseMove,
    handleMouseLeave,
    handleTouchStart,
    handleClick,
    handleKeyDown,
  };
}

/* ═══════════════════════════════════════════════════════════════
   PixelStatBar — chunky 8-bit style stat bar
   ═══════════════════════════════════════════════════════════════ */

function PixelStatBar({
  name,
  level,
  isFlipped,
  delay,
}: {
  name: string;
  level: number;
  isFlipped: boolean;
  delay: number;
}) {
  const segments = 10;
  const filled = Math.round((level / 100) * segments);

  return (
    <div className="flex items-center gap-2">
      <span
        className="font-mono text-[10px] w-24 shrink-0 tracking-wider"
        style={{ color: '#5a4a32' }}
      >
        {name}
      </span>
      <div className="flex gap-[2px] flex-1">
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className="h-2.5 flex-1"
            style={{
              background: i < filled ? '#4a8c3f' : '#3a3224',
              boxShadow: i < filled ? 'inset 0 -1px 0 #3a7030' : 'inset 0 1px 0 #4a4234',
              opacity: isFlipped ? 1 : 0,
              transition: `opacity 0.15s ${delay + i * 0.04}s`,
            }}
          />
        ))}
      </div>
      <span
        className="font-mono text-[10px] w-6 text-right tabular-nums font-bold"
        style={{ color: '#2d1f10' }}
      >
        {level}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TeamMemberCard — 3D tilt + flip with retro 80s back
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
    flashRef,
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
  const totalHP = member.skills.reduce((sum, s) => sum + s.level, 0);

  return (
    <div
      className="h-full relative"
      style={{ perspective: '1200px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
    >
      {/* Flip flash overlay */}
      <div
        ref={flashRef}
        className="absolute inset-0 z-30 pointer-events-none opacity-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(255,248,220,0.9), rgba(201,168,76,0.3) 50%, transparent 70%)',
        }}
        aria-hidden="true"
      />

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

        {/* ═══ BACK FACE — RETRO 80s TRADING CARD ═══ */}
        <div
          className="absolute inset-0 w-full overflow-hidden p-1.5 sm:p-2"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: '#e8dcc0',
            border: '4px solid #c9a84c',
            imageRendering: 'pixelated',
          }}
        >
          {/* Warm golden shine overlay */}
          <div
            data-shine="back"
            className="absolute inset-0 pointer-events-none z-20 opacity-0 transition-opacity duration-300"
          />

          {/* Retro diagonal line texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 3px,
                rgba(160,130,70,0.1) 3px,
                rgba(160,130,70,0.1) 4px
              )`,
            }}
            aria-hidden="true"
          />

          {/* CRT scanline overlay (retro feel) */}
          <div
            className="absolute inset-0 pointer-events-none z-10 opacity-10"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 3px)',
            }}
            aria-hidden="true"
          />

          {/* Inner frame — pixel-style double border */}
          <div
            className="relative z-10 h-full flex flex-col overflow-hidden"
            style={{
              border: '3px solid #b89840',
              boxShadow: 'inset 0 0 0 2px #d4c090, inset 0 0 0 4px #b8984060',
            }}
          >
            {/* ── Name plate ── */}
            <div
              className="flex items-center justify-between px-3 sm:px-4 py-2"
              style={{
                background: 'linear-gradient(180deg, #d4b86a 0%, #c0a050 100%)',
                borderBottom: '3px solid #b89840',
              }}
            >
              <span
                className="font-display text-sm font-bold tracking-wider uppercase"
                style={{ color: '#2d1f10', textShadow: '0 1px 0 rgba(255,255,255,0.3)' }}
              >
                {member.name}
              </span>
              <span
                className="font-mono text-xs font-black tracking-tight"
                style={{ color: '#b83030' }}
              >
                HP {totalHP}
              </span>
            </div>

            {/* ── Photo frame ── */}
            <div
              className="mx-3 sm:mx-4 mt-3 relative aspect-[5/3] overflow-hidden"
              style={{
                border: '3px solid #b89840',
                boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.25), 0 1px 0 #d4c090',
              }}
            >
              <Image
                src={member.photo}
                alt=""
                fill
                placeholder="blur"
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                style={{
                  filter: 'saturate(0.7) contrast(1.15) brightness(1.05)',
                  imageRendering: 'auto',
                }}
                aria-hidden="true"
              />
              {/* CRT-style vignette on photo */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.25) 100%)',
                }}
                aria-hidden="true"
              />
            </div>

            {/* ── Type badge + role ── */}
            <div className="flex items-center gap-2 mx-3 sm:mx-4 mt-2.5">
              <span
                className="font-mono text-[9px] px-2 py-0.5 tracking-widest font-bold uppercase"
                style={{
                  background: '#b83030',
                  color: '#fff',
                  border: '2px solid #8a2020',
                  boxShadow: 'inset 0 -1px 0 #8a2020',
                }}
              >
                {member.roleCode}
              </span>
              <span
                className="font-mono text-[9px] tracking-wider"
                style={{ color: '#6b5a3e' }}
              >
                {member.handle}
              </span>
            </div>

            {/* ── Flavor text ── */}
            <p
              className="mx-3 sm:mx-4 mt-2.5 text-[11px] leading-relaxed italic"
              style={{ color: '#5a4a32' }}
            >
              {description}
            </p>

            {/* ── Stat bars (8-bit chunky segments) ── */}
            <div
              className="mx-3 sm:mx-4 mt-3 p-2.5 space-y-1.5"
              style={{
                background: '#f5eed6',
                border: '2px solid #c9a84c80',
              }}
            >
              <span
                className="font-mono text-[8px] tracking-[0.2em] font-bold block mb-2"
                style={{ color: '#9a8a60' }}
              >
                SKILL MATRIX
              </span>
              {member.skills.map((skill, i) => (
                <PixelStatBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  isFlipped={isFlipped}
                  delay={0.7 + i * 0.12}
                />
              ))}
            </div>

            {/* ── Spec entries ── */}
            <div className="mx-3 sm:mx-4 mt-2.5 space-y-1">
              {member.specLabels.map((label, i) => (
                <div key={label} className="flex items-center justify-between">
                  <span
                    className="font-mono text-[9px] tracking-wider"
                    style={{ color: '#9a8a60' }}
                  >
                    {label}
                  </span>
                  <span
                    className="font-mono text-[9px] tracking-wider font-bold"
                    style={{ color: '#5a4a32' }}
                  >
                    {specValues[i]}
                  </span>
                </div>
              ))}
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* ── Footer ── */}
            <div
              className="flex items-center justify-between px-3 sm:px-4 py-2 mt-auto"
              style={{ borderTop: '2px solid #c9a84c80' }}
            >
              <span
                className="font-mono text-[9px] tracking-wider"
                style={{ color: '#9a8a60' }}
              >
                № {member.id}
              </span>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-[10px]" style={{ color: '#c9a84c' }}>
                    ★
                  </span>
                ))}
              </div>
              <span
                className="font-mono text-[9px] tracking-wider"
                style={{ color: '#9a8a60' }}
              >
                KALEBTEC™
              </span>
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

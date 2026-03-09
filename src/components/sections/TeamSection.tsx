'use client';

import Image, { type StaticImageData } from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import SectionHeading from '@/components/ui/SectionHeading';
import AnimatedReveal from '@/components/ui/AnimatedReveal';
import { cn } from '@/lib/utils';
import rowinPhoto from '../../../public/team/rowin.jpg';
import mariPhoto from '../../../public/team/mari.jpeg';

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

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

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] text-cyber-faint tracking-wider">{name}</span>
        <span className="font-mono text-[10px] text-cyber-cyan tracking-wider">{level}%</span>
      </div>
      <div
        className="h-1 w-full bg-cyber-border overflow-hidden"
        role="progressbar"
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={name}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-brand to-cyber-cyan"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: EASE }}
          style={{ boxShadow: '0 0 6px rgba(128,0,255,0.3)' }}
        />
      </div>
    </div>
  );
}

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
          {teamStatic.map((member, index) => {
            const role = t(`${member.tKey}.role`);
            const description = t(`${member.tKey}.description`);
            const specValues = [
              t(`${member.tKey}.specSpecialty`),
              t(`${member.tKey}.specFocus`),
              t(`${member.tKey}.specMode`),
            ];

            return (
              <AnimatedReveal key={member.name} delay={0.15 * index}>
                <div
                  className={cn(
                    'group border border-cyber-border',
                    'bg-cyber-surface',
                    'cyber-corners cyber-border-glow',
                    'cyber-brightness-pulse',
                    'transition-all duration-500',
                    'hover:border-cyber-muted/30',
                    'h-full overflow-hidden',
                  )}
                >
                  {/* Photo with HUD overlay */}
                  <div className="relative aspect-[4/5] overflow-hidden cyber-glitch-image cyber-scan-hover">
                    <div className="scan-line" aria-hidden="true" />
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      placeholder="blur"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover team-photo transition-[transform,filter] duration-[1200ms] group-hover:scale-[1.03]"
                      style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                    />
                    {/* Gradient fade to card bg */}
                    <div
                      className="absolute inset-0 team-photo-fade bg-gradient-to-t from-cyber-surface via-transparent to-transparent"
                      aria-hidden="true"
                    />
                    {/* Scanline overlay on photo */}
                    <div className="absolute inset-0 scanlines opacity-30" aria-hidden="true" />
                    {/* HUD metadata overlay */}
                    <div
                      className="absolute top-3 left-3 flex flex-col gap-1.5"
                      aria-hidden="true"
                    >
                      <span className="font-mono text-[10px] text-cyber-cyan/70 tracking-wider">
                        ID: {member.id}
                      </span>
                      <span className="font-mono text-[10px] text-cyber-cyan/70 tracking-wider">
                        ROLE: {member.roleCode}
                      </span>
                      <span className="font-mono text-[10px] text-cyber-cyan/70 tracking-wider transition-all duration-300 group-hover:neon-glow-cyan">
                        HANDLE: {member.handle}
                      </span>
                    </div>
                    {/* Status indicator */}
                    <div
                      className="absolute top-3 right-3 flex items-center gap-1.5"
                      aria-hidden="true"
                    >
                      <div className="w-1.5 h-1.5 bg-green-400" />
                      <span className="font-mono text-[10px] text-green-400/80 tracking-wider cyber-text-flicker-hover">
                        {t('statusOnline')}
                      </span>
                    </div>
                    {/* Corner brackets on photo */}
                    <div
                      className="absolute top-2 right-2 w-4 h-4 border-t border-r border-cyber-cyan/40"
                      aria-hidden="true"
                    />
                    <div
                      className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-cyber-cyan/40"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Info below photo */}
                  <div className="p-6 md:p-8 space-y-5">
                    {/* Name and role */}
                    <div>
                      <h3 className="font-display text-xl font-semibold tracking-wide text-cyber-heading">
                        {member.name}
                      </h3>
                      <p className="font-mono text-xs text-cyber-cyan tracking-wide mt-1.5">
                        [{role.toUpperCase()}]
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-sm leading-relaxed text-cyber-muted">{description}</p>

                    {/* Spec sheet */}
                    <div className="border-t border-cyber-border pt-4 space-y-2">
                      <span
                        className="font-mono text-[9px] text-cyber-faint/50 tracking-widest uppercase block mb-3"
                        aria-hidden="true"
                      >
                        // spec_sheet
                      </span>
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

                    {/* Skill bars */}
                    <div className="border-t border-cyber-border pt-4 space-y-2.5">
                      <span
                        className="font-mono text-[9px] text-cyber-faint/50 tracking-widest uppercase block mb-3"
                        aria-hidden="true"
                      >
                        // skill_matrix
                      </span>
                      {member.skills.map((skill, skillIndex) => (
                        <SkillBar
                          key={skill.name}
                          name={skill.name}
                          level={skill.level}
                          delay={0.15 + skillIndex * 0.1}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

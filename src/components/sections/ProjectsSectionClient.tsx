'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import AnimatedReveal from '@/components/ui/AnimatedReveal';
import { cn } from '@/lib/utils';
import type { Project, Media, Industry } from '@/payload-types';

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

interface ProjectsSectionClientProps {
  projects: Project[];
  stats: {
    totalProjects: number;
    technologiesUsed: number;
    industriesServed: number;
  };
}

function StatBlock({
  label,
  value,
  delay,
}: {
  label: string;
  value: number | string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className="relative flex flex-col items-center px-6 py-4"
    >
      <span className="font-display text-2xl md:text-3xl font-bold text-brand-light neon-glow tabular-nums">
        {value}
      </span>
      <span className="mt-1 font-mono text-[10px] uppercase tracking-widest text-cyber-faint">
        {label}
      </span>
    </motion.div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const t = useTranslations('projects');
  const image = project.featuredImage as Media | null;
  const industries = (project.industries ?? []).filter(
    (ind): ind is Industry => typeof ind !== 'string',
  );
  const technologies = project.technologies ?? [];
  const isFeatured = index === 0;

  return (
    <AnimatedReveal
      key={project.id}
      delay={0.1 * index}
      className={cn(isFeatured ? 'md:col-span-2' : '')}
    >
      <Link
        href={`/projects/${project.slug}`}
        aria-label={t('viewProject', { title: project.title })}
        className={cn(
          'group relative block border border-cyber-border',
          'bg-cyber-surface',
          'cyber-corners cyber-border-glow',
          'transition-all duration-500 ease-out',
          'hover:border-brand/40',
          'h-full overflow-hidden',
        )}
      >
        {/* Featured image */}
        {image?.url && (
          <div
            className={cn(
              'relative overflow-hidden cyber-glitch-image cyber-scan-hover',
              isFeatured ? 'aspect-[2/1]' : 'aspect-[16/9]',
            )}
          >
            <div className="scan-line" aria-hidden="true" />
            <Image
              src={image.url}
              alt={image.alt ?? project.title}
              fill
              sizes={isFeatured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
              className="object-cover transition-[transform,filter] duration-500 group-hover:scale-105"
              style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
              {...(image.blurDataURL
                ? { placeholder: 'blur' as const, blurDataURL: image.blurDataURL }
                : {})}
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-cyber-surface via-cyber-surface/40 to-transparent"
              aria-hidden="true"
            />
            {/* Scanline overlay */}
            <div className="absolute inset-0 scanlines opacity-20" aria-hidden="true" />

            {/* HUD corner brackets on hover — staggered animation */}
            <div
              className="absolute inset-0 pointer-events-none cyber-bracket-stagger"
              aria-hidden="true"
            >
              {/* Top-left bracket */}
              <span className="cyber-bracket cyber-bracket-tl absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-cyber-cyan/60" />
              {/* Top-right bracket */}
              <span className="cyber-bracket cyber-bracket-tr absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-cyber-cyan/60" />
              {/* Bottom-left bracket */}
              <span className="cyber-bracket cyber-bracket-bl absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-cyber-cyan/60" />
              {/* Bottom-right bracket */}
              <span className="cyber-bracket cyber-bracket-br absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-cyber-cyan/60" />
            </div>

            {/* Status indicator */}
            <div
              className="absolute top-4 left-4 flex items-center gap-2 z-10"
              aria-hidden="true"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping bg-cyber-cyan opacity-75" />
                <span className="relative inline-flex h-2 w-2 bg-cyber-cyan" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-cyber-cyan/80 cyber-text-flicker-hover">
                {t('statusLive')}
              </span>
            </div>
          </div>
        )}

        {/* Card content */}
        <div className="relative p-6 md:p-8">
          {/* Card index */}
          <span
            className="absolute top-4 right-4 font-mono text-[11px] text-cyber-faint/40 z-10"
            aria-hidden="true"
          >
            [{String(index + 1).padStart(2, '0')}]
          </span>

          {/* Project title */}
          <h3
            className={cn(
              'font-display font-semibold tracking-wide text-cyber-heading mb-1',
              'group-hover:neon-glow transition-all duration-300',
              isFeatured ? 'text-xl md:text-2xl' : 'text-lg',
            )}
          >
            {project.title}
          </h3>

          {/* Client name */}
          {project.client && (
            <p className="font-mono text-xs text-cyber-cyan tracking-wide mb-3">
              [{project.client.toUpperCase()}]
            </p>
          )}

          {/* Description */}
          {project.description && (
            <p
              className={cn(
                'text-sm leading-relaxed text-cyber-muted mb-4',
                isFeatured ? 'max-w-xl' : '',
              )}
            >
              {project.description.length > (isFeatured ? 200 : 120)
                ? project.description.slice(0, isFeatured ? 200 : 120).trimEnd() + '...'
                : project.description}
            </p>
          )}

          {/* Industry tags */}
          {industries.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {industries.map((ind) => (
                <span
                  key={ind.id}
                  className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 border border-cyber-cyan/20 text-cyber-cyan/70 bg-cyber-cyan/5"
                >
                  {ind.name}
                </span>
              ))}
            </div>
          )}

          {/* Technology badges */}
          {technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) =>
                tech.technology ? (
                  <span
                    key={tech.id}
                    className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 border border-brand/20 text-brand-light bg-brand/5"
                  >
                    {tech.technology}
                  </span>
                ) : null,
              )}
            </div>
          )}

          {/* View project arrow indicator */}
          <div className="mt-5 flex items-center gap-2 font-mono text-xs text-cyber-faint group-hover:text-brand-light transition-colors duration-300">
            <span className="h-px flex-grow max-w-8 bg-cyber-border group-hover:bg-brand/40 transition-colors duration-300" />
            <span className="uppercase tracking-wider">{t('viewProjectLink')}</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </div>
        </div>
      </Link>
    </AnimatedReveal>
  );
}

export default function ProjectsSectionClient({ projects, stats }: ProjectsSectionClientProps) {
  const t = useTranslations('projects');
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });

  return (
    <>
      {/* Stats bar */}
      <motion.div
        ref={statsRef}
        initial={{ opacity: 0 }}
        animate={statsInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative mb-12 border border-cyber-border bg-cyber-surface/50 overflow-hidden"
      >
        {/* Scanline effect */}
        <div className="absolute inset-0 scanlines opacity-10" aria-hidden="true" />

        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent"
          aria-hidden="true"
        />

        <div className="relative grid grid-cols-3 divide-x divide-cyber-border">
          <StatBlock label={t('statProjects')} value={stats.totalProjects} delay={0.1} />
          <StatBlock label={t('statTechnologies')} value={stats.technologiesUsed} delay={0.2} />
          <StatBlock label={t('statIndustries')} value={stats.industriesServed} delay={0.3} />
        </div>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan/30 to-transparent"
          aria-hidden="true"
        />
      </motion.div>

      {/* Terminal-style log line */}
      <AnimatedReveal delay={0.05}>
        <div className="mb-8 font-mono text-xs text-cyber-faint/40" aria-hidden="true">
          <span className="text-brand-light/50">&gt;</span> loading featured projects...{' '}
          <span className="text-cyber-cyan/40">[{projects.length} results]</span>
        </div>
      </AnimatedReveal>

      {/* Project grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </>
  );
}

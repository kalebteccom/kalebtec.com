'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import AnimatedReveal from '@/components/ui/AnimatedReveal';
import { cn } from '@/lib/utils';
import type { Project, Media, Industry } from '@/payload-types';

interface ProjectsSectionClientProps {
  projects: Project[];
  stats: {
    totalProjects: number;
    technologiesUsed: number;
    industriesServed: number;
  };
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const t = useTranslations('projects');
  const image = project.featuredImage as Media | null;
  const industries = (project.industries ?? []).filter(
    (ind): ind is Industry => typeof ind !== 'string',
  );
  const isFeatured = index === 0;

  return (
    <AnimatedReveal
      key={project.id}
      delay={0.05 * index}
      className={cn(isFeatured ? 'md:col-span-2' : '')}
    >
      <Link
        href={`/projects/${project.slug}`}
        aria-label={t('viewProject', { title: project.title })}
        className="group relative block h-full"
      >
        {image?.url && (
          <div
            className={cn(
              'relative overflow-hidden bg-surface',
              isFeatured ? 'aspect-[2/1]' : 'aspect-[4/3]',
            )}
          >
            <Image
              src={image.url}
              alt={image.alt ?? project.title}
              fill
              sizes={
                isFeatured
                  ? '(max-width: 768px) 100vw, 66vw'
                  : '(max-width: 768px) 100vw, 33vw'
              }
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              {...(image.blurDataURL
                ? { placeholder: 'blur' as const, blurDataURL: image.blurDataURL }
                : {})}
            />
          </div>
        )}

        <div className="pt-5">
          <div className="flex items-baseline justify-between mb-2 gap-4">
            <h3
              className={cn(
                'font-display font-semibold tracking-tight text-heading',
                isFeatured ? 'text-2xl' : 'text-lg',
              )}
            >
              {project.title}
            </h3>
            {project.client && (
              <span className="font-mono text-xs uppercase tracking-wider text-faint shrink-0">
                {project.client}
              </span>
            )}
          </div>

          {project.description && (
            <p
              className={cn(
                'text-sm text-muted leading-relaxed',
                isFeatured ? 'max-w-2xl' : 'max-w-md',
              )}
            >
              {project.description.length > (isFeatured ? 200 : 120)
                ? project.description.slice(0, isFeatured ? 200 : 120).trimEnd() + '…'
                : project.description}
            </p>
          )}

          {industries.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {industries.slice(0, 3).map((ind) => (
                <span
                  key={ind.id}
                  className="font-mono text-xs uppercase tracking-wider text-faint"
                >
                  {ind.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </AnimatedReveal>
  );
}

export default function ProjectsSectionClient({
  projects,
  stats,
}: ProjectsSectionClientProps) {
  const t = useTranslations('projects');

  return (
    <>
      {/* Stats — clean number row */}
      <AnimatedReveal>
        <div className="grid grid-cols-3 gap-8 mb-16 pb-12 border-b border-border">
          <div>
            <div className="font-display text-3xl md:text-4xl font-bold tracking-tight text-heading mb-1 tabular-nums">
              {stats.totalProjects}
            </div>
            <div className="text-xs font-medium uppercase tracking-wider text-faint">
              {t('statProjects')}
            </div>
          </div>
          <div>
            <div className="font-display text-3xl md:text-4xl font-bold tracking-tight text-heading mb-1 tabular-nums">
              {stats.technologiesUsed}
            </div>
            <div className="text-xs font-medium uppercase tracking-wider text-faint">
              {t('statTechnologies')}
            </div>
          </div>
          <div>
            <div className="font-display text-3xl md:text-4xl font-bold tracking-tight text-heading mb-1 tabular-nums">
              {stats.industriesServed}
            </div>
            <div className="text-xs font-medium uppercase tracking-wider text-faint">
              {t('statIndustries')}
            </div>
          </div>
        </div>
      </AnimatedReveal>

      {/* Project grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </>
  );
}

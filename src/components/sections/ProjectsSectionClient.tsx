'use client';

import Image from 'next/image';
import Link from 'next/link';
import AnimatedReveal from '@/components/ui/AnimatedReveal';
import { cn } from '@/lib/utils';
import type { Project, Media, Industry } from '@/payload-types';

interface ProjectsSectionClientProps {
  projects: Project[];
}

export default function ProjectsSectionClient({ projects }: ProjectsSectionClientProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project, index) => {
        const image = project.featuredImage as Media | null;
        const industries = (project.industries ?? []).filter(
          (ind): ind is Industry => typeof ind !== 'string',
        );
        const technologies = project.technologies ?? [];

        return (
          <AnimatedReveal key={project.id} delay={0.1 * index}>
            <Link
              href={`/projects/${project.slug}`}
              className={cn(
                'group relative block border border-cyber-border',
                'bg-cyber-surface',
                'cyber-corners cyber-border-glow',
                'transition-all duration-500 ease-out',
                'hover:border-cyber-muted/30',
                'h-full overflow-hidden',
              )}
            >
              {/* Featured image */}
              {image?.url && (
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={image.url}
                    alt={image.alt ?? project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    {...(image.blurDataURL
                      ? { placeholder: 'blur' as const, blurDataURL: image.blurDataURL }
                      : {})}
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-cyber-surface via-transparent to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-0 scanlines opacity-20" aria-hidden="true" />
                </div>
              )}

              {/* Card content */}
              <div className="p-6 md:p-8">
                {/* Card index */}
                <span
                  className="absolute top-4 right-4 font-mono text-[11px] text-cyber-faint/40 z-10"
                  aria-hidden="true"
                >
                  [{String(index + 1).padStart(2, '0')}]
                </span>

                <h3 className="font-display text-lg font-semibold tracking-wide text-cyber-heading mb-1">
                  {project.title}
                </h3>

                {project.client && (
                  <p className="font-mono text-xs text-cyber-cyan tracking-wide mb-3">
                    [{project.client.toUpperCase()}]
                  </p>
                )}

                {project.description && (
                  <p className="text-sm leading-relaxed text-cyber-muted mb-4">
                    {project.description.length > 120
                      ? project.description.slice(0, 120).trimEnd() + '...'
                      : project.description}
                  </p>
                )}

                {/* Industry tags */}
                {industries.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {industries.map((ind) => (
                      <span
                        key={ind.id}
                        className="cyber-badge font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 border border-cyber-border text-cyber-muted"
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
                          className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 border border-brand/20 text-brand-light"
                        >
                          {tech.technology}
                        </span>
                      ) : null,
                    )}
                  </div>
                )}
              </div>
            </Link>
          </AnimatedReveal>
        );
      })}
    </div>
  );
}

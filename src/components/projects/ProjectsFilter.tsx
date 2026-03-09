'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import AnimatedReveal from '@/components/ui/AnimatedReveal';
import type { Project, Industry, Media } from '@/payload-types';

interface ProjectsFilterProps {
  projects: Project[];
  industries: string[];
  technologies: string[];
}

export default function ProjectsFilter({
  projects,
  industries,
  technologies,
}: ProjectsFilterProps) {
  const [activeIndustries, setActiveIndustries] = useState<Set<string>>(new Set());
  const [activeTechnologies, setActiveTechnologies] = useState<Set<string>>(new Set());

  const toggleIndustry = (name: string) => {
    setActiveIndustries((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const toggleTechnology = (name: string) => {
    setActiveTechnologies((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      if (activeIndustries.size > 0) {
        const projectIndustries = (project.industries ?? [])
          .filter((ind): ind is Industry => typeof ind !== 'string')
          .map((ind) => ind.name);
        if (!projectIndustries.some((name) => activeIndustries.has(name))) return false;
      }
      if (activeTechnologies.size > 0) {
        const projectTechs = (project.technologies ?? [])
          .map((t) => t.technology)
          .filter(Boolean) as string[];
        if (!projectTechs.some((name) => activeTechnologies.has(name))) return false;
      }
      return true;
    });
  }, [projects, activeIndustries, activeTechnologies]);

  const hasFilters = activeIndustries.size > 0 || activeTechnologies.size > 0;

  return (
    <>
      {/* Filter bar */}
      {(industries.length > 0 || technologies.length > 0) && (
        <div className="mb-10 space-y-4">
          {industries.length > 0 && (
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-cyber-faint mb-2 block">
                // INDUSTRIES
              </span>
              <div className="flex flex-wrap gap-2">
                {industries.map((name) => (
                  <button
                    key={name}
                    onClick={() => toggleIndustry(name)}
                    className={cn(
                      'font-mono text-[11px] uppercase tracking-wider px-3 py-1 border transition-all duration-300',
                      activeIndustries.has(name)
                        ? 'border-brand text-brand-light bg-brand/10'
                        : 'border-cyber-border text-cyber-muted hover:border-cyber-muted/50 hover:text-cyber-heading',
                    )}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {technologies.length > 0 && (
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-cyber-faint mb-2 block">
                // TECHNOLOGIES
              </span>
              <div className="flex flex-wrap gap-2">
                {technologies.map((name) => (
                  <button
                    key={name}
                    onClick={() => toggleTechnology(name)}
                    className={cn(
                      'font-mono text-[11px] uppercase tracking-wider px-3 py-1 border transition-all duration-300',
                      activeTechnologies.has(name)
                        ? 'border-cyber-cyan text-cyber-cyan bg-cyber-cyan/10'
                        : 'border-cyber-border text-cyber-muted hover:border-cyber-muted/50 hover:text-cyber-heading',
                    )}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {hasFilters && (
            <button
              onClick={() => {
                setActiveIndustries(new Set());
                setActiveTechnologies(new Set());
              }}
              className="font-mono text-[11px] uppercase tracking-wider text-cyber-faint hover:text-cyber-heading transition-colors duration-300"
            >
              [CLEAR FILTERS]
            </button>
          )}
        </div>
      )}

      {/* Results count */}
      <p className="font-mono text-xs text-cyber-faint mb-6">
        {filtered.length} project{filtered.length !== 1 ? 's' : ''} found
      </p>

      {/* Project grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project, index) => {
          const image = project.featuredImage as Media | null;
          const projectIndustries = (project.industries ?? []).filter(
            (ind): ind is Industry => typeof ind !== 'string',
          );
          const techs = project.technologies ?? [];

          return (
            <AnimatedReveal key={project.id} delay={0.05 * index}>
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
                {image?.url && (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={image.url}
                      alt={image.alt ?? project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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

                <div className="p-6">
                  <h2 className="font-display text-lg font-semibold tracking-wide text-cyber-heading mb-1">
                    {project.title}
                  </h2>

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

                  {projectIndustries.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {projectIndustries.map((ind) => (
                        <span
                          key={ind.id}
                          className="cyber-badge font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 border border-cyber-border text-cyber-muted"
                        >
                          {ind.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {techs.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {techs.map((tech) =>
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

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="font-mono text-sm text-cyber-faint">
            No projects match the selected filters.
          </p>
        </div>
      )}
    </>
  );
}

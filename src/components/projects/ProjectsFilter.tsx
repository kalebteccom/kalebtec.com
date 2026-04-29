'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import AnimatedReveal from '@/components/ui/AnimatedReveal';
import CyberSelect from '@/components/ui/CyberSelect';
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
  const t = useTranslations('projects');
  const [activeIndustries, setActiveIndustries] = useState<Set<string>>(new Set());
  const [selectedTechnology, setSelectedTechnology] = useState<string>('');

  const toggleIndustry = (name: string) => {
    setActiveIndustries((prev) => {
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
      if (selectedTechnology) {
        const projectTechs = (project.technologies ?? [])
          .map((t) => t.technology)
          .filter(Boolean) as string[];
        if (!projectTechs.includes(selectedTechnology)) return false;
      }
      return true;
    });
  }, [projects, activeIndustries, selectedTechnology]);

  const hasFilters = activeIndustries.size > 0 || selectedTechnology !== '';

  return (
    <>
      {(industries.length > 0 || technologies.length > 0) && (
        <div className="mb-12 space-y-6 pb-12 border-b border-border">
          {industries.length > 0 && (
            <div>
              <span className="text-xs font-medium uppercase tracking-wider text-faint mb-3 block">
                {t('industries')}
              </span>
              <div className="flex flex-wrap gap-2">
                {industries.map((name) => {
                  const active = activeIndustries.has(name);
                  return (
                    <button
                      key={name}
                      onClick={() => toggleIndustry(name)}
                      aria-pressed={active}
                      className={cn(
                        'text-sm font-medium px-4 py-2 rounded-full border transition-colors duration-200',
                        active
                          ? 'border-ink bg-ink text-paper'
                          : 'border-border text-body hover:border-border-strong hover:text-heading',
                      )}
                    >
                      {name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {technologies.length > 0 && (
            <CyberSelect
              id="tech-filter"
              label={t('technologies')}
              value={selectedTechnology}
              onValueChange={(val) =>
                setSelectedTechnology(val === '__all__' ? '' : val)
              }
              placeholder={t('allTechnologies')}
              options={technologies.map((name) => ({ value: name, label: name }))}
            />
          )}

          {hasFilters && (
            <button
              onClick={() => {
                setActiveIndustries(new Set());
                setSelectedTechnology('');
              }}
              className="text-sm font-medium text-faint hover:text-heading transition-colors duration-200"
            >
              {t('clearFilters')}
            </button>
          )}
        </div>
      )}

      <p
        className="text-sm text-muted mb-8"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {t('projectsFound', { count: filtered.length })}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {filtered.map((project, index) => {
          const image = project.featuredImage as Media | null;
          const projectIndustries = (project.industries ?? []).filter(
            (ind): ind is Industry => typeof ind !== 'string',
          );

          return (
            <AnimatedReveal key={project.id} delay={0.04 * index}>
              <Link
                href={`/projects/${project.slug}`}
                className="group block h-full"
              >
                {image?.url && (
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface mb-5">
                    <Image
                      src={image.url}
                      alt={image.alt ?? project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      {...(image.blurDataURL
                        ? { placeholder: 'blur' as const, blurDataURL: image.blurDataURL }
                        : {})}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <h2 className="font-display text-xl font-semibold tracking-tight text-heading">
                    {project.title}
                  </h2>

                  {project.client && (
                    <p className="text-xs font-medium uppercase tracking-wider text-faint">
                      {project.client}
                    </p>
                  )}

                  {project.description && (
                    <p className="text-sm text-muted leading-relaxed">
                      {project.description.length > 120
                        ? project.description.slice(0, 120).trimEnd() + '…'
                        : project.description}
                    </p>
                  )}

                  {projectIndustries.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {projectIndustries.slice(0, 2).map((ind) => (
                        <span
                          key={ind.id}
                          className="text-xs font-mono uppercase tracking-wider text-faint"
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
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-base text-muted">{t('noResults')}</p>
        </div>
      )}
    </>
  );
}

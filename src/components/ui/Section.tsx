import * as React from 'react';
import { cn } from '@/lib/utils';

type Tone = 'bg' | 'surface' | 'tint' | 'dark';
type Padding = 'lg' | 'md';

interface SectionProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /** Background band tone — drives the section rhythm across the page. */
  tone?: Tone;
  /** Vertical padding scale. */
  padding?: Padding;
  /** Anchor id for hash navigation. */
  id?: string;
  /** Required — describes the section for assistive tech. */
  'aria-label': string;
  /** Or use an aria-labelledby reference (typically the heading inside). */
  'aria-labelledby'?: string;
  /** Forwarded ref to the underlying <section> element. */
  ref?: React.Ref<HTMLElement>;
  children: React.ReactNode;
}

const toneClass: Record<Tone, string> = {
  bg: 'bg-bg',
  surface: 'bg-surface',
  tint: 'section-tint',
  dark: 'section-dark',
};

const paddingClass: Record<Padding, string> = {
  lg: 'py-24 md:py-32',
  md: 'py-16 md:py-24',
};

/**
 * Section — semantic <section> wrapper that bakes in the editorial band
 * rhythm (cream / surface / tint / dark), vertical padding, and required
 * aria labelling. Replaces the pattern of ~7 sections each repeating the
 * same `<section className="relative py-24 md:py-32 bg-bg">…` blob.
 *
 * Tone selection mirrors the page rhythm (Hero=bg, About=bg,
 * Services=tint, Projects=bg, Team=dark, Contact=surface). New sections
 * should pick the tone that maintains alternation against neighbours.
 */
export const Section = React.forwardRef<HTMLElement, Omit<SectionProps, 'ref'>>(
  function Section(
    { tone = 'bg', padding = 'lg', id, className, children, ...rest },
    ref,
  ) {
    return (
      <section
        ref={ref}
        id={id}
        className={cn('relative', toneClass[tone], paddingClass[padding], className)}
        {...rest}
      >
        {children}
      </section>
    );
  },
);

interface SectionContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Max-width preset. Default 'wide'. */
  width?: 'narrow' | 'reading' | 'wide';
  children: React.ReactNode;
}

const widthClass = {
  /** ~640px — for centered single-column copy. */
  narrow: 'max-w-2xl',
  /** ~768px — long-form reading width (privacy, terms, project detail body). */
  reading: 'max-w-3xl',
  /** ~1280px — default for sectioned page content. */
  wide: 'max-w-7xl',
} as const;

/**
 * SectionContainer — the inner padded container most of our sections share.
 * Pairs with `<Section>` to handle horizontal gutters and max-width caps.
 */
export function SectionContainer({
  width = 'wide',
  className,
  children,
  ...rest
}: SectionContainerProps) {
  return (
    <div
      className={cn('mx-auto px-6 lg:px-8', widthClass[width], className)}
      {...rest}
    >
      {children}
    </div>
  );
}

'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  /** Section number displayed as 01, 02, etc. */
  sectionNumber?: string;
  /** Allow part of the title to be highlighted in brand color */
  highlightWord?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  className,
  sectionNumber,
  highlightWord,
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const renderTitle = () => {
    if (!highlightWord) return title;
    const parts = title.split(highlightWord);
    return (
      <>
        {parts[0]}
        <span className="text-brand">{highlightWord}</span>
        {parts[1] ?? ''}
      </>
    );
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={cn('mb-12 md:mb-16', className)}
    >
      {sectionNumber && (
        <p className="font-mono text-xs uppercase tracking-widest mb-4 flex items-center gap-3">
          <span className="text-brand font-semibold">{sectionNumber}</span>
          <span className="h-px w-8 bg-border-strong" aria-hidden="true" />
          <span className="text-muted">{title}</span>
        </p>
      )}

      <h2 className="text-display-lg text-heading max-w-[18ch]">
        {renderTitle()}
      </h2>

      {subtitle && (
        <p className="mt-6 editorial-lead text-muted max-w-2xl">{subtitle}</p>
      )}
    </motion.div>
  );
}

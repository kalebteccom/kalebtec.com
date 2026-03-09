'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  /** Section number displayed as [01], [02], etc. */
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
    if (!highlightWord) {
      return title;
    }
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
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, ease: EASE }}
      className={cn('mb-16', className)}
    >
      {/* Section number and label */}
      {sectionNumber && (
        <div className="flex items-center gap-2 mb-4">
          <span className="font-mono text-sm text-cyber-faint tracking-wider">
            [{sectionNumber}]
          </span>
          <span className="font-mono text-sm text-cyber-faint/50">//</span>
          <span className="font-mono text-sm text-cyber-muted tracking-wider uppercase">
            {title}
          </span>
        </div>
      )}

      {/* Heading */}
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider uppercase text-cyber-heading neon-glow">
        {renderTitle()}
      </h2>

      {/* Sharp gradient accent line with glowing dot */}
      <div className="mt-6 flex items-center gap-0" aria-hidden="true">
        {/* Glowing dot */}
        <div className="w-2 h-2 bg-brand" role="presentation" />
        {/* Gradient line */}
        <div
          className="h-px w-24 bg-gradient-to-r from-brand/40 to-transparent"
          role="presentation"
        />
      </div>

      {subtitle && <p className="mt-6 text-lg text-cyber-muted max-w-2xl font-mono">{subtitle}</p>}
    </motion.div>
  );
}

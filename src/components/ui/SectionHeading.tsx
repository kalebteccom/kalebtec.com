'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { EyebrowLabel } from './EyebrowLabel';

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

/**
 * SectionHeading — composes EyebrowLabel + a giant <h2> + an optional
 * editorial-lead subtitle. Use this for the top of every page section.
 *
 * Example:
 *   <SectionHeading title={t('sectionTitle')} sectionNumber="01" />
 */
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
        <EyebrowLabel number={sectionNumber} accent="rule" className="mb-4">
          {title}
        </EyebrowLabel>
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

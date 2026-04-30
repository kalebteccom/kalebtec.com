import * as React from 'react';
import { cn } from '@/lib/utils';
import { BulletDot } from './BulletDot';

interface EyebrowLabelProps {
  /** Optional 2-digit section index ('01', '02', …). Renders in brand purple before the divider. */
  number?: string;
  /** Decorative element preceding the label. Default 'dot'. */
  accent?: 'dot' | 'rule' | 'none';
  /** Extra classes for the wrapper. */
  className?: string;
  children: React.ReactNode;
}

/**
 * EyebrowLabel — the small mono uppercase label that introduces sections,
 * hero blocks, project meta rows, and other editorial copy. Combines the
 * patterns we kept inlining: brand-purple BulletDot + space + label, or
 * "01 — Label" with a hairline rule between number and label.
 *
 * Examples:
 *   <EyebrowLabel>Kalebtec — Tech consulting</EyebrowLabel>
 *   <EyebrowLabel number="01">About</EyebrowLabel>
 *   <EyebrowLabel number="03" accent="rule">Our work</EyebrowLabel>
 *   <EyebrowLabel accent="none">Privacy policy</EyebrowLabel>
 */
export function EyebrowLabel({
  number,
  accent = 'dot',
  className,
  children,
}: EyebrowLabelProps) {
  return (
    <p
      className={cn(
        'font-mono text-xs uppercase tracking-widest flex items-center gap-3',
        className,
      )}
    >
      {number && (
        <span className="text-brand font-semibold">{number}</span>
      )}
      {accent === 'rule' && number && (
        <span aria-hidden="true" className="h-px w-8 bg-border-strong" />
      )}
      {accent === 'dot' && !number && <BulletDot color="brand" />}
      <span className="text-muted">{children}</span>
    </p>
  );
}

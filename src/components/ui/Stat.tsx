import * as React from 'react';
import { cn } from '@/lib/utils';
import { BulletDot } from './BulletDot';

interface StatProps {
  value: React.ReactNode;
  label: string;
  /** Optional 2-digit index ('01', '02', …). Renders in brand purple above the value. */
  index?: string;
  /** Brand BulletDot accent above the value. Default 'dot' when index is provided, else 'none'. */
  accent?: 'dot' | 'none';
  /** Override the wrapper classes (e.g. add tabular-nums when not numeric). */
  className?: string;
  /** Optional aria-label override (defaults to "<label>: <value>"). */
  'aria-label'?: string;
}

/**
 * Stat — a single big-number + small-label statistic block. Used in
 * AboutSection (uptime / stack depth / response / clearance) and in the
 * ProjectsSectionClient header (totals / technologies / industries).
 *
 * The accent dot + small index follows our editorial pattern: brand
 * purple dot on the left, mono index right after, then the big value
 * and the muted caption.
 */
export function Stat({
  value,
  label,
  index,
  accent,
  className,
  'aria-label': ariaLabel,
}: StatProps) {
  const showAccent = accent ?? (index ? 'dot' : 'none');
  return (
    <div className={className} aria-label={ariaLabel ?? `${label}: ${typeof value === 'string' ? value : ''}`}>
      {(showAccent === 'dot' || index) && (
        <div className="flex items-center gap-2 mb-1.5">
          {showAccent === 'dot' && <BulletDot color="brand" />}
          {index && (
            <span className="font-mono text-[10px] uppercase tracking-widest text-brand font-semibold">
              {index}
            </span>
          )}
        </div>
      )}
      <div className="font-display text-3xl md:text-4xl font-bold tracking-tight text-heading mb-1 tabular-nums">
        {value}
      </div>
      <div className="text-xs font-medium uppercase tracking-wider text-faint">
        {label}
      </div>
    </div>
  );
}

interface StatGridProps {
  /** Number of columns. Default 4. */
  columns?: 2 | 3 | 4;
  /** Render hairline dividers between cells (used in Projects header). */
  divided?: boolean;
  /** Add top border (used when stat row sits below a stat divider). */
  bordered?: boolean;
  className?: string;
  children: React.ReactNode;
}

const gridCols = {
  2: 'grid-cols-2',
  3: 'grid-cols-2 md:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-4',
} as const;

/**
 * StatGrid — responsive grid wrapper for Stat items.
 */
export function StatGrid({
  columns = 4,
  divided = false,
  bordered = false,
  className,
  children,
}: StatGridProps) {
  return (
    <div
      className={cn(
        'grid gap-x-8 gap-y-8',
        gridCols[columns],
        bordered && 'pt-8 border-t border-border',
        divided && 'mb-16 pb-12 border-b border-border',
        className,
      )}
    >
      {children}
    </div>
  );
}

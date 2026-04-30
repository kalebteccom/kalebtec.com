import * as React from 'react';
import { cn } from '@/lib/utils';

type StackedPillProps = {
  /** Underlying tag — use 'nav' when the pill holds primary navigation. */
  as?: 'div' | 'nav' | 'aside' | 'header';
  /** Internal padding around the stacked items. Default 'md'. */
  padding?: 'sm' | 'md' | 'lg';
  /**
   * Allow children to wrap to a new line when the pill runs out of
   * horizontal space. Use for CTA combos that may collide on narrow
   * viewports; leave off for fixed-width control rows (lang/theme,
   * desktop nav).
   */
  wrap?: boolean;
  /**
   * On narrow viewports, lay children out vertically instead of in a
   * single row. The pill becomes a tall capsule with stacked controls.
   * Use only when the contents are full-width children (e.g. two CTAs
   * on a phone). Default false.
   */
  stackBelow?: 'sm' | 'md' | 'never';
  className?: string;
  children: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'className'>;

const paddingClasses: Record<NonNullable<StackedPillProps['padding']>, string> = {
  sm: 'p-1',
  md: 'p-1.5',
  lg: 'p-2',
};

/**
 * StackedPill — the New Relic-inspired capsule that wraps a row of
 * related controls (nav links, icon buttons, CTA combos) into a single
 * high-contrast pill against the page background.
 *
 * The pill uses the `.nav-pill` CSS class which locally inverts our
 * semantic color tokens, so any nested UI (Button, BulletDot, lang
 * dropdowns, …) automatically picks up the light-on-dark scheme without
 * per-component dark-mode props.
 *
 * Examples:
 *   <StackedPill as="nav"><NavLinks /><Button>Start</Button></StackedPill>
 *   <StackedPill><LanguageSwitcher /><ThemeToggle /></StackedPill>
 */
/**
 * Build the responsive layout classes. When `stackBelow` is set, the pill
 * collapses to a vertical stack below that breakpoint and direct
 * children stretch to full width so labels never wrap awkwardly. Above
 * that breakpoint, children fall back to their natural inline width.
 *
 * Tailwind treats `rounded-full` as a 9999px radius which works on tall
 * pills too — so the same class wins both layouts.
 */
const stackClass: Record<NonNullable<StackedPillProps['stackBelow']>, string> = {
  never: 'flex-row',
  sm: 'flex-col items-stretch [&>*]:w-full sm:flex-row sm:items-center sm:[&>*]:w-auto',
  md: 'flex-col items-stretch [&>*]:w-full md:flex-row md:items-center md:[&>*]:w-auto',
};

export function StackedPill({
  as = 'div',
  padding = 'md',
  wrap,
  stackBelow = 'never',
  className,
  children,
  ...rest
}: StackedPillProps) {
  const classes = cn(
    'inline-flex gap-1 rounded-full nav-pill',
    stackBelow === 'never' ? 'items-center' : '',
    stackClass[stackBelow],
    wrap && 'flex-wrap',
    paddingClasses[padding],
    className,
  );
  if (as === 'nav') {
    return (
      <nav className={classes} {...rest}>
        {children}
      </nav>
    );
  }
  if (as === 'aside') {
    return (
      <aside className={classes} {...rest}>
        {children}
      </aside>
    );
  }
  if (as === 'header') {
    return (
      <header className={classes} {...rest}>
        {children}
      </header>
    );
  }
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}

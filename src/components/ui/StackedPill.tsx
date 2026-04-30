import * as React from 'react';
import { cn } from '@/lib/utils';

type StackedPillProps = {
  /** Underlying tag — use 'nav' when the pill holds primary navigation. */
  as?: 'div' | 'nav' | 'aside' | 'header';
  /** Internal padding around the stacked items. Default 'md'. */
  padding?: 'sm' | 'md' | 'lg';
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
export function StackedPill({
  as = 'div',
  padding = 'md',
  className,
  children,
  ...rest
}: StackedPillProps) {
  const classes = cn(
    'inline-flex items-center gap-1 rounded-full nav-pill',
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

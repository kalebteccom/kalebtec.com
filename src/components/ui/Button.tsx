'use client';

import * as React from 'react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { BulletDot } from './BulletDot';

export type ButtonVariant = 'primary' | 'ink' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

type BulletProp = boolean | 'white' | 'brand' | 'current' | 'muted';

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3.5 py-1.5 text-sm gap-1.5',
  md: 'px-5 py-2 text-base gap-2',
  lg: 'px-7 py-3 text-base gap-2',
};

const variantClasses: Record<ButtonVariant, string> = {
  /** Brand purple solid, white text — the primary call-to-action. */
  primary: 'bg-brand text-white hover:bg-brand-dark',
  /** Ink solid, paper text — high-contrast secondary CTA. */
  ink: 'bg-ink text-paper hover:bg-ink-soft',
  /** Outlined transparent, ink text. */
  secondary:
    'bg-transparent text-heading shadow-[inset_0_0_0_1px_var(--color-border-strong)] hover:bg-surface',
  /** Borderless ghost button — subtle hover bg only. */
  ghost: 'bg-transparent text-body hover:bg-surface',
};

function pickBulletColor(
  variant: ButtonVariant,
  bullet: Exclude<BulletProp, false>,
): React.ComponentProps<typeof BulletDot>['color'] {
  if (bullet === true) {
    if (variant === 'primary' || variant === 'ink') return 'white';
    return 'brand';
  }
  return bullet;
}

const baseClasses =
  'inline-flex items-center justify-center rounded-full font-medium whitespace-nowrap transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

export function buttonClassName(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  extra?: string,
) {
  return cn(baseClasses, sizeClasses[size], variantClasses[variant], extra);
}

interface ButtonOwnProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /**
   * Show a small accent dot before the label. `true` picks a sensible
   * default (white on filled CTAs, brand purple otherwise). Pass a
   * specific color to override.
   */
  bullet?: BulletProp;
}

interface ButtonProps
  extends ButtonOwnProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: React.ReactNode;
}

/**
 * Button — pill-shaped button. Renders as `<button>` with `type="button"`
 * by default. Use ButtonLink instead when the action is navigation.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  bullet,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClassName(variant, size, className)}
      {...rest}
    >
      {bullet && <BulletDot color={pickBulletColor(variant, bullet)} />}
      <span>{children}</span>
    </button>
  );
}

interface ButtonLinkProps extends ButtonOwnProps {
  /** Destination. Hash, mailto, http(s) → plain `<a>`. Internal path → next-intl `<Link>`. */
  href: string;
  /** Force the plain `<a>` renderer (e.g. for `target="_blank"` external sites). */
  external?: boolean;
  className?: string;
  children: React.ReactNode;
  target?: string;
  rel?: string;
  'aria-label'?: string;
  'aria-current'?: React.AriaAttributes['aria-current'];
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * ButtonLink — pill-shaped link. Auto-routes through next-intl's locale
 * `<Link>` for internal paths, and falls back to a plain `<a>` for hash
 * anchors, mailto:, and external URLs.
 */
export function ButtonLink({
  variant = 'primary',
  size = 'md',
  bullet,
  className,
  children,
  href,
  external,
  ...rest
}: ButtonLinkProps) {
  const classes = buttonClassName(variant, size, className);
  const isPlainAnchor =
    external ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('#');

  const inner = (
    <>
      {bullet && <BulletDot color={pickBulletColor(variant, bullet)} />}
      <span>{children}</span>
    </>
  );

  if (isPlainAnchor) {
    return (
      <a href={href} className={classes} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {inner}
    </Link>
  );
}

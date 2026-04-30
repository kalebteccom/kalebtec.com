import { cn } from '@/lib/utils';

type Color = 'brand' | 'white' | 'current' | 'muted' | 'faint' | 'heading';
type Size = 'xs' | 'sm' | 'md';

interface BulletDotProps {
  color?: Color;
  size?: Size;
  className?: string;
}

const sizeClasses: Record<Size, string> = {
  xs: 'h-1 w-1',
  sm: 'h-1.5 w-1.5',
  md: 'h-2 w-2',
};

const colorClasses: Record<Color, string> = {
  brand: 'bg-brand',
  white: 'bg-white/85',
  current: 'bg-current',
  muted: 'bg-muted',
  faint: 'bg-faint',
  heading: 'bg-heading',
};

/**
 * BulletDot — the small accent dot used in front of editorial labels,
 * eyebrow text, nav CTAs, and stat indicators.
 *
 * Examples:
 *   <BulletDot />                          // brand purple, size sm
 *   <BulletDot color="white" size="sm" />  // for use on filled brand bg
 *   <BulletDot color="muted" />            // subtle list bullet
 */
export function BulletDot({ color = 'brand', size = 'sm', className }: BulletDotProps) {
  return (
    <span
      aria-hidden="true"
      className={cn('rounded-full shrink-0', sizeClasses[size], colorClasses[color], className)}
    />
  );
}

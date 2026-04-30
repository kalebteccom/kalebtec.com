import Image from 'next/image';
import { cn } from '@/lib/utils';

type Size = 'sm' | 'md' | 'lg';

interface LogoProps {
  /** Mark size: 24px / 28px / 40px. Default 'md'. */
  size?: Size;
  /** Show the "Kalebtec" wordmark next to the mark. Default true. */
  wordmark?: boolean;
  /** Extra classes for the wrapper. */
  className?: string;
  /** Override the default alt text (e.g. when context demands a different label). */
  alt?: string;
}

const markSize: Record<Size, { px: number; cls: string }> = {
  sm: { px: 24, cls: 'w-6 h-6' },
  md: { px: 28, cls: 'w-7 h-7' },
  lg: { px: 40, cls: 'w-10 h-10' },
};

const wordmarkClass: Record<Size, string> = {
  sm: 'text-base',
  md: 'text-lg',
  lg: 'text-2xl',
};

/**
 * Logo — single source of truth for the Kalebtec mark + wordmark.
 *
 * Used everywhere we display the brand: Header, Footer, MobileMenu, and
 * (indirectly via the SVG asset) the OG image generators.
 *
 * The mark is `/logo.svg`. To redesign, swap `/public/logo.svg` and any
 * call site automatically picks up the new artwork at the right size.
 */
export function Logo({
  size = 'md',
  wordmark = true,
  className,
  alt = 'Kalebtec',
}: LogoProps) {
  const m = markSize[size];
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <Image
        src="/logo.svg"
        alt={alt}
        width={m.px}
        height={m.px}
        className={cn(m.cls, 'shrink-0')}
        priority={size === 'lg'}
      />
      {wordmark && (
        <span
          className={cn(
            'hidden sm:inline font-display font-semibold tracking-tight text-heading',
            wordmarkClass[size],
          )}
        >
          Kalebtec
        </span>
      )}
    </span>
  );
}

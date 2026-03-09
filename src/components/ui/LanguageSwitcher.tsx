'use client';

import { useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { cn } from '@/lib/utils';
import { locales, localeNames, type Locale } from '@/i18n/routing';

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <rect x="1" y="1" width="14" height="14" />
      <line x1="8" y1="1" x2="8" y2="15" />
      <line x1="1" y1="8" x2="15" y2="8" />
      <line x1="1" y1="5" x2="15" y2="5" />
      <line x1="1" y1="11" x2="15" y2="11" />
    </svg>
  );
}

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations('languageSwitcher');
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: string) => {
    // Set cookie before navigating so the middleware doesn't redirect based on the old locale
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000;SameSite=Lax`;
    startTransition(() => {
      router.replace(pathname, { locale: newLocale as Locale });
    });
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className={cn(
            'relative flex h-11 w-11 items-center justify-center',
            'border border-cyber-border bg-cyber-surface',
            'text-cyber-muted hover:text-cyber-heading hover:border-cyber-muted/40',
            'transition-all duration-300',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-heading/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cyber-bg',
            'cyber-border-glow',
            isPending && 'opacity-60 pointer-events-none animate-pulse',
          )}
          aria-label={t('ariaLabel', { locale: localeNames[locale as Locale] })}
        >
          <GlobeIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={cn(
            'z-[100] min-w-[180px] p-1',
            'border border-cyber-border bg-cyber-surface',
            'shadow-[0_0_10px_rgba(0,0,0,0.2),0_0_0_1px_rgba(255,255,255,0.08)]',
            'rounded-none',
          )}
          sideOffset={8}
          align="end"
        >
          <div
            className="px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-cyber-faint select-none"
            aria-hidden="true"
          >
            [{t('label').toUpperCase()}]
          </div>

          {locales.map((loc) => {
            const isActive = locale === loc;

            return (
              <DropdownMenu.Item
                key={loc}
                onSelect={() => handleLocaleChange(loc)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 cursor-pointer outline-none',
                  'font-mono text-xs tracking-wider',
                  'transition-colors duration-150',
                  'rounded-none',
                  isActive ? 'text-cyber-heading' : 'text-cyber-muted',
                  'data-[highlighted]:bg-cyber-heading/10 data-[highlighted]:text-cyber-heading',
                )}
              >
                <span className="font-mono text-[10px] uppercase text-cyber-faint w-5 shrink-0">
                  {loc}
                </span>
                <span>{localeNames[loc]}</span>
                {isActive && (
                  <span className="ml-auto text-cyber-heading text-[10px]">&#9646;</span>
                )}
              </DropdownMenu.Item>
            );
          })}

          <div
            className="mx-3 mt-1 mb-1 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent"
            aria-hidden="true"
          />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

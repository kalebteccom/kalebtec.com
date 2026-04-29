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
      <circle cx="8" cy="8" r="6.5" />
      <ellipse cx="8" cy="8" rx="3" ry="6.5" />
      <line x1="1.5" y1="8" x2="14.5" y2="8" />
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
            'inline-flex h-10 w-10 items-center justify-center rounded-full',
            'text-muted hover:text-heading hover:bg-surface',
            'transition-colors duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink',
            isPending && 'opacity-60 pointer-events-none',
          )}
          aria-label={t('ariaLabel', { locale: localeNames[locale as Locale] })}
        >
          <GlobeIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={cn(
            'z-[100] min-w-[200px] p-1',
            'bg-surface border border-border',
            'shadow-[0_8px_24px_rgba(8,15,17,0.08)]',
          )}
          sideOffset={8}
          align="end"
        >
          <div className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-faint">
            {t('label')}
          </div>

          {locales.map((loc) => {
            const isActive = locale === loc;
            return (
              <DropdownMenu.Item
                key={loc}
                onSelect={() => handleLocaleChange(loc)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 cursor-pointer outline-none',
                  'text-sm font-medium transition-colors duration-150',
                  isActive ? 'text-heading' : 'text-body',
                  'data-[highlighted]:bg-bg',
                )}
              >
                <span className="font-mono text-[11px] uppercase text-faint w-6 shrink-0">
                  {loc}
                </span>
                <span>{localeNames[loc]}</span>
                {isActive && <span className="ml-auto text-heading text-xs">●</span>}
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

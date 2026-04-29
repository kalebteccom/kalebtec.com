'use client';

import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { useTranslations } from 'next-intl';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { cn } from '@/lib/utils';
import { themeAtom, applyTheme, type Theme } from '@/lib/theme';

function SunIcon({ className }: { className?: string }) {
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
      <circle cx="8" cy="8" r="3.2" />
      <line x1="8" y1="0.5" x2="8" y2="2.5" />
      <line x1="8" y1="13.5" x2="8" y2="15.5" />
      <line x1="0.5" y1="8" x2="2.5" y2="8" />
      <line x1="13.5" y1="8" x2="15.5" y2="8" />
      <line x1="2.7" y1="2.7" x2="4.1" y2="4.1" />
      <line x1="11.9" y1="11.9" x2="13.3" y2="13.3" />
      <line x1="13.3" y1="2.7" x2="11.9" y2="4.1" />
      <line x1="4.1" y1="11.9" x2="2.7" y2="13.3" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
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
      <path d="M13 9.5A5.5 5.5 0 0 1 6.5 3a5 5 0 1 0 6.5 6.5z" />
    </svg>
  );
}

function MonitorIcon({ className }: { className?: string }) {
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
      <rect x="1.5" y="2.5" width="13" height="9" rx="1" />
      <line x1="8" y1="11.5" x2="8" y2="14" />
      <line x1="5" y1="14" x2="11" y2="14" />
    </svg>
  );
}

const themeOptions: { value: Theme; labelKey: 'light' | 'dark' | 'system'; Icon: typeof SunIcon }[] = [
  { value: 'light', labelKey: 'light', Icon: SunIcon },
  { value: 'dark', labelKey: 'dark', Icon: MoonIcon },
  { value: 'system', labelKey: 'system', Icon: MonitorIcon },
];

export default function ThemeToggle() {
  const [theme, setTheme] = useAtom(themeAtom);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('theme');

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-10 w-10" aria-hidden="true" />;
  }

  const handleSetTheme = (value: string) => {
    const themeValue = value as Theme;
    setTheme(themeValue);
    applyTheme(themeValue);
  };

  const ActiveIcon = theme === 'light' ? SunIcon : theme === 'system' ? MonitorIcon : MoonIcon;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className={cn(
            'inline-flex h-10 w-10 items-center justify-center rounded-full',
            'text-muted hover:text-heading hover:bg-surface',
            'transition-colors duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink',
          )}
          aria-label={t('ariaLabel', { theme: t(theme as 'light' | 'dark' | 'system') })}
        >
          <ActiveIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={cn(
            'z-[100] min-w-[180px] p-1',
            'bg-surface border border-border',
            'shadow-[0_8px_24px_rgba(8,15,17,0.08)]',
          )}
          sideOffset={8}
          align="end"
        >
          <div className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-faint">
            {t('label')}
          </div>

          <DropdownMenu.RadioGroup value={theme} onValueChange={handleSetTheme}>
            {themeOptions.map(({ value, labelKey, Icon }) => {
              const isActive = theme === value;
              return (
                <DropdownMenu.RadioItem
                  key={value}
                  value={value}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 cursor-pointer outline-none',
                    'text-sm font-medium transition-colors duration-150',
                    isActive ? 'text-heading' : 'text-body',
                    'data-[highlighted]:bg-bg',
                  )}
                >
                  <Icon className="shrink-0" />
                  <span>{t(labelKey)}</span>
                  <DropdownMenu.ItemIndicator className="ml-auto">
                    <span className="text-heading text-xs">●</span>
                  </DropdownMenu.ItemIndicator>
                </DropdownMenu.RadioItem>
              );
            })}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

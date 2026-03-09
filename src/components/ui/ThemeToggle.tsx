'use client';

import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
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
      <rect x="5" y="5" width="6" height="6" />
      <line x1="8" y1="0.5" x2="8" y2="3" />
      <line x1="8" y1="13" x2="8" y2="15.5" />
      <line x1="0.5" y1="8" x2="3" y2="8" />
      <line x1="13" y1="8" x2="15.5" y2="8" />
      <line x1="2.7" y1="2.7" x2="4.3" y2="4.3" />
      <line x1="11.7" y1="11.7" x2="13.3" y2="13.3" />
      <line x1="13.3" y1="2.7" x2="11.7" y2="4.3" />
      <line x1="4.3" y1="11.7" x2="2.7" y2="13.3" />
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
      <polyline points="10,1 6,3 4,6 4,10 6,13 10,15" />
      <polyline points="10,1 8,4 8,12 10,15" />
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
      <rect x="1" y="2" width="14" height="10" />
      <line x1="8" y1="12" x2="8" y2="14.5" />
      <line x1="5" y1="14.5" x2="11" y2="14.5" />
    </svg>
  );
}

const themeOptions: { value: Theme; label: string; Icon: typeof SunIcon }[] = [
  { value: 'light', label: 'LIGHT', Icon: SunIcon },
  { value: 'dark', label: 'DARK', Icon: MoonIcon },
  { value: 'system', label: 'SYSTEM', Icon: MonitorIcon },
];

export default function ThemeToggle() {
  const [theme, setTheme] = useAtom(themeAtom);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-8 w-8" aria-hidden="true" />;
  }

  const handleSetTheme = (value: Theme) => {
    setTheme(value);
    applyTheme(value);
  };

  const ActiveIcon = theme === 'light' ? SunIcon : theme === 'system' ? MonitorIcon : MoonIcon;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className={cn(
            'relative flex h-8 w-8 items-center justify-center',
            'border border-cyber-border bg-cyber-surface',
            'text-cyber-muted hover:text-cyber-heading hover:border-cyber-muted/40',
            'transition-all duration-300',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-heading/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cyber-bg',
            'cyber-border-glow',
          )}
          aria-label={`Theme: ${theme}. Click to change.`}
        >
          <ActiveIcon />
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
            [THEME]
          </div>

          {themeOptions.map(({ value, label, Icon }) => {
            const isActive = theme === value;

            return (
              <DropdownMenu.Item
                key={value}
                onSelect={() => handleSetTheme(value)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 cursor-pointer outline-none',
                  'font-mono text-xs uppercase tracking-wider',
                  'transition-colors duration-150',
                  'rounded-none',
                  isActive ? 'text-cyber-heading' : 'text-cyber-muted',
                  'data-[highlighted]:bg-cyber-heading/10 data-[highlighted]:text-cyber-heading',
                )}
              >
                <Icon
                  className={cn(
                    'shrink-0 transition-colors duration-150',
                    isActive ? 'text-cyber-heading' : 'text-cyber-muted',
                  )}
                />
                <span>{label}</span>
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

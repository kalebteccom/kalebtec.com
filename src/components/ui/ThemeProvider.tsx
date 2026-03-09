'use client';

import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { themeAtom, applyTheme } from '@/lib/theme';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme] = useAtom(themeAtom);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Listen for OS preference changes when theme is 'system'
  useEffect(() => {
    if (theme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => applyTheme(theme);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  return <>{children}</>;
}

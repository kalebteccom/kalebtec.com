import { atom } from 'jotai'

export type Theme = 'dark' | 'light' | 'system'

function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  return (localStorage.getItem('kalebtec-theme') as Theme) || 'dark'
}

export function resolveTheme(theme: Theme): 'dark' | 'light' {
  if (theme !== 'system') return theme
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const themeAtom = atom<Theme>(getStoredTheme())

/** Derived atom that always resolves to 'dark' | 'light' */
export const resolvedThemeAtom = atom<'dark' | 'light'>((get) => resolveTheme(get(themeAtom)))

export function applyTheme(theme: Theme) {
  const resolved = resolveTheme(theme)
  document.documentElement.setAttribute('data-theme', resolved)
  localStorage.setItem('kalebtec-theme', theme)
}

/** Read the resolved theme directly from the DOM (for use in non-React contexts like R3F useFrame) */
export function getResolvedTheme(): 'dark' | 'light' {
  if (typeof document === 'undefined') return 'dark'
  return (document.documentElement.getAttribute('data-theme') as 'dark' | 'light') || 'dark'
}

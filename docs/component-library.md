# Component library

Catalog of every reusable primitive in `src/components/ui/` and `src/hooks/`. **Read this before adding new UI** — if a primitive already covers the pattern, extend it rather than copying class strings.

The hard rule from CLAUDE.md: any UI pattern that appears in 2+ places lives as a component, not as inlined Tailwind class strings. See `engineering.md` (AHA section) for when to extract vs. duplicate.

---

## UI primitives — `src/components/ui/`

### `<Button>` / `<ButtonLink>`

`Button.tsx`. Pill button. Use for every CTA / form submit / inline action.

**Props:**

- `variant`: `'primary'` (brand purple) | `'ink'` (solid black/white) | `'secondary'` (outlined) | `'ghost'`
- `size`: `'sm'` | `'md'` (default) | `'lg'`
- `bullet`: `boolean` | `'white'` | `'brand'` | `'current'` | `'muted'` — leading accent dot
- All native `<button>` (or `<a>` for `ButtonLink`) attributes pass through

**Examples:**

```tsx
<Button variant="primary" size="md" bullet onClick={...}>Start a project</Button>
<ButtonLink href="/#contact" variant="primary" size="md" bullet>Start a project</ButtonLink>
<ButtonLink href="https://x.com/kalebtec_com" variant="ghost" size="sm">Follow</ButtonLink>
```

`ButtonLink` auto-routes through next-intl `<Link>` for internal paths and falls back to plain `<a>` for hash anchors, `mailto:`, and external URLs.

### `<StackedPill>`

`StackedPill.tsx`. The dark capsule that holds a row of related controls.

**Props:**

- `as`: `'div'` | `'nav'` | `'aside'` | `'header'`
- `padding`: `'sm'` | `'md'` (default) | `'lg'`
- All HTML attributes for the chosen tag

Backed by the `.nav-pill` CSS class which **locally inverts semantic tokens**, so any nested `<Button>`, `<LanguageSwitcher>`, `<ThemeToggle>` adopts the light-on-dark scheme without per-component dark-mode props.

**Examples:**

```tsx
<StackedPill as="nav" aria-label="Primary nav">
  <Link href="/about">About</Link>
  <Link href="/projects">Projects</Link>
  <ButtonLink href="/#contact" variant="primary" bullet>Start a project</ButtonLink>
</StackedPill>
```

### `<BulletDot>`

`BulletDot.tsx`. Small accent dot used in eyebrow labels, section numbers, button bullets, stat indicators.

**Props:**

- `color`: `'brand'` (default) | `'white'` | `'current'` | `'muted'` | `'faint'` | `'heading'`
- `size`: `'xs'` | `'sm'` (default) | `'md'`

### `<EyebrowLabel>`

`EyebrowLabel.tsx`. The mono "01 — About" or "Kalebtec — Tech consulting" eyebrow that introduces sections and hero blocks.

**Props:**

- `number`: optional section number to render in brand purple before the divider
- `accent`: `'dot'` (default) — leading bullet — | `'none'` | `'rule'` (a hairline rule between the number and label)
- `children`: the label text

**Examples:**

```tsx
<EyebrowLabel accent="dot">Kalebtec — Tech consulting</EyebrowLabel>
<EyebrowLabel number="01" accent="rule">About</EyebrowLabel>
```

### `<SectionHeading>`

`SectionHeading.tsx`. The `01 — About` mono eyebrow + huge editorial heading combo for section tops. Combines `<EyebrowLabel>` with the `<h2>` automatically.

### `<Logo>`

`Logo.tsx`. The Kalebtec mark + wordmark. Single source of truth — used in Header, Footer, and OG images.

**Props:**

- `size`: `'sm'` (24 px mark) | `'md'` (28 px, default) | `'lg'` (40 px)
- `wordmark`: `boolean` (default `true`) — show "Kalebtec" wordmark next to the mark
- `className`: extra classes for the wrapper

When you want a logo-only with no wordmark (e.g. mobile compact), use `<Logo wordmark={false} />`.

### `<Section>`

`Section.tsx`. Semantic `<section>` wrapper that bakes in our band tones, vertical rhythm, and `aria-label`.

**Props:**

- `tone`: `'bg'` (cream/ink) | `'surface'` (paper-soft) | `'tint'` (soft purple-tint) | `'dark'` (full ink band)
- `padding`: `'lg'` (default `py-24 md:py-32`) | `'md'` (`py-16 md:py-24`)
- `id`: anchor id for hash navigation
- `aria-label` (required) for screen readers
- `children`: section content

```tsx
<Section id="about" tone="bg" aria-label={t('ariaLabel')}>
  ...
</Section>
```

### `<Stat>` and `<StatGrid>`

`Stat.tsx`. The big-number + small-label statistic block used in About and ProjectsSectionClient.

**Props (Stat):**

- `value`: the headline number / value
- `label`: the small caption below
- `index`: optional `01`-style index rendered in brand purple
- `accent`: `'dot'` | `'none'` (default `'dot'`) — render a brand BulletDot above the value

**Props (StatGrid):**

- `columns`: `2` | `3` | `4` (default `4`)
- `divided`: render hairline dividers between cells (used in ProjectsSectionClient)
- `children`: `<Stat>` items

### `<AnimatedReveal>`

`AnimatedReveal.tsx`. Framer Motion scroll-reveal wrapper — gentle 12 px translate, 0.5 s, gentle easing. Respects `prefers-reduced-motion`.

### `<CookieBanner>`, `<KonamiCode>`, `<ThemeToggle>`, `<LanguageSwitcher>`, `<ThemeProvider>`

Higher-level components that aren't pure primitives but live in `ui/` because they're site-wide. Don't extract anything from them without a clear AHA-passing reason.

---

## Hooks — `src/hooks/`

### `useCardFlip()`

`useCardFlip.ts`. 3D tilt + click/keyboard flip card behaviour. Used by TeamSection's flip card, but designed to be reusable for any card-style flip interaction.

**Returns:** `{ cardRef, isFlipped, handleMouseMove, handleMouseLeave, handleTouchStart, handleClick, handleKeyDown }`

**Options:** `{ maxTilt?: number }` (default 3°)

### `useMultiClickTrigger()`

`useMultiClickTrigger.ts`. Detect rapid N-click patterns (e.g. logo 5-click for the easter-egg flash). Returns a click handler and a "triggered" state.

**Returns:** `{ onClick, triggered }` (triggered briefly flips to `true` then resets)

**Options:** `{ count: number; window: number; cooldown: number; onTrigger?: () => void }`

---

## SEO helpers — `src/lib/seo/jsonld.ts`

Builders for structured data. The homepage and project pages use these instead of inlining giant Schema.org objects. See the file for the full list:

- `buildOrganizationLD(locale, opts)` — Organization with logo, founders, contact, sameAs
- `buildWebSiteLD(locale, opts)` — WebSite linked to Organization
- `buildBreadcrumbLD(items)` — BreadcrumbList for any path
- `buildCreativeWorkLD(project, locale)` — CreativeWork for a project detail page
- `buildItemListLD(items, name)` — Generic ItemList for collections of links
- `buildServiceListLD(services, locale)` — ItemList of Service items pulled from translations

---

## When to extract a new primitive

Per `engineering.md`'s AHA rule: **wait for three real usages of the same shape**. Two duplications is fine; the third is the trigger.

When you do extract:

1. Create the component in `src/components/ui/` with a focused API
2. Add it to this catalog
3. Refactor all current usages to the new component in the same PR (don't leave duplicate inline copies behind)
4. Cross-link from `engineering.md` if the pattern teaches a principle

Reverse direction: if a component grows past ~5 props or starts branching its render with `if (variant === ...)`, that's a smell. Split it back into two siblings.

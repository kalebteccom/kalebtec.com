# Design principles

This document captures the design language we ship — a synthesis of:

1. **Apple Human Interface Guidelines** (HIG) for first-principles design — clarity, deference, depth, accessibility, motion. <https://developer.apple.com/design/human-interface-guidelines>
2. **New Relic editorial minimalism** for the visual identity we adopted — cream paper + near-black ink, massive Inter typography, pill capsules, brand purple as a micro-accent.

When the two are in tension, HIG wins on accessibility and behaviour; the editorial direction wins on aesthetic.

---

## 1. The three Apple HIG principles

### Clarity

Text is legible. Icons are precise. Adornments serve, not decorate. Whitespace, color, and typography do the heavy lifting; visual chrome is restrained.

What this means in this codebase:

- Body and headlines share **Inter** with weight + tracking variation; we don't reach for a third font for "decoration."
- Labels are mono (Geist Mono), small, and few — overuse defeats the editorial restraint.
- Iconography is line-art, 1.5 px stroke, drawn on the same 20 / 24 / 32 px grid.
- Surface borders are at most 1 px and use subtle opacity tokens (`border` / `border-strong`), not strong colors.

### Deference

Content is the star. Chrome (nav, toolbars, modals) recedes. The interface helps users understand and interact with content, not the other way around.

In practice:

- Header is fixed but transparent until scroll, then it becomes a soft `bg/85` blur — never opaque enough to fight the page.
- Section bands use *muted* tonal differences (cream / paper-soft / soft purple-tint / ink) — never bright contrast that overshadows content.
- Animations are gentle: 12 px translation, 0.5 s duration, no bouncy easing.

### Depth

Distinct visual layers convey hierarchy and provide context. Motion and transitions hint at the relationship between layers.

In practice:

- The hero uses a soft GLSL mesh-gradient shader behind text — depth without distraction.
- StackedPill capsules float above the page surface (the dark pill on cream creates an unmistakable layer).
- Modals (mobile menu, dropdowns) overlay with a subtle backdrop blur; they don't slam on with hard shadows.

---

## 2. Hierarchy

Hierarchy comes from **size, weight, and tracking** before color. The editorial style means heavy headlines (Inter 700–800, -0.04em tracking, clamp-scaled) versus calm body copy (Inter 400–500, 1.5 line-height).

The semantic scale, from loudest to softest:

| Token | Tag / utility | Where |
|---|---|---|
| Display XL | `<h1>` + `.text-display-xl` | Hero, project detail, error / 404 headlines |
| Display LG | `<h2>` + `.text-display-lg` | Section headings |
| Display MD | `<h3>` + `.text-display-md` | Sub-section, feature card title |
| Display SM | `<h4>` + `.text-display-sm` | Smaller headings inside sections |
| Editorial lead | `.editorial-lead` | The single signature paragraph below a hero / section heading |
| Body | `text-base` / `text-lg` | Main reading text |
| Label / mono | `font-mono text-xs uppercase tracking-widest` | Eyebrow labels, stat captions |
| Faint | `text-faint` | Tertiary metadata |

**Avoid** mixing more than two display tiers in a single section. Stick to "one big thing + supporting body."

---

## 3. Color

Strict 2-tone — cream paper (`#e5e4d8`) on light, near-black ink (`#080f11`) on dark — with brand purple (`#8000FF`) as a micro-accent only.

We do **not** introduce additional accent colors. If a state needs to be marked, do it through:

- A small `<BulletDot>` in `brand` color
- A `<Button variant="primary">` (which uses brand purple)
- A border or underline emphasis
- Bold type weight

Never invent a new accent color for a one-off feature. The brand has one accent.

### WCAG AA contrast audit (passing on both themes)

- `heading` on `bg`: ≥ 18:1
- `body` on `bg`: ≥ 18:1 (same as heading — both ink/paper)
- `muted` on `bg` (light = 0.72 opacity, dark = 0.78): ≥ 7:1 — passes AAA
- `faint` on `bg` (light = 0.62 opacity, dark = 0.62): ≥ 4.5:1 — passes AA Normal
- `brand` (`#8000FF`) on cream: ~6.5:1 — passes AA Normal

Don't push opacity below `0.62` on text. We tested it — it fails.

---

## 4. Touch targets and spacing

Per HIG, the minimum interactive target is **44 × 44 pt**. Tailwind's `min-h-11 min-w-11` (44 px) is the standard for mobile-first interactive elements. Never go smaller for a tap target — even if the visual icon is 16 × 16 px, the surrounding hit area must reach 44 px.

Where this matters:

- Hamburger button — `min-h-11 min-w-11` ✓
- Footer social-icon links — `min-h-11 min-w-11` ✓
- Any icon-only button anywhere ✓

For text-button targets, our pill buttons hit ≥ 36 px height which is acceptable for desktop but should bump to 44 px on touch. This is handled by the `<Button size="md">` defaults and tested at small viewports.

### Vertical rhythm

Sections use `py-24 md:py-32` consistently — the rhythm is the brand. Don't randomly use `py-16` or `py-40` for "this section feels like it needs more space." If a section needs more drama, use `<Section variant="dark">` to change tone, not padding.

---

## 5. Motion

> *"Motion conveys status, provides feedback, enhances the sensation of direct manipulation, and helps people visualize the results of their actions. Motion shouldn't be an end in itself."* — Apple HIG, paraphrased.

Rules:

- **Every animation respects `prefers-reduced-motion: reduce`**. We do this in two ways: globally in `globals.css` (`animation-duration: 0.01ms !important`) and explicitly via `useReducedMotion()` in components that orchestrate complex sequences.
- **Default duration**: 200 ms for hover / state changes, 500 ms for scroll-reveal, 700 ms for layout transitions.
- **Default easing**: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` — gentle, no bounce. We export this as the `EASE` constant in section components.
- **No infinite-loop animations** without a clear reason. Decorative idle motion (hero scene) is fine; UI element pulsing is not.
- **Transitions explain causation**. A button press flashes the button, not the whole layout.

---

## 6. Adaptivity (responsive)

Three breakpoints carry the design:

- **`sm` (≥640 px)** — phone landscape and small tablet portrait
- **`md` (≥768 px)** — tablet portrait
- **`lg` (≥1024 px)** — laptop and up

Where the desktop chrome (full nav, multi-column sections) collapses depends on the surface:

- **Header**: full nav-pill at `lg+`, compact CTA + hamburger at `md` and below.
- **Multi-column sections** (About, Services, Projects, Team): collapse stack at `md` and below.
- **Project detail richtext**: prose-sm at `<sm`, prose-base at `sm+`.

Type uses **fluid clamps** (every `text-*` utility is `clamp()`-based) so the steps between breakpoints aren't jarring.

---

## 7. Icons

- Line art, 1.5 px stroke
- Drawn on a 20 × 20 or 24 × 24 grid (some 32 × 32 for the section-card SVGs)
- Rounded line-cap unless the geometric shape demands square
- `currentColor` for stroke / fill — colors are inherited from text color, not specified per-icon

Inline SVG over icon libraries — keeps bundle small and lets us tune each icon to fit the editorial line-art aesthetic.

---

## 8. Accessibility (HIG + WCAG)

Apple HIG and WCAG mostly agree, but here's our binding rules:

- All sections and regions have `aria-label` (or `aria-labelledby` to a heading inside).
- All decorative SVGs have `aria-hidden="true"`.
- Focus-visible has a 2 px outline using `--color-ink` (or `--color-paper-soft` on dark theme). Never `outline: none` without a replacement.
- All form fields have a real `<label>` (no placeholder-only labels), `autocomplete` attribute, and aria-describedby for errors.
- Skip-to-content link is the first focusable element on every page.
- Modals trap focus and return it to the trigger on close (MobileMenu does this).
- We support `prefers-reduced-motion`, `prefers-contrast`, `prefers-reduced-transparency`, `inverted-colors`, `forced-colors` — see globals.css.

---

## 9. Privacy by design

- No third-party tracking by default. Cookies are essential-only.
- The cookie banner offers a real Decline option that actually declines (writes the consent and stops the banner from reappearing).
- We do not load fonts from Google Fonts at runtime once self-hostable — we use `next/font/google` which inlines the relevant subset locally.
- Email addresses are not exposed via `mailto:` links that include trackers.

---

## 10. Editorial brand voice (the layer specific to Kalebtec)

The visual identity sits on top of the principles above. It's our personality:

- **Cream paper + near-black ink.** No white. Cream is intentional.
- **Sentence-case everything** in nav, body, labels (the only ALL CAPS surfaces are mono labels and they're typed lowercase + uppercased via CSS).
- **Confident, terse copy.** Headlines are statements, not questions. "Engineering with intent." "Software that lasts."
- **Brand purple is reserved.** It appears on `::selection`, primary CTAs, the BulletDot accent, the hero accent bar, and the Konami easter egg. Not on backgrounds, not on body text, not on borders.
- **Mono is for labels, not running text.** Reserve `font-mono` for `01 — About`-style eyebrow labels and the legal `© 2026` line.
- **Pill CTAs only.** Cards, inputs, panels, and dropdowns are square. Never reach for `rounded-2xl` for a card.

If a future addition fights any of these, push back before adding it.

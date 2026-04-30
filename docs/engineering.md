# Engineering principles

This project follows the methodology championed by **Kent C. Dodds** (kentcdodds.com): pragmatic, test-driven, composition-first React. The summary below is the authoritative version for this codebase — read this before reaching for clever abstractions.

External reading we draw from:

- AHA Programming — https://kentcdodds.com/blog/aha-programming
- The Wrong Abstraction (Sandi Metz, blogged about by Kent) — https://kentcdodds.com/blog/aha-programming
- State Colocation — https://kentcdodds.com/blog/state-colocation-will-make-your-react-app-faster
- Compound Components — https://kentcdodds.com/blog/compound-components-with-react-hooks
- Inversion of Control — https://kentcdodds.com/blog/inversion-of-control
- Don't Sync State — https://kentcdodds.com/blog/dont-sync-state-derive-it
- The Testing Trophy — https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications

---

## 1. AHA — Avoid Hasty Abstractions

> *"Prefer duplication over the wrong abstraction. The wrong abstraction is much harder to recover from than duplication."* — paraphrased from Sandi Metz, repeatedly cited by Kent.

**Rule of three**: don't extract a shared abstraction (component, hook, util) until you have **three** real, current usages of the pattern. With one usage, just write it inline. With two, look at how the second one differs from the first — that informs whether they're actually the same shape. With three, the pattern is observable and you can extract a primitive that doesn't lock you into a wrong shape.

**When in doubt, duplicate.** Two near-identical 15-line blocks are easier to evolve into divergent shapes later than one over-parameterized 50-line component with eight props. A few duplicate lines are not a code smell; a wrong abstraction is.

**Symptoms of a wrong abstraction in this codebase**:
- A component with `if (variant === 'foo') return <X /> else return <Y />` — you have two components, not one.
- Boolean props that flip large parts of the render tree (`fullWidth`, `withHeader`, `noPadding`) — likely two components.
- Props that are only ever passed by one consumer — that prop should be a default.
- Components that take all of the parent's data and pass through it — pass smaller pieces or use composition.

When you spot one of these, **un-abstract**. Splitting two siblings is much cheaper than rewriting consumers later.

---

## 2. Composition over configuration

> *"Inversion of control: give the consumer the power."* — Kent.

Prefer **passing children** over **adding props**.

```tsx
// 🙅  Configuration explosion — every variant adds another prop
<Card title="Hello" subtitle="World" actionLabel="Save" actionHref="/x" theme="dark" iconName="check" />

// ✅  Composition — the consumer composes the shape they need
<Card>
  <Card.Header>
    <Card.Title>Hello</Card.Title>
    <Card.Subtitle>World</Card.Subtitle>
  </Card.Header>
  <Card.Action href="/x">Save</Card.Action>
</Card>
```

**Compound components** (`<Tabs><TabList><Tab/></TabList></Tabs>`) make APIs flexible without prop drilling. Use React context internally to coordinate them.

**When to prefer props over composition**: when the variation is purely visual (`size`, `variant`, `color`) and the *shape* is the same. `<Button variant="primary" size="md">` is fine because every Button has the same internal shape — just different paint. Use props for paint, composition for structure.

---

## 3. State colocation

> *"State should live as close to where it's used as possible."* — Kent.

- **Lift state up only when two siblings need it.** If only one component reads a piece of state, it lives inside that component.
- **Don't reach for global state by default.** Most "global" state is actually URL state, server state (use the loader / server component), or local state that got hoisted too aggressively.
- **Server Components by default.** Move the `'use client'` boundary as far down the tree as possible. Most of our pages are server components; only HeroSection / TeamSection / ContactSection / Header / interactive UI should be client.

**Specific to this codebase**:
- `themeAtom` (Jotai) is global by necessity — every consumer can flip it. Keep it.
- Form state in ContactSection is local — keep it there, don't lift it.
- `usePathname` for active-nav-link state — derive, don't sync to local state.

---

## 4. Don't sync state — derive it

> *"`useEffect` to sync derived state is almost always a bug. Compute it during render instead."* — Kent.

```tsx
// 🙅  Sync via effect — extra render, possible drift, hooks you'll regret
const [fullName, setFullName] = useState('');
useEffect(() => {
  setFullName(`${first} ${last}`);
}, [first, last]);

// ✅  Derive during render
const fullName = `${first} ${last}`;
```

If a value can be calculated from props or other state, **calculate it during render**. Memoize with `useMemo` only when the calculation is genuinely expensive *and* the inputs are stable.

**`useEffect` is for synchronizing with external systems** (DOM, network, intervals, third-party libraries). It is not for "stuff that needs to happen when X changes" — that's usually an event handler.

---

## 5. Custom hooks for reusable behavior

When you have logic that:
- crosses multiple components, **and**
- is genuinely the same shape (AHA rule of three applies), **and**
- has a clear input/output contract,

extract it into a `use*` hook in `src/hooks/`. Hooks compose, hide implementation, and can be tested independently.

**Anti-pattern to avoid**: a hook that returns 12 things. If your hook returns more than ~5 named values, it's probably doing too much. Split it.

**Existing hooks** (extend, don't duplicate):

| Hook | File | Purpose |
|---|---|---|
| `useCardFlip` | `src/hooks/useCardFlip.ts` | 3D tilt + click/keyboard flip card behaviour. Used by TeamSection. |

---

## 6. Use the platform

Prefer web standards over custom solutions:

- `<dialog>` over modal libraries when possible (with Radix as the fallback when we need accessible composition primitives).
- `<details>` / `<summary>` for native disclosure.
- CSS `clamp()`, `min()`, `max()` for fluid layout — already pervasive in our typography scale.
- CSS `:focus-visible`, `:has()`, `@supports`.
- Anchor links with native scroll-into-view (no fancy scroll libraries).
- Form validation via the constraint validation API (`required`, `pattern`, `type="email"`) before reaching for a form library.

We avoid wrapping every primitive in a library when the platform is enough.

---

## 7. Accessibility is a first-class engineering concern

Not "we'll polish a11y later" — accessibility is part of the spec for every component.

- Semantic HTML first. `<button>` for actions, `<a>` for navigation, `<nav>`, `<main>`, `<article>`, `<section>` for landmarks.
- `aria-label` on every section / region / icon-only button.
- Focus management on every modal-like UI (`<MobileMenu>` traps focus, returns to trigger on close).
- All interactive elements must work with keyboard alone.
- Respect `prefers-reduced-motion` — gate every animation, don't just shorten durations.
- WCAG AA contrast (4.5:1 normal text, 3:1 large) — see `design.md` for the palette audit.

If a primitive in `src/components/ui/` fails any of the above, that's a bug.

---

## 8. Don't over-engineer; ship pragmatic code

A few rules of thumb we live by:

- **No premature TypeScript gymnastics.** Generics only when there's real polymorphism. `as React.ElementType` over a 4-line conditional type if it works.
- **No premature performance.** `useMemo` and `useCallback` only when there's a measured problem.
- **No premature abstractions.** See AHA above.
- **No new dependencies for trivial things.** A 12-line custom hook beats a 50KB library every time.
- **Inline comments explain WHY, not WHAT.** The code says what; the comment exists only when the why is non-obvious (a workaround, a constraint, a subtle invariant).

---

## 9. Folder structure

```
src/
  app/              # Next.js routes (server components by default)
  components/
    ui/             # Design system primitives — see design.md + component-library.md
    layout/         # Site-wide chrome (Header, Footer, MobileMenu)
    sections/       # Page-section components (HeroSection, AboutSection, …)
    hero/           # Hero-specific components (kept separate due to R3F deps)
    three/          # React Three Fiber components
    seo/            # JSON-LD wrapper
  hooks/            # Custom React hooks — see this file's section 5
  lib/
    metadata.ts     # SEO metadata helpers
    seo/jsonld.ts   # Structured-data builders
    theme.ts        # Jotai theme atom
    utils.ts        # cn() and small utilities
  messages/         # i18n JSON files (next-intl)
  i18n/             # next-intl routing config
  seed/             # Payload seed data + scripts
```

`src/components/ui/` is the design system. Anything imported from there should be presentational and reusable. If a component in `ui/` reaches into Payload, business data, or page-specific logic, it doesn't belong there — move it to `sections/` or co-locate with the page.

---

## 10. Quick checklist before opening a PR

- [ ] No new className blobs duplicated 2+ times — extract a primitive (see `component-library.md`).
- [ ] No `useEffect` syncing derived state.
- [ ] All interactive elements keyboard-accessible.
- [ ] `aria-label` on every section / region / icon-only control.
- [ ] Light + dark theme both look right.
- [ ] Mobile (`<sm`), tablet (`md`), desktop (`lg+`) all render cleanly.
- [ ] `prefers-reduced-motion` doesn't break anything.
- [ ] `pnpm exec tsc --noEmit` passes.
- [ ] Locale switcher exercised — every visible string comes from `next-intl`.

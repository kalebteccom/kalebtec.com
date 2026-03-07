# kalebtec.com

**Kalebtec** is a tech consulting company run by **Rowin Hernandez** (Co-Founder & Lead Engineer) and **Mari Hernandez** (Co-Founder & Operations Lead). Contact: hello@kalebtec.com

---

## IMPORTANT: Use Skills for This Project's Technologies

This project has **three expert-level skills** that MUST be used when working with the core technologies. Always invoke the relevant skill before making changes.

| Skill | Trigger | Invoke with |
|-------|---------|-------------|
| **Tailwind CSS** | Styling, utility classes, responsive design, @theme config, cyberpunk design patterns, neon glow effects, GLSL shader integration | `/tailwindcss` |
| **Next.js** | Routing, data fetching, server/client components, caching, middleware, metadata, Three.js/R3F integration, Framer Motion animations | `/nextjs` |
| **Payload CMS** | Collections, fields, hooks, access control, auth, admin panel, MongoDB, Local API, content modeling | `/payloadcms` |

**Always invoke the relevant skill before:**
- Creating or modifying components (use both `/nextjs` and `/tailwindcss`)
- Setting up or modifying content models (use `/payloadcms`)
- Working on data fetching or API integration (use `/nextjs` and `/payloadcms`)
- Building 3D scenes or animations (use `/nextjs` for R3F patterns)
- Configuring the project (use whichever skill matches the config file)

---

## Tech Stack (Pinned Versions)

| Technology | Version | Notes |
|-----------|---------|-------|
| Next.js | 15.4.11 | App Router only. Pinned for Payload CMS peer dep compatibility. |
| Tailwind CSS | 4.2.1 | CSS-first config with `@theme` in globals.css, not tailwind.config.js |
| Payload CMS | 3.79.0 | Runs inside Next.js, MongoDB via mongoose adapter |
| React | 19.2.4 | |
| React Three Fiber | 9.5.0 | 3D scenes and GLSL shaders |
| Three.js | 0.183.2 | |
| Drei | 10.7.7 | R3F helper components |
| Framer Motion | 12.35.0 | Page animations and scroll-triggered reveals |
| TypeScript | 5.9.3 | |
| PostCSS | via @tailwindcss/postcss 4.2.1 | Config in postcss.config.mjs |

---

## Design Direction: Cyberpunk / Square / HUD-Tech

### Core Principles
- **Zero rounded corners** -- everything sharp and square. Never use `rounded-*` classes.
- **Dark background**: `#09090f` (cyber-bg), surface: `#0d0d15` (cyber-surface)
- **Neon purple primary**: `#8000FF` (brand) with glow effects
- **Cyan accent**: `#00ffff` (cyber-cyan) for secondary highlights
- **Bracket decorations** for nav items and labels: `[ABOUT]`, `[01] // SECTION_NAME`
- **Corner accent marks** on cards using the `cyber-corners` CSS class
- **Scanline overlays** for retro-CRT feel
- **Custom GLSL mesh gradient** shader background (MeshGradient component)
- **Tron-style perspective grid floor** (GridFloor component)

### Fonts
| CSS Variable | Font | Usage |
|-------------|------|-------|
| `font-display` | **Orbitron** | Bold cyberpunk headings |
| `font-sans` | **Inter** | Body text |
| `font-mono` | **JetBrains Mono** | Terminal-style text, code, accents |

### Tailwind Theme Colors (defined via @theme in globals.css)
| Token | Value | Usage |
|-------|-------|-------|
| `brand` | `#8000FF` | Primary purple |
| `brand-light` | `#a64dff` | Lighter purple variant |
| `brand-dark` | `#5c00b8` | Darker purple variant |
| `brand-glow` | `rgba(128,0,255,0.4)` | Purple glow/shadow |
| `cyber-cyan` | `#00ffff` | Cyan accent |
| `cyber-cyan-glow` | `rgba(0,255,255,0.3)` | Cyan glow/shadow |
| `cyber-magenta` | `#ff00ff` | Magenta accent |
| `cyber-bg` | `#09090f` | Page background |
| `cyber-surface` | `#0d0d15` | Card/panel backgrounds |
| `cyber-border` | `rgba(128,0,255,0.2)` | Subtle border color |

### CSS Utility Classes (defined in globals.css)
| Class | Effect |
|-------|--------|
| `.scanlines` | CRT scanline overlay (requires `position: relative`) |
| `.cyber-corners` | Corner accent marks on cards (top-left, bottom-right) |
| `.neon-glow` | Purple text shadow glow |
| `.neon-glow-cyan` | Cyan text shadow glow |
| `.cyber-border-glow` | Animated purple box-shadow border, intensifies on hover |
| `.glitch-hover` | Glitch shake animation on hover |
| `.cyber-grid-bg` | 40px grid background pattern in subtle purple |
| `.typing-cursor` | Blinking pipe cursor `|` appended via `::after` |

---

## Project Structure

```
src/
  app/
    (frontend)/           # Public-facing site
      layout.tsx          # Root layout: fonts, Header, Footer
      page.tsx            # Homepage (single-page with sections)
      globals.css         # Tailwind @theme + cyberpunk CSS utilities
    (payload)/            # Payload CMS admin panel
      admin/[[...segments]]/page.tsx
      layout.tsx
    global-error.tsx
  collections/            # Payload CMS collections
    Users.ts
    Media.ts
    Projects.ts
    Services.ts
    TeamMembers.ts
  globals/                # Payload CMS globals
    SiteSettings.ts
  components/
    hero/
      HeroSection.tsx     # Main hero with 3D scene
    sections/
      AboutSection.tsx
      ServicesSection.tsx
      TeamSection.tsx
      ContactSection.tsx
    three/                # React Three Fiber / WebGL
      HeroScene.tsx       # R3F Canvas scene
      MeshGradient.tsx    # Custom GLSL shader background
      GridFloor.tsx       # Tron-style perspective grid
      FloatingGeometry.tsx
      ParticleField.tsx
    layout/
      Header.tsx
      Footer.tsx
      MobileMenu.tsx
    ui/
      SectionHeading.tsx  # Numbered section headings [01] // TITLE
      AnimatedReveal.tsx  # Framer Motion scroll reveal wrapper
  payload.config.ts       # Payload CMS config (collections, globals, DB)
  payload-types.ts        # Auto-generated types (run: pnpm generate:types)
```

---

## Key Architecture Decisions

1. **Payload 3.79.0 requires Next.js >=15.4.11 <15.5.0** -- do NOT upgrade Next.js without checking Payload peer deps first. This is the most common source of build failures.

2. **App Router only** -- no Pages Router. Server Components by default; use `'use client'` only when necessary (interactivity, hooks, browser APIs).

3. **Tailwind v4 uses `@theme` in CSS** -- theme tokens are defined in `globals.css`, not `tailwind.config.js`. PostCSS config is in `postcss.config.mjs` with `@tailwindcss/postcss`.

4. **Payload Local API for data fetching** -- use `getPayload()` in Server Components. Do not use REST or GraphQL endpoints for server-side data.

5. **Payload `importMap.js` is tracked in git** (not gitignored) -- it is required for CI/production builds.

6. **All Framer Motion `ease` arrays must be cast** as `[number, number, number, number]` tuples to satisfy TypeScript.

7. **R3F `bufferAttribute`** uses `args={[array, itemSize]}` pattern -- do not pass `array` and `itemSize` as separate props.

8. **Next.js config wraps with `withPayload`** -- see `next.config.ts`. The Payload wrapper handles necessary webpack/turbopack configuration.

---

## Quick Reminders

- **No rounded corners.** Use `rounded-none` if a library default adds rounding. The design is sharp/square everywhere.
- **Prefer Server Components** for data fetching; reserve Client Components for interactivity and R3F.
- **Use `getPayload()` + Local API** in Server Components to fetch content.
- **Never construct Tailwind class names dynamically** with string interpolation (e.g., `` `text-${color}` `` will not work).
- **Always define access control** on every Payload collection.
- **Use `revalidateTag()` / `revalidatePath()`** in Payload hooks for cache invalidation.
- **Font variables** (`--font-inter`, `--font-orbitron`, `--font-jetbrains-mono`) are set on `<html>` via `next/font/google`.
- **Custom scrollbar** is already styled in globals.css (thin purple on dark track).
- **`sharp`** is included as a dependency for Payload image processing.
- Scripts: `pnpm dev`, `pnpm build`, `pnpm generate:types`, `pnpm payload`.

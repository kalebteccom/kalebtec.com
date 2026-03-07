---
description: "Expert Tailwind CSS v4 guidance for utility-first, responsive UIs with CSS-first @theme configuration. USE THIS SKILL whenever working with Tailwind CSS classes, styling components, responsive design, dark mode, cyberpunk design patterns, neon glow effects, custom theme colors (brand, cyber-cyan, cyber-bg), CSS utility classes for HUD/tech aesthetics, or GLSL shader styling integration."
---

# Tailwind CSS Expert Skill

## Core Philosophy

Tailwind CSS is a utility-first CSS framework. Instead of writing custom CSS classes with semantic names, you compose designs by applying small, single-purpose utility classes directly in markup. This is not inline styles -- utilities are constrained to a design system, support responsive breakpoints, state variants (hover, focus, dark mode), and produce smaller CSS output because utilities are shared across elements.

**Why utility-first works:**
- Changes to a utility class only affect the element it is on -- no cascade side-effects
- CSS stops growing linearly with features because utilities are reused
- Structure and styling live together, making components portable
- No time wasted inventing class names like `.card-wrapper-inner-header`

## Tailwind CSS v4 (Current)

Tailwind v4 (released January 2025) is a ground-up rewrite. Key changes from v3:

- **CSS-first configuration**: Use `@theme` in CSS instead of `tailwind.config.js`
- **Single import**: Replace `@tailwind base; @tailwind components; @tailwind utilities;` with `@import "tailwindcss";`
- **Automatic content detection**: No manual `content` array -- it scans all non-gitignored, non-binary files automatically
- **Built-in import support**: No need for `postcss-import`
- **Native cascade layers, `@property`, `color-mix()`**
- **OKLCH color palette**: More perceptually uniform and vivid
- **Container queries built-in**: No plugin needed
- **3x-180x faster builds** depending on scenario

### v4 Installation

**With Vite (recommended):**
```bash
npm install tailwindcss @tailwindcss/vite
```

```ts
// vite.config.ts
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
})
```

**With PostCSS:**
```bash
npm install tailwindcss @tailwindcss/postcss
```

```js
// postcss.config.js
export default {
  plugins: ["@tailwindcss/postcss"],
}
```

**CSS entry point (both methods):**
```css
@import "tailwindcss";
```

## Class Ordering Convention

While Tailwind does not enforce order, a consistent convention improves readability. Recommended order (outside-in, then visual):

1. **Layout/Position**: `relative`, `absolute`, `fixed`, `sticky`, `z-10`, `inset-0`
2. **Display/Box model**: `block`, `flex`, `grid`, `inline-flex`, `hidden`
3. **Flex/Grid properties**: `flex-col`, `items-center`, `justify-between`, `gap-4`, `grid-cols-3`
4. **Sizing**: `w-full`, `h-64`, `max-w-md`, `min-h-screen`, `size-12`
5. **Spacing**: `p-4`, `px-6`, `py-2`, `m-auto`, `mt-8`, `space-x-4`
6. **Typography**: `font-bold`, `text-lg`, `text-gray-900`, `leading-tight`, `tracking-wide`
7. **Visual/Decorative**: `bg-white`, `rounded-lg`, `border`, `shadow-md`, `opacity-75`
8. **Transitions/Animations**: `transition-colors`, `duration-200`, `ease-in-out`, `animate-spin`
9. **State variants**: `hover:bg-blue-600`, `focus:ring-2`, `dark:bg-gray-800`
10. **Responsive overrides**: `sm:flex-row`, `md:text-xl`, `lg:grid-cols-4`

Use the **Prettier plugin for Tailwind CSS** (`prettier-plugin-tailwindcss`) to automate class sorting.

## Responsive Design

Tailwind uses a **mobile-first** breakpoint system. Unprefixed utilities apply at all sizes; prefixed utilities apply at that breakpoint **and above**.

### Default Breakpoints

| Prefix | Min-width | Typical device |
|--------|-----------|----------------|
| `sm`   | 640px (40rem) | Large phones / small tablets |
| `md`   | 768px (48rem) | Tablets |
| `lg`   | 1024px (64rem) | Laptops |
| `xl`   | 1280px (80rem) | Desktops |
| `2xl`  | 1536px (96rem) | Large desktops |

### Mobile-first pattern

```html
<!-- Stack on mobile, row on medium screens and up -->
<div class="flex flex-col md:flex-row gap-4">
  <div class="w-full md:w-1/3">Sidebar</div>
  <div class="w-full md:w-2/3">Content</div>
</div>
```

**Key rule**: Design for mobile first, then add `sm:`, `md:`, `lg:` overrides. Never use `sm:` to target mobile -- mobile is the unprefixed default.

### Max-width variants

Use `max-*` variants to target below a breakpoint:

```html
<div class="max-md:hidden">Only visible on md and above</div>
```

### Targeting a single breakpoint range

```html
<div class="md:max-lg:flex">Only flex between md and lg</div>
```

### Custom breakpoints in v4

```css
@theme {
  --breakpoint-xs: 30rem;
  --breakpoint-3xl: 120rem;
}
```

### Arbitrary one-off breakpoints

```html
<div class="min-[900px]:flex max-[600px]:hidden">...</div>
```

### Container Queries (v4 built-in)

```html
<div class="@container">
  <div class="flex flex-col @md:flex-row">
    <!-- Responds to container width, not viewport -->
  </div>
</div>
```

Named containers: `@container/sidebar` with `@md/sidebar:flex-row`.

## Dark Mode

### Default: OS preference (prefers-color-scheme)

```html
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  <p class="text-gray-600 dark:text-gray-400">Adapts to OS setting</p>
</div>
```

### Manual toggle (class-based) in v4

```css
/* app.css */
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
```

```html
<html class="dark">
  <body class="bg-white dark:bg-gray-950">...</body>
</html>
```

### Data-attribute strategy

```css
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));
```

### Three-way toggle (light / dark / system)

Place this inline in `<head>` to prevent flash of unstyled content (FOUC):

```html
<script>
  document.documentElement.classList.toggle(
    "dark",
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
</script>
```

```js
// Toggle functions
localStorage.theme = "light";           // Force light
localStorage.theme = "dark";            // Force dark
localStorage.removeItem("theme");       // Follow OS
```

## State Variants

### Interactive states

```html
<button class="bg-blue-500 hover:bg-blue-600 focus:outline-2 focus:outline-blue-500 focus:outline-offset-2 active:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
  Submit
</button>
```

### Group -- style children based on parent state

```html
<a href="#" class="group rounded-lg p-4 hover:bg-sky-500">
  <h3 class="text-gray-900 group-hover:text-white">Title</h3>
  <p class="text-gray-500 group-hover:text-white">Description</p>
</a>
```

**Named groups** for nesting:

```html
<div class="group/card">
  <div class="group/button">
    <span class="group-hover/card:text-blue-500 group-hover/button:underline">
      Text
    </span>
  </div>
</div>
```

### Peer -- style based on sibling state

The peer element must come **before** the target in the DOM:

```html
<input type="email" class="peer" placeholder="Email" />
<p class="invisible peer-invalid:visible text-red-500 text-sm">
  Please enter a valid email
</p>
```

### has() -- parent styling based on child state

```html
<label class="has-[:checked]:bg-blue-50 has-[:checked]:ring-blue-500">
  <input type="checkbox" class="checked:border-blue-500" />
  <span>Option A</span>
</label>
```

### Form-specific variants

`required:`, `invalid:`, `valid:`, `placeholder-shown:`, `autofill:`, `read-only:`, `checked:`, `indeterminate:`, `disabled:`, `enabled:`, `in-range:`, `out-of-range:`

### Structural variants

`first:`, `last:`, `odd:`, `even:`, `only:`, `first-of-type:`, `empty:`, `nth-[3]:`, `nth-last-[2]:`

### Pseudo-elements

```html
<span class="after:content-['*'] after:ml-0.5 after:text-red-500">Required</span>
<input class="placeholder:text-gray-400 placeholder:italic" placeholder="Search..." />
<ul class="marker:text-blue-500">...</ul>
<p class="first-line:uppercase first-letter:text-4xl first-letter:font-bold">...</p>
```

### Stacking variants

Combine freely -- they read left to right:

```html
<button class="dark:md:hover:bg-fuchsia-600">...</button>
```

### Accessibility variants

```html
<div class="motion-safe:animate-bounce motion-reduce:animate-none">...</div>
<span class="contrast-more:border-2 contrast-more:border-black">...</span>
```

## Theme Configuration (v4)

All configuration lives in CSS via `@theme`:

```css
@import "tailwindcss";

@theme {
  /* Extend defaults -- just add new variables */
  --color-brand: oklch(0.65 0.2 250);
  --color-brand-light: oklch(0.85 0.1 250);
  --font-display: "Cal Sans", sans-serif;

  /* Override a specific default */
  --breakpoint-sm: 36rem;

  /* Custom animation */
  --animate-fade-in: fade-in 0.3s ease-out;
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }
}
```

### Namespace reference

| Namespace | Creates utilities |
|-----------|------------------|
| `--color-*` | `bg-*`, `text-*`, `border-*`, `ring-*`, `fill-*`, `stroke-*` |
| `--font-*` | `font-sans`, `font-mono`, custom font families |
| `--text-*` | `text-xs` through `text-9xl` font sizes |
| `--font-weight-*` | `font-thin` through `font-black` |
| `--spacing` | Base spacing unit (default 0.25rem) used by all spacing utilities |
| `--breakpoint-*` | `sm:`, `md:`, `lg:` responsive prefixes |
| `--radius-*` | `rounded-sm`, `rounded-lg`, etc. |
| `--shadow-*` | `shadow-sm`, `shadow-lg`, etc. |
| `--ease-*` | `ease-in`, `ease-out`, etc. |
| `--animate-*` | `animate-spin`, `animate-bounce`, etc. |
| `--blur-*` | `blur-sm`, `blur-lg`, etc. |
| `--leading-*` | `leading-tight`, `leading-relaxed`, etc. |
| `--tracking-*` | `tracking-tight`, `tracking-wide`, etc. |

### Override an entire namespace

```css
@theme {
  --color-*: initial;   /* Remove ALL default colors */
  --color-primary: oklch(0.6 0.2 260);
  --color-surface: oklch(0.98 0 0);
  --color-on-surface: oklch(0.2 0 0);
}
```

### Referencing theme variables in CSS

```css
@layer components {
  .card {
    background: var(--color-white);
    border-radius: var(--radius-lg);
    padding: --spacing(6);
    box-shadow: var(--shadow-md);
  }
}
```

### Referencing in JavaScript

```js
const styles = getComputedStyle(document.documentElement);
const brandColor = styles.getPropertyValue("--color-brand");
```

### Sharing themes across projects

```css
/* packages/brand/theme.css */
@theme {
  --*: initial;
  --spacing: 4px;
  --color-primary: oklch(0.6 0.2 260);
  --font-body: Inter, sans-serif;
}
```

```css
/* packages/app/app.css */
@import "tailwindcss";
@import "../brand/theme.css";
```

## Performance and Content Detection

### How detection works

Tailwind scans all non-gitignored, non-binary, non-CSS source files as plain text for class name tokens. It generates CSS only for detected classes. This means:

1. **Never construct class names dynamically:**

```jsx
// WRONG -- Tailwind cannot detect partial strings
<div className={`bg-${color}-500`} />
<div className={`text-${size}`} />

// CORRECT -- use complete class name strings
const colorMap = {
  red: "bg-red-500 text-white",
  blue: "bg-blue-500 text-white",
  green: "bg-green-500 text-white",
};
<div className={colorMap[color]} />
```

2. **Keep full class names visible in source:**

```jsx
// WRONG
<div className={`text-${error ? 'red' : 'green'}-600`} />

// CORRECT
<div className={error ? 'text-red-600' : 'text-green-600'} />
```

### Registering additional sources

```css
@import "tailwindcss";
@source "../node_modules/@acmecorp/ui-lib";   /* Scan a dependency */
@source not "../src/legacy";                    /* Exclude a directory */
```

### Safelisting classes not in source

```css
@source inline("underline");
@source inline("{hover:,focus:,}bg-red-{50,{100..900..100},950}");
```

### Setting a custom source root (monorepos)

```css
@import "tailwindcss" source("../src");
```

## Reusing Styles

Priority order for managing duplication:

### 1. Template loops (best for repeated rendered elements)

```jsx
{items.map(item => (
  <div key={item.id} className="flex items-center gap-3 rounded-lg p-4 bg-white shadow-sm">
    <img className="size-10 rounded-full" src={item.avatar} alt="" />
    <span className="font-medium text-gray-900">{item.name}</span>
  </div>
))}
```

### 2. Extract components (best for reuse across files)

```jsx
function Badge({ children, variant = "default" }) {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}
```

### 3. @layer components (for simple, single-element abstractions)

```css
@layer components {
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-lg);
    padding: --spacing(2) --spacing(4);
    font-weight: var(--font-weight-semibold);
    transition: background-color 150ms;
  }
  .btn-primary {
    background-color: var(--color-blue-600);
    color: var(--color-white);
    &:hover { background-color: var(--color-blue-700); }
  }
}
```

### 4. @apply (use sparingly)

`@apply` inlines utility classes into custom CSS. It is appropriate for:
- Styling third-party markup you do not control (e.g., CMS output, WYSIWYG editors, third-party widgets)
- Vue/Svelte scoped styles referencing Tailwind utilities

```css
/* Appropriate: styling third-party component you cannot add classes to */
.select2-dropdown {
  @apply rounded-b-lg shadow-md;
}
.select2-search {
  @apply rounded border border-gray-300;
}
```

**When to avoid @apply**: Do not use it simply to make your HTML "cleaner." That defeats the purpose of utility-first and re-introduces the problems of semantic CSS (naming, cascade, file-switching). Prefer component extraction instead.

### @reference for scoped styles (Vue/Svelte/CSS Modules)

```css
@reference "../../app.css";

h1 {
  @apply text-2xl font-bold text-red-500;
}
```

## Common Layout Patterns

### Centering

```html
<!-- Flexbox center -->
<div class="flex items-center justify-center min-h-screen">
  <div>Centered content</div>
</div>

<!-- Grid center (shorter) -->
<div class="grid place-items-center min-h-screen">
  <div>Centered content</div>
</div>

<!-- Margin auto (block element) -->
<div class="mx-auto max-w-2xl">Horizontally centered block</div>
```

### Responsive grid

```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  <div class="bg-white rounded-lg shadow p-6">Card</div>
  <!-- More cards... -->
</div>
```

### Sticky header

```html
<header class="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
  <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
    <!-- Nav content -->
  </nav>
</header>
```

### Full-bleed within constrained container

```html
<div class="mx-auto max-w-3xl px-4">
  <p>Constrained paragraph text.</p>
  <div class="-mx-4 sm:-mx-6 lg:-mx-8">
    <img class="w-full" src="hero.jpg" alt="" />
  </div>
  <p>More constrained text.</p>
</div>
```

### Sidebar layout

```html
<div class="flex min-h-screen">
  <aside class="hidden lg:flex lg:flex-col lg:w-64 border-r border-gray-200 bg-gray-50">
    <!-- Sidebar content -->
  </aside>
  <main class="flex-1 p-6 lg:p-8">
    <!-- Main content -->
  </main>
</div>
```

### Aspect ratio container

```html
<div class="aspect-video rounded-xl overflow-hidden">
  <iframe class="w-full h-full" src="..."></iframe>
</div>
```

### Truncation

```html
<!-- Single line -->
<p class="truncate">Long text that gets cut off...</p>

<!-- Multi-line (line-clamp) -->
<p class="line-clamp-3">Long text limited to 3 lines...</p>
```

## Accessibility with Tailwind

### Screen-reader only content

```html
<button>
  <svg class="size-5" aria-hidden="true">...</svg>
  <span class="sr-only">Close menu</span>
</button>
```

### Focus indicators

Always provide visible focus styles. Prefer `focus-visible:` over `focus:` so keyboard users see outlines but mouse users do not:

```html
<button class="rounded-lg px-4 py-2 bg-blue-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
  Action
</button>

<a href="#" class="text-blue-600 underline focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded">
  Link
</a>
```

### Reduced motion

```html
<div class="animate-bounce motion-reduce:animate-none">
  <svg>...</svg>
</div>

<!-- Or apply transition only when motion is OK -->
<div class="motion-safe:transition-transform motion-safe:duration-300 hover:scale-105">
  Card
</div>
```

### High contrast

```html
<span class="contrast-more:border contrast-more:border-gray-900">
  Subtle UI element
</span>
```

### Color contrast

Use sufficient shade differences. As a rule of thumb, body text on white should be at least `text-gray-700`; on dark backgrounds, at least `text-gray-300`. Use the 500-shade and above for colored text on white backgrounds.

### Touch targets

Ensure interactive elements have adequate size on touch devices:

```html
<button class="min-h-[44px] min-w-[44px] p-3">
  <svg class="size-5">...</svg>
</button>
```

## Integration with React / Next.js

### Conditional classes

Use a utility like `clsx` or `tailwind-merge` to compose classes:

```jsx
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Combine both for the best result
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function Button({ variant = "primary", className, ...props }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors",
        variant === "primary" && "bg-blue-600 text-white hover:bg-blue-700",
        variant === "secondary" && "bg-gray-100 text-gray-900 hover:bg-gray-200",
        variant === "ghost" && "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
        className
      )}
      {...props}
    />
  );
}
```

`tailwind-merge` intelligently resolves conflicting Tailwind classes (e.g., `bg-red-500` and `bg-blue-500` -- last one wins properly).

### Dynamic values from props

Use inline styles for truly dynamic values, Tailwind classes for everything else:

```jsx
function ProgressBar({ percent, color }) {
  return (
    <div className="h-2 w-full rounded-full bg-gray-200">
      <div
        className="h-full rounded-full bg-blue-600 transition-all duration-300"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
```

### CSS variables for dynamic theming

```jsx
function ThemedSection({ accentColor, children }) {
  return (
    <section
      style={{ "--accent": accentColor }}
      className="bg-(--accent) text-white rounded-xl p-8"
    >
      {children}
    </section>
  );
}
```

### Next.js App Router setup (v4)

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --color-brand: oklch(0.6 0.2 260);
  --font-sans: "Inter Variable", sans-serif;
}
```

## Anti-Patterns to Avoid

### 1. Dynamic class name construction

```jsx
// NEVER DO THIS
<div className={`bg-${color}-500`} />
<div className={`text-${size}`} />
<div className={`grid-cols-${columns}`} />
```

Tailwind scans source files as plain text. Partial strings are not detected and no CSS is generated.

### 2. Excessive @apply

```css
/* AVOID -- this is just writing CSS with extra steps */
.card {
  @apply flex flex-col gap-4 rounded-xl bg-white p-6 shadow-lg;
}
.card-title {
  @apply text-xl font-bold text-gray-900;
}
.card-body {
  @apply text-sm text-gray-600 leading-relaxed;
}
```

If you find yourself writing many `@apply` rules, you are fighting the framework. Extract a component instead.

### 3. Abusing !important

```html
<!-- Avoid unless overriding truly uncontrollable third-party styles -->
<div class="bg-red-500!">...</div>
```

If you need `!important` frequently, it signals an architecture problem. Fix specificity at the source.

### 4. Using Tailwind classes in string concatenation utilities

```jsx
// FRAGILE -- tools may strip "unused" classes during tree-shaking
const classes = ["bg-red-500", "text-white"].join(" ");
```

Keep class names as string literals visible to Tailwind's scanner.

### 5. Overriding Tailwind with competing CSS frameworks

Do not load Bootstrap, Bulma, or other utility/component frameworks alongside Tailwind. Use Tailwind's `prefix` option if you must coexist:

```css
@import "tailwindcss" prefix(tw);
```

Generates classes like `tw:bg-blue-500`.

### 6. Ignoring the design system

```html
<!-- AVOID arbitrary values when a theme token exists -->
<div class="p-[17px] text-[15px] text-[#374151]">...</div>

<!-- PREFER theme values -->
<div class="p-4 text-sm text-gray-700">...</div>
```

Arbitrary values are for one-off exceptions, not the default approach.

## Custom Utilities and Variants (v4)

### Define a custom utility

```css
@utility content-auto {
  content-visibility: auto;
}
```

Use it: `<div class="content-auto lg:content-auto hover:content-auto">`

### Functional utility with theme values

```css
@theme {
  --tab-size-2: 2;
  --tab-size-4: 4;
  --tab-size-8: 8;
}

@utility tab-* {
  tab-size: --value(--tab-size-*, integer, [integer]);
}
```

Matches: `tab-2`, `tab-4`, `tab-8`, `tab-[12]`

### Define a custom variant

```css
@custom-variant theme-midnight (&:where([data-theme="midnight"] *));
```

Use it: `<div class="theme-midnight:bg-gray-900 theme-midnight:text-white">`

### Apply variants in custom CSS

```css
.my-element {
  background: white;
  @variant dark {
    background: black;
  }
  @variant dark {
    @variant hover {
      background: gray;
    }
  }
}
```

## Official Plugins

### Typography (@tailwindcss/typography)

Adds beautiful typographic defaults for rendered HTML/Markdown content:

```bash
npm install -D @tailwindcss/typography
```

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
```

```html
<article class="prose lg:prose-xl dark:prose-invert">
  <!-- Markdown/CMS content gets automatic typography -->
  <h1>Article Title</h1>
  <p>This paragraph is automatically styled.</p>
</article>
```

**Size modifiers**: `prose-sm`, `prose-base`, `prose-lg`, `prose-xl`, `prose-2xl`
**Color themes**: `prose-gray`, `prose-slate`, `prose-zinc`, `prose-neutral`, `prose-stone`
**Element modifiers**: `prose-headings:underline`, `prose-a:text-blue-600`, `prose-img:rounded-xl`
**Undo styles**: Use `not-prose` class on a child to opt out of typography styles.
**Remove max-width**: `prose max-w-none`

### Forms (@tailwindcss/forms)

Provides better default form styles that are easy to override with utilities:

```bash
npm install -D @tailwindcss/forms
```

```css
@import "tailwindcss";
@plugin "@tailwindcss/forms";
```

### Container Queries (built into v4)

No plugin needed in v4. In v3, install `@tailwindcss/container-queries`.

```html
<div class="@container">
  <div class="flex flex-col @sm:flex-row @lg:grid @lg:grid-cols-3 gap-4">
    <!-- Layout adapts to container width -->
  </div>
</div>
```

Container query breakpoints: `@xs` (20rem), `@sm` (24rem), `@md` (28rem), `@lg` (32rem), `@xl` (36rem), `@2xl` (42rem), etc.

## CSS Custom Properties Integration

### Define semantic tokens with :root + @theme

```css
:root {
  --brand-primary: oklch(0.6 0.2 260);
  --brand-surface: oklch(0.98 0.005 260);
}

[data-theme="dark"] {
  --brand-primary: oklch(0.75 0.15 260);
  --brand-surface: oklch(0.15 0.01 260);
}

@theme inline {
  --color-primary: var(--brand-primary);
  --color-surface: var(--brand-surface);
}
```

Now `bg-primary`, `text-primary`, `bg-surface` utilities work and automatically switch with the data-theme attribute.

### Use CSS variables in utilities

```html
<!-- Shorthand: parentheses reference CSS custom properties -->
<div class="bg-(--brand-primary) text-(--brand-surface)">...</div>

<!-- Equivalent to: -->
<div class="bg-[var(--brand-primary)] text-[var(--brand-surface)]">...</div>
```

### Opacity on custom property colors

```html
<div class="bg-(--brand-primary)/50">50% opacity brand color</div>
```

## Functions (v4)

### --spacing()

Generates spacing values from the base spacing unit:

```css
.element {
  margin: --spacing(4);         /* calc(var(--spacing) * 4) = 1rem */
  padding: --spacing(1.5);     /* calc(var(--spacing) * 1.5) = 0.375rem */
}
```

### --alpha()

Adjusts color opacity:

```css
.element {
  background: --alpha(var(--color-blue-500) / 50%);
  /* Compiles to: color-mix(in oklab, var(--color-blue-500) 50%, transparent) */
}
```

## Legacy v3 Configuration (tailwind.config.js)

If maintaining a v3 project, the JavaScript config is loaded with:

```css
@config "../../tailwind.config.js";
```

And legacy plugins with:

```css
@plugin "@tailwindcss/typography";
```

Note: `corePlugins`, `safelist`, and `separator` config options are not supported in v4.

## Quick Reference: Spacing Scale

Tailwind's default spacing uses a 4px (0.25rem) base unit:

| Class | Value |
|-------|-------|
| `*-0` | 0px |
| `*-px` | 1px |
| `*-0.5` | 0.125rem (2px) |
| `*-1` | 0.25rem (4px) |
| `*-2` | 0.5rem (8px) |
| `*-3` | 0.75rem (12px) |
| `*-4` | 1rem (16px) |
| `*-6` | 1.5rem (24px) |
| `*-8` | 2rem (32px) |
| `*-12` | 3rem (48px) |
| `*-16` | 4rem (64px) |
| `*-24` | 6rem (96px) |
| `*-32` | 8rem (128px) |
| `*-48` | 12rem (192px) |
| `*-64` | 16rem (256px) |
| `*-96` | 24rem (384px) |

In v4, any integer works (e.g., `p-13` = `calc(0.25rem * 13)`). You are not limited to the predefined scale.

## Quick Reference: Useful Arbitrary Value Patterns

```html
<!-- Arbitrary color -->
<div class="bg-[#1a1a2e]">...</div>

<!-- Arbitrary spacing -->
<div class="p-[clamp(1rem,3vw,2rem)]">...</div>

<!-- Arbitrary grid -->
<div class="grid grid-cols-[200px_1fr_200px]">...</div>

<!-- Arbitrary selector -->
<div class="[&>*:not(:last-child)]:mb-4">...</div>

<!-- Arbitrary media query -->
<div class="[@media(hover:hover)]:hover:underline">...</div>

<!-- Arbitrary property -->
<div class="[writing-mode:vertical-rl]">...</div>

<!-- Type hint for ambiguous values -->
<div class="text-(length:--my-var)">...</div>
<div class="text-(color:--my-var)">...</div>
```

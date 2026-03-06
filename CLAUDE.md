# kalebtec.com

## Tech Stack

This project is built with **Next.js**, **Tailwind CSS**, and **Payload CMS**.

---

## IMPORTANT: Use Skills for This Project's Technologies

This project has **three expert-level skills** that MUST be used when working with the core technologies. These skills contain comprehensive best practices, patterns, anti-patterns, and code examples sourced directly from the official documentation.

### When to invoke each skill:

| Skill | Trigger | Invoke with |
|-------|---------|-------------|
| **Tailwind CSS** | Styling, classes, responsive design, dark mode, theme config, layout patterns | `/tailwindcss` |
| **Next.js** | Routing, data fetching, server/client components, caching, middleware, metadata, API routes | `/nextjs` |
| **Payload CMS** | Collections, fields, hooks, access control, auth, admin panel, database, Local API | `/payloadcms` |

**Always invoke the relevant skill before:**
- Creating or modifying components (use both `/nextjs` and `/tailwindcss`)
- Setting up or modifying content models (use `/payloadcms`)
- Working on data fetching or API integration (use `/nextjs` and `/payloadcms`)
- Configuring the project (use whichever skill matches the config file)

### Key Architectural Decisions

- **Payload 3.x runs inside Next.js** — they share the same server. Use the Local API for data fetching in Server Components, not REST/GraphQL.
- **App Router only** — no Pages Router. Use Server Components by default, `'use client'` only when necessary.
- **Tailwind CSS v4** — uses CSS-first configuration with `@theme`, not `tailwind.config.js`.
- **TypeScript** — the project is fully typed. Payload generates types automatically.

### Quick Reminders

- Prefer Server Components for data fetching; reserve Client Components for interactivity
- Use `getPayload()` + Local API in Server Components to fetch content
- Follow mobile-first responsive design with Tailwind breakpoints
- Use `revalidateTag()` / `revalidatePath()` in Payload hooks for cache invalidation
- Never construct Tailwind class names dynamically with string interpolation
- Always define access control on every Payload collection

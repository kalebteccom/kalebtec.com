---
description: "Expert Next.js 15 App Router guidance for performant, SEO-optimized web applications. USE THIS SKILL whenever working with Next.js routing, data fetching, server/client components, middleware, caching, project structure, React Three Fiber (R3F) / Three.js 3D scene integration, Framer Motion animations, or Payload CMS withPayload configuration."
---

# Next.js Expert Skill

This skill covers Next.js 16+ with App Router, React 19, and the latest conventions including Cache Components, the `use cache` directive, and the `proxy.ts` file convention (replacing `middleware.ts`).

---

## 1. Project Structure and File Conventions

### Top-Level Structure

```
project-root/
  app/                  # App Router (required)
  public/               # Static assets served from /
  src/                  # Optional: wraps app/ and other source code
  next.config.ts        # Next.js configuration
  proxy.ts              # Request proxy (formerly middleware.ts)
  instrumentation.ts    # OpenTelemetry instrumentation
  .env                  # Environment variables (gitignored)
  .env.local            # Local overrides (gitignored)
  .env.development      # Dev environment vars
  .env.production       # Prod environment vars
  tsconfig.json         # TypeScript config
  postcss.config.mjs    # PostCSS config (for Tailwind)
```

### App Router File Conventions

Every file below is optional except `layout.tsx` at root and `page.tsx` for routes:

| File              | Purpose                                   |
|-------------------|-------------------------------------------|
| `layout.tsx`      | Shared UI wrapper; persists across nav     |
| `page.tsx`        | Unique UI for a route; makes route public  |
| `loading.tsx`     | Suspense fallback for the segment          |
| `error.tsx`       | Error boundary (must be `'use client'`)    |
| `not-found.tsx`   | 404 UI for `notFound()` calls              |
| `global-error.tsx`| Root-level error boundary (has own html/body)|
| `route.ts`        | API endpoint (cannot coexist with page.tsx)|
| `template.tsx`    | Like layout but re-mounts on navigation    |
| `default.tsx`     | Fallback for parallel route slots          |

### Component Hierarchy (render order)

```
layout.tsx
  template.tsx
    error.tsx (error boundary)
      loading.tsx (suspense boundary)
        not-found.tsx (not-found boundary)
          page.tsx | nested layout.tsx
```

### Route Conventions

```
app/page.tsx                    -> /
app/blog/page.tsx               -> /blog
app/blog/[slug]/page.tsx        -> /blog/:slug (dynamic)
app/shop/[...slug]/page.tsx     -> /shop/* (catch-all)
app/docs/[[...slug]]/page.tsx   -> /docs, /docs/* (optional catch-all)
app/(marketing)/page.tsx        -> / (route group, not in URL)
app/@sidebar/page.tsx           -> parallel route slot
app/_components/Button.tsx      -> private folder (not routable)
```

### Metadata File Conventions

Place these files in the `app/` directory at the appropriate route level:

- `favicon.ico` - Favicon
- `icon.png` / `icon.tsx` - App icon (static or generated)
- `apple-icon.png` / `apple-icon.tsx` - Apple touch icon
- `opengraph-image.png` / `opengraph-image.tsx` - OG image
- `twitter-image.png` / `twitter-image.tsx` - Twitter card image
- `sitemap.xml` / `sitemap.ts` - Sitemap
- `robots.txt` / `robots.ts` - Robots file
- `manifest.json` - Web app manifest

### Project Organization Strategies

Next.js is unopinionated about organization. Three common approaches:

**1. Files outside `app/` (recommended for larger projects):**
```
app/           # Only routing files
components/    # Shared components
lib/           # Utilities, data fetching
```

**2. Top-level folders inside `app/`:**
```
app/
  _components/  # Private folder convention
  _lib/
  (routes)/     # Route group for pages
```

**3. Feature-based (colocation):**
```
app/
  blog/
    _components/  # Blog-specific components
    _lib/         # Blog-specific utils
    page.tsx
    layout.tsx
```

Use **route groups** `(groupName)` to organize without affecting URLs. Use **private folders** `_folderName` to exclude from routing.

---

## 2. Server Components vs Client Components

### Default Behavior

All components in the `app/` directory are **Server Components** by default. They run on the server, can be async, and have zero client-side JavaScript overhead.

### When to Use Each

**Server Components** (default) for:
- Fetching data (database, API, filesystem)
- Accessing secrets/tokens (env vars without NEXT_PUBLIC_)
- Heavy computation that should stay server-side
- Reducing client bundle size
- SEO-critical content

**Client Components** (`'use client'`) for:
- Interactivity: `useState`, `useReducer`, event handlers (`onClick`, `onChange`)
- Lifecycle effects: `useEffect`, `useLayoutEffect`
- Browser APIs: `localStorage`, `window`, `IntersectionObserver`
- Custom hooks that use any of the above
- Third-party components that require client features

### The `'use client'` Directive

```tsx
'use client'
// Must be at the very top of the file, before any imports.
// Marks this file and everything it imports as client code.

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

Key rules:
- Place `'use client'` as high as possible in the import tree -- at the **boundary** between server and client.
- Once a file is marked `'use client'`, all its imports are client code.
- Push `'use client'` down to the **leaf components** that actually need interactivity.

### Composition Patterns

**Pass Server Components as children to Client Components:**

```tsx
// app/page.tsx (Server Component)
import Modal from './ui/modal'     // Client Component
import Cart from './ui/cart'       // Server Component

export default function Page() {
  return (
    <Modal>
      <Cart /> {/* Server Component rendered on server, passed as children */}
    </Modal>
  )
}
```

```tsx
// app/ui/modal.tsx
'use client'
export default function Modal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return open ? <div className="modal">{children}</div> : null
}
```

**Context Providers (must be Client Components):**

```tsx
// app/providers.tsx
'use client'
import { createContext } from 'react'

export const ThemeContext = createContext('light')

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeContext.Provider value="dark">{children}</ThemeContext.Provider>
}
```

```tsx
// app/layout.tsx (Server Component)
import { ThemeProvider } from './providers'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html><body>
      <ThemeProvider>{children}</ThemeProvider>
    </body></html>
  )
}
```

Render providers as deep in the tree as possible to maximize the static server-rendered shell.

### Wrapping Third-Party Client Components

If a library component uses client features but lacks `'use client'`:

```tsx
// app/ui/carousel.tsx
'use client'
import { Carousel } from 'acme-carousel'
export default Carousel
```

### Preventing Environment Poisoning

Use the `server-only` package to prevent server code from being imported in client components:

```ts
// lib/data.ts
import 'server-only'

export async function getSecretData() {
  // Uses API_KEY that must never reach the client
  return fetch('...', { headers: { authorization: process.env.API_KEY! } })
}
```

The counterpart `client-only` package works similarly for browser-only modules.

---

## 3. Data Fetching

### Server Components (Preferred)

Server Components can be async and fetch data directly:

```tsx
// Using fetch
export default async function Page() {
  const res = await fetch('https://api.example.com/posts')
  const posts = await res.json()
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>
}

// Using ORM/database directly
import { db } from '@/lib/db'

export default async function Page() {
  const posts = await db.select().from(postsTable)
  return <PostList posts={posts} />
}
```

### Parallel Data Fetching

Avoid sequential waterfalls by initiating requests concurrently:

```tsx
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Start both requests simultaneously
  const artistData = getArtist(id)
  const albumsData = getAlbums(id)

  // Wait for both
  const [artist, albums] = await Promise.all([artistData, albumsData])

  return <div>{artist.name} - {albums.length} albums</div>
}
```

### Request Memoization

`fetch` calls with the same URL and options within a single render pass are automatically deduplicated. For non-fetch data sources, use `React.cache`:

```ts
import { cache } from 'react'

export const getUser = cache(async (id: string) => {
  return await db.user.findUnique({ where: { id } })
})
```

### Client Component Data Fetching

**Option 1: Stream from Server Component using React's `use` hook:**

```tsx
// Server Component
import { Suspense } from 'react'
import Posts from './posts'

export default function Page() {
  const postsPromise = getPosts() // Don't await
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Posts posts={postsPromise} />
    </Suspense>
  )
}
```

```tsx
// Client Component
'use client'
import { use } from 'react'

export default function Posts({ posts }: { posts: Promise<Post[]> }) {
  const allPosts = use(posts) // Resolves the promise
  return <ul>{allPosts.map(p => <li key={p.id}>{p.title}</li>)}</ul>
}
```

**Option 2: SWR or React Query for client-side fetching when you need real-time updates or polling.**

### Preloading Data

```tsx
const preload = (id: string) => { void getItem(id) }

export default async function Page({ params }) {
  const { id } = await params
  preload(id) // Start loading early
  const isAvailable = await checkAvailability()
  return isAvailable ? <Item id={id} /> : null
}
```

---

## 4. Server Actions and Data Mutations

### Creating Server Functions

```ts
// app/actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string

  await db.post.create({ data: { title, content } })

  revalidatePath('/posts')
  redirect('/posts')
}
```

### Using with Forms

```tsx
// Server Component - progressive enhancement works without JS
import { createPost } from '@/app/actions'

export default function NewPost() {
  return (
    <form action={createPost}>
      <input name="title" required />
      <textarea name="content" required />
      <button type="submit">Create</button>
    </form>
  )
}
```

### Using with `useActionState` for Error Handling

```tsx
'use client'
import { useActionState } from 'react'
import { createPost } from '@/app/actions'

export function PostForm() {
  const [state, formAction, pending] = useActionState(createPost, { message: '' })

  return (
    <form action={formAction}>
      <input name="title" required />
      {state?.message && <p aria-live="polite">{state.message}</p>}
      <button disabled={pending}>{pending ? 'Creating...' : 'Create'}</button>
    </form>
  )
}
```

### Invoking from Event Handlers

```tsx
'use client'
import { incrementLike } from './actions'

export function LikeButton({ initialLikes }: { initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes)
  return (
    <button onClick={async () => {
      const updated = await incrementLike()
      setLikes(updated)
    }}>
      {likes} Likes
    </button>
  )
}
```

### After Mutations: Revalidation and Redirect

- `revalidatePath('/path')` - Purge cache for a specific path
- `revalidateTag('tag')` - Purge all cache entries with a specific tag
- `redirect('/path')` - Redirect (throws internally; place after revalidation calls)
- `refresh()` from `next/cache` - Refresh the client router for the current page

---

## 5. Caching

### Four Caching Layers

| Layer               | Where  | What                          | Duration                |
|---------------------|--------|-------------------------------|-------------------------|
| Request Memoization | Server | Dedupes identical fetches     | Single render pass      |
| Data Cache          | Server | Persists fetch results        | Persistent (revalidate) |
| Full Route Cache    | Server | Caches HTML + RSC payload     | Persistent (revalidate) |
| Router Cache        | Client | Caches RSC payload in browser | Session / time-based    |

### Fetch Caching Options

```ts
// Opt into caching
fetch(url, { cache: 'force-cache' })

// Opt out of caching
fetch(url, { cache: 'no-store' })

// Time-based revalidation
fetch(url, { next: { revalidate: 3600 } }) // Revalidate every hour

// Tag-based revalidation
fetch(url, { next: { tags: ['posts'] } })
```

### Cache Components and `use cache` Directive (Next.js 16+)

Enable with `cacheComponents: true` in `next.config.ts`. This enables Partial Prerendering (PPR).

```tsx
import { cacheLife, cacheTag } from 'next/cache'

async function BlogPosts() {
  'use cache'
  cacheLife('hours')
  cacheTag('posts')

  const posts = await db.query('SELECT * FROM posts')
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>
}
```

Key rules for `use cache`:
- Cannot use runtime data (`cookies()`, `headers()`) in the same scope.
- Extract runtime values and pass them as arguments to cached functions.
- Arguments automatically become part of the cache key.

```tsx
// Runtime data + cache pattern
async function ProfileContent() {
  const session = (await cookies()).get('session')?.value
  return <CachedProfile sessionId={session} />
}

async function CachedProfile({ sessionId }: { sessionId: string }) {
  'use cache'
  cacheLife('minutes')
  const data = await fetchUser(sessionId) // sessionId is the cache key
  return <div>{data.name}</div>
}
```

### On-Demand Revalidation

```ts
'use server'
import { revalidateTag, revalidatePath } from 'next/cache'

export async function updatePost() {
  await db.post.update(...)
  revalidateTag('posts')       // Invalidate by tag
  revalidatePath('/blog')      // Invalidate by path
}
```

### Router Cache Behavior

- Layouts are cached and reused on navigation (partial rendering).
- Pages are NOT cached by default (as of Next.js 15+).
- `router.refresh()` clears the router cache for the current route.
- `revalidatePath`/`revalidateTag` in Server Actions also invalidate the Router Cache.

---

## 6. Rendering

### Static Rendering (Default)

Routes without dynamic APIs are statically rendered at build time. Output is cached in the Full Route Cache.

### Dynamic Rendering

Triggered automatically by using any dynamic API:
- `cookies()`, `headers()`, `connection()`
- `searchParams` prop
- `fetch` with `{ cache: 'no-store' }`

### Streaming and Suspense

**Route-level streaming with `loading.tsx`:**

```tsx
// app/blog/loading.tsx
export default function Loading() {
  return <BlogSkeleton />
}
```

**Component-level streaming with `<Suspense>`:**

```tsx
import { Suspense } from 'react'

export default function Page() {
  return (
    <>
      <h1>Blog</h1> {/* Sent immediately */}
      <Suspense fallback={<PostsSkeleton />}>
        <BlogPosts /> {/* Streams in when ready */}
      </Suspense>
    </>
  )
}
```

### Partial Prerendering (PPR)

With `cacheComponents: true`, Next.js creates a static HTML shell at build time and streams dynamic parts at request time. Static content (headers, nav, cached data) is instant. Dynamic content (personalized, real-time) streams in via Suspense boundaries.

### `generateStaticParams` for Static Generation of Dynamic Routes

```tsx
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  return <article>{post.content}</article>
}
```

---

## 7. Metadata and SEO

### Static Metadata

```tsx
// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://kalebtec.com'),
  title: {
    template: '%s | Kalebtec',
    default: 'Kalebtec',
  },
  description: 'Your site description',
  openGraph: {
    title: 'Kalebtec',
    description: 'Your site description',
    url: 'https://kalebtec.com',
    siteName: 'Kalebtec',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@handle',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}
```

### Dynamic Metadata

```tsx
// app/blog/[slug]/page.tsx
import type { Metadata, ResolvingMetadata } from 'next'

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.ogImage, ...previousImages],
      type: 'article',
      publishedTime: post.publishedAt,
    },
  }
}
```

### Metadata Ordering and Merging

- Metadata is evaluated root-to-leaf (parent layouts first).
- Child segments **shallow merge** with parent -- duplicate keys replace parent values.
- Nested objects like `openGraph` are entirely replaced if redefined in child.
- Use `title.template` in layouts for consistent title patterns: `'%s | Site Name'`.
- `title.absolute` ignores parent templates.

### Streaming Metadata

As of Next.js 15.2+, `generateMetadata` can stream. For JavaScript-capable bots, metadata is appended to `<body>` after resolution. For HTML-limited bots (e.g., `facebookexternalhit`), metadata blocks rendering and appears in `<head>`.

### File-Based Metadata

Place `opengraph-image.tsx` or `twitter-image.tsx` to generate dynamic images. File-based metadata takes priority over the `metadata` object.

---

## 8. Image Optimization

```tsx
import Image from 'next/image'

// Local image (auto width/height from import)
import heroImg from './hero.png'
<Image src={heroImg} alt="Hero" placeholder="blur" />

// Remote image (must specify dimensions)
<Image
  src="https://cdn.example.com/photo.jpg"
  alt="Photo"
  width={800}
  height={600}
  priority  // Load eagerly for above-the-fold images (disables lazy loading)
/>

// Fill mode (parent must have position: relative)
<div className="relative h-64 w-full">
  <Image src="/bg.jpg" alt="Background" fill className="object-cover" />
</div>
```

Configure allowed remote image domains in `next.config.ts`:

```ts
const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.example.com',
        pathname: '/images/**',
      },
    ],
  },
}
```

Key props:
- `priority` - Use for LCP (Largest Contentful Paint) images; disables lazy loading
- `placeholder="blur"` - Show blurred preview while loading (auto for static imports)
- `sizes` - Tell the browser how wide the image will be at different breakpoints
- `fill` - Image fills parent container (use with `object-fit`)
- `quality` - 1-100, default 75

---

## 9. Font Optimization

### Google Fonts (Self-Hosted Automatically)

```tsx
// app/layout.tsx
import { Geist, Geist_Mono } from 'next/font/google'

const geist = Geist({ subsets: ['latin'] })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.className} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

### Local Fonts

```tsx
import localFont from 'next/font/local'

const myFont = localFont({
  src: [
    { path: './fonts/Regular.woff2', weight: '400', style: 'normal' },
    { path: './fonts/Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-custom',
})
```

Use **variable fonts** when available for best performance. Apply via `className` or CSS `variable` for Tailwind integration:

```css
/* In Tailwind CSS config or globals.css */
@theme {
  --font-sans: var(--font-geist);
  --font-mono: var(--font-geist-mono);
}
```

---

## 10. Proxy (Formerly Middleware)

As of Next.js 16, `middleware.ts` is renamed to `proxy.ts`. The function is named `proxy` instead of `middleware`.

### Basic Setup

```ts
// proxy.ts (project root or src/)
import { NextResponse, type NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  // Authentication check
  const token = request.cookies.get('session')?.value
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all paths except static files and images
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
```

### Common Patterns

**Setting Headers:**
```ts
export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', request.nextUrl.pathname)

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  })
  response.headers.set('x-custom', 'value')
  return response
}
```

**CORS:**
```ts
export function proxy(request: NextRequest) {
  if (request.method === 'OPTIONS') {
    return NextResponse.json({}, {
      headers: {
        'Access-Control-Allow-Origin': 'https://allowed-origin.com',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  }
  const response = NextResponse.next()
  response.headers.set('Access-Control-Allow-Origin', 'https://allowed-origin.com')
  return response
}
```

**Rewrites (useful for A/B testing, multi-tenant):**
```ts
export function proxy(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const subdomain = hostname.split('.')[0]
  if (subdomain !== 'www' && subdomain !== 'kalebtec') {
    return NextResponse.rewrite(new URL(`/${subdomain}${request.nextUrl.pathname}`, request.url))
  }
}
```

### Matcher Configuration

```ts
export const config = {
  matcher: [
    '/dashboard/:path*',           // Single path pattern
    '/api/:path*',                  // API routes
    {
      source: '/api/:path*',
      has: [{ type: 'header', key: 'Authorization' }], // Only when header present
      missing: [{ type: 'cookie', key: 'bypass' }],    // Only when cookie absent
    },
  ],
}
```

---

## 11. Route Handlers (API Routes)

### Convention

Define in `app/**/route.ts` (cannot coexist with `page.tsx` in same segment):

```ts
// app/api/posts/route.ts
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const posts = await db.post.findMany()
  return Response.json(posts)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const post = await db.post.create({ data: body })
  return Response.json(post, { status: 201 })
}
```

### Dynamic Route Handlers

```ts
// app/api/posts/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const post = await db.post.findUnique({ where: { id } })
  if (!post) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json(post)
}
```

### Caching

Route Handlers are NOT cached by default. To cache a GET handler:

```ts
export const dynamic = 'force-static'

export async function GET() {
  const data = await fetch('https://api.example.com/data')
  return Response.json(await data.json())
}
```

With Cache Components enabled, use `use cache` in helper functions (not directly in the handler body):

```ts
async function getCachedProducts() {
  'use cache'
  cacheLife('hours')
  return await db.query('SELECT * FROM products')
}

export async function GET() {
  const products = await getCachedProducts()
  return Response.json(products)
}
```

Supported methods: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`.

---

## 12. Error Handling

### Expected Errors (Return Values, Not Exceptions)

```ts
// app/actions.ts
'use server'
export async function createPost(prevState: any, formData: FormData) {
  const result = await api.createPost(formData)
  if (!result.ok) {
    return { message: 'Failed to create post' } // Return error state, don't throw
  }
  revalidatePath('/posts')
  redirect('/posts')
}
```

### Error Boundaries (`error.tsx`)

```tsx
// app/dashboard/error.tsx
'use client' // MUST be a Client Component

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error) // Log to error reporting service
  }, [error])

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

### Global Error Boundary

```tsx
// app/global-error.tsx
'use client'
export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html><body>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </body></html>
  )
}
```

### Not Found

```tsx
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound() // Renders closest not-found.tsx
  return <article>{post.content}</article>
}
```

Errors bubble up to the nearest parent `error.tsx`. Place `error.tsx` at different levels for granular error handling. Note: `error.tsx` does NOT catch errors in the `layout.tsx` of the same segment -- use the parent segment's `error.tsx` or `global-error.tsx`.

---

## 13. Styling

### Tailwind CSS (Recommended)

```bash
pnpm add -D tailwindcss @tailwindcss/postcss
```

```js
// postcss.config.mjs
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

```css
/* app/globals.css */
@import 'tailwindcss';
```

```tsx
// app/layout.tsx
import './globals.css'
```

### CSS Modules

```css
/* app/blog/blog.module.css */
.container { padding: 24px; }
.title { font-size: 2rem; color: var(--primary); }
```

```tsx
import styles from './blog.module.css'
export default function Blog() {
  return <div className={styles.container}><h1 className={styles.title}>Blog</h1></div>
}
```

### CSS Ordering

Import order matters. Components imported first have their CSS loaded first. Keep CSS imports in a single entry file when possible to maintain predictable ordering.

---

## 14. Environment Variables

```
# Server-only (never exposed to browser)
DATABASE_URL=postgres://...
API_SECRET=sk-...

# Client-accessible (prefixed with NEXT_PUBLIC_)
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_SITE_URL=https://kalebtec.com
```

- Variables without `NEXT_PUBLIC_` prefix are only available on the server.
- Variables are inlined at build time (not runtime) for client code.
- Use `.env.local` for secrets (gitignored by default).
- `.env.development` and `.env.production` are environment-specific.

---

## 15. Performance Optimization

### Code Splitting and Lazy Loading

```tsx
import dynamic from 'next/dynamic'

// Lazy load component (renders on client only)
const HeavyChart = dynamic(() => import('./Chart'), {
  loading: () => <p>Loading chart...</p>,
  ssr: false, // Skip server rendering if it uses browser APIs
})
```

### Parallel Routes

Render multiple pages simultaneously in the same layout using `@slot` convention:

```
app/dashboard/
  layout.tsx          # Receives @analytics and @team as props
  @analytics/
    page.tsx
  @team/
    page.tsx
  page.tsx            # Main content
```

```tsx
// app/dashboard/layout.tsx
export default function Layout({
  children,
  analytics,
  team,
}: {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
}) {
  return (
    <div>
      {children}
      <div className="grid grid-cols-2">
        {analytics}
        {team}
      </div>
    </div>
  )
}
```

### Intercepting Routes

Show a route in a modal overlay without full navigation:

```
app/
  feed/
    page.tsx
    @modal/
      (.)photo/[id]/   # Intercepts /photo/[id] at same level
        page.tsx        # Renders as modal
  photo/[id]/
    page.tsx            # Full page (direct navigation)
```

### Link Prefetching

`<Link>` automatically prefetches routes. Control with:

```tsx
<Link href="/about" prefetch={false}>About</Link>  // Disable prefetching
<Link href="/about" prefetch={true}>About</Link>    // Full prefetch
```

---

## 16. TypeScript Integration

### Type-Safe Route Props

Next.js 16 provides globally available helper types:

```tsx
// app/blog/[slug]/page.tsx
export default async function Page(props: PageProps<'/blog/[slug]'>) {
  const { slug } = await props.params
  return <h1>{slug}</h1>
}

// app/dashboard/layout.tsx
export default function Layout(props: LayoutProps<'/dashboard'>) {
  return <div>{props.children}</div>
}
```

Types are generated during `next dev`, `next build`, or `next typegen`.

### Route Handler Types

```ts
// app/api/users/[id]/route.ts
export async function GET(
  _req: NextRequest,
  ctx: RouteContext<'/users/[id]'>
) {
  const { id } = await ctx.params
  return Response.json({ id })
}
```

### Dynamic Route Params

As of Next.js 15+, `params` and `searchParams` are **Promises** and must be awaited:

```tsx
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { slug } = await params
  const { page } = await searchParams
  // ...
}
```

---

## 17. Security Best Practices

### Server Actions

- Server Actions use POST method exclusively and are automatically CSRF-protected.
- Always validate and sanitize input in Server Actions -- never trust `formData` directly.
- Use `zod` or similar libraries for schema validation:

```ts
'use server'
import { z } from 'zod'

const PostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
})

export async function createPost(formData: FormData) {
  const parsed = PostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  })
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors }
  }
  await db.post.create({ data: parsed.data })
}
```

### Data Access Layer

- Use the `server-only` package to prevent server code from reaching the client.
- Never pass sensitive data as props to Client Components (it appears in the RSC payload).
- Use `taint` APIs (experimental) to mark sensitive objects and prevent them from crossing the server-client boundary.

---

## 18. Deployment

### Vercel (Zero-Config)

Push to GitHub/GitLab. Vercel auto-detects Next.js and deploys. All features supported.

### Self-Hosted (Node.js)

```json
{ "scripts": { "build": "next build", "start": "next start" } }
```

```bash
npm run build && npm run start
```

### Docker

Use `output: 'standalone'` in `next.config.ts` for minimal Docker images:

```ts
const config: NextConfig = {
  output: 'standalone',
}
```

### Static Export

```ts
const config: NextConfig = {
  output: 'export',
}
```

Limitations: No Server Components rendering, no API routes, no dynamic routes without `generateStaticParams`, no image optimization (use external loader), no proxy/middleware.

---

## 19. Anti-Patterns to Avoid

### Unnecessary `'use client'`

Do NOT add `'use client'` to components that don't need interactivity. This bloats the client bundle and loses Server Component benefits. Push the directive down to the leaf components that truly need it.

### Fetching in Client Components When Server Would Work

```tsx
// BAD: Fetching in a Client Component when data could be fetched on the server
'use client'
export function PostList() {
  const [posts, setPosts] = useState([])
  useEffect(() => { fetch('/api/posts').then(...) }, [])
  return <ul>...</ul>
}

// GOOD: Fetch in a Server Component
export default async function PostList() {
  const posts = await db.post.findMany()
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>
}
```

### Creating API Routes Just to Fetch in Server Components

Server Components can query databases and APIs directly. Don't create `/api/posts` just to `fetch` it from a Server Component -- call the data function directly.

### Improper Cache Invalidation

- Don't rely on time-based revalidation for data that must be immediately consistent after mutations.
- Use `revalidateTag` or `revalidatePath` in Server Actions after mutations.
- Don't forget to revalidate after CMS content updates (use webhooks + `revalidateTag`).

### Blocking the Layout with Slow Data

If your layout fetches slow data, it blocks the entire page. Move slow fetches to the `page.tsx` or wrap in `<Suspense>`.

### Not Using `loading.tsx` or Suspense

Without loading states, users see a blank screen during data fetching. Always provide meaningful loading UI.

### Large `proxy.ts` / Middleware

Keep proxy logic minimal. Heavy computation in proxy runs on every matched request and delays response time. Do auth checks, redirects, and header manipulation only.

---

## 20. Integration: Tailwind CSS

### Setup for Next.js 16+ (Tailwind v4)

```bash
pnpm add -D tailwindcss @tailwindcss/postcss
```

```js
// postcss.config.mjs
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

```css
/* app/globals.css */
@import 'tailwindcss';

/* Custom theme values */
@theme {
  --font-sans: var(--font-geist);
  --color-primary: #2563eb;
  --color-secondary: #64748b;
}
```

Tailwind v4 uses CSS-based configuration via `@theme` instead of `tailwind.config.js`. For v3 compatibility (broader browser support), see the Tailwind v3 guide.

### Tailwind with CSS Modules

Use Tailwind for most styling. Use CSS Modules only when Tailwind utilities are insufficient for complex scoped styles. Prefer `@apply` sparingly -- it couples your CSS to Tailwind's API.

---

## 21. Integration: Payload CMS

[Payload CMS](https://payloadcms.com/) is a headless CMS that runs alongside Next.js in the same application, sharing the same Next.js server.

### Key Integration Points

**Project Structure with Payload:**
```
app/
  (frontend)/      # Route group for public site
    page.tsx
    layout.tsx
  (payload)/       # Route group for Payload admin
    admin/
      [[...segments]]/
        page.tsx    # Payload admin panel
payload.config.ts   # Payload configuration
```

**Data Fetching from Payload in Server Components:**
```tsx
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function Page() {
  const payload = await getPayload({ config })
  const posts = await payload.find({
    collection: 'posts',
    limit: 10,
    sort: '-createdAt',
  })
  return <PostList posts={posts.docs} />
}
```

**Payload with Server Actions:**
```ts
'use server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { revalidateTag } from 'next/cache'

export async function createContact(formData: FormData) {
  const payload = await getPayload({ config })
  await payload.create({
    collection: 'contacts',
    data: {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    },
  })
  revalidateTag('contacts')
}
```

**Revalidation on Payload Admin Updates:**

Use Payload's `afterChange` hooks to trigger Next.js revalidation:

```ts
// collections/Posts.ts
import { revalidateTag } from 'next/cache'
import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  hooks: {
    afterChange: [
      ({ doc }) => {
        revalidateTag('posts')
        revalidateTag(`post-${doc.slug}`)
      },
    ],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'content', type: 'richText' },
  ],
}
```

**Payload Image Fields with next/image:**

```tsx
import Image from 'next/image'
import type { Media } from '@/payload-types'

function PayloadImage({ media }: { media: Media }) {
  return (
    <Image
      src={media.url!}
      alt={media.alt || ''}
      width={media.width!}
      height={media.height!}
    />
  )
}
```

**Environment Variables for Payload:**
```env
DATABASE_URI=mongodb://localhost/payload
PAYLOAD_SECRET=your-secret-key
# These are server-only -- no NEXT_PUBLIC_ prefix needed
```

---

## 22. Quick Reference: `next.config.ts`

```ts
import type { NextConfig } from 'next'

const config: NextConfig = {
  // Enable Cache Components / Partial Prerendering
  cacheComponents: true,

  // Output mode: 'standalone' for Docker, 'export' for static
  output: 'standalone',

  // Image optimization
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.example.com', pathname: '/**' },
    ],
  },

  // Redirects
  async redirects() {
    return [
      { source: '/old-page', destination: '/new-page', permanent: true },
    ]
  },

  // Rewrites
  async rewrites() {
    return [
      { source: '/api/proxy/:path*', destination: 'https://backend.example.com/:path*' },
    ]
  },

  // Custom headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },

  // Experimental features
  experimental: {
    // Enable React Compiler
    reactCompiler: true,
  },
}

export default config
```

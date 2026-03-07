---
description: "Expert Payload CMS 3.x guidance for type-safe, headless content management running inside Next.js. USE THIS SKILL whenever working with Payload collections, fields, hooks, access control, authentication, Local API, REST/GraphQL APIs, admin panel customization, MongoDB database configuration, or content modeling for projects, services, and team members."
---

# Payload CMS Expert Skill

Payload 3.x is a code-first, config-driven fullstack framework built on Next.js. It auto-generates an Admin Panel, REST API, GraphQL API, and Local API from a single TypeScript config. It is fully open-source (MIT), self-hostable, and deployable serverless on platforms like Vercel.

---

## 1. Project Setup & Installation

### Quickstart

```bash
npx create-payload-app@latest
# Or with a template:
npx create-payload-app@latest -t website
npx create-payload-app@latest -t blank
```

### Requirements
- Node.js 20.9.0+
- Next.js 15.2.9+ (specific compatible ranges) or 16.2.0-canary.10+
- pnpm (preferred), npm, or yarn 2+
- MongoDB, Postgres, or SQLite

### Adding to Existing Next.js App

```bash
pnpm i payload @payloadcms/next @payloadcms/richtext-lexical sharp
# Pick ONE database adapter:
pnpm i @payloadcms/db-mongodb    # MongoDB
pnpm i @payloadcms/db-postgres   # Postgres
pnpm i @payloadcms/db-sqlite     # SQLite
```

### Project Structure

```
app/
├─ (payload)/           # Payload admin routes (auto-generated, do not edit)
│  ├── admin/
│  ├── api/
│  ├── graphql/
│  ├── custom.scss
│  └── layout.tsx
├─ (frontend)/          # Your app files (name this anything)
│  └── ...
payload.config.ts       # Root config
tsconfig.json           # Must include @payload-config path
```

### next.config.mjs (ESM required)

```js
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig = {}
export default withPayload(nextConfig)
```

### tsconfig.json path alias (required)

```json
{
  "compilerOptions": {
    "paths": {
      "@payload-config": ["./payload.config.ts"]
    }
  }
}
```

---

## 2. The Payload Config (`payload.config.ts`)

```ts
import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import { Users } from './collections/Users'
import { Pages } from './collections/Pages'
import { Media } from './collections/Media'
import { SiteSettings } from './globals/SiteSettings'

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || '',
  db: mongooseAdapter({ url: process.env.DATABASE_URL || '' }),
  editor: lexicalEditor(),
  sharp,
  collections: [Users, Pages, Media],
  globals: [SiteSettings],
  cors: ['http://localhost:3000'],
  csrf: ['http://localhost:3000'],
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '',
  typescript: {
    outputFile: './payload-types.ts',
  },
  plugins: [],
  admin: {
    user: 'users',
    livePreview: {
      url: 'http://localhost:3000',
      collections: ['pages'],
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
})
```

### Key Config Options

| Option | Description |
|--------|-------------|
| `secret` * | Secure string for encryption/hashing |
| `db` * | Database adapter instance |
| `collections` | Array of Collection configs |
| `globals` | Array of Global configs |
| `editor` | Rich text editor (lexicalEditor) |
| `sharp` | Image processing library |
| `cors` | Allowed origins for CORS |
| `csrf` | Allowed origins for CSRF cookie acceptance |
| `serverURL` | Absolute URL of the app (protocol + domain) |
| `defaultDepth` | Default relationship population depth |
| `maxDepth` | Maximum allowed depth (default: 10) |
| `plugins` | Array of plugins |
| `hooks` | Root-level hooks (e.g., `afterError`) |
| `endpoints` | Custom REST endpoints |
| `admin` | Admin panel configuration |
| `typescript` | TypeScript generation settings |
| `indexSortableFields` | Auto-index sortable fields |
| `localization` | Multi-locale support |

---

## 3. Collections

Collections are groups of documents sharing a common schema. Each collection gets automatic Local API, REST, and GraphQL endpoints.

```ts
import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',                    // URL-friendly identifier (kebab-case)
  labels: { singular: 'Post', plural: 'Posts' },
  admin: {
    useAsTitle: 'title',            // Field to display as document title
    defaultColumns: ['title', 'status', 'updatedAt'],
    group: 'Content',               // Navigation grouping
    listSearchableFields: ['title', 'slug'],
    pagination: { defaultLimit: 20, limits: [10, 20, 50] },
    livePreview: {
      url: ({ data }) => `/posts/${data.slug}`,
    },
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    beforeChange: [],
    afterChange: [],
    afterRead: [],
  },
  versions: {
    drafts: { autosave: true },
    maxPerDoc: 25,
  },
  timestamps: true,                 // Adds createdAt/updatedAt automatically
  defaultSort: '-createdAt',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'content', type: 'richText' },
    { name: 'status', type: 'select', options: ['draft', 'published'], defaultValue: 'draft' },
  ],
}
```

### Important Collection Options

| Option | Description |
|--------|-------------|
| `slug` * | Unique URL-friendly identifier |
| `fields` * | Array of field definitions |
| `auth` | Enable authentication on this collection |
| `upload` | Enable file upload support |
| `versions` | Enable version history and drafts |
| `timestamps` | Auto createdAt/updatedAt (default: true) |
| `access` | Access control functions |
| `hooks` | Lifecycle hooks |
| `endpoints` | Custom REST endpoints |
| `defaultSort` | Default sort field (prefix `-` for descending) |
| `indexes` | Compound database indexes |
| `orderable` | Enable drag-and-drop ordering |

---

## 4. Globals

Globals are singleton documents (one document per Global). Use them for site settings, headers, footers, navigation, etc.

```ts
import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: 'siteTitle', type: 'text', required: true },
    { name: 'siteDescription', type: 'textarea' },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        { name: 'platform', type: 'select', options: ['twitter', 'github', 'linkedin'] },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
}

export const Nav: GlobalConfig = {
  slug: 'nav',
  fields: [
    {
      name: 'items',
      type: 'array',
      maxRows: 8,
      fields: [
        { name: 'page', type: 'relationship', relationTo: 'pages', required: true },
      ],
    },
  ],
}
```

### When to Use Globals vs Collections
- **Global**: Single instance data (site settings, header nav, footer, banner alerts)
- **Collection**: Multiple documents of the same type (pages, posts, users, products)

---

## 5. Field Types

### Data Fields (save to DB)

| Type | Purpose | Key Options |
|------|---------|-------------|
| `text` | Single-line string | `minLength`, `maxLength`, `hasMany` |
| `textarea` | Multi-line string | `minLength`, `maxLength` |
| `number` | Numeric value | `min`, `max`, `hasMany` |
| `email` | Email with validation | -- |
| `select` | Dropdown / multi-select | `options`, `hasMany` |
| `radio` | Radio button selection | `options` |
| `checkbox` | Boolean toggle | -- |
| `date` | Date/time picker | `timezone` |
| `point` | GeoJSON [lng, lat] | -- |
| `json` | Arbitrary JSON | `jsonSchema` for validation |
| `code` | Code editor | `language` (e.g. 'typescript') |
| `richText` | Lexical rich text editor | `editor` override |
| `upload` | File reference | `relationTo` (upload collection) |
| `relationship` | Reference to other docs | `relationTo`, `hasMany`, `filterOptions` |
| `join` | Reverse-direction relationship | `collection`, `on` |
| `array` | Repeatable group of fields | `fields`, `minRows`, `maxRows` |
| `blocks` | Flexible content with block types | `blocks`, `blockReferences` |
| `group` | Nested field group | `fields` |
| `tabs` | Tabbed field groups | `tabs` (named or unnamed) |

### Presentational Fields (no data)

| Type | Purpose |
|------|---------|
| `row` | Horizontal layout for fields |
| `collapsible` | Collapsible wrapper |
| `ui` | Custom UI-only component |

### Common Field Options

```ts
{
  name: 'myField',              // Required, camelCase
  type: 'text',                 // Required
  label: 'My Field',            // Auto-generated from name if omitted
  required: true,
  unique: true,                 // Enforce uniqueness in DB
  index: true,                  // Create DB index for performance
  defaultValue: 'hello',
  localized: true,              // Per-locale values (requires localization config)
  hidden: true,                 // Hidden from API responses
  admin: {
    position: 'sidebar',        // Place in sidebar (top-level fields only)
    condition: (data, siblingData) => data.showField === true,
    description: 'Help text for editors',
    readOnly: true,
    hidden: true,               // Hidden from Admin UI only
    width: '50%',
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => req.user?.role === 'admin',
  },
  hooks: {
    beforeChange: [],
    afterRead: [],
  },
  validate: (value) => {
    if (!value) return 'This field is required'
    return true
  },
}
```

### Relationship Field

```ts
{
  name: 'author',
  type: 'relationship',
  relationTo: 'users',           // Single collection
  hasMany: false,
  filterOptions: ({ user }) => ({
    role: { equals: 'author' },
  }),
  admin: { position: 'sidebar' },
}

// Polymorphic relationship (multiple collections)
{
  name: 'relatedContent',
  type: 'relationship',
  relationTo: ['posts', 'pages'], // Value stored as { relationTo: 'posts', value: 'id' }
  hasMany: true,
}
```

### Blocks Field (Flexible Content)

```ts
{
  name: 'layout',
  type: 'blocks',
  blocks: [
    {
      slug: 'hero',
      fields: [
        { name: 'heading', type: 'text', required: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'cta', type: 'group', fields: [
          { name: 'label', type: 'text' },
          { name: 'link', type: 'text' },
        ]},
      ],
    },
    {
      slug: 'richContent',
      fields: [
        { name: 'content', type: 'richText' },
      ],
    },
  ],
}
```

### Tabs Field

```ts
{
  type: 'tabs',
  tabs: [
    {
      label: 'Content',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'body', type: 'richText' },
      ],
    },
    {
      name: 'meta',          // Named tab: data nested under `meta`
      label: 'SEO',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
}
```

**Important**: Unnamed tabs (no `name` property) hoist fields to the document root. Named tabs nest fields under the tab name.

---

## 6. Access Control

Access control functions return `true` (allow), `false` (deny), or a `Where` query constraint to limit which documents are accessible.

### Collection Access Control

```ts
access: {
  create: ({ req: { user }, data }) => Boolean(user),
  read: ({ req: { user } }) => {
    if (user?.role === 'admin') return true
    // Return a query to filter results
    return { _status: { equals: 'published' } }
  },
  update: ({ req: { user }, id }) => {
    if (user?.role === 'admin') return true
    return { author: { equals: user?.id } }
  },
  delete: ({ req: { user } }) => user?.role === 'admin',
  // Auth-enabled collections only:
  admin: ({ req: { user } }) => user?.role === 'admin',
  // Version-enabled collections only:
  readVersions: ({ req: { user } }) => Boolean(user),
}
```

### Field-Level Access Control

```ts
{
  name: 'internalNotes',
  type: 'textarea',
  access: {
    read: ({ req: { user } }) => user?.role === 'admin',
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => user?.role === 'admin',
  },
}
```

### Role-Based Access Control Pattern

```ts
// collections/Users.ts
export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  fields: [
    {
      name: 'role',
      type: 'select',
      options: ['admin', 'editor', 'viewer'],
      required: true,
      defaultValue: 'viewer',
    },
  ],
  access: {
    admin: ({ req: { user } }) =>
      user?.role === 'admin' || user?.role === 'editor',
    read: () => true,
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user }, id }) => {
      if (user?.role === 'admin') return true
      return user?.id === id   // Users can update themselves
    },
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
}
```

### Key Rules
- **Local API skips access control by default.** Pass `overrideAccess: false` to enforce it.
- Access functions run before the operation executes.
- When returning a `Where` query, the `id`, `data`, `doc` arguments are `undefined` during the Access Operation (initial login check).

---

## 7. Hooks

Hooks run during specific lifecycle events. They execute server-side only.

### Collection Hook Lifecycle Order

**Create**: `beforeOperation` -> `beforeValidate` -> `beforeChange` -> `afterChange` -> `afterOperation`

**Update**: `beforeOperation` -> `beforeValidate` -> `beforeChange` -> `afterChange` -> `afterOperation`

**Read**: `beforeOperation` -> `beforeRead` -> `afterRead` -> `afterOperation`

**Delete**: `beforeOperation` -> `beforeDelete` -> `afterDelete` -> `afterOperation`

### Hook Examples

```ts
import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  hooks: {
    // Mutate data before saving
    beforeChange: [
      ({ data, req, operation }) => {
        if (operation === 'create') {
          data.author = req.user?.id
        }
        return data
      },
    ],
    // Run side effects after saving
    afterChange: [
      async ({ doc, req, operation }) => {
        if (operation === 'create') {
          // Revalidate Next.js cache
          // Send notification, etc.
        }
      },
    ],
    // Transform data on read
    afterRead: [
      ({ doc, req }) => {
        doc.computedField = `${doc.title} - ${doc.category}`
        return doc
      },
    ],
    // Guard deletion
    beforeDelete: [
      async ({ req, id }) => {
        const relatedDocs = await req.payload.find({
          collection: 'comments',
          where: { post: { equals: id } },
        })
        if (relatedDocs.totalDocs > 0) {
          throw new Error('Cannot delete post with comments')
        }
      },
    ],
  },
  fields: [/* ... */],
}
```

### Hook Arguments by Type

| Hook | Key Arguments |
|------|--------------|
| `beforeChange` | `data`, `req`, `operation`, `originalDoc`, `context` |
| `afterChange` | `doc`, `req`, `operation`, `previousDoc`, `context` |
| `beforeRead` | `doc`, `req`, `query`, `context` |
| `afterRead` | `doc`, `req`, `query`, `context` |
| `beforeDelete` | `req`, `id`, `context` |
| `afterDelete` | `doc`, `req`, `id`, `context` |
| `beforeValidate` | `data`, `req`, `operation`, `originalDoc`, `context` |

### Auth-Specific Hooks

```ts
hooks: {
  beforeLogin: [({ req, user }) => { /* validate, throw to block */ }],
  afterLogin: [({ req, user, token }) => { /* logging, analytics */ }],
  afterLogout: [({ req }) => { /* cleanup */ }],
  afterRefresh: [({ req, token, exp }) => { /* token refresh logic */ }],
  afterForgotPassword: [({ args, context }) => { /* custom email */ }],
}
```

### Field-Level Hooks

```ts
{
  name: 'slug',
  type: 'text',
  hooks: {
    beforeChange: [
      ({ value, data }) => {
        if (!value && data?.title) {
          return data.title.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '')
        }
        return value
      },
    ],
  },
}
```

### Hook Performance Tips
- Avoid expensive operations in `beforeRead`/`afterRead` (they run on every read).
- Use `context` to share data between hooks and avoid redundant work.
- For long-running tasks, offload to the jobs queue: `await req.payload.jobs.queue(...)`.
- Non-blocking hooks: if you don't return a Promise (no `async`), Payload won't wait for it.

---

## 8. Authentication

Enable authentication on any collection by setting `auth: true`.

```ts
export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 7200,       // Seconds (2 hours)
    verify: true,                // Require email verification
    maxLoginAttempts: 5,
    lockTime: 600 * 1000,       // Lock for 10 minutes after max attempts
    useAPIKey: true,             // Enable API key authentication
    loginWithUsername: {
      allowEmailLogin: true,
      requireEmail: false,
    },
  },
  fields: [
    { name: 'role', type: 'select', options: ['admin', 'editor', 'user'], required: true },
    { name: 'name', type: 'text' },
  ],
}
```

### Auth Strategies
- **HTTP-Only Cookies**: Default, most secure for browser-based apps (XSS-proof).
- **JWT**: Tokens returned on login/refresh, attach to `Authorization: JWT <token>` header.
- **API Keys**: For server-to-server or third-party integrations.
- **Custom Strategies**: Extend with your own via `auth.strategies`.

### Auto-Login (Development Only)

```ts
admin: {
  autoLogin: process.env.NODE_ENV === 'development'
    ? { email: 'dev@example.com', password: 'test', prefillOnly: true }
    : false,
}
```

---

## 9. Local API (Preferred in Next.js)

The Local API is the most powerful way to interact with Payload. It runs directly on the server with zero network overhead.

```ts
import { getPayload } from 'payload'
import config from '@payload-config'

// In a React Server Component or server-side function:
const payload = await getPayload({ config })

// CREATE
const newPost = await payload.create({
  collection: 'posts',
  data: { title: 'Hello World', slug: 'hello-world', status: 'published' },
})

// FIND (paginated)
const posts = await payload.find({
  collection: 'posts',
  where: { status: { equals: 'published' } },
  sort: '-createdAt',
  limit: 10,
  page: 1,
  depth: 1,          // Populate relationships 1 level deep
})

// FIND BY ID
const post = await payload.findByID({
  collection: 'posts',
  id: '507f1f77bcf86cd799439011',
  depth: 2,
})

// UPDATE BY ID
const updated = await payload.update({
  collection: 'posts',
  id: '507f1f77bcf86cd799439011',
  data: { title: 'Updated Title' },
})

// UPDATE MANY (by where clause)
const bulkUpdated = await payload.update({
  collection: 'posts',
  where: { status: { equals: 'draft' } },
  data: { status: 'published' },
})

// DELETE
await payload.delete({
  collection: 'posts',
  id: '507f1f77bcf86cd799439011',
})

// GLOBALS
const settings = await payload.findGlobal({ slug: 'site-settings' })
await payload.updateGlobal({
  slug: 'site-settings',
  data: { siteTitle: 'New Title' },
})
```

### Key Local API Options

| Option | Description |
|--------|-------------|
| `depth` | Control relationship population (0 = no population) |
| `locale` | Specify locale for returned docs |
| `overrideAccess` | Skip access control (default: `true` in Local API) |
| `user` | User to check access control against (when `overrideAccess: false`) |
| `select` | Select specific fields to return |
| `populate` | Control which fields are populated in related docs |
| `context` | Pass data to hooks |
| `req` | Pass request object (important for transactions) |
| `pagination` | Set `false` to disable pagination and return all docs |

### Accessing Payload in Different Contexts

```ts
// In hooks, access control, validation:
const hook = async ({ req: { payload } }) => {
  const result = await payload.find({ collection: 'posts' })
}

// In Next.js Server Components / Route Handlers:
import { getPayload } from 'payload'
import config from '@payload-config'
const payload = await getPayload({ config })

// In custom endpoints:
handler: async (req) => {
  const data = await req.payload.find({ collection: 'posts' })
}
```

---

## 10. REST API

Auto-generated at `/api/{collection-slug}`. All endpoints support `depth`, `locale`, `sort`, `where`, `limit`, `page`, `select`, `populate` query parameters.

| Method | Path | Operation |
|--------|------|-----------|
| `GET` | `/api/{slug}` | Find (paginated) |
| `GET` | `/api/{slug}/{id}` | Find by ID |
| `GET` | `/api/{slug}/count` | Count documents |
| `POST` | `/api/{slug}` | Create |
| `PATCH` | `/api/{slug}` | Update many (where query) |
| `PATCH` | `/api/{slug}/{id}` | Update by ID |
| `DELETE` | `/api/{slug}` | Delete many (where query) |
| `DELETE` | `/api/{slug}/{id}` | Delete by ID |

### Auth REST Endpoints

| Method | Path | Operation |
|--------|------|-----------|
| `POST` | `/api/{users}/login` | Login |
| `POST` | `/api/{users}/logout` | Logout |
| `GET` | `/api/{users}/me` | Current user |
| `POST` | `/api/{users}/refresh-token` | Refresh token |
| `POST` | `/api/{users}/forgot-password` | Forgot password |
| `POST` | `/api/{users}/reset-password` | Reset password |

### Globals REST

| Method | Path | Operation |
|--------|------|-----------|
| `GET` | `/api/globals/{slug}` | Get global |
| `POST` | `/api/globals/{slug}` | Update global |

### Custom Endpoints

```ts
endpoints: [
  {
    path: '/:id/publish',
    method: 'post',
    handler: async (req) => {
      if (!req.user) return Response.json({ error: 'Unauthorized' }, { status: 401 })
      const data = await req.json()
      const doc = await req.payload.update({
        collection: 'posts',
        id: req.routeParams.id,
        data: { status: 'published' },
      })
      return Response.json({ doc })
    },
  },
],
```

### Payload SDK (Type-safe REST Client)

```bash
pnpm add @payloadcms/sdk
```

```ts
import { PayloadSDK } from '@payloadcms/sdk'
import type { Config } from './payload-types'

const sdk = new PayloadSDK<Config>({ baseURL: 'https://example.com/api' })

const posts = await sdk.find({
  collection: 'posts',
  where: { _status: { equals: 'published' } },
  limit: 10,
})
```

---

## 11. GraphQL API

Auto-generated at `/graphql`. Enable by installing `graphql` package.

```bash
pnpm i graphql
```

Queries and mutations are auto-generated from your collections and globals. Disable per-collection/global with `graphQL: false`.

---

## 12. Rich Text (Lexical Editor)

```ts
import { lexicalEditor } from '@payloadcms/richtext-lexical'

// Global default:
editor: lexicalEditor()

// Field-level override:
{
  name: 'content',
  type: 'richText',
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      BlocksFeature({ blocks: [Banner, CallToAction] }),
      LinkFeature({
        fields: ({ defaultFields }) => [
          ...defaultFields,
          { name: 'rel', type: 'select', hasMany: true, options: ['noopener', 'noreferrer', 'nofollow'] },
        ],
      }),
      UploadFeature({
        collections: {
          media: {
            fields: [
              { name: 'caption', type: 'richText', editor: lexicalEditor() },
            ],
          },
        },
      }),
    ],
  }),
}
```

### Key Features
- `BlocksFeature`: Embed Payload blocks directly in rich text.
- `LinkFeature`: Customizable link fields.
- `UploadFeature`: Inline media with custom fields.
- `HeadingFeature`, `BoldFeature`, `ItalicFeature`, etc.
- Fully typed: use `TypedEditorState<SerializedNodeTypes>` or `DefaultTypedEditorState`.
- Check if empty: `import { hasText } from '@payloadcms/richtext-lexical/shared'`

---

## 13. Upload & Media

Enable uploads by setting `upload: true` or an upload config object on a collection.

```ts
export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 1024, position: 'centre' },
      { name: 'tablet', width: 1024, height: undefined, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
    crop: true,
    focalPoint: true,
    formatOptions: { format: 'webp', options: { quality: 80 } },
  },
  fields: [
    { name: 'alt', type: 'text', required: true },
  ],
}
```

### Upload Options

| Option | Description |
|--------|-------------|
| `staticDir` | Storage directory (absolute or relative) |
| `imageSizes` | Auto-resize to specified dimensions |
| `adminThumbnail` | Which image size to show in admin |
| `mimeTypes` | Restrict file types (e.g., `['image/*']`) |
| `crop` / `focalPoint` | Enable crop/focal-point UI |
| `formatOptions` | Output format (webp, avif, etc.) |
| `disableLocalStorage` | Disable local storage (use with cloud plugin) |
| `filesRequiredOnCreate` | Whether file is required on create (default: true) |
| `bulkUpload` | Allow bulk uploads from list view |

### Cloud Storage

Use the `@payloadcms/storage-s3`, `@payloadcms/storage-gcs`, `@payloadcms/storage-azure`, or `@payloadcms/storage-vercel-blob` plugins.

---

## 14. Versions & Drafts

```ts
versions: {
  drafts: {
    autosave: true,       // Auto-save drafts as you edit
  },
  maxPerDoc: 25,          // Max versions to keep per document
}
```

### Version Modes
1. **Versions only** (drafts disabled): Every save creates a version (audit log).
2. **Versions + Drafts**: Control published vs. draft state. Use `_status` field.
3. **Versions + Drafts + Autosave**: Auto-save drafts without publishing.

### Working with Drafts in the Local API

```ts
// Get published version:
const published = await payload.findByID({ collection: 'posts', id: '123' })

// Get latest draft:
const draft = await payload.findByID({ collection: 'posts', id: '123', draft: true })

// Find versions:
const versions = await payload.findVersions({
  collection: 'posts',
  where: { parent: { equals: '123' } },
  sort: '-createdAt',
})

// Restore a version:
await payload.restoreVersion({ collection: 'posts', id: versionId })
```

---

## 15. Live Preview

Renders your frontend in an iframe within the Admin Panel with real-time updates via `window.postMessage`.

### Config

```ts
admin: {
  livePreview: {
    url: ({ data, collectionConfig, locale }) =>
      `/${data.slug !== 'home' ? data.slug : ''}${locale ? `?locale=${locale.code}` : ''}`,
    collections: ['pages', 'posts'],
    globals: ['site-settings'],
    breakpoints: [
      { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
    ],
  },
}
```

### Frontend Integration (Next.js App Router)

```tsx
// For Server Components: use @payloadcms/live-preview-react server utilities
// For Client Components:
'use client'
import { useLivePreview } from '@payloadcms/live-preview-react'

export function PageClient({ initialData }) {
  const { data } = useLivePreview({
    initialData,
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
    depth: 2,
  })
  return <div>{data.title}</div>
}
```

---

## 16. Admin Panel Customization

### Custom Components

Payload uses a path-based component system. Pass file paths (not React imports) for custom components.

```ts
admin: {
  components: {
    // Global admin components
    beforeNavLinks: ['/components/CustomNavLink'],
    afterNavLinks: ['/components/AnotherLink'],
    graphics: {
      Logo: '/components/CustomLogo',
      Icon: '/components/CustomIcon',
    },
  },
}

// Collection-level components:
admin: {
  components: {
    beforeList: ['/components/BeforeListView'],
    edit: {
      SaveButton: '/components/CustomSaveButton',
      PublishButton: '/components/CustomPublishButton',
    },
  },
}
```

### Custom CSS

Edit `app/(payload)/custom.scss` to override styles, colors, and themes:

```scss
:root {
  --theme-elevation-0: #f5f5f5;
  --theme-elevation-100: #ffffff;
  --color-base-0: #000;
}
```

### Custom Views

Create entirely custom admin pages:

```ts
admin: {
  components: {
    views: {
      customDashboard: {
        Component: '/views/CustomDashboard',
        path: '/custom-dashboard',
      },
    },
  },
}
```

---

## 17. Database Adapters

### MongoDB

```ts
import { mongooseAdapter } from '@payloadcms/db-mongodb'

db: mongooseAdapter({
  url: process.env.DATABASE_URL,
  // transactionOptions: false, // Disable transactions if not using replica sets
})
```

Best for: dynamic fields, heavy localization, lots of arrays/blocks, simpler ops.

### Postgres

```ts
import { postgresAdapter } from '@payloadcms/db-postgres'

db: postgresAdapter({
  pool: { connectionString: process.env.DATABASE_URL },
})
```

Best for: enforced data consistency, relational queries, migrations.

### SQLite

```ts
import { sqliteAdapter } from '@payloadcms/db-sqlite'

db: sqliteAdapter({
  client: { url: process.env.DATABASE_URL },
})
```

### Migrations (Postgres/SQLite)

```bash
pnpm payload migrate:create   # Create a migration
pnpm payload migrate          # Run pending migrations
pnpm payload migrate:status   # Check migration status
```

MongoDB does NOT require migrations -- schema changes are applied automatically.

---

## 18. TypeScript

### Generated Types

Payload auto-generates TypeScript interfaces for all collections and globals.

```bash
pnpm payload generate:types
```

Output file configured via `typescript.outputFile` in the Payload Config.

```ts
// Usage:
import type { Post, User, Media, SiteSetting } from '@/payload-types'

// Local API calls are automatically typed:
const post = await payload.create({
  collection: 'posts',
  data: { title: 'Hello' },  // TypeScript enforces correct shape
})
// `post` is typed as `Post`
```

### Type-Safe Access Control

```ts
import type { Access } from 'payload'
import type { Post } from '@/payload-types'

export const canReadPost: Access<Post> = ({ req: { user } }) => {
  if (user) return true
  return { _status: { equals: 'published' } }
}
```

---

## 19. Plugins

Plugins receive the Payload config and return a modified config.

### Using Plugins

```ts
import { buildConfig } from 'payload'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'

export default buildConfig({
  plugins: [
    seoPlugin({ collections: ['pages', 'posts'], uploadsCollection: 'media' }),
    formBuilderPlugin({ fields: { text: true, email: true, textarea: true } }),
  ],
})
```

### Official Plugins
- `@payloadcms/plugin-seo` -- SEO metadata fields
- `@payloadcms/plugin-form-builder` -- Dynamic form builder
- `@payloadcms/plugin-nested-docs` -- Nested document tree structure
- `@payloadcms/plugin-redirects` -- Redirect management
- `@payloadcms/plugin-search` -- Search index
- `@payloadcms/plugin-stripe` -- Stripe integration
- `@payloadcms/plugin-sentry` -- Sentry error tracking
- `@payloadcms/plugin-import-export` -- Data import/export
- `@payloadcms/storage-s3` -- S3 file storage
- `@payloadcms/storage-gcs` -- Google Cloud Storage
- `@payloadcms/storage-azure` -- Azure Blob Storage
- `@payloadcms/storage-vercel-blob` -- Vercel Blob Storage

### Creating a Custom Plugin

```ts
import type { Config, Plugin } from 'payload'

export const myPlugin: Plugin = (incomingConfig: Config): Config => {
  return {
    ...incomingConfig,
    collections: (incomingConfig.collections || []).map((collection) => ({
      ...collection,
      fields: [
        ...collection.fields,
        {
          name: 'lastModifiedBy',
          type: 'relationship',
          relationTo: 'users',
          admin: { position: 'sidebar', readOnly: true },
          hooks: {
            beforeChange: [({ req }) => req?.user?.id],
          },
        },
      ],
    })),
  }
}
```

---

## 20. Seed Scripts

```ts
// seed.ts
import type { SanitizedConfig } from 'payload'
import payload from 'payload'

export const script = async (config: SanitizedConfig) => {
  await payload.init({ config })

  // Create admin user
  await payload.create({
    collection: 'users',
    data: {
      email: 'admin@example.com',
      password: 'securepassword',
      role: 'admin',
    },
  })

  // Seed content
  const media = await payload.create({
    collection: 'media',
    data: { alt: 'Hero image' },
    filePath: './seed/hero.jpg',
  })

  await payload.create({
    collection: 'pages',
    data: {
      title: 'Home',
      slug: 'home',
      heroImage: media.id,
      status: 'published',
    },
  })

  payload.logger.info('Seeded successfully!')
  process.exit(0)
}
```

Register in config:

```ts
bin: [{ scriptPath: path.resolve(dirname, 'seed.ts'), key: 'seed' }],
```

Run: `pnpm payload seed`

---

## 21. Performance Best Practices

### Database
- **Index frequently queried fields**: Set `index: true` on fields used in `where` clauses and sorts.
- **Use compound indexes**: `indexes` on collections for multi-field queries.
- **Database proximity**: Host DB in the same region as your server.
- **Use `indexSortableFields: true`** in the config for auto-indexing.

### Queries
- **Control `depth`**: Use `depth: 0` when you don't need populated relationships.
- **Use `select`**: Only fetch the fields you need: `select: { title: true, slug: true }`.
- **Use `pagination: false`** only when you know the result set is small.
- **Use `limit`**: Always set reasonable limits.

### Hooks
- Avoid expensive logic in `beforeRead`/`afterRead` (runs on every read).
- Use hook `context` to avoid redundant operations across hooks.
- Offload long-running tasks to the jobs queue.

### Admin Panel
- Enable `admin.enableListViewSelectAPI: true` for faster list views.
- Use `blockReferences` for blocks shared across multiple collections.
- Enable Turbopack in development: `next dev --turbo`.
- Set `devBundleServerPackages: false` in `withPayload()` for faster dev compilation.

### Direct DB Access (Advanced)

```ts
// Bypass hooks/access control for maximum performance:
await payload.db.updateOne({
  collection: 'posts',
  id: post.id,
  data: { viewCount: newCount },
  returning: false,  // Skip returning the document
})
```

### Cached Payload Instance

Always use `getPayload()` to get a cached instance -- never instantiate multiple times:

```ts
import { getPayload } from 'payload'
import config from '@payload-config'
const payload = await getPayload({ config })
```

---

## 22. Anti-Patterns to Avoid

1. **Over-nesting fields**: Deeply nested arrays/groups/blocks create complex DB structures. Keep nesting to 3-4 levels max.

2. **Missing indexes**: If you query or sort by a field, always add `index: true`. Without it, list views and API queries become slow at scale.

3. **Not using the Local API**: In Next.js server contexts, always prefer the Local API over REST/GraphQL. It has zero network overhead and direct DB access.

4. **Ignoring `depth` control**: Leaving depth at defaults causes excessive relationship population. Set `depth: 0` or `1` for list views and API endpoints.

5. **Expensive `afterRead` hooks**: These run on every single read, including admin list views. Never put heavy operations here.

6. **Not passing `req` in Local API calls**: Especially with Postgres, always pass `req` to maintain transaction context:
   ```ts
   await payload.find({ collection: 'posts', req })
   ```

7. **Improper access control**: Never rely solely on admin UI hiding. Always implement proper server-side access control functions.

8. **Large `select` fields without `hasMany` consideration**: Using `hasMany: true` on select fields in Postgres creates join tables. Be intentional about this.

9. **Not using `overrideAccess: false`** when the Local API should respect user permissions (e.g., in custom endpoints serving external users).

10. **Storing secrets in the config**: Use environment variables for `secret`, `DATABASE_URL`, API keys, etc.

---

## 23. Security Best Practices

- Use a strong, unique `secret` in config (32+ character random string).
- Always set `cors` and `csrf` to specific domains, not `'*'` in production.
- Enable `auth.verify` for email verification on user-facing collections.
- Set `auth.maxLoginAttempts` and `auth.lockTime` to prevent brute force.
- Use field-level `access` to hide sensitive data from unauthorized users.
- Access control functions returning `Where` queries are more secure than boolean returns (they filter at the DB level).
- Never expose the admin panel to untrusted users -- use `access.admin` to restrict.
- Use HTTP-Only Cookies (default) over JWTs for browser-based auth.
- Remove Payload-prefixed cookies from external fetch requests (`externalFileHeaderFilter`).
- Keep `depth` and `maxDepth` controlled to prevent data leakage through deep relationship traversal.

---

## 24. Common Patterns

### Slug Auto-Generation

```ts
{
  name: 'slug',
  type: 'text',
  unique: true,
  index: true,
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        if (!value && data?.title) {
          return data.title
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^a-z0-9-]/g, '')
        }
        return value
      },
    ],
  },
}
```

### Revalidating Next.js Cache After Changes

```ts
import { revalidatePath, revalidateTag } from 'next/cache'

hooks: {
  afterChange: [
    ({ doc }) => {
      revalidatePath(`/posts/${doc.slug}`)
      revalidateTag('posts')
    },
  ],
}
```

### Populating Data in Server Components

```tsx
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function Page({ params }: { params: { slug: string } }) {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: params.slug } },
    depth: 2,
    limit: 1,
  })
  const page = docs[0]
  if (!page) return notFound()
  return <PageComponent data={page} />
}
```

### Conditional Fields in Admin

```ts
{
  name: 'externalUrl',
  type: 'text',
  admin: {
    condition: (data) => data.linkType === 'external',
  },
}
```

### beforeChange Hook for Computed Fields

```ts
hooks: {
  beforeChange: [
    ({ data }) => {
      if (data.firstName && data.lastName) {
        data.fullName = `${data.firstName} ${data.lastName}`
      }
      return data
    },
  ],
}
```

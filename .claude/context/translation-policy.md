---
name: Translation policy — portfolio seed files
description: Rules for translating project seed content from English to es/fr/ca/gl/pt — what to keep in English, what to translate, and recurring pitfalls.
---

# Translation policy

Applies to `src/seed/projects/*.ts`. Target locales: `es`, `fr`, `ca`, `gl`, `pt`.

Baseline: industry Spanish/Portuguese/Catalan/Galician/French tech writing. Rowin's voice is senior-engineer-plain: concrete verbs, specific tools, no marketing fluff.

## Always keep in English (do NOT translate)

**Proper nouns.** Company, product, and partner names. FanFest, Limbic AI, Synphonyte, Humantelligence, GraphAware, Sabanto, Sunliner, Learapido, Parrolabs, Yourkar, Palma Alquileres, Tricampa, Paris Saint-Germain FC, Comcast, Premier League, Real Madrid, Manchester City, The 49ers, PSG, NHS, Hume, Chiliz, Soku, EQ-everywhere.

**Tools, frameworks, services.** Vue.js, Vue 3, Vuetify, React, React.js, React Native, Next.js, Node.js, TypeScript, JavaScript, Flutter, Flare, Rive, Figma, Sketch, Ruby on Rails, Rails, PHP, Strapi, Storybook, Playwright, Puppeteer, AVA.js, Jest, Vite, Create React App, CRA, PNPM, SWR, Kubernetes, Docker, Heroku, Neo4j, Redis, PostgreSQL, MongoDB, Mapbox, deck.gl, Turf.js, GeoJSON, TailwindCSS, Notion, Slack, Trello, Harvest, LogRocket, New Relic, IBM Cloud, IBM Cloudant, IBM Functions, AWS, AWS EC2, AWS S3, AWS CodeBuild, AWS Lambda, Lambda Functions, AWS Chime SDK, AWS Chime Web SDK, AWS Elemental Media Services, GCP, GCP App Engine, GCP Cloud Logging, GitLab CI, MS CodePush, OpenAI, Viem, WalletConnect, Reown, AppKit, PhenixRTS, Socket.IO.

**Protocol / concept acronyms.** WebRTC, WebSockets, REST, RBAC, HLS, Low Latency HLS, API, SDK, OAuth, SSO, CMS, CI/CD, DX, UX, UI, SSR, SEO, BLE, QR, MVP, CEO.

**Tech loanwords widely used untranslated in industry writing.** backend, frontend, full-stack, framework, pipeline, streaming, tracking, token, dashboard, deploy, deployment (when used as release-event — "deployment pipeline" → "pipeline de deployment" or keep as "pipeline"), release, commit, stack, feature, roadmap, wallet, tile, chat, show, live (for events), mono-repo, monorepo, mini-apps, assets, scripts, content scripts, linting, formatting, profiling, caching, queue (when used with modifier like "queue management"), rollback, rollbacks, override, webhook.

**Industry idioms** (these trip up literal translators — keep verbatim):
- `happy path` — do not translate to "camino óptimo" / "parcours optimal" / "camí òptim"
- `Strict Mode` (React) — do not translate to "modo estricto"
- `Time-Traveling Conversation Engine` / `time-traveling features` (branded feature name) — keep the English name; translate any surrounding prose
- `EQ-everywhere` — always keep, it's a Humantelligence product
- `over-the-air`, `OTA` — keep as-is
- `end-to-end` (E2E testing) — keep as-is
- `server-side rendering` — keep or render locale-natural ("server-side rendering" / SSR)
- `real-time` — OK to translate ("tiempo real" / "temps réel" / "temps real" / "tempo real" / "tempo real")

## Translate (standard loc)

Ordinary prose verbs and nouns: planned, developed, designed, architected, integrated, migrated, led, coached, improved, etc. Job titles (Lead Software Engineer → Ingeniero de Software Principal / Ingénieur Logiciel Principal / Enginyer de Software Principal / Enxeñeiro de Software Principal / Engenheiro de Software Principal). Country/region names use the locale's endonym where standard (UK → Reino Unido / Royaume-Uni / Regne Unit / Reino Unido / Reino Unido).

## Recurring mistakes to avoid

1. **Translating branded feature names.** "Time-Traveling Conversation Engine" is a product feature, not a description. Keep English.
2. **Translating React/industry concepts.** "Strict Mode", "Happy Path", "Time Travel" → keep English.
3. **Inventing words for unusual source terms.** "UK emergency services de-alerting" → do not coin "desalerta". Say "cancelación de alertas a servicios de emergencia del Reino Unido".
4. **Inconsistent anglicism use inside a single translation.** Pick one: either keep `engagement` / `roadmap` / `monorepo` or localize. Be consistent within a project.
5. **Over-localizing "deployment".** "Deployment performance" → "rendimiento de deployment" (or "de despliegue" if localizing) but pick one.
6. **Mistranslating "screening" in the Limbic context.** "Screening time" = mental-health triage time. "Tiempos de cribado" (es) is acceptable clinical Spanish. Do not render as "tiempos de escaneo".
7. **Translating "FC" / club names.** "Paris Saint-Germain FC", "Real Madrid", "Premier League" — verbatim in all locales.

## Style

- Use the definite article naturally in each target language (Spanish often drops it where English keeps it and vice versa).
- Don't copy English sentence structure verbatim if it reads stiff in the target language.
- Translations should read like a senior engineer wrote them in that language — not like MT output.

## When in doubt

Keep the English term. An anglicism that looks slightly forced to a non-engineer reader is better than a translation that misrepresents a branded feature or well-known tool.

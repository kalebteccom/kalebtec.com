# Logo concepts

Six minimalist directions for the Kalebtec mark. Each option is a single SVG sized for a 500 × 500 art-board so it scales cleanly to favicon (16 px), nav (28 px), and social cover (≥256 px).

Open `/logo-options/preview.html` in the dev server (`http://localhost:3000/logo-options/preview.html`) for a side-by-side comparison.

## Options

| # | Name | Vibe | Best for |
|---|---|---|---|
| 01 | **Mono bracket** | Editorial, geometric, ink-forward | Default brand mark — pairs with editorial type |
| 02 | **Aperture K** | Negative-space K cut from purple square | App icon, social avatar |
| 03 | **Pill monogram** | Echoes our StackedPill UI | Strongest "system" vibe — connects logo to product |
| 04 | **Bracket only** | Code-bracket angle, ink, no frame | Watermark, footer, business cards |
| 05 | **Stack mark** | Three stacked bars, abstract | Most abstract — reads as motion / layers |
| 06 | **Grid K** | Constellation of dots in a K shape | Data / systems-thinking angle |

## Decision criteria

Score each option against:

1. **Recognizability at 16 px** — does the silhouette survive favicon size?
2. **Brand fit** — does it sit naturally next to our editorial type?
3. **Versatility** — does it work on both cream and ink backgrounds without redrawing?
4. **Distinctiveness** — does it stand apart from the dozens of K-monogram tech logos?
5. **Scaling story** — does it gain rather than lose detail at large sizes?

## Pick & swap

Once a winner is chosen, the swap is one file: copy the chosen SVG over `/public/logo.svg`. Every consumer (`<Logo>` component, OG images, favicons, manifest icons) picks up the new artwork automatically.

For favicons, run a regenerator (e.g. `realfavicongenerator.net`) on the chosen SVG to produce the matching 16 / 32 / 180 / 192 / 512 PNG variants and refresh `/public/favicon-*.png`, `/public/apple-touch-icon.png`, `/public/site.webmanifest`.

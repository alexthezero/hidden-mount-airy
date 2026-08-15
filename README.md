# Hidden Mount Airy, NC

A field guide to unexpected things to do in Mount Airy, North Carolina. The
site includes twelve researched experiences, quick filters, a saved personal
trail, and a ready-made Saturday itinerary.

Current live site: [hidden-mount-airy.slowride721.chatgpt.site](https://hidden-mount-airy.slowride721.chatgpt.site)

Target GitHub Pages URL: `https://alexthezero.github.io/hidden-mount-airy/`

## Local development

```bash
npm ci
npm run dev
```

## GitHub Pages export

The Pages build is a static Next.js export with the repository base path already
configured:

```bash
npm run build:github-pages
```

Copy the generated `out/` directory to `docs/`, add an empty `docs/.nojekyll`
file, and configure GitHub Pages to deploy from `main` and `/docs`.

## Main files

- `app/page.tsx` — guide content and interactions
- `app/globals.css` — responsive visual design
- `next.config.ts` — conditional GitHub Pages static export
- `public/favicon.svg` — site icon

## Commands

- `npm run dev` — local development server
- `npm run lint` — source checks
- `npm run build` — hosted Sites build
- `npm run build:github-pages` — static GitHub Pages build

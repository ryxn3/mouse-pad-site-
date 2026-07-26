# Pegasus — Premium Gaming Mousepads

> Engineered for precision. Built for victory.

A production-ready ecommerce website for the Pegasus premium gaming mousepad
brand. Built with a restrained, luxury aesthetic — near-black surfaces, a deep
crimson accent, and smooth, cinematic motion.

## Tech stack

- **Next.js 15** (App Router) + **React 18** + **TypeScript** (strict)
- **Tailwind CSS** — custom design system
- **Three.js** / **React Three Fiber** / **Drei** — 3D hero + interactive product viewer
- **Framer Motion** — page and scroll animation
- **Zustand** — cart + configurator state (cart persisted to `localStorage`)
- **React Hook Form** + **Zod** — contact & checkout validation
- **Lucide React** — icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # static export -> ./out
npm run lint    # eslint
npm run type-check
```

> The site is configured for **static export** (`output: 'export'`), so
> `npm run build` produces a fully static `./out` folder — no server required.
> Preview it locally with any static server, e.g. `npx serve out`.

## Deploying to GitHub Pages

A workflow at `.github/workflows/deploy.yml` builds the static export and
publishes it to GitHub Pages automatically.

1. In the repository, go to **Settings → Pages** and set **Source** to
   **GitHub Actions**.
2. Push to `main` (or the current working branch) — the workflow builds and
   deploys. You can also trigger it manually from the **Actions** tab
   (**Run workflow**).
3. The site goes live at `https://<user>.github.io/<repo>/`
   (for this repo: `https://ryxn3.github.io/mouse-pad-site-/`).

The workflow injects `NEXT_PUBLIC_BASE_PATH=/<repo>` at build time so all
assets, routes and the 3D logo texture resolve correctly under the Pages
sub-path. Locally the base path is empty, so the site runs from the root.

## Features

- Fullscreen cinematic hero with a floating, cursor-reactive 3D mousepad
- Premium loading screen animating the brand mark
- Floating glass navbar (transparent → matte blur on scroll) with magnetic hover
- Interactive 3D product viewer — rotate, zoom, pan, inspect (touch supported)
- Product configurator: 3 surfaces (Speed / Balance / Control) × 2 sizes, with
  live specifications, pricing and animations
- Animated comparison table, feature grid, cinematic esports showcase
- Recommendation quiz, auto-scrolling verified reviews, animated FAQ accordion
- Slide-out cart with quantity controls and `localStorage` persistence
- Full checkout flow with validation, order summary and payment placeholder
- Working contact form, gallery, and policy pages (privacy / returns / shipping / warranty)
- SEO (metadata, sitemap, robots), accessibility, reduced-motion support, and
  code-split 3D bundles for performance

## Project structure

```
public/
  assets/        logo.png, mousepad-hero.png   (brand assets, used directly)
  models/        (reserved for glTF models)
  textures/      (reserved for texture maps)
src/
  animations/    shared Framer Motion variants
  app/           App Router pages + layout, sitemap, robots
  components/
    forms/       contact + checkout forms (RHF + Zod)
    layout/      navbar, footer, cart drawer, loading screen
    sections/    homepage & page sections
    three/       3D scenes (hero, product viewer, mousepad model)
    ui/          reusable primitives (logo, buttons, headings, …)
  hooks/         reusable client hooks
  lib/           product data, constants, utils, logo texture
  state/         Zustand stores (cart, configurator)
  styles/        global styles + design tokens
  types/         shared TypeScript types
```

## A note on the logo

The supplied Pegasus logo (`public/assets/logo.png`) is used directly and
never modified. Because the artwork is black and the UI is near-black, it is
inverted **at render time** — via the `.logo-on-dark` CSS filter and a
canvas-based texture for the 3D pad — so the original mark reads as white
without altering the source file.

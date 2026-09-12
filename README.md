# Shivam Gupta - Portfolio

Personal portfolio site for Shivam Gupta, Full Stack Developer. Built with Next.js (App Router) and TypeScript, statically exported and deployed to GitHub Pages.

## Stack

- **Next.js 16** (static export via `output: "export"`) + **React 19**
- **GSAP** (ScrollTrigger) for scroll-driven animation, **Lenis** for smooth scroll
- **Sass Modules** for component-scoped styling
- **lucide-react** for icons

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it locally.

## Scripts

- `npm run dev` - start the dev server
- `npm run build` - static export to `out/`
- `npm run start` - serve the built `out/` directory
- `npm run lint` - run ESLint

## Structure

- `src/app` - root layout and page
- `src/components` - one folder per section/component, each with its own `styles.module.scss`
- `src/data` - typed content for each section (hero, projects, experience, etc.)
- `src/animations` - GSAP animation utilities (reveals, parallax, magnetic hover, cursor)
- `src/lib` - Lenis instance, loader context, small shared helpers

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds the static export and publishes it to GitHub Pages.

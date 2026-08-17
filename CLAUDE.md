# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev          # dev server at http://localhost:3000
npm run build        # production build
npm run lint         # eslint
npx prettier --write .   # format and rewrite imports to @/ aliases
```

No test suite exists.

## Architecture

**Next.js 16 App Router** with TypeScript and Tailwind CSS v4. This is Next.js 16 — read `node_modules/next/dist/docs/` before writing any Next.js-specific code, as APIs may differ from training data.

### Public site

`app/page.tsx` renders the full single-page landing site as a scrollable container. Each section is a separate component under `components/`. The site mirrors the Humanitarian Recovery NGO's slide deck: Hero → About → Mission/Vision → Areas of Work → Mine Victim Assistance → Geography → Team → Partners → Contacts.

### Interactive map

The Geography section inlines an SVG map of Ukraine (`components/UkraineMap.tsx`) whose 26 regions are hoverable and clickable; clicking opens `RegionRequestDialog`, a native `<dialog>` wrapping `EducationRequestForm`.

Path data lives in `lib/map/ukraine-regions.ts`, generated from `images/ukraine-map-dark.svg` by `scripts/generate-ukraine-regions.py`. Do not edit it by hand; regenerate instead. Region interaction styles are in `app/globals.css` under `.map-region`.

### Contacts

Facebook and Instagram buttons in `components/Contacts.tsx` are driven by the `socialLinks` array. Entries with an empty `href` are filtered out, so no dead links ship.

### Internationalization

Client-side only. `LanguageProvider` (`components/LanguageProvider.tsx`) wraps the whole app, stores the active locale in `localStorage`, and exposes `{ locale, setLocale, t }` via `useLanguage()`. Dictionaries live in `lib/i18n/en.ts` and `lib/i18n/uk.ts`; `lib/i18n/types.ts` defines the `Dictionary` interface. All user-visible strings must come from the active dictionary — never hardcode text in components.

### Gallery

Public routes: `/gallery` (album list) and `/gallery/[albumId]` (album detail).

Admin routes under `app/admin/(protected)/albums/` manage albums and images.

Data persisted to `data/gallery.json` (created on first read, seeded from `lib/gallery/seed.ts`). All reads/writes go through `lib/gallery/store.ts`; business logic in `lib/gallery/service.ts`. Uploads saved to `public/uploads/gallery/` (max 10 MB, JPEG/PNG/WebP/GIF only).

Server Actions for all gallery mutations live in `app/admin/actions.ts`. Each action calls `requireAdminSession()` before doing any work.

### Admin auth

NextAuth v5 beta (`next-auth@5.0.0-beta.x`) with a Credentials provider. Session strategy is JWT.

Required env vars:
- `AUTH_SECRET` — NextAuth secret
- `ADMIN_EMAILS` (or `ADMIN_EMAIL`) — comma-separated list of allowed admin emails
- `ADMIN_PASSWORD_HASH` — bcrypt hash (preferred), or `ADMIN_PASSWORD` — plain text fallback

Middleware (`middleware.ts`) guards all `/admin` routes, redirecting unauthenticated requests to `/admin/login`.

### Import style

Prettier is configured with `prettier-plugin-relative-imports` (installed from GitHub, not npm) and rewrites deep relative imports to `@/` absolute aliases. Always use `@/` imports; `npx prettier --write .` enforces this automatically.

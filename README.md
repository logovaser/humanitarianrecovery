# Humanitarian Recovery — Landing Page

A pixel-faithful recreation of the **Humanitarian Recovery** NGO deck
(<https://humanitarianrecovery.org.ua/>) as a single-page landing site.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS v4**.

## Sections

The page mirrors the source slides, top to bottom:

1. **Hero** — Ukrainian National Mine Action Operator
2. **About the Organization** — focus areas (EORE / NTS / MVA)
3. **Mission & Vision**
4. **Areas of Work**
5. **Mine Victim Assistance**
6. **Geography of Work**
7. **Team** — interactive tabbed profiles (Head / PM / Operations / QA)
8. **Partners**
9. **Contacts**

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint
npx prettier --write .   # format (see plugin below)
```

## Code style — `prettier-plugin-relative-imports`

Formatting uses [`prettier-plugin-relative-imports`](https://github.com/logovaser/prettier-plugin-relative-imports),
which rewrites deep relative imports to the absolute `@/` alias. Configured in
[`.prettierrc.json`](./.prettierrc.json):

```json
{
  "plugins": ["prettier-plugin-relative-imports"],
  "absolutePathPrefix": "@/",
  "maxRelativePathDepth": 1
}
```

The plugin is not published to npm, so it is installed straight from GitHub
(see `devDependencies` in `package.json`).

## Assets

Photographic assets in `public/images/` (field hero, collage, team photo, mine
victim photo, Ukraine map) and the white/green logo variants were extracted from
the original slides. The `scripts/*.mjs` helpers (using `sharp`) document how the
crops and color sampling were produced.

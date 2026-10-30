# Service Website — Mozahidul Islam

E-Commerce Growth Analyst portfolio & service website.

**Live (Vercel):** https://mozintelligence.vercel.app

## Tech Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui (New York)
- **Icons:** Lucide React
- **ORM:** Prisma (SQLite) — used by the non-static dev build
- **Deploy:** Vercel (production, static export) + GitHub Pages (secondary)

## Project Structure

```
.
├── src/
│   ├── app/
│   │   ├── api/            # Backend routes (stripped in static export build)
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx        # Main landing page (client component)
│   ├── components/ui/      # shadcn/ui components
│   ├── hooks/              # use-mobile, use-toast
│   └── lib/                # db (Prisma client), utils
├── public/                 # Images, PDFs, robots.txt
├── prisma/schema.prisma    # Database schema
└── .github/workflows/      # GitHub Pages deploy workflow
```

## Local Development

```bash
bun install
bun run dev          # http://localhost:3000
```

## Build

- **Vercel (static export):** `bun run build:vercel` with `EXPORT_STATIC=true`
  - Strips `src/app/api`, outputs static files to `out/`
- **GitHub Pages:** automated via `.github/workflows/deploy.yml` on push to `main`
- **Standalone (with API):** `bun run build` → `.next/standalone/`

## Environment Variables

Copy `.env.example` → `.env` and fill in:

```
DATABASE_URL=file:./db/custom.db
RESEND_API_KEY=...
GMAIL_USER=...
GMAIL_APP_PASSWORD=...
```

> ⚠️ Never commit `.env`. It is gitignored.

## Deployment Flow

1. Push to `main` → Vercel auto-deploys (production)
2. Push to `main` → GitHub Pages workflow also builds & deploys a static copy

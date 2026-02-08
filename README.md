# Houston Taiwanese Life (Demo)

A Next.js (App Router) demo for a weekend activities hub with community feedback, plus placeholder Food and Directory sections. Uses SQLite stored at `/data/app.db`.

## Setup

```bash
npm install
npm run db:seed
npm run dev
```

## Scripts

- `npm run dev` - Start Next.js dev server
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run db:seed` - Seed sample data into `/data/app.db`

## Admin

Open `/admin?key=YOUR_ADMIN_KEY` to review pending events. Set the environment variable `ADMIN_KEY` before starting the server.

```bash
ADMIN_KEY=changeme npm run dev
```

## Data Model

- `events`: activity listings (approved / pending / rejected)
- `visit_reports`: attendee feedback
- `places`: placeholders for Food and Directory

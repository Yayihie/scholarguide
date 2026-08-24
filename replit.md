# ScholarGuide — Engineering Documentation

## Architecture

ScholarGuide is a dual-audience K-8 education platform:
- **Educator Planner**: AI-generated (Gemini) lesson plans for teachers/parents.
- **Student Tracker**: quarterly diagnostic assessments + AI-generated grade-level curriculum + oral reading fluency checks.

### Stack
- **Client**: React 18 + TypeScript + Vite, Tailwind CSS, React Router, TanStack Query, React Helmet Async (SEO)
- **Server**: Express + TypeScript, Drizzle ORM + Neon Postgres serverless
- **AI**: Google Gemini (gemini-2.0-flash) for lesson plans and curriculum generation
- **Billing**: Stripe (subscriptions, customer portal, webhook)
- **Email**: Resend (quarter-end nudges, weekly practice reminders, weekly digests)
- **Analytics**: PostHog (trackEvent wrapper in client/src/lib/analytics.ts)
- **Hosting**: Vercel (serverless) or any Node host

## Project structure
```
scholarguide/
├── client/           # React frontend
│   └── src/
│       ├── pages/     # Route pages (landing, quick-check, settings, growth-dashboard, trust)
│       ├── lib/       # API client, analytics
│       └── App.tsx    # Router + layout
├── server/            # Express API
│   ├── index.ts       # App entry (helmet, cors, rate limiting, routes)
│   ├── db.ts          # Drizzle + Neon connection
│   ├── storage.ts     # Data access layer
│   ├── auth.ts        # JWT + bcrypt, auth + cron middleware
│   ├── gemini.ts      # AI generation (lesson plans, curriculum)
│   ├── email.ts       # Resend email (nudges, reminders, weekly digest)
│   ├── billing.ts     # Stripe checkout, portal, webhook
│   ├── routes.ts      # Auth + student CRUD + email prefs
│   ├── accountRoutes.ts # Account deletion + data export
│   └── integrationRoutes.ts # Cron endpoints
├── shared/            # Shared between client and server
│   ├── schema.ts      # Drizzle schema + Zod validation
│   ├── quickCheckPassages.ts  # 8 static passages (grades 1-8)
│   └── readingFluencyBenchmarks.ts  # ORF benchmarks + computeFluencyMetrics
├── tests/             # Vitest tests
└── .github/workflows/scheduled-nudges.yml  # Cron jobs
```

## Features built

### Priority 1 (built)
- [DONE] Public no-signup Quick Check tool (`/quick-check`) — 2-minute reading speed check with static passages, grade-level benchmark comparison, CTA to signup
- [DONE] Annual-plan upsell prompt in Settings (shows dollar savings for monthly→annual switch)

### Priority 2 (built)
- [DONE] Weekly parent digest email (`POST /api/cron/weekly-digest`) — summarizes practice sessions completed this week + upcoming curriculum topics
- [DONE] Shareable growth story graphic (`/growth-dashboard`) — canvas-to-PNG export, first-name-only privacy
- [DONE] SEO meta tags — React Helmet Async with title, description, keywords, OG tags, canonical on `/quick-check` and `/`
- [DONE] Security/trust page (`/trust`) — plain-language data protection, COPPA/FERPA, delete/export links

## Environment variables
```
DATABASE_URL=postgresql://...
GEMINI_API_KEY=...
JWT_SECRET=...
CRON_SECRET=...
RESEND_API_KEY=...
FROM_EMAIL=ScholarGuide <noreply@scholarguide.app>
APP_URL=https://scholarguide.app
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
STRIPE_PRICE_BASIC_MONTHLY=...
STRIPE_PRICE_BASIC_ANNUAL=...
STRIPE_PRICE_PRO_MONTHLY=...
STRIPE_PRICE_PRO_ANNUAL=...
```

## Verification pattern
```bash
npx tsc --noEmit    # Zero TypeScript errors
npx vitest run       # All tests pass
```

## Known limitations
- All diagnostic questions, curriculum topics, and lesson plans are 100% AI-generated with no human educator review
- No real users yet — go-live checklist requires live database + browser testing
- Pricing tiers ($14/mo basic, $24/mo pro) are placeholders — business decision
- Quick Check passages are static (by design — unauthenticated route)
- Email preferences UI is wired to real backend state (not a stub)

## What NOT to do
- Don't add gamification (XP, badges, leaderboards, streaks) — explicitly tried and reverted
- Don't build AI voice calling
- Don't unilaterally change pricing numbers
- Don't skip the tsc --noEmit / vitest run verification pattern

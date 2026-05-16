# Personal Website + Retro Local Weather/News Channel Implementation Plan

## Purpose

Build a personal website that hosts a retro 90s Weather Channel-style local weather/news app.

This project should help you get hands-on with a modern full-stack and infrastructure-oriented TypeScript stack while staying safely unrelated to policy intelligence, legislative search, case-law ingestion, government document AI, or State Affairs business interests.

## Target outcome

A personal website with a flagship `/weather` app:

```text
/
├── Home / personal landing page
├── About
├── Resume
├── Projects
├── Writing
├── Weather Channel app
└── Status / observability page
```

The weather app should feel like an old local cable weather broadcast, but run on a modern production-style stack.

## Target stack

```text
Frontend:
- Next.js
- React
- TypeScript
- Tailwind CSS

Backend:
- Node / TypeScript
- Next.js API routes initially
- Prisma
- Postgres

Background jobs:
- BullMQ
- Redis
- Node worker process

Data:
- Postgres for relational data
- Redis for caching
- MongoDB later for raw provider payloads / AI summaries

Infrastructure:
- Docker
- Docker Compose
- GitHub Actions
- Terraform later
- AWS later

Observability:
- Pino structured logging
- OpenTelemetry
- Prometheus
- Grafana
- Loki
```

---

# Agent instructions

Work through this document in order.

For each step:

- Mark the checkbox when complete.
- Do not skip ahead unless explicitly noted.
- Keep commits small and descriptive.
- Prefer working software over perfect architecture.
- Keep the first version simple.
- Add complexity only after the previous phase works.
- Avoid building anything related to policy intelligence, legislative tracking, government document analysis, case-law processing, or employer business interests.

---

# Phase 0: Define the first version

## Goal

Decide the product shape and constrain the MVP.

## Steps

- [x] Confirm the app concept:
  - A personal website with a `/weather` route.
  - The `/weather` route shows a retro local weather/news channel for a selected location.

- [x] Pick the initial default location:
  - Germantown, MD
  - Bethesda, MD selected
  - Washington, DC
  - Syracuse, NY

- [x] Define the initial weather app screens:
  - Current Conditions
  - Hourly Forecast
  - 7-Day Forecast
  - Weather Alerts
  - Local Radar Placeholder
  - Local News Ticker
  - Dog Walk Forecast

- [x] Explicitly defer these features until later:
  - Authentication
  - Multiple users
  - Complex AI
  - Cloud infrastructure
  - Terraform
  - Kubernetes
  - MongoDB
  - OpenTelemetry

## Exit criteria

- [x] The MVP scope is written in the README.
- [x] The initial location is chosen.
- [x] The first set of screens is listed.

---

# Phase 1: Repository and project setup

## Goal

Create the repository and initial Next.js app.

## Steps

- [x] Create the repo:

```bash
mkdir personal-site-weather-channel
cd personal-site-weather-channel
git init
```

- [x] Create a root `README.md`.

- [x] Add this initial README content:

```md
# Personal Site + Retro Weather Channel

A personal website and local retro weather/news dashboard built with Next.js, TypeScript, Prisma, Postgres, Redis, background workers, and production-style observability.
```

- [x] Create the Next.js app:

```bash
npx create-next-app@latest web
```

Recommended choices:

```text
TypeScript: Yes
ESLint: Yes
Tailwind CSS: Yes
src directory: Yes
App Router: Yes
Turbopack: Yes
Import alias: Yes
```

- [x] Start the dev server:

```bash
cd web
npm run dev
```

- [x] Confirm the app runs at:

```text
http://localhost:3000
```

## Exit criteria

- [x] Repo exists.
- [x] Next.js app exists in `/web`.
- [x] App runs locally.
- [x] Initial README exists.

---

# Phase 2: Basic personal website routes

## Goal

Create the structure of the personal website before building the weather app.

## Steps

- [x] Create these routes:

```text
src/app/page.tsx
src/app/about/page.tsx
src/app/resume/page.tsx
src/app/projects/page.tsx
src/app/writing/page.tsx
src/app/weather/page.tsx
src/app/status/page.tsx
```

- [x] Add placeholder page content for each route.

Example:

```tsx
export default function WeatherPage() {
  return <main>Retro Weather Channel</main>;
}
```

- [x] Create shared layout components:

```text
src/components/SiteHeader.tsx
src/components/SiteFooter.tsx
```

- [x] Add nav links:
  - Home
  - About
  - Resume
  - Projects
  - Writing
  - Weather
  - Status

- [x] Add `SiteHeader` and `SiteFooter` to:

```text
src/app/layout.tsx
```

- [x] Make sure all pages are reachable from the navigation.

## Exit criteria

- [x] All top-level routes render.
- [x] Shared navigation works.
- [x] The site feels like one cohesive personal website shell.

---

# Phase 3: Static retro weather UI MVP

## Goal

Build the first visual version of the retro weather channel using mock data.

## Steps

- [x] Create weather components:

```text
src/components/weather/WeatherChannelShell.tsx
src/components/weather/CurrentConditionsPanel.tsx
src/components/weather/HourlyForecastPanel.tsx
src/components/weather/SevenDayForecastPanel.tsx
src/components/weather/WeatherAlertPanel.tsx
src/components/weather/NewsTicker.tsx
src/components/weather/RetroClock.tsx
src/components/weather/DogWalkForecastPanel.tsx
```

- [x] Create a mock weather data file:

```text
src/components/weather/mockWeather.ts
```

- [x] Use this initial data shape:

```ts
export const mockWeather = {
  location: "Bethesda, MD",
  current: {
    temperature: 72,
    condition: "Partly Cloudy",
    humidity: 61,
    windSpeed: 8,
  },
  hourly: [
    { time: "1 PM", temperature: 73, condition: "Cloudy" },
    { time: "2 PM", temperature: 74, condition: "Cloudy" },
  ],
  daily: [
    { day: "Mon", high: 76, low: 58, condition: "Partly Cloudy" },
    { day: "Tue", high: 81, low: 63, condition: "Sunny" },
  ],
  alerts: [],
  news: [
    { title: "Local forecast updated", source: "Retro LocalCast" },
  ],
};
```

- [x] Build `WeatherChannelShell` with:
  - Top header bar
  - Main content area
  - Lower ticker
  - Local time
  - Current temperature
  - Large retro panel area

- [x] Render static mock panels on `/weather`.

- [x] Add retro styling:
  - Dark blue backgrounds
  - Blocky cards
  - Big white/yellow text
  - Ticker bar
  - Slight CRT scanline overlay
  - Simple gradients
  - Boxy 90s UI

- [x] Add optional effects:
  - Subtle screen glow
  - Scanline overlay
  - Animated lower-third ticker
  - Digital clock
  - Panel transitions

## Exit criteria

- [x] `/weather` displays a convincing retro weather channel UI.
- [x] The UI uses mock data only.
- [x] The UI is responsive enough for desktop.
- [x] The page looks good enough to demo.

---

# Phase 4: Rotating weather screens

## Goal

Make the weather app feel like a real local broadcast loop.

## Steps

- [x] Create:

```text
src/components/weather/RotatingWeatherScreen.tsx
```

- [x] Define screen IDs:

```ts
const screens = ["current", "hourly", "daily", "alerts", "dogWalk", "news"];
```

- [x] Cycle through panels every 8-12 seconds.

- [x] Add a visible label showing the current screen name.

- [x] Add pause/resume behavior.

- [x] Add keyboard controls:
  - Left arrow: previous screen
  - Right arrow: next screen
  - Space: pause/resume

- [x] Ensure all screens still use mock data.

## Exit criteria

- [x] `/weather` automatically rotates through panels.
- [x] Keyboard controls work.
- [x] Pause/resume works.
- [x] No real API calls are required yet.

---

# Phase 5: Real weather data integration

## Goal

Fetch real weather from a provider and normalize it into internal app models.

## Recommended provider

Start with the National Weather Service API for U.S. locations.

Basic flow:

```text
lat/lon
→ NWS points endpoint
→ forecast endpoint
→ hourly forecast endpoint
→ alerts endpoint
```

## Steps

- [x] Create weather server modules:

```text
src/server/weather/nwsClient.ts
src/server/weather/weatherService.ts
src/server/weather/types.ts
```

- [x] Define the normalized app type:

```ts
export type WeatherSnapshot = {
  locationName: string;
  latitude: number;
  longitude: number;
  current: {
    temperature: number;
    condition: string;
    windSpeed: string;
    humidity?: number;
  };
  hourly: Array<{
    startTime: string;
    temperature: number;
    condition: string;
    precipitationChance?: number;
  }>;
  daily: Array<{
    name: string;
    startTime: string;
    endTime: string;
    temperature: number;
    temperatureUnit: string;
    condition: string;
  }>;
  alerts: Array<{
    title: string;
    severity?: string;
    description: string;
    effective?: string;
    expires?: string;
  }>;
};
```

- [x] Implement `nwsClient.ts`:
  - Fetch point metadata.
  - Fetch daily forecast.
  - Fetch hourly forecast.
  - Fetch active alerts.

- [x] Implement `weatherService.ts`:
  - Accept lat/lon.
  - Call NWS client.
  - Convert provider responses into `WeatherSnapshot`.
  - Handle provider errors cleanly.

- [x] Create API route:

```text
src/app/api/weather/route.ts
```

- [x] Support this request shape:

```text
/api/weather?lat=38.9847&lon=-77.0947
```

- [x] Return normalized weather data.

- [x] Update `/weather` to fetch real weather for the hardcoded default location.

## Exit criteria

- [x] `/api/weather` returns real normalized weather data.
- [x] `/weather` displays real current conditions.
- [x] `/weather` displays real hourly forecast.
- [x] `/weather` displays real daily forecast.
- [x] `/weather` displays real weather alerts.
- [x] The UI still works if the provider fails.

---

# Phase 6: Docker Compose, Postgres, and Prisma

## Goal

Add local database infrastructure and store locations/weather snapshots.

## Steps

- [x] Create root `docker-compose.yml`.

- [x] Add Postgres and Redis:

```yaml
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: app
      POSTGRES_DB: personal_site
    ports:
      - "5432:5432"

  redis:
    image: redis:7
    ports:
      - "6379:6379"
```

- [x] Start services:

```bash
docker compose up -d
```

- [x] Install Prisma inside `/web`:

```bash
npm install prisma @prisma/client
npx prisma init
```

- [x] Configure `.env`:

```env
DATABASE_URL="postgresql://app:app@localhost:5432/personal_site"
```

- [x] Define initial Prisma models:

```prisma
model Location {
  id        String   @id @default(cuid())
  name      String
  latitude  Float
  longitude Float
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  weatherSnapshots WeatherSnapshot[]
}

model WeatherSnapshot {
  id         String   @id @default(cuid())
  locationId String
  provider   String
  fetchedAt  DateTime @default(now())

  temperature Int?
  condition   String?
  rawSummary  String?

  location Location @relation(fields: [locationId], references: [id])

  @@index([locationId, fetchedAt])
}
```

- [x] Run migration:

```bash
npx prisma migrate dev --name init
```

- [x] Create seed script:

```text
prisma/seed.ts
```

- [x] Seed these locations:
  - Germantown, MD
  - Bethesda, MD
  - Washington, DC
  - Syracuse, NY

- [x] Run seed.

## Exit criteria

- [x] Postgres runs locally.
- [x] Redis runs locally.
- [x] Prisma is configured.
- [x] Migrations work.
- [x] Default locations are seeded.
- [x] App can read locations from Postgres.

---

# Phase 7: Redis caching

## Goal

Cache provider responses so the app is faster and avoids unnecessary API calls.

## Steps

- [x] Install Redis client:

```bash
npm install ioredis
```

- [x] Create:

```text
src/server/cache/redisClient.ts
src/server/cache/weatherCache.ts
```

- [x] Add cache keys:

```text
weather:latest:{locationId}
weather:provider:nws:{lat}:{lon}
```

- [x] Use TTLs:
  - Current weather: 10 minutes
  - Hourly forecast: 30 minutes
  - Daily forecast: 1 hour
  - Alerts: 5 minutes

- [x] Update `/api/weather` to:
  - Check Redis cache.
  - Return cached data on hit.
  - Fetch provider data on miss.
  - Store provider response in cache.
  - Return fresh data.

- [x] Log cache hits and misses.

## Exit criteria

- [x] Weather route uses Redis.
- [x] Cache hits avoid provider fetches.
- [x] Cache misses fetch and populate Redis.
- [x] The UI still works if Redis is unavailable.

---

# Phase 8: Background weather ingestion

## Goal

Move weather refresh into a background worker.

## Steps

- [x] Install BullMQ and worker tooling:

```bash
npm install bullmq ioredis
npm install -D tsx
```

- [x] Create:

```text
src/server/jobs/weatherQueue.ts
src/workers/weatherWorker.ts
```

- [x] Add queue setup:

```ts
import { Queue } from "bullmq";

export const weatherQueue = new Queue("weather", {
  connection: {
    host: "localhost",
    port: 6379,
  },
});
```

- [x] Implement worker job:
  - Load saved locations from Postgres.
  - Fetch weather for each location.
  - Save snapshot metadata to Postgres.
  - Cache latest result in Redis.
  - Log success/failure.

- [x] Add script:

```json
{
  "scripts": {
    "worker:weather": "tsx src/workers/weatherWorker.ts"
  }
}
```

- [x] Run worker locally:

```bash
npm run worker:weather
```

- [x] Defer a repeatable/scheduled job until later:
  - Refresh every 10-30 minutes.

## Exit criteria

- [x] Worker can fetch weather for saved locations.
- [x] Worker saves weather snapshots.
- [x] Worker populates Redis cache.
- [x] API can serve latest cached worker output.
- [x] Worker failures are logged clearly.

---

# Phase 9: Local news ticker

## Goal

Add a local news ticker that feels like part of the retro channel.

## Guardrail

Use general local news, weather, traffic, community, and events feeds. Do not build policy intelligence, legislative monitoring, government document workflows, or State Affairs-like product features.

## Steps

- [x] Install RSS parser:

```bash
npm install rss-parser
```

- [x] Create:

```text
src/server/news/rssClient.ts
src/server/news/newsService.ts
src/workers/newsWorker.ts
```

- [x] Define normalized type:

```ts
export type NewsItem = {
  title: string;
  source: string;
  url: string;
  publishedAt?: string;
  summary?: string;
};
```

- [x] Add Prisma model:

```prisma
model NewsItem {
  id          String   @id @default(cuid())
  source      String
  title       String
  url         String   @unique
  summary     String?
  publishedAt DateTime?
  createdAt   DateTime @default(now())

  @@index([publishedAt])
  @@index([source])
}
```

- [x] Run migration:

```bash
npx prisma migrate dev --name add_news_items
```

- [x] Implement RSS ingestion:
  - Fetch configured feeds.
  - Normalize feed items.
  - Deduplicate by URL.
  - Store in Postgres.
  - Log ingestion results.

- [x] Create API route:

```text
src/app/api/news/route.ts
```

- [x] Update `NewsTicker.tsx` to fetch and display:
  - Headline
  - Source
  - Published time if available

## Exit criteria

- [x] RSS ingestion works.
- [x] News items are stored in Postgres.
- [x] Duplicate URLs are ignored.
- [x] `/api/news` returns recent items.
- [x] `/weather` shows real ticker items.

---

# Phase 10: Dog Walk Forecast

## Goal

Add a personal, memorable feature that recommends the best time to walk Pixel.

## Steps

- [x] Create:

```text
src/server/weather/dogWalkScore.ts
```

- [x] Use inputs:
  - Temperature
  - Precipitation chance
  - Wind speed
  - Weather condition
  - UV index later
  - Air quality later
  - Sunrise/sunset later

- [x] Implement simple scoring:
  - Start at 10.
  - Subtract for rain.
  - Subtract for extreme heat/cold.
  - Subtract for high wind.
  - Subtract for poor air quality.
  - Bonus for daylight.

- [x] Define output:

```ts
export type DogWalkRecommendation = {
  bestWindow: string;
  score: number;
  reason: string;
};
```

- [x] Add unit tests for scoring:
  - Rain lowers score.
  - Extreme heat lowers score.
  - Comfortable dry evening scores highly.
  - High wind lowers score.

- [x] Add `DogWalkForecastPanel` to the rotating weather screens.

## Exit criteria

- [x] Dog walk scoring function works.
- [x] Unit tests exist.
- [x] `/weather` displays best dog walk window.
- [x] The output is understandable and useful.

---

# Phase 11: Personal website content polish

## Goal

Make the site useful as a personal portfolio, not just a weather app.

## Steps

- [ ] Build homepage sections:
  - Hero
  - Short bio
  - Current work
  - Featured project: Retro LocalCast
  - Selected technical writing
  - GitHub / LinkedIn links
  - Resume link

- [ ] Build About page:
  - Brief personal/professional intro
  - Engineering interests
  - Current technical focus
  - Personal project interests

- [ ] Build Resume page:
  - Short summary
  - Skills
  - Experience
  - Projects
  - Downloadable resume link later

- [ ] Build Projects page with:
  - Retro LocalCast
  - Other selected projects
  - Project descriptions
  - Tech stacks
  - Links to GitHub/live demos

- [ ] Build Writing page:
  - Markdown-backed posts or placeholder cards.

- [ ] Suggested first posts:
  - Building a Retro Weather Channel with Next.js and TypeScript
  - Designing a Weather Ingestion Pipeline
  - Adding Observability to a Personal Project
  - Postgres vs Mongo in a Small Real App

## Exit criteria

- [ ] Homepage feels presentable.
- [ ] Projects page explains Retro LocalCast clearly.
- [ ] About page is complete enough to share.
- [ ] Resume page is presentable.
- [ ] Writing page exists.

---

# Phase 12: Structured logging

## Goal

Add production-style logs before adding full observability.

## Steps

- [ ] Install Pino:

```bash
npm install pino
```

- [ ] Create:

```text
src/server/logger.ts
```

- [ ] Log key events:
  - `weather.fetch.started`
  - `weather.fetch.succeeded`
  - `weather.fetch.failed`
  - `news.ingest.started`
  - `news.ingest.succeeded`
  - `news.ingest.failed`
  - `api.weather.cache_hit`
  - `api.weather.cache_miss`
  - `worker.job.started`
  - `worker.job.succeeded`
  - `worker.job.failed`

- [ ] Ensure logs are structured JSON.

- [ ] Include useful fields:
  - location ID
  - provider
  - duration
  - error message
  - request ID later
  - job ID when applicable

## Exit criteria

- [ ] API routes produce structured logs.
- [ ] Workers produce structured logs.
- [ ] Errors include enough context to debug.
- [ ] Logs do not leak secrets.

---

# Phase 13: Tests

## Goal

Add a basic but useful test pyramid.

## Steps

- [ ] Install testing tools:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] Add test scripts:

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "typecheck": "tsc --noEmit"
  }
}
```

- [ ] Add unit tests for:
  - Weather normalization.
  - Dog walk scoring.
  - RSS normalization.
  - Cache key construction.

- [ ] Add API tests later for:
  - `/api/weather`
  - `/api/news`

- [ ] Add worker tests later for:
  - Weather worker success path.
  - Weather worker provider failure.
  - News duplicate handling.

## Useful test cases

- [ ] NWS response maps to internal `WeatherSnapshot`.
- [ ] Rainy weather lowers dog walk score.
- [ ] Duplicate RSS item is not inserted twice.
- [ ] Weather cache hit avoids provider fetch.
- [ ] Provider failure returns a useful API error shape.

## Exit criteria

- [ ] Tests run locally.
- [ ] Core utility functions are covered.
- [ ] Typecheck runs locally.
- [ ] Failing tests block CI later.

---

# Phase 14: GitHub Actions CI

## Goal

Run automated checks on every pull request.

## Steps

- [ ] Create:

```text
.github/workflows/ci.yml
```

- [ ] Configure CI to run:
  - Install dependencies
  - Lint
  - Typecheck
  - Tests
  - Prisma validate

- [ ] Basic workflow shape:

```yaml
name: CI

on:
  pull_request:
  push:
    branches:
      - main

jobs:
  web:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: web
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
          cache-dependency-path: web/package-lock.json
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run test:run
      - run: npx prisma validate
```

## Exit criteria

- [ ] CI runs on PRs.
- [ ] CI runs on pushes to main.
- [ ] Lint passes.
- [ ] Typecheck passes.
- [ ] Tests pass.
- [ ] Prisma schema validates.

---

# Phase 15: Simple deployment

## Goal

Get the app live quickly before doing complex AWS/Terraform work.

## Recommended first deployment

Use:

```text
Vercel for Next.js
Neon or Supabase for Postgres
Upstash Redis
Mongo Atlas later if needed
GitHub Actions for checks
```

## Steps

- [ ] Deploy the Next.js app to Vercel.
- [ ] Create hosted Postgres database.
- [ ] Create hosted Redis instance.
- [ ] Add environment variables.
- [ ] Run Prisma migrations against hosted database.
- [ ] Confirm `/weather` works in production.
- [ ] Confirm `/api/weather` works in production.
- [ ] Confirm `/api/news` works in production.
- [ ] Confirm logs are available in the host platform.

## Exit criteria

- [ ] Site is publicly live.
- [ ] `/weather` works in production.
- [ ] Real weather data displays.
- [ ] Production database works.
- [ ] Production cache works.
- [ ] README includes live URL.

---

# Phase 16: Feature flags

## Goal

Add simple feature flagging for production-style rollout practice.

## Steps

- [ ] Add Prisma model:

```prisma
model FeatureFlag {
  id        String   @id @default(cuid())
  key       String   @unique
  enabled   Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

- [ ] Run migration:

```bash
npx prisma migrate dev --name add_feature_flags
```

- [ ] Add flags:
  - `weather.enableNewsTicker`
  - `weather.enableDogWalkForecast`
  - `weather.enableRetroMusic`
  - `weather.enableAiBriefing`
  - `weather.enableRadar`

- [ ] Create feature flag service:

```text
src/server/featureFlags/featureFlagService.ts
```

- [ ] Gate optional weather screens behind flags.

- [ ] Add admin page later:

```text
/admin/flags
```

## Exit criteria

- [ ] Feature flags exist in DB.
- [ ] App reads flags.
- [ ] Optional screens can be enabled/disabled.
- [ ] Missing flag behavior is safe.

---

# Phase 17: OpenTelemetry and local observability

## Goal

Add realistic observability around API routes, provider calls, cache, and workers.

## Steps

- [ ] Add OpenTelemetry packages.
- [ ] Create tracing setup.
- [ ] Add spans around:
  - Weather API route.
  - NWS provider call.
  - Prisma reads/writes.
  - Redis reads/writes.
  - Worker jobs.
  - News ingestion.

- [ ] Add metrics for:
  - API request duration.
  - Weather provider latency.
  - News ingestion latency.
  - Worker job duration.
  - Database query duration where practical.
  - Cache hit/miss.
  - Weather fetch failures.
  - News fetch failures.

- [ ] Extend `docker-compose.yml` with:
  - Grafana
  - Loki
  - Prometheus
  - OpenTelemetry Collector

- [ ] Build initial dashboard panels:
  - Weather API p95 latency.
  - Weather provider failures.
  - Cache hit ratio.
  - Worker job failures.
  - News ingestion count.
  - Latest successful weather refresh.

## Exit criteria

- [ ] Local observability stack starts.
- [ ] App emits traces.
- [ ] App emits metrics.
- [ ] Logs flow to Loki or equivalent.
- [ ] Grafana dashboard shows useful system health.

---

# Phase 18: MongoDB for raw provider snapshots

## Goal

Add MongoDB in a way that has a real purpose and mirrors a mixed data-store architecture.

## Use MongoDB for

- Raw weather provider responses.
- Raw RSS feed payloads.
- AI-generated daily briefing payloads later.
- Debug snapshots for failed ingestion.

## Steps

- [ ] Add MongoDB to Docker Compose.
- [ ] Install MongoDB driver or Mongoose.
- [ ] Create:

```text
src/server/mongo/mongoClient.ts
src/server/weather/rawWeatherRepository.ts
src/server/news/rawNewsRepository.ts
```

- [ ] On weather fetch:
  - Store raw provider response in MongoDB.
  - Store normalized summary in Postgres.
  - Store latest display payload in Redis.

- [ ] On news fetch:
  - Store raw RSS payload in MongoDB.
  - Store normalized news items in Postgres.

- [ ] Add cleanup/retention policy:
  - Keep raw snapshots for 7-30 days locally.
  - Keep normalized Postgres data longer.

## Exit criteria

- [ ] MongoDB runs locally.
- [ ] Raw weather provider payloads are saved.
- [ ] Raw RSS payloads are saved.
- [ ] Postgres remains the source for structured app data.
- [ ] Redis remains the source for fast latest display data.

---

# Phase 19: AI daily briefing

## Goal

Generate a daily personalized local briefing using weather and local feed data.

## Guardrail

Use AI only for summarizing this personal weather/news dashboard. Do not build legislative, case-law, policy intelligence, government tracking, or employer-adjacent features.

## Steps

- [ ] Define briefing inputs:
  - Current weather.
  - Hourly forecast.
  - Weather alerts.
  - Local headlines.
  - Dog walk score.
  - Calendar later, optional.

- [ ] Define briefing output:

```text
Good morning, Simon. It is 44° and cloudy in Germantown. Rain is likely after 3 PM, so the best dog walk window is late morning. No severe weather alerts are active. Top local headlines include...
```

- [ ] Create:

```text
src/server/briefing/briefingService.ts
src/workers/briefingWorker.ts
```

- [ ] Store generated briefings:
  - Postgres for metadata.
  - MongoDB for raw/model output if useful.

- [ ] Add weather screen:
  - `DailyBriefingPanel`

- [ ] Gate behind feature flag:
  - `weather.enableAiBriefing`

## Exit criteria

- [ ] Briefing can be generated from current app data.
- [ ] Briefing is stored.
- [ ] Briefing appears in the rotating weather UI.
- [ ] Feature flag can disable it.

---

# Phase 20: Auth and personalization

## Goal

Add optional personalization once the core app works.

## Steps

- [ ] Pick auth provider:
  - Auth.js / NextAuth
  - Clerk
  - Lucia

- [ ] Add user settings:
  - Default location.
  - Theme preference.
  - Ticker speed.
  - Enabled panels.
  - Temperature unit.
  - Saved places.

- [ ] Add model:

```prisma
model UserPreference {
  id              String   @id @default(cuid())
  userId          String
  defaultLocation String?
  theme           String?
  tickerSpeed     Int?
  enabledPanels   String[]
}
```

- [ ] Add settings page:

```text
/settings
```

- [ ] Make `/weather` respect preferences.

## Exit criteria

- [ ] User can sign in.
- [ ] User can set default location.
- [ ] User can customize enabled weather panels.
- [ ] Preferences persist.

---

# Phase 21: Production-style AWS deployment

## Goal

Practice infrastructure-as-code and cloud deployment.

## Target AWS architecture

```text
CloudFront
Route 53
ECS Fargate or App Runner
RDS Postgres
ElastiCache Redis
S3
CloudWatch
GitHub Actions
Terraform
```

Optional:

```text
Mongo Atlas instead of DocumentDB
OpenSearch later
```

## Steps

- [ ] Create infra directory:

```text
infra/
├── main.tf
├── variables.tf
├── outputs.tf
├── providers.tf
└── environments/
    ├── dev
    └── prod
```

- [ ] Use Terraform to manage:
  - VPC
  - ECS/App Runner service
  - RDS
  - Redis
  - S3 bucket
  - IAM roles
  - Security groups
  - CloudWatch log groups

- [ ] Add Dockerfile for app.
- [ ] Build image locally.
- [ ] Push image to registry.
- [ ] Deploy to AWS.
- [ ] Add production environment variables.
- [ ] Run migrations safely.
- [ ] Confirm `/weather` works on AWS.

## Exit criteria

- [ ] Terraform can provision dev infrastructure.
- [ ] App can deploy to AWS.
- [ ] App can reach RDS.
- [ ] App can reach Redis.
- [ ] Logs are visible.
- [ ] README documents AWS deployment.

---

# Phase 22: CD pipeline

## Goal

Automate build and deployment.

## Steps

- [ ] Extend GitHub Actions to:
  - Build Docker image.
  - Push to container registry.
  - Run migrations.
  - Deploy to AWS.
  - Run smoke test.

- [ ] Add smoke tests:
  - `/`
  - `/weather`
  - `/api/weather`
  - `/api/news`

- [ ] Add rollback notes to README.

## Exit criteria

- [ ] Push to main can deploy.
- [ ] Failed checks block deploy.
- [ ] Smoke tests verify deployment.
- [ ] Deployment process is documented.

---

# Phase 23: Portfolio packaging

## Goal

Make the project easy to understand and impressive to review.

## Steps

- [ ] Expand README with sections:

```md
# Retro LocalCast

## Overview
## Screenshots
## Architecture
## Tech Stack
## Local Development
## Data Model
## Weather Ingestion Pipeline
## Caching Strategy
## Observability
## Deployment
## Scaling Considerations
## Security Considerations
## Future Work
```

- [ ] Add architecture diagrams using Mermaid.

Request flow:

```mermaid
flowchart TD
  UI[Next.js Weather UI] --> API[Weather API]
  API --> Redis[Redis Cache]
  API --> PG[(Postgres)]
  Worker[Weather Worker] --> NWS[National Weather Service]
  Worker --> PG
  Worker --> Redis
```

Ingestion flow:

```mermaid
flowchart TD
  Scheduler[Scheduled Job] --> Queue[BullMQ Queue]
  Queue --> Worker[Weather Worker]
  Worker --> Provider[NWS API]
  Worker --> Mongo[(Mongo Raw Payloads)]
  Worker --> PG[(Postgres Normalized Data)]
  Worker --> Redis[(Redis Latest Cache)]
```

- [ ] Add screenshots:
  - Homepage.
  - Weather current conditions.
  - Forecast panel.
  - News ticker.
  - Grafana dashboard.

- [ ] Add docs:

```text
docs/architecture.md
docs/local-development.md
docs/weather-ingestion.md
docs/observability.md
docs/deployment.md
docs/scaling-considerations.md
docs/postmortems/example-weather-provider-outage.md
```

- [ ] Write example postmortem:

```text
What happened
Impact
Detection
Root cause
Resolution
Follow-up actions
```

## Exit criteria

- [ ] README reads like an engineering case study.
- [ ] Architecture diagrams exist.
- [ ] Screenshots exist.
- [ ] Docs explain design decisions.
- [ ] Project is portfolio-ready.

---

# Final MVP checklist

The first complete MVP is done when:

- [ ] Site is live.
- [ ] `/weather` shows real local weather.
- [ ] UI has a retro Weather Channel feel.
- [ ] Forecast panels rotate automatically.
- [ ] Weather data is fetched through your own API.
- [ ] Postgres stores locations/weather snapshots.
- [ ] Redis caches weather responses.
- [ ] A background worker refreshes weather.
- [ ] There is a local news ticker.
- [ ] There is a dog walk forecast.
- [ ] Project has a clean README.
- [ ] GitHub Actions runs lint/typecheck/tests.
- [ ] The project avoids State Affairs business interests.

---

# Final target checklist

The polished version is done when:

- [ ] Personal website is hosted at your domain.
- [ ] Retro weather/news channel is available at `/weather`.
- [ ] Real weather, alerts, news, and dog-walk forecast work.
- [ ] Background ingestion pipeline works.
- [ ] Postgres + Prisma are used for structured app data.
- [ ] MongoDB is used for raw provider snapshots or AI briefings.
- [ ] Redis cache is used for latest display data.
- [ ] OpenTelemetry traces are emitted.
- [ ] Grafana/Loki dashboard exists.
- [ ] GitHub Actions CI/CD works.
- [ ] Terraform-managed AWS deployment exists.
- [ ] Architecture docs are clear.
- [ ] README is strong.
- [ ] Project is technically serious, fun, personal, and not employer-adjacent.

---

# Recommended build order

Use this order:

1. Next.js app.
2. Personal site routes.
3. Static retro weather UI.
4. Rotating screen loop.
5. Real weather API integration.
6. Prisma + Postgres.
7. Redis cache.
8. Background weather worker.
9. News ticker.
10. Dog walk forecast.
11. Structured logs.
12. Tests.
13. GitHub Actions.
14. Simple deployment.
15. Feature flags.
16. Observability.
17. MongoDB.
18. AI briefing.
19. Auth and personalization.
20. Terraform/AWS.
21. CD pipeline.
22. Portfolio docs.

---

# Naming ideas

Possible project names:

- Retro LocalCast
- LocalCast
- WeatherDeck
- PixelWeather
- SimonOS Weather
- MyhillCast
- LocalStar
- WeatherStation 96

Recommended name:

```text
Retro LocalCast
```

---

# Non-compete / business-interest guardrails

Do not add:

- Legislative tracking.
- Policy intelligence.
- Case-law ingestion.
- Government document summaries.
- Statehouse news intelligence.
- Analyst workflow tooling for government affairs.
- AI summaries of bills, regulations, or court documents.
- Competitive intelligence products.
- Customer-facing tools that resemble State Affairs’ platform.

Safe focus areas:

- Personal website.
- Weather.
- Local general news.
- Air quality.
- Dog walk forecast.
- Personal dashboard.
- Local events.
- Portfolio writing.
- Observability and infrastructure learning.

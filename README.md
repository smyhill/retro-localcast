# Retro LocalCast

A personal website and retro local weather/news channel built with Next.js, TypeScript, Prisma, Postgres, Redis, background workers, and production-style observability.

## Overview

The goal is to create a nostalgic 90s Weather Channel-style local dashboard featuring:

- Real-time weather data and alerts
- Local headlines and news
- Dog-walk forecasts
- Infrastructure-oriented engineering practices

## MVP Scope

The first version is a personal website with a flagship `/weather` route. The
weather route will show a retro local weather/news channel for one selected
location, starting with Bethesda, MD.

Initial weather app screens:

- Current Conditions
- Hourly Forecast
- 7-Day Forecast
- Weather Alerts
- Local Radar Placeholder
- Local News Ticker
- Dog Walk Forecast

Deferred until later:

- Authentication
- Multiple users
- Complex AI
- Cloud infrastructure
- Terraform
- Kubernetes
- MongoDB
- OpenTelemetry

## Tech Stack

- **Frontend**: Next.js, TypeScript
- **Database**: Postgres with Prisma ORM
- **Caching**: Redis
- **Background Jobs**: Background workers
- **Observability**: Production-style monitoring and logging

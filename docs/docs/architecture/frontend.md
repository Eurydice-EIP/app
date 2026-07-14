# Frontend Architecture

The frontend is a Next.js 16 App Router application built with React 19, Tailwind CSS v4, next-intl, Base UI, and the shadcn-style component set used throughout the workspace.

## App structure

- `app/[locale]/layout.tsx` provides localization and theming.
- `app/[locale]/(auth)` contains the login and register flows.
- `app/[locale]/(dashboard)` contains the authenticated workspace.
- `app/[locale]/(dashboard)/projects`, `account`, and `settings` keep the major user flows separate and easy to reason about.

## Visual system

The current UI uses a warm neutral surface with a blue primary accent, card-based layouts, and chart-friendly palette values defined in `app/globals.css`.

Key traits:

- soft paper-like background instead of a flat default white
- reusable widget cards for dashboard views
- rounded surfaces, restrained shadows, and dense information panels
- consistent theme handling through `next-themes`

## Widget model

| Widget | Role |
| --- | --- |
| ProjectWidget | Browse, create, and edit projects |
| TaskWidget | Review task state, edit tasks, and mark completion |
| CalendarTasksWidget | Display tasks in a calendar-style panel |
| TimeTrackerWidget | Start and stop task timers |
| WeekStatsWidget | Surface the current weekly summary |

## Product flows

- Dashboard: project carousel, task lists, and user summary blocks.
- Projects: project detail workspace with calendar and timer tools.
- Account: profile, friends, achievements, and settings tabs.
- Settings: avatar upload and preference controls.

## Localization and state

- UI strings come from `next-intl` message files.
- Auth state is handled by the dashboard layout, which validates the token and redirects expired sessions.
- Client components own the interactive widget logic so server layouts stay lean.

## Design note

New frontend work should stay aligned with the existing card language, chart colors, and compact widget rhythm rather than introducing a separate visual system.
## Welcome to MedTrack

## Overview
**MedTek (Predict Cure Compass)** is an interactive **disease surveillance dashboard** designed to integrate real-time and historical public health data into a unified analytical platform. Built as a **single-page application (SPA)** using **React 18, TypeScript, and Vite**, the system enables users to monitor global disease trends through an intuitive and visually rich interface. 

The dashboard provides **real-time epidemiological metrics, AI-driven outbreak predictions, genomic sequence tracking, and correlation analytics**, helping public health stakeholders quickly identify patterns and emerging threats. Data is presented through interactive charts, heatmaps, and timelines powered by **Recharts and Framer Motion**, while **TanStack React Query** prepares the platform for seamless future API integrations with public health surveillance sources. 

The application is structured around four core analytical modules—**Overview, Predictions, Genomics, and Analytics**—allowing users to explore disease spread, forecast potential outbreaks, analyze pathogen evolution, and examine correlations between epidemiological variables. With a modular architecture, modern UI components from **shadcn/ui**, and a scalable React-based data flow, MedTek demonstrates a functional prototype of an **intelligent, data-driven surveillance system** that transforms complex epidemiological datasets into actionable insights for monitoring and responding to disease outbreaks.

## Project URL

**URL**: https://predict-cure-compass.lovable.app

# Architecture

**Browser (Single Page App)** → **API Layer**
            
## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 + TypeScript |
| Routing | React Router 6 (BrowserRouter) |
| Build | Vite 5 with SWC |
| Styling | Tailwind CSS 3 (dark mode by default) |
| UI Components | shadcn/ui (Radix primitives) |
| Charts | Recharts |
| Animations | Framer Motion |
| Server State | TanStack React Query |
| Forms | React Hook Form + Zod |
| Testing | Vitest + Testing Library + Playwright |

## Project Structure

```
src/
├── pages/            # Route-level components
│   ├── Index.tsx     # Landing page (renders Dashboard)
│   ├── Dashboard.tsx # Main surveillance hub with 4 tabs
│   └── NotFound.tsx  # 404 catch-all
├── components/
│   ├── dashboard/    # Domain-specific feature components
│   │   ├── MetricCard, AlertFeed, RegionPanel
│   │   ├── DiseaseHeatmap, EpiCurveChart, OutbreakTimeline
│   │   ├── PredictionEngine, GenomicTracker, CorrelationMatrix
│   │   ├── PathogenFilter, AdvancedFilters, DiseaseDetailPanel
│   │   └── ...
│   ├── ui/           # Reusable shadcn/ui primitives (30+)
│   └── NavLink.tsx   # Navigation helper
├── data/
│   └── diseaseData.ts  # Static mock data + TypeScript interfaces
├── hooks/            # Custom React hooks
├── lib/
│   └── utils.ts      # Shared utilities (cn helper)
└── test/             # Test setup and specs
```

## Routing

All routes are defined in `App.tsx`:

- `/` — Index page (renders the Dashboard)
- `*` — NotFound (404 catch-all)

The provider stack wraps the router: `QueryClientProvider` → `TooltipProvider` → `BrowserRouter`.

## Data Flow

- **Static mock data** in `src/data/diseaseData.ts` with typed interfaces (`DiseaseData`, `CountryData`, `DemographicBreakdown`).
- **Client-side filtering** — all filtering (pathogen type, risk level, region, demographics) is handled via React component state and `useMemo`.
- **React Query** is configured for future API integration.

## Dashboard Tabs

| Tab | Purpose |
|-----|---------|
| Overview | Real-time disease metrics, alerts, regional data |
| Predictions | AI-powered outbreak forecasting |
| Genomics | Pathogen genomic sequence tracking |
| Analytics | Correlation analysis and trend visualization |

## Styling

- Tailwind CSS with custom HSL color variables (dark navy background, cyan primary, amber accent)
- Fonts: Inter (UI) + JetBrains Mono (code)
- Dark mode enabled by default via CSS variables and `next-themes`

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS


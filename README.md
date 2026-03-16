## Welcome to MedTrack

## Overview

MedTek (Predict Cure Compass) is a single-page application (SPA) for epidemiological disease surveillance. It provides real-time metrics, AI-powered outbreak predictions, genomic tracking, and correlation analytics through an interactive dashboard.

## Project URL

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

# Architecture

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

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

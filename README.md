# Joel Sotelo Flores — Computational Volcanology Portfolio

Academic research portfolio for **Joel Sotelo Flores**, an undergraduate researcher working at the intersection of physical volcanology, computational geoscience, and computer vision.

This repository contains the **main portfolio site only**. The interactive research exhibits (Kīlauea: Observation to Measurement; Inside the Segmentation Model; Inside a Pyroclast) are maintained as separate projects with separate repositories, dependencies, assets, and deployments.

---

## Requirements

- **Node.js** 24 (see `.nvmrc`)
- **npm** ≥ 10

If you use nvm:

```bash
nvm use
```

---

## Setup

```bash
npm install
npm run dev
```

The development server will start at `http://localhost:4321`.

---

## Validation

Run each check individually:

```bash
npm run format          # Format all files
npm run format:check    # Check formatting without writing
npm run lint            # Lint TypeScript, JavaScript, and Astro files
npm run typecheck       # Run Astro type checking
npm run media:process   # Generate optimized public derivatives from docs/media/
npm run media:validate  # Validate media registry and derivative files
npm run content:validate # Validate content relationships and integrity
npm run test            # Run Vitest tests
npm run build           # Production build
npm run site:verify     # Verify build output (run after build)
```

Run the full validation sequence:

```bash
npm run validate
```

This runs `format:check → lint → typecheck → content:validate → media:validate → test → build → site:verify` and stops on first failure.

---

## Repository scope

This repository contains only:

- the homepage and all portfolio pages
- research project case studies
- publications, presentations, and software summaries
- the base layout, design tokens, and global styles
- structured content collections (when populated)
- static public assets
- development tooling and tests

**Not in this repository:**

- the Kīlauea: Observation to Measurement exhibit
- the Inside the Segmentation Model exhibit
- the Inside a Pyroclast exhibit
- training datasets, model checkpoints, or raw scientific media
- exhibit-specific JavaScript runtimes or 3D renderers

---

## Project documents

- [PROJECT_FOUNDATION.md](PROJECT_FOUNDATION.md) — product goals, visual system, technical architecture
- [AGENTS.md](AGENTS.md) — permanent rules for coding agents working in this repository
- [docs/TICKET_001_REPOSITORY_SCAFFOLD.md](docs/TICKET_001_REPOSITORY_SCAFFOLD.md) — scaffold ticket specification
- [docs/TICKET_002_CONTENT_ARCHITECTURE.md](docs/TICKET_002_CONTENT_ARCHITECTURE.md) — Node 24 alignment and content architecture ticket
- [docs/TICKET_003_CONTENT_INTEGRITY_AND_COMPONENTS.md](docs/TICKET_003_CONTENT_INTEGRITY_AND_COMPONENTS.md) — integrity validation and core components ticket
- [docs/TICKET_011_DEDICATED_WEB_CV.md](docs/TICKET_011_DEDICATED_WEB_CV.md) — dedicated web CV and PDF download ticket
- [docs/CONTENT_MODEL.md](docs/CONTENT_MODEL.md) — content collections, schemas, and conventions
- [docs/CONTENT_COMPONENTS.md](docs/CONTENT_COMPONENTS.md) — reusable component reference
- [docs/PAGE_ARCHITECTURE.md](docs/PAGE_ARCHITECTURE.md) — public page architecture and data sources
- [docs/CV_DATA_MODEL.md](docs/CV_DATA_MODEL.md) — CV data architecture and status management

---

## Content system

Structured content lives under `src/content/`:

```text
src/content/
├── projects/        ← research project case studies (.md)
├── publications/    ← journal articles, manuscripts, preprints (.md)
├── presentations/   ← talks, posters, conference abstracts (.md)
├── software/        ← scientific software entries (.md)
└── exhibits/        ← external interactive exhibit links (.md)
```

All schemas are defined centrally in `src/types/content-schemas.ts`.
Controlled status vocabularies are in `src/types/content.ts`.
Human-readable labels are in `src/utils/content-labels.ts`.
Server-side query utilities are in `src/utils/content-queries.ts`.
Cross-collection integrity validation is in `src/utils/content-integrity.ts`.

Exhibit records link to external interactive experiences only. The full exhibit
implementations live in separate repositories.

---

## Deployment

Deployment to Vercel will be configured in a later ticket.

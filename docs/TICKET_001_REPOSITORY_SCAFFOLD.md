# Ticket 001 — Portfolio Repository Scaffolding

## Status

Ready for implementation

## Project

Main computational volcanology portfolio for Joel Sotelo Flores

## Scope

Repository initialization and development infrastructure only

## Governing documents

Before making any changes, read:

- `PROJECT_FOUNDATION.md`
- `AGENTS.md`

These documents are authoritative.

This ticket does **not** authorize implementation of:

- final visual design
- homepage content
- project pages
- publication entries
- presentation entries
- software entries
- exhibit implementations
- exhibit previews
- animations
- real scientific media
- deployment to a custom domain

---

# 1. Objective

Create a clean, production-ready Astro repository foundation for the main portfolio.

The completed repository should:

- run locally
- use strict TypeScript
- build successfully for production
- include formatting, linting, type checking, and tests
- include a minimal route structure
- include the intended top-level folders
- include placeholder layouts and pages only
- include a minimal global stylesheet
- support future structured content collections
- avoid unnecessary client-side JavaScript
- avoid exhibit-specific dependencies
- document setup and validation commands

This ticket is successful when the repository is technically sound and ready for later design and content tickets.

It is not successful merely because Astro starts.

---

# 2. Agent instruction

Use the following instruction as the direct prompt to the coding agent:

> Read `AGENTS.md` and `PROJECT_FOUNDATION.md` in full before making changes.
>
> Work only on Ticket 001: Portfolio Repository Scaffolding.
>
> Inspect the current directory before editing. If the repository is empty, initialize the project in place. If files already exist, preserve anything intentional and report conflicts before replacing them.
>
> Create the smallest production-ready Astro foundation that satisfies this ticket.
>
> Do not implement final design, academic content, real publication data, project copy, exhibit code, scroll effects, Three.js, GSAP, or a React single-page application.
>
> Do not begin later tickets.
>
> Before completion, run formatting, linting, type checking, tests, and the production build. Fix failures caused by your work. Then report modified files, validation results, manual verification steps, and remaining limitations.

---

# 3. Framework requirements

Use:

- Astro
- TypeScript
- strict TypeScript configuration
- npm as the package manager unless the repository already uses another package manager
- static output
- semantic HTML
- CSS custom properties
- minimal JavaScript

Do not add React during this ticket.

React may be added later only when a specific lightweight interactive component requires it.

Do not add:

- Next.js
- Remix
- Vue
- Svelte
- Three.js
- React Three Fiber
- GSAP
- D3
- Tailwind CSS
- Bootstrap
- Material UI
- component libraries
- state-management libraries
- icon libraries
- analytics
- content-management systems
- database clients
- server adapters

The site should use Astro’s default static build behavior.

---

# 4. Runtime and package requirements

Use a current supported Node.js version appropriate for the installed Astro release.

Add one version declaration using the repository’s chosen convention:

- `.nvmrc`, or
- `.node-version`, or
- `engines.node` in `package.json`

Prefer one clear source rather than several conflicting declarations.

Document the required Node.js version in `README.md`.

The project must use a committed lockfile.

---

# 5. Required project structure

Create or preserve a structure equivalent to:

```text
/
├── public/
│   ├── cv/
│   │   └── .gitkeep
│   ├── images/
│   │   └── .gitkeep
│   ├── media/
│   │   ├── previews/
│   │   │   └── .gitkeep
│   │   └── projects/
│   │       └── .gitkeep
│   └── social/
│       └── .gitkeep
├── src/
│   ├── components/
│   │   ├── core/
│   │   │   └── .gitkeep
│   │   ├── exhibits/
│   │   │   └── .gitkeep
│   │   ├── navigation/
│   │   │   └── .gitkeep
│   │   ├── presentations/
│   │   │   └── .gitkeep
│   │   ├── projects/
│   │   │   └── .gitkeep
│   │   ├── publications/
│   │   │   └── .gitkeep
│   │   └── software/
│   │       └── .gitkeep
│   ├── content/
│   │   ├── exhibits/
│   │   │   └── .gitkeep
│   │   ├── presentations/
│   │   │   └── .gitkeep
│   │   ├── projects/
│   │   │   └── .gitkeep
│   │   ├── publications/
│   │   │   └── .gitkeep
│   │   └── software/
│   │       └── .gitkeep
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── about.astro
│   │   ├── index.astro
│   │   ├── presentations.astro
│   │   ├── publications.astro
│   │   ├── research.astro
│   │   └── software.astro
│   ├── styles/
│   │   ├── global.css
│   │   └── tokens.css
│   ├── types/
│   │   └── .gitkeep
│   └── utils/
│       └── .gitkeep
├── docs/
│   └── TICKET_001_REPOSITORY_SCAFFOLD.md
├── tests/
│   └── smoke.test.ts
├── .editorconfig
├── .gitignore
├── .prettierignore
├── .prettierrc
├── AGENTS.md
├── PROJECT_FOUNDATION.md
├── README.md
├── astro.config.mjs
├── eslint.config.js
├── package-lock.json
├── package.json
├── tsconfig.json
└── vitest.config.ts
```

Small deviations are acceptable if they are required by the current Astro or ESLint conventions.

Do not reorganize the governing Markdown files into another directory.

`AGENTS.md` and `PROJECT_FOUNDATION.md` must remain at the repository root.

The `components/exhibits/` directory is reserved for lightweight portfolio preview components only. It is not for full exhibit implementations.

---

# 6. Required routes

Create placeholder pages for:

- `/`
- `/about`
- `/research`
- `/publications`
- `/presentations`
- `/software`

Each route must:

- use `BaseLayout.astro`
- contain exactly one clear page heading
- contain a concise placeholder statement
- use semantic HTML
- require no client-side JavaScript
- return a successful static build

Example placeholder language may be used, but do not write final website copy.

Acceptable example:

> This page will present Joel’s research projects and scientific workflows.

Do not fabricate publication titles, metrics, affiliations, or project results.

Do not create an exhibit route during this ticket.

---

# 7. Base layout requirements

Create `src/layouts/BaseLayout.astro`.

It must support at least:

- `title`
- `description`

It should render:

- a valid HTML document
- language declaration
- character encoding
- viewport metadata
- document title
- meta description
- a skip link
- a simple site header
- a semantic navigation region
- a main-content slot
- a simple footer

The navigation should link to the six required routes.

Use Joel’s name as plain text branding:

**Joel Sotelo Flores**

Do not create a logo or monogram yet.

Do not implement sticky behavior, mobile menus, animations, or final spacing.

The layout must be structurally accessible but visually minimal.

---

# 8. Initial design-token foundation

Create `src/styles/tokens.css`.

Include the initial color tokens from `PROJECT_FOUNDATION.md`:

```css
:root {
  --color-obsidian: #08090a;
  --color-basalt: #141619;
  --color-charcoal: #1d2023;
  --color-ivory: #f3efe7;
  --color-ash: #aaa69e;
  --color-stone: #595b5d;
  --color-wine: #79242f;
  --color-oxidized-red: #b64a3a;
  --color-sandstone: #aa9767;
  --color-sulfur: #d6b85e;
}
```

Also define a minimal set of neutral foundation tokens for:

- font families
- maximum content width
- spacing
- border radius
- transition duration
- focus outline

Keep the token set small.

Do not attempt to design the final type scale or spacing system during this ticket.

Do not add any blue values.

---

# 9. Minimal global styles

Create `src/styles/global.css`.

It should:

- import or otherwise include `tokens.css`
- apply `box-sizing: border-box`
- remove default body margin
- establish a readable system-font stack
- use the obsidian background
- use ivory text
- establish readable line height
- style links using the project palette
- create a visible keyboard focus state
- style the skip link
- establish a simple constrained content wrapper
- provide basic header, nav, main, and footer spacing
- respect `prefers-reduced-motion`

Do not:

- add gradients
- add glowing effects
- add final card styles
- add complex responsive behavior
- add custom web fonts
- add decorative textures
- add background images
- add animations
- add blue browser-default link styling

The purpose of this stylesheet is structural verification, not visual completion.

---

# 10. TypeScript configuration

TypeScript must be strict.

The configuration should:

- extend an appropriate Astro strict configuration
- reject implicit `any`
- support Astro files
- avoid unnecessary path aliases during this ticket
- support the test environment

Do not weaken strictness to silence errors.

---

# 11. Formatting

Configure Prettier.

It should format:

- Astro
- TypeScript
- JavaScript
- JSON
- Markdown
- CSS

Add the current Astro Prettier plugin if required.

Provide package scripts for:

- formatting all supported files
- checking formatting without modifying files

Recommended names:

```json
{
  "format": "...",
  "format:check": "..."
}
```

Do not format scientific media, lockfiles through unsupported tools, or generated build output.

---

# 12. Linting

Configure ESLint using the current flat-config convention when supported by the selected package versions.

Lint:

- TypeScript
- JavaScript
- Astro

Use maintained official or well-established integrations appropriate for Astro.

The configuration should:

- reject obvious errors
- support TypeScript
- support Astro templates
- ignore generated build directories
- avoid excessive stylistic overlap with Prettier

Do not disable rules broadly merely to obtain a passing result.

Provide:

```json
{
  "lint": "..."
}
```

---

# 13. Type checking

Provide:

```json
{
  "typecheck": "astro check"
}
```

Install the supported Astro checking package if required.

`npm run typecheck` must pass.

---

# 14. Testing

Use Vitest for lightweight unit or smoke testing.

Create `tests/smoke.test.ts`.

The test should verify at least one stable project invariant, such as:

- the expected public route list
- required navigation labels
- a simple utility or configuration invariant
- design tokens containing no prohibited blue token names

Do not write a meaningless test such as `expect(true).toBe(true)`.

A preferred approach is to export the navigation definition from a small typed data file and test that:

- every required route exists
- route labels are unique
- URLs are unique
- all internal routes begin with `/`

If this approach is used, place the navigation data somewhere sensible, such as:

```text
src/utils/navigation.ts
```

Then use the same navigation data in `BaseLayout.astro`.

Provide:

```json
{
  "test": "vitest run"
}
```

Do not add browser automation in this ticket.

Browser-level testing may be introduced in a later ticket when the site contains meaningful UI behavior.

---

# 15. Build scripts

`package.json` must include at least:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "format": "...",
    "format:check": "...",
    "lint": "...",
    "typecheck": "astro check",
    "test": "vitest run",
    "validate": "..."
  }
}
```

`validate` should run the full noninteractive validation sequence.

Recommended order:

1. formatting check
2. lint
3. typecheck
4. tests
5. production build

The command must stop if any step fails.

---

# 16. README requirements

Create or update `README.md`.

It must include:

## Project summary

State that this is Joel Sotelo Flores’s main academic portfolio for computational and physical volcanology.

State that interactive research exhibits are maintained separately.

## Requirements

- supported Node.js version
- npm

## Setup

```text
npm install
npm run dev
```

## Validation

Document:

```text
npm run format
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
npm run validate
```

## Repository scope

State clearly that this repository does not contain the full Kīlauea, model-training, or 3D pyroclast exhibits.

## Project documents

Link to:

- `PROJECT_FOUNDATION.md`
- `AGENTS.md`
- this ticket document

Do not include deployment instructions yet beyond a brief note that Vercel deployment will be configured in a later ticket.

---

# 17. Editor and ignore files

## `.editorconfig`

Configure sensible defaults:

- UTF-8
- final newline
- spaces
- two-space indentation for web files
- trim trailing whitespace

Markdown may preserve intentional trailing spaces only if necessary.

## `.gitignore`

Ignore at least:

- `node_modules`
- Astro build output
- temporary build directories
- environment files
- operating-system metadata
- editor caches
- test coverage output
- local Vercel metadata if appropriate

Do not ignore governing Markdown documents or intended public assets.

## `.prettierignore`

Ignore:

- build output
- package lockfile if appropriate for the chosen Prettier workflow
- generated files
- large media directories only if formatting tools might inspect them unnecessarily

---

# 18. Content collection preparation

Do not implement full schemas during this ticket.

However, prepare the repository so later content collections can be added cleanly.

Allowed:

- empty content directories
- `.gitkeep` files
- a minimal `src/content.config.ts` only if required by the current Astro version and if empty collections are supported safely

Do not create speculative schemas for:

- publications
- presentations
- projects
- software
- exhibits

Those belong to the next content-architecture ticket.

Do not add fake content files merely to demonstrate collections.

---

# 19. Accessibility baseline

The scaffold must include:

- skip link
- semantic header
- semantic nav
- semantic main
- semantic footer
- visible focus styles
- logical page headings
- descriptive navigation labels
- no hover-only navigation
- no animation requirement
- reduced-motion handling

Do not use ARIA where native HTML already provides the correct semantics.

---

# 20. Performance baseline

The scaffold must:

- ship no unnecessary client-side JavaScript
- include no external font requests
- include no image requests except Astro defaults if unavoidable
- include no analytics
- include no animation libraries
- include no heavy framework integrations
- build static HTML

After building, inspect the generated output and confirm that placeholder pages do not hydrate client-side components.

---

# 21. Security and privacy baseline

Do not add:

- environment secrets
- analytics identifiers
- contact form endpoints
- API keys
- email-service credentials
- third-party embeds
- tracking scripts

No `.env` file should be committed.

An optional `.env.example` is unnecessary for this ticket because no environment variables should exist yet.

---

# 22. Prohibited work

The agent must not:

- design the final homepage
- add a hero animation
- write Joel’s final biography
- add real publication entries
- add real presentation entries
- add real project copy
- add a final navigation design
- add a mobile menu
- add custom fonts
- add images
- add a CV file
- implement exhibit previews
- implement exhibits
- add GSAP
- add Three.js
- add React
- deploy the site
- configure the custom domain
- add analytics
- build a contact form
- add a CMS
- create a design system package
- create extra routes
- refactor beyond the ticket

If any of these appear necessary, note them as future work rather than implementing them.

---

# 23. Acceptance criteria

The ticket is complete only if all conditions below are met.

## Repository

- Astro project initialized
- lockfile committed
- supported Node.js version documented
- project structure established
- governing Markdown files remain at the root

## Routes

- `/`
- `/about`
- `/research`
- `/publications`
- `/presentations`
- `/software`

All build successfully.

## Layout

- shared `BaseLayout.astro`
- title support
- description support
- skip link
- header
- navigation
- main content
- footer

## Styling

- design tokens exist
- no blue accent values
- minimal global styling
- visible focus states
- reduced-motion rule

## Tooling

- Prettier configured
- ESLint configured
- strict TypeScript
- Astro type checking
- Vitest configured
- meaningful smoke test
- full validation script

## Documentation

- README contains setup and validation instructions
- repository scope is documented
- ticket is stored under `docs/`

## Validation

All of these pass:

```text
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
npm run validate
```

## Scope control

- no real scientific content
- no exhibit implementation
- no React
- no GSAP
- no Three.js
- no unnecessary client JavaScript
- no deployment work
- no large media

---

# 24. Manual verification checklist

After the agent finishes, Joel should verify:

1. Run `npm install`.
2. Run `npm run dev`.
3. Open the local URL.
4. Visit every required route.
5. Confirm each route has one page heading.
6. Use the keyboard to tab through the skip link and navigation.
7. Confirm focus states are visible and not blue.
8. Confirm all navigation links work.
9. Confirm there are no broken assets.
10. Confirm no final design or fabricated scientific content has been added.
11. Run `npm run validate`.
12. Confirm the production build completes.
13. Inspect the repository for accidental large files.
14. Confirm `AGENTS.md` and `PROJECT_FOUNDATION.md` remain at the root.
15. Confirm the browser network panel shows no exhibit bundles, external fonts, analytics, or unnecessary client JavaScript.

---

# 25. Required completion report

The agent’s final response must use this structure:

## Summary

Describe the repository foundation created.

## Modified files

List every created or modified file and why it exists.

## Validation

Report the result of:

- formatting check
- lint
- type checking
- tests
- production build
- full validation script

## Manual verification

Provide the local commands and routes Joel should inspect.

## Remaining limitations

State that final visual design, content schemas, scientific content, real media, exhibit previews, deployment, and external exhibits remain intentionally out of scope.

Do not begin Ticket 002.

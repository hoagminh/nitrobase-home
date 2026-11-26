# Nitrobase

<p align="center">
  <img src="public/assets/landing/logo-dark.png#gh-dark-mode-only" alt="Nitrobase Logo" width="320" />
  <img src="public/assets/landing/logo-light.png#gh-light-mode-only" alt="Nitrobase Logo" width="320" />
</p>

<p align="center">
  <strong>Landing Page & Documentation Portal for <a href="https://nitrobase.app">Nitrobase</a></strong><br>
  <em>Self-hosted PaaS &amp; BaaS control panel for deploying Supabase, Appwrite, PocketBase, databases, and Git apps on your own servers.</em><br>
  <a href="https://nitrobase.app">Website</a> · <a href="https://nitrobase.app/docs">Docs</a> · <a href="https://github.com/AydenGroup/nitrobase">Nitrobase Core Repo</a>
</p>

<p align="center">
  <a href="https://tanstack.com/start/latest"><img src="https://img.shields.io/badge/Framework-TanStack_Start-232340?logo=reactquery&logoColor=white" alt="TanStack Start" /></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/Frontend-React_19-20232A?logo=react&logoColor=61DAFB" alt="React 19" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/Language-TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://mantine.dev/"><img src="https://img.shields.io/badge/UI_Library-Mantine_UI-339AF0?logo=mantine&logoColor=white" alt="Mantine UI" /></a>
  <a href="https://lingui.dev/"><img src="https://img.shields.io/badge/i18n-LinguiJS-E23237?logo=i18next&logoColor=white" alt="LinguiJS" /></a>
  <a href="https://www.content-collections.dev/"><img src="https://img.shields.io/badge/CMS-Content_Collections-24292E?logo=markdown&logoColor=white" alt="Content Collections" /></a>
  <a href="https://workers.cloudflare.com/"><img src="https://img.shields.io/badge/Deploy-Cloudflare_Workers-F38020?logo=cloudflare&logoColor=white" alt="Cloudflare Workers" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/Site_License-MIT-2ea44f" alt="Site License: MIT" /></a>
</p>

---

## Features & Architecture

- **Full-Stack & SSR**: Powered by [TanStack Start](https://tanstack.com/start/latest) and React 19 with type-safe file-based routing and Server-Side Rendering.
- **Design System & Mantine UI**: Integrated with [@mantine/core](https://mantine.dev/) and [@mantine/carousel](https://mantine.dev/x/carousel/) supporting:
  - Seamless Dark and Light color schemes with zero-flicker hydration.
  - Interactive workflow canvas (`HeroWorkflowCanvas`), one-click install snippet copy, and support modal.
  - Mobile-optimized responsive header with slide-out right drawer navigation.
- **Bilingual Technical Documentation Portal**:
  - 74 bilingual Markdown files (37 English + 37 Vietnamese guides) covering Getting Started, Core Concepts, Server & Networking, Apps & Standalone Databases, Cloud Sync (Supabase & Appwrite), Backup & Disaster Recovery, Maintenance, REST API & OpenAPI 3.1, MCP Server (`/api/mcp`), and Contributing.
  - Rendered with [Shiki](https://shiki.style/) syntax highlighting (with copy buttons), admonition callouts, responsive tables, and interactive [Mermaid](https://mermaid.js.org/) diagrams.
  - Collapsible accordion sidebar navigation and Prev/Next pagination.
- **Complete Internationalization (i18n)**:
  - Built with [LinguiJS v6](https://lingui.dev/) with full English (`en`) and Vietnamese (`vi`) catalogs.
  - Locale-aware routing with `/` (English default) and `/vi` prefix.
  - Zero hardcoded UI strings using `i18n._(...)` and module-level `msg({ id: "..." })` descriptors.
- **Dynamic Content & Legal Collections**:
  - Type-safe Markdown and YAML content management via [Content Collections](https://www.content-collections.dev/).
  - Multilingual legal pages aligned with Nitrobase's `FSL-1.1-ALv2` license and self-hosted model: **Privacy Policy** (`/policy`, `/vi/policy`) and **Terms of Service** (`/terms-of-service`, `/vi/terms-of-service`).
  - Landing page copy managed via modular YAML collections (`contents/landing/`).
- **Public Installer Hosting**:
  - Serves [`public/install.sh`](public/install.sh) at `https://nitrobase.app/install.sh` (kept in sync with [`AydenGroup/nitrobase/scripts/install.sh`](https://github.com/AydenGroup/nitrobase/blob/main/scripts/install.sh) with LF line endings enforced via `.gitattributes`).
- **Comprehensive SEO & Social Metadata**:
  - Centralized global SEO configuration via `contents/settings/seo.yaml`.
  - Canonical URLs (`https://nitrobase.app`), localized Open Graph, Twitter cards, JSON-LD, and `hreflang` alternate tags (`en`, `vi`, `x-default`).
- **Git-Based CMS**:
  - Embedded browser-based [Sveltia CMS](https://sveltia.github.io/sveltia-cms/) at `/admin` for content editing and publishing.
- **Edge Deployment Ready**:
  - Configured for [Cloudflare Workers](https://developers.cloudflare.com/workers/) using `@cloudflare/vite-plugin` and Wrangler.
- **Code Quality & Git Hooks**:
  - Linting and formatting via [Biome](https://biomejs.dev/).
  - Automated pre-commit, commit-msg, and pre-push checks via [Lefthook](https://github.com/evilmartians/lefthook) and [Commitlint](https://commitlint.js.org/).

---

## Project Structure

```text
├── collections/                  # Content Collections schema definitions
│   ├── author.ts                 # Authors schema
│   ├── docs.ts                   # Documentation schema, callouts & Shiki plugins
│   ├── landing.ts                # Landing page CMS content schemas
│   ├── legal.ts                  # Privacy Policy and Terms of Service schema
│   └── settings.ts               # Global SEO configuration schema
├── contents/                     # Raw Markdown & YAML content
│   ├── docs/                     # Bilingual documentation (37 EN + 37 VI guides)
│   │   ├── en/                   # English documentation
│   │   └── vi/                   # Vietnamese documentation
│   ├── landing/                  # Modular landing copy (faq, features, tech-partners, workflow-steps...)
│   ├── legal/                    # Multilingual legal pages (en/vi policy.md, terms.md)
│   └── settings/                 # Global SEO configuration (seo.yaml)
├── public/                       # Static public assets
│   ├── admin/                    # Sveltia CMS configuration and entry
│   ├── assets/landing/           # Brand logo assets (logo-dark.svg/png, logo-light.svg/png)
│   ├── uploads/                  # Landing & CMS media assets (step-1..3.png, logos...)
│   └── install.sh                # Public VPS installer served at https://nitrobase.app/install.sh (LF)
├── src/
│   ├── components/
│   │   ├── auth/                 # Sign In form & background canvas
│   │   ├── docs/                 # DocsView layout, sidebar navigation, Mermaid & copy buttons
│   │   ├── landing/              # Hero, HeroWorkflowCanvas, Navbar, Features, HowItWorks, FAQ, CTA, Footer
│   │   └── legal/                # LegalDocumentView reading component
│   ├── constants/                # Docs navigation tree & landing link constants
│   ├── libs/
│   │   ├── auth.ts               # CMS OAuth helpers
│   │   ├── i18n.ts               # Lingui setup, Locale utilities, LocalizedLink
│   │   ├── landing.ts            # Landing collection data hook
│   │   └── seo.ts                # SEO metadata generator helper
│   ├── locales/                  # Lingui JSON & compiled JS catalogs (en, vi)
│   ├── routes/                   # TanStack Router file-based route hierarchy
│   │   ├── __root.tsx            # HTML root document, MantineProvider & DevTools
│   │   ├── api/                  # CMS GitHub OAuth API routes
│   │   └── {-$locale}/           # Locale-prefixed routes (/, /vi, /docs/$, /login, /policy, /terms-of-service)
│   └── theme/                    # Mantine custom typography and color theme
├── .gitattributes                # Enforces LF line endings for *.sh scripts
├── content-collections.ts        # Content Collections root configuration
└── vite.config.ts                # Vite, Rolldown Babel macros & Cloudflare plugins
```

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (v1.1+ recommended)

### 1. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/hoagminh/nitrobase-home.git
cd nitrobase-home
bun install
```

### 2. Development

Run the local development server with Hot Module Replacement (HMR):

```bash
bun run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## Localization (i18n) Workflow

All user-visible UI strings must go through Lingui (`i18n._(...)` or module-level `msg()`).

### 1. Extract Strings

Extract source strings to `src/locales/en.json` and `src/locales/vi.json` and prune unused keys:

```bash
bun run i18n:extract
```

### 2. Translate Missing Keys

Fill in any empty values in `src/locales/vi.json`.

### 3. Compile Catalogs

Compile message catalogs into runtime JavaScript bundles:

```bash
bun run i18n:compile
```

---

## Syncing `public/install.sh`

Whenever [`scripts/install.sh`](https://github.com/AydenGroup/nitrobase/blob/main/scripts/install.sh) changes in `AydenGroup/nitrobase`, copy it to `public/install.sh` using **UTF-8 (no BOM) with LF (`\n`) line endings** (enforced by `.gitattributes` so `curl -fsSL https://nitrobase.app/install.sh | sudo bash` runs cleanly on Linux VPS hosts).

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `bun run dev` | Starts the local Vite development server on port 3000 |
| `bun run build` | Extracts/compiles i18n catalogs and builds the production bundle |
| `bun run preview` | Previews the production build locally |
| `bun run deploy` | Builds the app and deploys to Cloudflare Workers via Wrangler |
| `bun run check` | Checks formatting and lints code using Biome |
| `bun run format` | Checks formatting with Biome (use `bunx biome format --write` to apply) |
| `bun run lint` | Runs Biome linter across the project |
| `bun run typecheck` | Validates TypeScript types with `tsc --noEmit` |
| `bun run i18n:extract` | Extracts translatable strings from code into `.json` catalogs (`--clean`) |
| `bun run i18n:compile` | Compiles `.json` message catalogs into runtime JS |

---

## Git Workflow & Commit Guidelines

This project enforces **Conventional Commits** via Commitlint:

```text
feat(landing): update hero workflow canvas
docs(legal): align privacy policy and terms with FSL-1.1-ALv2
fix(navbar): align mobile drawer padding on iOS
chore(i18n): update Vietnamese message catalog
```

- Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
- Lefthook runs `biome check` on `pre-commit` and `pre-push`, and `commitlint` on `commit-msg`.

---

## License

- **This website & documentation repository** is licensed under the [MIT License](LICENSE).
- **The Nitrobase software** ([`AydenGroup/nitrobase`](https://github.com/AydenGroup/nitrobase)) is **fair source**, licensed under the **Functional Source License, Version 1.1, ALv2 Future License (`FSL-1.1-ALv2`)**, converting automatically to Apache License 2.0 two years after each release.

# Nitrobase · Landing Page & Documentation Platform

A modern, high-performance, full-stack marketing website and technical documentation platform for **Nitrobase** — the automated, secure platform for self-hosting Supabase on private VPS infrastructure.

<p align="left">
  <a href="https://tanstack.com/start/latest"><img src="https://img.shields.io/badge/TanStack%20Start-232340?style=for-the-badge&logo=reactquery&logoColor=white" alt="TanStack Start" /></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 19" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://mantine.dev/"><img src="https://img.shields.io/badge/Mantine%20UI-339AF0?style=for-the-badge&logo=mantine&logoColor=white" alt="Mantine UI" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" /></a>
  <a href="https://lingui.dev/"><img src="https://img.shields.io/badge/LinguiJS-E23237?style=for-the-badge&logo=i18next&logoColor=white" alt="LinguiJS" /></a>
  <a href="https://www.content-collections.dev/"><img src="https://img.shields.io/badge/Content%20Collections-24292E?style=for-the-badge&logo=markdown&logoColor=white" alt="Content Collections" /></a>
  <a href="https://workers.cloudflare.com/"><img src="https://img.shields.io/badge/Cloudflare%20Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Cloudflare Workers" /></a>
  <a href="https://bun.sh/"><img src="https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white" alt="Bun" /></a>
</p>

---

## Features & Architecture

- **Full-Stack & SSR**: Powered by [TanStack Start](https://tanstack.com/start/latest) and React 19 with type-safe file-based routing and Server-Side Rendering.
- **Design System & Mantine UI**: Integrated with [@mantine/core](https://mantine.dev/) and [@mantine/carousel](https://mantine.dev/x/carousel/) supporting:
  - Seamless Dark and Light color schemes with zero-flicker hydration.
  - Interactive product tour modals, code snippet copy, and live stack progress indicators.
  - Mobile-optimized responsive header with slide-out right drawer navigation.
- **Extensive Technical Documentation Portal**:
  - Over 58 bilingual technical guides covering Getting Started, Architecture, Server Networking, Custom Compose, Backup & Disaster Recovery, and API Reference.
  - Markdown rendered with syntax highlighting via [Shiki](https://shiki.style/) and interactive [Mermaid](https://mermaid.js.org/) architecture diagrams.
  - Sticky table of contents, in-page search, and bilingual navigation.
- **Complete Internationalization (i18n)**:
  - Built with [LinguiJS v6](https://lingui.dev/) with full English (`en`) and Vietnamese (`vi`) catalogs.
  - Locale-aware routing with `/` (English default) and `/vi` prefix.
  - Zero-hardcoded strings with `i18n._(...)` and module-level `msg({ id: "..." })` descriptors.
- **Dynamic Content & Legal Collections**:
  - Type-safe Markdown and YAML content management via [Content Collections](https://www.content-collections.dev/).
  - Multilingual legal pages: **Privacy Policy** (`/policy`, `/vi/policy`) and **Terms of Service** (`/terms-of-service`, `/vi/terms-of-service`).
  - Landing page marketing copy managed via CMS content collection (`contents/landing/content.yaml`).
- **Comprehensive SEO & Social Metadata**:
  - Centralized global SEO configuration via `contents/settings/seo.yaml`.
  - Canonical URLs, localized Open Graph, Twitter cards, and `hreflang` alternate tags (`en`, `vi`, `x-default`).
- **Git-based CMS**:
  - Embedded browser-based [Sveltia CMS](https://sveltia.github.io/sveltia-cms/) at `/admin` for direct content publishing and editing.
- **Edge Deployment Ready**:
  - Configured for [Cloudflare Workers](https://developers.cloudflare.com/workers/) using `@cloudflare/vite-plugin` and Wrangler.
- **Strict Code Quality & Git Hooks**:
  - Fast linting and formatting via [Biome](https://biomejs.dev/).
  - Automated pre-commit and pre-push checks via [Lefthook](https://github.com/evilmartians/lefthook).
  - [Conventional Commits](https://www.conventionalcommits.org/) enforced with [Commitlint](https://commitlint.js.org/).

---

## Project Structure

```text
├── collections/                  # Content Collections schema definitions
│   ├── author.ts                 # Authors schema
│   ├── docs.ts                   # Documentation schema & Shiki/Mermaid plugins
│   ├── landing.ts                # Landing page CMS content schema
│   ├── legal.ts                  # Privacy Policy and Terms of Service schema
│   └── settings.ts               # Global SEO configuration schema
├── contents/                     # Raw Markdown & YAML content
│   ├── docs/                     # Bilingual documentation (58+ markdown guides)
│   │   ├── en/                   # English documentation
│   │   └── vi/                   # Vietnamese documentation
│   ├── landing/                  # Landing page marketing copy (content.yaml)
│   ├── legal/                    # Multilingual legal pages (policy.md, terms.md)
│   └── settings/                 # Global SEO configuration (seo.yaml)
├── public/                       # Static public assets
│   ├── admin/                    # Sveltia / Decap CMS configuration and entry
│   ├── assets/landing/           # Brand logo assets (logo-dark.png, logo-light.png)
│   └── uploads/                  # CMS media upload directory
├── src/
│   ├── components/
│   │   ├── auth/                 # Sign In form & modal authentication views
│   │   ├── docs/                 # Documentation layout, sidebar, TOC
│   │   ├── landing/              # Hero, Navbar, Features, HowItWorks, FAQ, Footer
│   │   └── legal/                # LegalDocumentView reading component
│   ├── constants/                # Docs hierarchy, navigation menus, and static datasets
│   ├── libs/
│   │   ├── i18n.ts               # Lingui setup, Locale utilities, LocalizedLink
│   │   └── seo.ts                # SEO metadata generator helper
│   ├── locales/                  # Lingui compiled catalogs (en.json, vi.json)
│   ├── routes/                   # TanStack Router file-based route hierarchy
│   │   ├── __root.tsx            # HTML root document, MantineProvider & DevTools
│   │   └── {-$locale}/           # Locale-prefixed routes (/, /vi, /docs, /login, /policy...)
│   └── theme/                    # Mantine custom typography and color theme
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
git clone https://github.com/hoagminh/nitrobase-landing.git
cd nitrobase-landing
bun install
```

### 2. Development

Run the local development server with Hot Module Replacement (HMR):

```bash
bun dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## Localization (i18n) Workflow

All user-visible strings must be internationalized using Lingui.

### 1. Extract Strings
Extract source strings to `src/locales/en.json` and `src/locales/vi.json`:

```bash
bun run i18n:extract
```

### 2. Translate Missing Keys
Provide translations for newly extracted keys in `src/locales/vi.json` or run the automated translation helper:

```bash
bun run translate:vi
```

### 3. Compile Catalogs
Compile message catalogs into optimized runtime JavaScript bundles:

```bash
bun run i18n:compile
```

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `bun dev` | Starts the local Vite development server on port 3000 |
| `bun run build` | Extracts/compiles i18n catalogs and builds the production bundle |
| `bun run preview` | Previews the production build locally |
| `bun run deploy` | Builds the app and deploys to Cloudflare Workers via Wrangler |
| `bun run check` | Checks formatting and lints code using Biome |
| `bun run format` | Auto-formats codebase using Biome |
| `bun run lint` | Runs Biome linter across the project |
| `bun run typecheck` | Validates TypeScript types with `tsc --noEmit` |
| `bun run i18n:extract` | Extracts translatable strings from code into `.json` catalogs |
| `bun run i18n:compile` | Compiles `.json` message catalogs into runtime JS |
| `bun run translate:vi` | Translates missing Vietnamese keys via automated translation script |

---

## Git Workflow & Commit Guidelines

This project strictly enforces **Conventional Commits**. Any commit message failing the convention will be rejected by Commitlint:

```text
feat(landing): add interactive stack deployment modal
fix(navbar): align mobile drawer padding on iOS
style(auth): hide back button text on mobile
chore(i18n): update Vietnamese message catalog
```

- Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
- Lefthook automatically executes `check` (Biome) before every commit and push.

### Git Remotes

- **GitHub (origin)**: `https://github.com/hoagminh/nitrobase-landing.git`
- **Internal / Mirror (ayden)**: `https://dev.ayden.one/nitrobase-landing.git`

---

## License

This project is licensed under the [MIT License](LICENSE).

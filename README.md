# SaaS Base · Landing Page & Web Platform

A modern, high-performance, full-stack web application and marketing landing page for **SaaS Base** — the automated, secure platform for self-hosting Supabase on private VPS infrastructure.

Built with **TanStack Start**, **React 19**, **Mantine UI**, **LinguiJS**, and **Content Collections**, deployed at the edge with **Cloudflare Workers**.

---

## Features & Architecture

- **Full-Stack & SSR**: Powered by [TanStack Start](https://tanstack.com/start/latest) and React 19 with type-safe file-based routing and Server-Side Rendering.
- **Design System & Mantine UI**: Integrated with [@mantine/core](https://mantine.dev/) and [@mantine/carousel](https://mantine.dev/x/carousel/) supporting:
  - Seamless Dark and Light color schemes with zero-flicker hydration.
  - Interactive product tour modals, code snippet copy, and live stack progress indicators.
  - Mobile-optimized responsive header with slide-out right drawer navigation.
- **Complete Internationalization (i18n)**:
  - Built with [LinguiJS v6](https://lingui.dev/) with full English (`en`) and Vietnamese (`vi`) catalogs.
  - Locale-aware routing with `/` (English default) and `/vi` prefix.
  - Zero-hardcoded strings with `i18n._(...)` and module-level `msg({ id: "..." })` descriptors.
- **Dynamic Content & Legal Collections**:
  - Type-safe Markdown and YAML content management via [Content Collections](https://www.content-collections.dev/).
  - Multilingual legal pages: **Privacy Policy** (`/policy`, `/vi/policy`) and **Terms of Service** (`/terms-of-service`, `/vi/terms-of-service`).
  - Markdown rendered with responsive typography, metadata badges, and sticky sidebar navigation.
- **Comprehensive SEO & Social Metadata**:
  - Centralized global SEO configuration via `contents/settings/seo.yaml`.
  - Canonical URLs, localized Open Graph, Twitter cards, and `hreflang` alternate tags (`en`, `vi`, `x-default`).
- **Git-based CMS**:
  - Embedded browser-based [Sveltia CMS](https://sveltia.github.io/sveltia-cms/) at `/admin` for direct content publishing and editing.
- **Edge Deployment Ready**:
  - Configured for [Cloudflare Workers](https://developers.cloudflare.com/workers/) using `@cloudflare/vite-plugin` and Wrangler.
- **Strict Code Quality & Git Hooks**:
  - Fast linting and formatting via [Biome](https://biomejs.dev/).
  - CSS rule validation via [Stylelint](https://stylelint.io/).
  - Automated pre-commit and pre-push checks via [Lefthook](https://github.com/evilmartians/lefthook).
  - [Conventional Commits](https://www.conventionalcommits.org/) enforced with [Commitlint](https://commitlint.js.org/).

---

## Project Structure

```text
├── collections/                  # Content Collections schema definitions
│   ├── legal.ts                  # Privacy Policy and Terms of Service schema
│   └── settings.ts               # Global SEO configuration schema
├── contents/                     # Raw Markdown & YAML content
│   ├── legal/                    # Multilingual legal content
│   │   ├── en/                   # English policy.md and terms.md
│   │   └── vi/                   # Vietnamese policy.md and terms.md
│   └── settings/
│       └── seo.yaml              # Global SEO titles, descriptions, social images
├── public/                       # Static public assets
│   ├── admin/                    # Sveltia / Decap CMS configuration and entry
│   └── assets/landing/           # Brand logos and illustration assets
├── src/
│   ├── components/
│   │   ├── auth/                 # Sign In form & modal authentication views
│   │   ├── landing/              # Hero, Navbar, Features, HowItWorks, FAQ, Footer
│   │   └── legal/                # LegalDocumentView reading component
│   ├── constants/                # Landing text descriptors and static datasets
│   ├── libs/
│   │   ├── i18n.ts               # Lingui setup, Locale utilities, LocalizedLink
│   │   └── seo.ts                # SEO metadata generator helper
│   ├── locales/                  # Lingui compiled catalogs (en.json, vi.json)
│   ├── routes/                   # TanStack Router file-based route hierarchy
│   │   ├── __root.tsx            # HTML root document, MantineProvider & DevTools
│   │   └── {-$locale}/           # Locale-prefixed routes (/, /vi, /login, /policy...)
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
git clone https://github.com/hoagminh/saasbase-landing.git
cd saasbase-landing
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
Provide translations for newly extracted keys in `src/locales/vi.json`.

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
| `bun run build` | Compiles client and SSR bundles for production |
| `bun run deploy` | Builds the app and deploys to Cloudflare Workers via Wrangler |
| `bun run check` | Checks formatting and lints code using Biome |
| `bun run lint` | Runs Biome linter across the project |
| `bun run typecheck` | Validates TypeScript types with `tsc --noEmit` |
| `bun run i18n:extract` | Extracts translatable strings from code into `.json` catalogs |
| `bun run i18n:compile` | Compiles `.json` message catalogs into runtime JS |

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
- Lefthook automatically executes `check` (Biome) and `lint-styles` (Stylelint) before every commit and push.

---

## License

This project is licensed under the [MIT License](LICENSE).

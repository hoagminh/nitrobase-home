# TanStack Start i18n CMS Template

A modern, full-stack template combining the power of **TanStack Start**, **LinguiJS** for internationalization, and **Sveltia CMS** for Git-based content management. It provides a robust, type-safe foundation for building multilingual blogs, portfolios, and marketing sites with ease.

## Features

- **Full-Stack Framework**: Built on [TanStack Start](https://tanstack.com/start/latest) (React, SSR, File-based routing via TanStack Router).
- **Internationalization (i18n)**: Integrated with [LinguiJS](https://lingui.dev/) for seamless, type-safe multi-language support.
- **Git-based CMS**: Ready-to-use [Sveltia CMS](https://sveltia.github.io/sveltia-cms/) at `/admin` (a lightweight alternative to Decap/Netlify CMS).
- **Type-Safe Content**: Markdown and YAML content parsing via [Content Collections](https://www.content-collections.dev/).
- **Styling**: Utility-first styling with [Tailwind CSS v4](https://tailwindcss.com/).
- **Code Quality**: Fast linting and formatting via [Biome](https://biomejs.dev/).
- **Git Hooks**: Pre-commit and commit-msg hooks powered by [Lefthook](https://github.com/evilmartians/lefthook) & [Commitlint](https://commitlint.js.org/).

---

## Tech Stack

- **Runtime & Package Manager**: [Bun](https://bun.sh/)
- **Frontend**: React 19, TanStack Router
- **Build Tool**: Vite & Rolldown
- **i18n**: LinguiJS
- **CMS**: Sveltia CMS
- **Content**: Content Collections

---

## Getting Started

### 1. Installation

Ensure you have [Bun](https://bun.sh/) installed, then clone the repository and install dependencies:

```bash
git clone https://github.com/hoagminh/tanstack-i18n-cms-template.git my-app
cd my-app
bun install
```

### 2. Development Server

Start the Vite development server on `http://localhost:3000`:

```bash
bun dev
```

### 3. Build for Production

Compile the application for production:

```bash
bun run build
bun run start
```

---

## Localization (i18n)

This template uses LinguiJS to manage translations. The configured locales are English (`en`) and Vietnamese (`vi`).

### Adding Translations
1. Wrap your text in components using the `i18n._("Hello")` macro.
2. Extract the new strings to catalog files (`.json`):
   ```bash
   bun run i18n:extract
   ```
3. Translate the messages in `src/locales/vi.json` and `src/locales/en.json`.
4. Compile the catalogs for production:
   ```bash
   bun run i18n:compile
   ```

---

## Content Management (Sveltia CMS)

The CMS is configured to run entirely in the browser using GitHub as the backend. 

1. **Access the CMS**: Navigate to `http://localhost:3000/admin`.
2. **Configuration**: The CMS structure is defined in `public/admin/config.yml`. Update the `backend.repo` field to match your own GitHub repository if you fork this template.
3. **Local Backend**: For local testing without pushing to GitHub, you can configure Sveltia CMS's local backend mode (refer to [Sveltia CMS Docs](https://sveltia.github.io/sveltia-cms/)).

---

## Content Collections

All content (e.g., Authors, Blog Posts) managed by the CMS is statically checked and transformed into type-safe data by `@content-collections/core`.

- **Configuration**: Collections are defined in `content-collections.ts` and individual schemas reside in `collections/`.
- **Usage**: Import your collections directly into your React components:
  ```tsx
  import { allAuthors } from "content-collections";

  export function AuthorsList() {
    return allAuthors.map(author => <div key={author.slug}>{author.name}</div>);
  }
  ```

---

## Git Hooks & Commits

This project enforces strict code quality and commit message standards.

- **Pre-commit**: Lefthook runs Biome to lint and format code before allowing a commit.
- **Commit Messages**: We strictly follow [Conventional Commits](https://www.conventionalcommits.org/). Commit messages must be formatted properly (e.g., `feat: add new button`, `fix: header alignment`). If you violate this, the commit will be rejected by Commitlint.

---

## License

MIT

---
title: Community & Contributing
description: How to report bugs, request features, contribute marketplace templates, and review the Nitrobase license.
---

Contributions, bug reports, feature suggestions, and new marketplace templates are welcome!

## Ways to Contribute

- **GitHub Repository:** Explore the source code and releases at [github.com/AydenGroup/nitrobase](https://github.com/AydenGroup/nitrobase).
- **Issues & Feature Requests:** Report bugs or propose features on [GitHub Issues](https://github.com/AydenGroup/nitrobase/issues).
- **App Templates:** Adding a new self-hosted app only requires adding a folder under `templates/<id>/` with `template.toml`, `docker-compose.yml` (or upstream `source.path`), `logo.svg`, and an offline test fixture. See the **Template Specification** guide for details.
- **Translations:** Nitrobase uses Lingui (currently English and Vietnamese). Adding a new language only requires adding its locale and translating the JSON catalog.

## Before Opening a Pull Request

1. Follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.
2. Run `bun run typecheck`, `bun run check`, and `bun run test`.
3. If you added or changed UI or template text, run `bun run i18n:extract`, update translations, and verify with `bun run i18n:check`.

## License

Nitrobase is released under the **Functional Source License, Version 1.1, ALv2 Future License (`FSL-1.1-ALv2`)**—free to use, modify, and self-host for personal, company, or client use (excluding competing services), converting automatically to **Apache 2.0** two years after each release.

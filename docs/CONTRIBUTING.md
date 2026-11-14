# Contributing to Lux.raw

Thank you for your interest in contributing to Lux.raw — a luxury fashion e-commerce platform. Please read these guidelines before submitting any changes.

---

## Code Style

- **TypeScript** is required for all source files. No plain `.js` files in `src/`.
- Follow the [ESLint config](.eslintrc.json) and [Prettier config](.prettierrc) provided.
- Use **functional components** and **React hooks** — no class components.
- Prefer **named exports** over default exports for utilities and hooks.
- Use descriptive variable names; avoid abbreviations unless industry-standard (`SKU`, `URL`, etc.).
- All `async` functions must handle errors explicitly (no silent `catch`).

---

## Branch Naming

Branches must follow this pattern:

```
<type>/<short-description>
```

**Types:**
| Type | Use For |
|------|---------|
| `feat/` | New features |
| `fix/` | Bug fixes |
| `docs/` | Documentation only |
| `refactor/` | Code restructuring |
| `style/` | Formatting, whitespace |
| `test/` | Adding or updating tests |
| `chore/` | Build config, dependencies |

**Examples:**
- `feat/wishlist-sync`
- `fix/checkout-price-rounding`
- `docs/api-guidelines`

---

## Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short description>

[optional body]

[optional footer]
```

Examples:
```
feat(cart): add quantity update with optimistic UI
fix(auth): correct session expiry redirect loop
docs(readme): update local development setup steps
```

---

## Pull Request Checklist

Before opening a PR, ensure:

- [ ] The feature/fix is covered by unit or integration tests
- [ ] `pnpm lint` passes with no errors
- [ ] `pnpm type-check` passes with no errors
- [ ] `pnpm test` passes with no failures
- [ ] UI changes include screenshots or screen recordings
- [ ] Breaking changes are documented in `CHANGELOG.md`
- [ ] The PR description explains **what** and **why**, not just **how**

---

## Review Process

1. **Open a PR** against the `main` branch (or `staging` for large features)
2. At least **one approval** is required from a core maintainer
3. CI checks must all pass before merging
4. Use **Squash and Merge** to keep history clean
5. Delete your branch after merge

---

## Local Development

```bash
pnpm install
cp .env.example .env.local
pnpm db:push
pnpm dev
```

---

## Questions?

Open a [GitHub Discussion](https://github.com/luxraw/lux.raw/discussions) or reach out in the team Slack channel `#dev-platform`.

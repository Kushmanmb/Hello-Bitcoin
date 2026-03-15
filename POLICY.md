# Policy – Hello Bitcoin

> **Repository:** [Kushmanmb/Hello-Bitcoin](https://github.com/Kushmanmb/Hello-Bitcoin)  
> **Author:** kushmanmb  
> **Effective Date:** 2026-03-15  
> **License:** Apache 2.0

---

## 1. Purpose

This policy governs how the **Hello Bitcoin** repository is used, who may contribute, and how contributions are reviewed and merged. It ensures the project remains high-quality, secure, and aligned with the author's vision.

---

## 2. Permissions

| Role | Permissions |
|------|-------------|
| **Owner (kushmanmb)** | Full write access across all branches, workflows, secrets, and settings |
| **Collaborators** | Write access to feature branches; PR-based contributions to `main`/`master` |
| **Community** | Fork, read, and open Issues / Pull Requests |

Repository administrators may grant additional permissions on a case-by-case basis.

---

## 3. Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` / `master` | Production-ready code; protected |
| `feature/*` | New features |
| `fix/*` | Bug fixes |
| `copilot/*` | AI-assisted changes |

All changes to `main`/`master` must pass the CI/CD pipeline (see [`.github/workflows/ci.yml`](.github/workflows/ci.yml)) before merging.

---

## 4. Contribution Guidelines

1. **Fork & Branch** – Fork the repository and create a feature/fix branch.
2. **Code Style** – Follow the existing JavaScript style (single quotes, 2-space indent, `'use strict'`).
3. **Tests** – All new functionality must include corresponding tests in `tests/`.
4. **Commit Messages** – Use [Conventional Commits](https://www.conventionalcommits.org/):  
   `feat: ...`, `fix: ...`, `docs: ...`, `test: ...`, `chore: ...`
5. **Pull Request** – Open a PR against `main`/`master` with a clear description.
6. **Review** – At least one review approval is required before merging.

---

## 5. Code of Conduct

All participants are expected to:

- Be respectful and constructive in all interactions.
- Avoid harassment, discrimination, or personal attacks.
- Follow GitHub's [Community Guidelines](https://docs.github.com/en/site-policy/github-terms/github-community-guidelines).

Violations may result in removal from the project.

---

## 6. Security Policy

- Do **not** commit private keys, seed phrases, API keys, or any credentials.
- Report security vulnerabilities privately via GitHub's [Security Advisory](https://github.com/Kushmanmb/Hello-Bitcoin/security/advisories) feature.
- The project uses Bitcoin addresses only for demonstration purposes. No real funds are associated with any addresses in this repository.

---

## 7. Workflow & Pipeline Policy

- The CI/CD workflow (`.github/workflows/ci.yml`) runs on every push and pull request.
- All tests must pass before deployment.
- Deployment only occurs on successful merges to `main`/`master`.
- Workflow permissions follow the principle of least privilege.

---

## 8. License

This repository is licensed under the [Apache License 2.0](LICENSE). Contributions are accepted under the same license. By submitting a contribution, you agree that your code may be distributed under these terms.

---

## 9. Contact

| Platform | Link |
|----------|------|
| 🐙 GitHub | [github.com/Kushmanmb](https://github.com/Kushmanmb) |
| 📘 Facebook | [facebook.com/Kushmanmb23](https://www.facebook.com/Kushmanmb23) |
| 🐦 X (Twitter) | [x.com/kushmanmb](https://x.com/kushmanmb) |

For all other enquiries, open an [Issue](https://github.com/Kushmanmb/Hello-Bitcoin/issues).

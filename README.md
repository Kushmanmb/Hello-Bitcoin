# Hello Bitcoin 🟠

[![Hello Bitcoin CI/CD](https://github.com/Kushmanmb/Hello-Bitcoin/actions/workflows/ci.yml/badge.svg)](https://github.com/Kushmanmb/Hello-Bitcoin/actions/workflows/ci.yml)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Node.js 18+](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org)
[![Author: kushmanmb](https://img.shields.io/badge/Author-kushmanmb-orange.svg)](https://github.com/Kushmanmb)

> **"Hello Bitcoin"** — a reference project by **kushmanmb** demonstrating Bitcoin fundamentals: wallet generation, Bitcoin scripting (contracts), and a full CI/CD pipeline.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Repository Structure](#repository-structure)
3. [Getting Started](#getting-started)
4. [Build & Run](#build--run)
5. [Testing](#testing)
6. [Workflows & Pipelines](#workflows--pipelines)
7. [Bitcoin Contract / Script](#bitcoin-contract--script)
8. [Wallet Utilities](#wallet-utilities)
9. [Social Portals & Links](#social-portals--links)
10. [Contributing](#contributing)
11. [Policy](#policy)
12. [License](#license)

---

## Project Overview

**Hello Bitcoin** is the foundational repository for all Bitcoin-related work by [kushmanmb](https://github.com/Kushmanmb).  
It provides:

| Module | Description |
|--------|-------------|
| `src/hello-bitcoin.js` | Entry point — prints the greeting and runs a demo |
| `src/wallet.js` | Deterministic wallet creation and address derivation |
| `src/contract.js` | Bitcoin Script / contract builder and evaluator |
| `tests/` | Full test suite using the built-in Node.js test runner |
| `.github/workflows/ci.yml` | CI/CD pipeline: build → test → deploy |

---

## Repository Structure

```
Hello-Bitcoin/
├── src/
│   ├── hello-bitcoin.js   # Main entry point
│   ├── wallet.js          # Wallet utilities
│   └── contract.js        # Bitcoin script / contract module
├── tests/
│   └── hello-bitcoin.test.js  # Unit & integration tests
├── .github/
│   └── workflows/
│       └── ci.yml         # GitHub Actions CI/CD pipeline
├── README.md              # This file
├── POLICY.md              # Contribution & usage policy
├── SOCIAL.md              # Social portals & linked accounts
└── LICENSE                # Apache 2.0
```

---

## Getting Started

**Prerequisites:** [Node.js 18+](https://nodejs.org)

```bash
# Clone the repository
git clone https://github.com/Kushmanmb/Hello-Bitcoin.git
cd Hello-Bitcoin

# Install dependencies (none required — uses Node.js built-ins only)
npm install
```

---

## Build & Run

```bash
# Build & run Hello Bitcoin
npm run build

# Or run directly
npm start
```

Expected output:

```
=========================================
           H E L L O   B I T C O I N
=========================================
Author  : kushmanmb
GitHub  : https://github.com/Kushmanmb
Facebook: https://www.facebook.com/Kushmanmb23
X       : https://x.com/kushmanmb
-----------------------------------------

[Wallet]
  Label   : kushmanmb-demo
  Network : mainnet
  Address : 1<derived-address>

[Contract / Script]
  Script  : 6a0d48656c6c6f20426974636f696e
  Result  : VALID ✓

=========================================
Build complete – Hello Bitcoin is live!
=========================================
```

---

## Testing

Tests use the **built-in Node.js test runner** — no additional dependencies needed.

```bash
npm test
```

Tests cover:

- ✅ Wallet creation and validation
- ✅ Deterministic address derivation
- ✅ Bitcoin script building (OP\_RETURN, P2PKH)
- ✅ Script evaluation (valid / invalid cases)
- ✅ End-to-end integration test (`helloBitcoin()`)

---

## Workflows & Pipelines

The CI/CD pipeline at [`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs automatically on every push and pull request:

| Job | Trigger | Description |
|-----|---------|-------------|
| **Build & Test** | push / PR | Installs deps, builds project, runs tests on Node 18 & 20 |
| **Deploy** | push to `main`/`master` (tests pass) | Runs the full Hello Bitcoin program and confirms deployment |

---

## Bitcoin Contract / Script

The `contract.js` module implements a minimal Bitcoin Script engine:

```js
const { buildScript, evaluateScript, buildP2PKH } = require('./src/contract');

// OP_RETURN data-carrier script
const script = buildScript({ op: 'OP_RETURN', data: 'Hello Bitcoin' });
const result = evaluateScript(script);
console.log(result); // { valid: true, reason: 'OP_RETURN data-carrier script is always valid' }

// P2PKH locking script
const p2pkh = buildP2PKH('a'.repeat(40));
console.log(p2pkh.op); // 'P2PKH'
```

Supported opcodes: `OP_RETURN`, `OP_DUP`, `OP_HASH160`, `OP_EQUALVERIFY`, `OP_CHECKSIG`

---

## Wallet Utilities

```js
const { createWallet, validateWallet } = require('./src/wallet');

const wallet = createWallet('kushmanmb', 'mainnet');
console.log(wallet);
// {
//   label: 'kushmanmb',
//   network: 'mainnet',
//   address: '1...',
//   createdAt: '2026-...'
// }

console.log(validateWallet(wallet)); // true
```

---

## Social Portals & Links

Connect with **kushmanmb** across platforms:

| Platform | Link |
|----------|------|
| 🐙 GitHub | [github.com/Kushmanmb](https://github.com/Kushmanmb) |
| 📘 Facebook | [facebook.com/Kushmanmb23](https://www.facebook.com/Kushmanmb23) |
| 🐦 X (Twitter) | [x.com/kushmanmb](https://x.com/kushmanmb) |

For a full list of social portals, wallet accounts, and community links, see [SOCIAL.md](SOCIAL.md).

---

## Contributing

Contributions are welcome! Please read [POLICY.md](POLICY.md) before submitting a pull request.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "feat: add my feature"`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## Policy

See [POLICY.md](POLICY.md) for the full contribution and usage policy.

---

## License

This project is licensed under the [Apache License 2.0](LICENSE).

Copyright © 2026 kushmanmb

           H E L L O   B I T C O I N
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

Build complete – Hello Bitcoin is live!
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
# Hello-Bitcoin

HELLO BITCOIN

## Installing a Bitcoin Node

This repository includes a shell script that downloads and installs
[Bitcoin Core](https://bitcoincore.org/) — the reference implementation of
the Bitcoin full-node software.

### Requirements

| Platform | Requirement |
|----------|-------------|
| Linux (x86_64 / aarch64) | `curl`, `tar`, `sha256sum` |
| macOS | [Homebrew](https://brew.sh/) |

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/Kushmanmb/Hello-Bitcoin.git
cd Hello-Bitcoin

# 2. Run the installer  (adds Bitcoin Core to ~/.local/bitcoin-core on Linux)
chmod +x install.sh
./install.sh

# 3. Start the node
bitcoind -daemon

# 4. Check sync status
bitcoin-cli getblockchaininfo

# 5. Stop the node
bitcoin-cli stop
```

### Configuration

The installer copies `bitcoin.conf` to `~/.bitcoin/bitcoin.conf` on first run.
Edit that file to customise RPC credentials, network (mainnet/testnet), and
other settings before starting the node.

> **Important:** Change the default `rpcpassword` in `bitcoin.conf` before
> exposing the RPC port to any network.

### Data directory

Bitcoin's blockchain data is stored in `~/.bitcoin/` by default (≈ 600 GB for
a full mainnet node at the time of writing). Make sure you have sufficient
free disk space before syncing from genesis.

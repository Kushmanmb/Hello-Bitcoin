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

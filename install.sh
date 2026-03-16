#!/usr/bin/env bash
# install.sh — Install Bitcoin Core on Linux (amd64) or macOS
set -euo pipefail

BITCOIN_VERSION="27.0"
BITCOIN_VERSION_FULL="${BITCOIN_VERSION}"

# ── helpers ──────────────────────────────────────────────────────────────────
info()  { echo "[INFO]  $*"; }
error() { echo "[ERROR] $*" >&2; exit 1; }

require() {
  command -v "$1" >/dev/null 2>&1 || error "'$1' is required but not found. Please install it first."
}

# ── detect OS ────────────────────────────────────────────────────────────────
detect_os() {
  case "$(uname -s)" in
    Linux*)  OS="linux"  ;;
    Darwin*) OS="macos"  ;;
    *)       error "Unsupported operating system: $(uname -s)" ;;
  esac
}

# ── install on macOS via Homebrew ────────────────────────────────────────────
install_macos() {
  require brew
  # Homebrew installs the latest available version of Bitcoin Core from the tap,
  # which may differ from BITCOIN_VERSION. Check 'brew info bitcoin' for details.
  info "Installing Bitcoin Core via Homebrew (latest available in tap)…"
  brew install bitcoin
  info "Bitcoin Core installed successfully."
}

# ── install on Linux (x86_64) ────────────────────────────────────────────────
install_linux() {
  require curl
  require tar
  require sha256sum

  ARCH="$(uname -m)"
  case "$ARCH" in
    x86_64)  PLATFORM="x86_64-linux-gnu"  ;;
    aarch64) PLATFORM="aarch64-linux-gnu" ;;
    arm*)    PLATFORM="arm-linux-gnueabihf" ;;
    *)       error "Unsupported architecture: $ARCH" ;;
  esac

  TARBALL="bitcoin-${BITCOIN_VERSION_FULL}-${PLATFORM}.tar.gz"
  BASE_URL="https://bitcoincore.org/bin/bitcoin-core-${BITCOIN_VERSION_FULL}"

  info "Downloading Bitcoin Core ${BITCOIN_VERSION} for ${PLATFORM}…"
  curl -fSL "${BASE_URL}/${TARBALL}" -o "/tmp/${TARBALL}"
  curl -fSL "${BASE_URL}/SHA256SUMS"    -o "/tmp/SHA256SUMS"
  curl -fSL "${BASE_URL}/SHA256SUMS.asc" -o "/tmp/SHA256SUMS.asc"

  info "Verifying checksum…"
  (cd /tmp && grep "${TARBALL}" SHA256SUMS | sha256sum --check -)

  # Optional: verify the GPG signature of the checksum file.
  # Requires the Bitcoin Core signing keys to be imported first:
  #   gpg --keyserver hkps://keys.openpgp.org --recv-keys <key-fingerprint>
  # Then run:
  #   gpg --verify /tmp/SHA256SUMS.asc /tmp/SHA256SUMS
  # See https://bitcoincore.org/en/download/ for the list of trusted signers.

  info "Extracting archive…"
  tar -xzf "/tmp/${TARBALL}" -C /tmp

  INSTALL_DIR="${HOME}/.local/bitcoin-core"
  mkdir -p "${INSTALL_DIR}"
  cp -r "/tmp/bitcoin-${BITCOIN_VERSION_FULL}/"* "${INSTALL_DIR}/"

  # Add to PATH for the current user if not already present
  PROFILE_FILE="${HOME}/.bashrc"
  if [[ "${SHELL}" == */zsh ]]; then
    PROFILE_FILE="${HOME}/.zshrc"
  fi
  if ! grep -q "${INSTALL_DIR}/bin" "${PROFILE_FILE}" 2>/dev/null; then
    echo "export PATH=\"${INSTALL_DIR}/bin:\$PATH\"" >> "${PROFILE_FILE}"
    info "Added ${INSTALL_DIR}/bin to PATH in ${PROFILE_FILE}."
    info "Run 'source ${PROFILE_FILE}' or open a new terminal to pick up the change."
  fi

  export PATH="${INSTALL_DIR}/bin:${PATH}"
  info "Bitcoin Core installed to ${INSTALL_DIR}."
}

# ── configure Bitcoin Core ───────────────────────────────────────────────────
configure() {
  BITCOIN_DATA_DIR="${HOME}/.bitcoin"
  CONF_FILE="${BITCOIN_DATA_DIR}/bitcoin.conf"

  mkdir -p "${BITCOIN_DATA_DIR}"

  if [[ -f "${CONF_FILE}" ]]; then
    info "Config file already exists at ${CONF_FILE}. Skipping template copy."
  else
    SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    if [[ -f "${SCRIPT_DIR}/bitcoin.conf" ]]; then
      cp "${SCRIPT_DIR}/bitcoin.conf" "${CONF_FILE}"
      info "Copied bitcoin.conf template to ${CONF_FILE}."
    else
      info "No bitcoin.conf template found; Bitcoin Core will use its defaults."
    fi
  fi
}

# ── print next steps ─────────────────────────────────────────────────────────
print_next_steps() {
  echo ""
  echo "┌─────────────────────────────────────────────────────────┐"
  echo "│           Bitcoin Core installation complete!            │"
  echo "├─────────────────────────────────────────────────────────┤"
  echo "│  Start the node (background):                           │"
  echo "│    bitcoind -daemon                                     │"
  echo "│                                                          │"
  echo "│  Check sync status:                                     │"
  echo "│    bitcoin-cli getblockchaininfo                        │"
  echo "│                                                          │"
  echo "│  Stop the node:                                         │"
  echo "│    bitcoin-cli stop                                     │"
  echo "│                                                          │"
  echo "│  Config file: ~/.bitcoin/bitcoin.conf                   │"
  echo "│  Data dir:    ~/.bitcoin/                               │"
  echo "└─────────────────────────────────────────────────────────┘"
}

# ── main ─────────────────────────────────────────────────────────────────────
main() {
  detect_os

  case "${OS}" in
    linux) install_linux ;;
    macos) install_macos ;;
  esac

  configure
  print_next_steps
}

main "$@"

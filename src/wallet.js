/**
 * wallet.js – lightweight wallet utilities for Hello Bitcoin
 *
 * Provides deterministic wallet creation and address derivation
 * using pure Node.js built-ins (no external dependencies required).
 *
 * Author : kushmanmb
 * GitHub : https://github.com/Kushmanmb
 */

'use strict';

const crypto = require('crypto');

/**
 * Derives a reproducible Base58Check-like address from a seed string.
 * This is a simplified demonstration address — not for production use.
 *
 * @param {string} seed - Arbitrary seed string
 * @returns {string} A deterministic demo address prefixed with '1' (26-34 chars)
 */
function deriveAddress(seed) {
  const hash = crypto.createHash('sha256').update(seed).digest('hex');
  // Use first 25 bytes of the hash encoded as hex (50 hex chars -> fixed length)
  const raw = hash.slice(0, 50);
  // Encode as alphanumeric only (strip non-alphanumeric to simulate Base58)
  const encoded = Buffer.from(raw, 'hex')
    .toString('base64')
    .replace(/[+/=]/g, '')
    .slice(0, 25);
  return '1' + encoded; // 26-char deterministic demo address
}

/**
 * Creates a simple wallet descriptor object.
 *
 * @param {string} label - Human-readable wallet label
 * @param {'mainnet'|'testnet'} [network='mainnet'] - Target network
 * @returns {{ label: string, network: string, address: string, createdAt: string }}
 */
function createWallet(label, network = 'mainnet') {
  if (!label || typeof label !== 'string') {
    throw new TypeError('label must be a non-empty string');
  }

  const seed = `${label}:${network}:${Date.now()}`;
  const address = deriveAddress(seed);

  return {
    label,
    network,
    address,
    createdAt: new Date().toISOString(),
  };
}

/**
 * Validates a wallet descriptor.
 *
 * @param {{ label: string, network: string, address: string }} wallet
 * @returns {boolean}
 */
function validateWallet(wallet) {
  return (
    wallet !== null &&
    typeof wallet === 'object' &&
    typeof wallet.label === 'string' &&
    wallet.label.length > 0 &&
    ['mainnet', 'testnet'].includes(wallet.network) &&
    typeof wallet.address === 'string' &&
    wallet.address.startsWith('1') &&
    wallet.address.length >= 26
  );
}

module.exports = { createWallet, validateWallet, deriveAddress };

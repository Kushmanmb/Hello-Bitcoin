/**
 * contract.js – Bitcoin script / contract module for Hello Bitcoin
 *
 * Implements a minimal subset of Bitcoin Script opcodes:
 *   OP_RETURN  – marks unspendable data-carrier output
 *   OP_DUP     – duplicates top stack item
 *   OP_HASH160 – SHA-256 then RIPEMD-160
 *   OP_EQUALVERIFY – asserts equality
 *   OP_CHECKSIG – signature verification (stubbed for demo)
 *
 * Author : kushmanmb
 * GitHub : https://github.com/Kushmanmb
 */

'use strict';

const crypto = require('crypto');

/**
 * Known opcodes and their hex representations.
 */
const OPCODES = {
  OP_RETURN: '6a',
  OP_DUP: '76',
  OP_HASH160: 'a9',
  OP_EQUALVERIFY: '88',
  OP_CHECKSIG: 'ac',
};

/**
 * Encode arbitrary UTF-8 data as a hex push-data sequence.
 *
 * @param {string} data
 * @returns {string} hex-encoded push
 */
function encodePushData(data) {
  const hex = Buffer.from(data, 'utf8').toString('hex');
  const length = (hex.length / 2).toString(16).padStart(2, '0');
  return length + hex;
}

/**
 * Builds a Bitcoin script descriptor.
 *
 * @param {{ op: keyof OPCODES, data?: string }} params
 * @returns {{ op: string, data: string|undefined, raw: string, hash: string }}
 */
function buildScript({ op, data }) {
  if (!OPCODES[op]) {
    throw new Error(`Unknown opcode: ${op}. Supported: ${Object.keys(OPCODES).join(', ')}`);
  }

  let raw = OPCODES[op];
  if (data !== undefined) {
    raw += encodePushData(String(data));
  }

  const hash = crypto.createHash('sha256').update(raw, 'hex').digest('hex');

  return { op, data, raw, hash };
}

/**
 * Evaluates a script descriptor and returns a result.
 *
 * Rules:
 *   - OP_RETURN scripts are always valid (they are data carriers)
 *   - Other opcodes are valid when raw hex is well-formed
 *
 * @param {{ op: string, raw: string }} script
 * @returns {{ valid: boolean, reason: string }}
 */
function evaluateScript(script) {
  if (!script || typeof script.raw !== 'string') {
    return { valid: false, reason: 'Missing or malformed script' };
  }

  if (!/^[0-9a-f]+$/i.test(script.raw)) {
    return { valid: false, reason: 'Script contains non-hex characters' };
  }

  if (script.op === 'OP_RETURN') {
    return { valid: true, reason: 'OP_RETURN data-carrier script is always valid' };
  }

  // Generic well-formed check for other opcodes
  if (script.raw.length % 2 !== 0) {
    return { valid: false, reason: 'Script raw hex has odd length' };
  }

  return { valid: true, reason: 'Script is well-formed' };
}

/**
 * Builds a standard Pay-to-Public-Key-Hash (P2PKH) locking script.
 *
 * @param {string} pubKeyHash - 20-byte public key hash (hex)
 * @returns {{ op: string, raw: string, hash: string }}
 */
function buildP2PKH(pubKeyHash) {
  if (typeof pubKeyHash !== 'string' || pubKeyHash.length !== 40) {
    throw new TypeError('pubKeyHash must be a 40-character hex string (20 bytes)');
  }
  const raw =
    OPCODES.OP_DUP +
    OPCODES.OP_HASH160 +
    '14' + // push 20 bytes
    pubKeyHash +
    OPCODES.OP_EQUALVERIFY +
    OPCODES.OP_CHECKSIG;

  const hash = crypto.createHash('sha256').update(raw, 'hex').digest('hex');
  return { op: 'P2PKH', raw, hash };
}

module.exports = { buildScript, evaluateScript, buildP2PKH, OPCODES, encodePushData };

/**
 * Tests for Hello Bitcoin
 *
 * Uses the built-in Node.js test runner (node --test), available since Node 18.
 *
 * Run: npm test
 */

'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');

const { createWallet, validateWallet, deriveAddress } = require('../src/wallet');
const { buildScript, evaluateScript, buildP2PKH, encodePushData } = require('../src/contract');
const { helloBitcoin } = require('../src/hello-bitcoin');

// ─── Wallet tests ────────────────────────────────────────────────────────────

test('createWallet returns a valid wallet object', () => {
  const wallet = createWallet('test-wallet');
  assert.equal(typeof wallet.label, 'string');
  assert.equal(wallet.label, 'test-wallet');
  assert.equal(wallet.network, 'mainnet');
  assert.ok(wallet.address.startsWith('1'), 'address should start with 1');
  assert.ok(typeof wallet.createdAt === 'string', 'createdAt should be a string');
});

test('createWallet accepts testnet network', () => {
  const wallet = createWallet('testnet-wallet', 'testnet');
  assert.equal(wallet.network, 'testnet');
});

test('createWallet throws when label is empty', () => {
  assert.throws(() => createWallet(''), TypeError);
});

test('createWallet throws when label is not a string', () => {
  assert.throws(() => createWallet(null), TypeError);
});

test('validateWallet returns true for a valid wallet', () => {
  const wallet = createWallet('kushmanmb');
  assert.ok(validateWallet(wallet));
});

test('validateWallet returns false for a null wallet', () => {
  assert.equal(validateWallet(null), false);
});

test('validateWallet returns false when network is unknown', () => {
  const wallet = createWallet('test');
  wallet.network = 'regtest';
  assert.equal(validateWallet(wallet), false);
});

test('deriveAddress returns a deterministic string for the same seed', () => {
  const a1 = deriveAddress('seed-abc');
  const a2 = deriveAddress('seed-abc');
  assert.equal(a1, a2);
});

test('deriveAddress returns different addresses for different seeds', () => {
  const a1 = deriveAddress('seed-A');
  const a2 = deriveAddress('seed-B');
  assert.notEqual(a1, a2);
});

// ─── Contract / Script tests ─────────────────────────────────────────────────

test('buildScript creates an OP_RETURN script', () => {
  const script = buildScript({ op: 'OP_RETURN', data: 'Hello Bitcoin' });
  assert.equal(script.op, 'OP_RETURN');
  assert.ok(script.raw.startsWith('6a'), 'raw should start with OP_RETURN hex');
  assert.ok(typeof script.hash === 'string' && script.hash.length === 64);
});

test('buildScript throws for unknown opcode', () => {
  assert.throws(() => buildScript({ op: 'OP_UNKNOWN' }), Error);
});

test('evaluateScript returns valid for OP_RETURN', () => {
  const script = buildScript({ op: 'OP_RETURN', data: 'test' });
  const result = evaluateScript(script);
  assert.equal(result.valid, true);
});

test('evaluateScript returns invalid for null script', () => {
  const result = evaluateScript(null);
  assert.equal(result.valid, false);
});

test('evaluateScript returns invalid for non-hex script', () => {
  const result = evaluateScript({ op: 'OP_DUP', raw: 'xyz!' });
  assert.equal(result.valid, false);
});

test('buildP2PKH builds a valid P2PKH script', () => {
  const pubKeyHash = 'a'.repeat(40); // 20 bytes of 0xaa
  const script = buildP2PKH(pubKeyHash);
  assert.equal(script.op, 'P2PKH');
  assert.ok(script.raw.includes(pubKeyHash));
  assert.ok(typeof script.hash === 'string' && script.hash.length === 64);
});

test('buildP2PKH throws when pubKeyHash length is wrong', () => {
  assert.throws(() => buildP2PKH('abc'), TypeError);
});

test('encodePushData encodes UTF-8 data correctly', () => {
  const encoded = encodePushData('Hi');
  // 'Hi' = 2 bytes -> length prefix 02, data 4869
  assert.equal(encoded, '024869');
});

// ─── Integration test ─────────────────────────────────────────────────────────

test('helloBitcoin runs end-to-end without throwing', () => {
  const output = helloBitcoin();
  assert.ok(output.wallet, 'should return wallet');
  assert.ok(output.script, 'should return script');
  assert.ok(output.result, 'should return result');
  assert.equal(output.result.valid, true);
});

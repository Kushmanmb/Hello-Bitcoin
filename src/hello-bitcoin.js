/**
 * Hello Bitcoin – entry point
 *
 * Author : kushmanmb
 * GitHub : https://github.com/Kushmanmb
 * Facebook : https://www.facebook.com/Kushmanmb23
 * X (Twitter) : https://x.com/kushmanmb
 */

'use strict';

const { createWallet } = require('./wallet');
const { buildScript, evaluateScript } = require('./contract');

/**
 * Prints the canonical "Hello Bitcoin" greeting and demonstrates
 * basic wallet / script capabilities.
 */
function helloBitcoin() {
  console.log('=========================================');
  console.log('           H E L L O   B I T C O I N     ');
  console.log('=========================================');
  console.log('Author  : kushmanmb');
  console.log('GitHub  : https://github.com/Kushmanmb');
  console.log('Facebook: https://www.facebook.com/Kushmanmb23');
  console.log('X       : https://x.com/kushmanmb');
  console.log('-----------------------------------------');

  // Demonstrate wallet generation
  const wallet = createWallet('kushmanmb-demo');
  console.log('\n[Wallet]');
  console.log(`  Label   : ${wallet.label}`);
  console.log(`  Network : ${wallet.network}`);
  console.log(`  Address : ${wallet.address}`);

  // Demonstrate script / contract
  const script = buildScript({ op: 'OP_RETURN', data: 'Hello Bitcoin' });
  const result = evaluateScript(script);
  console.log('\n[Contract / Script]');
  console.log(`  Script  : ${script.raw}`);
  console.log(`  Result  : ${result.valid ? 'VALID ✓' : 'INVALID ✗'}`);

  console.log('\n=========================================');
  console.log('Build complete – Hello Bitcoin is live!  ');
  console.log('=========================================\n');

  return { wallet, script, result };
}

// Run when executed directly
if (require.main === module) {
  helloBitcoin();
}

module.exports = { helloBitcoin };

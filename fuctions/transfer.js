const Tx = require('ethereumjs-tx').Transaction;
const web3 = require('../web3');
const abiArray = require('../data/abi');

const transfer = async (req, res, next) => {
  console.log(`web3 version: ${web3.version}`);

  // Who holds the token now?
  var myAddress = '0xcA8CF6b998d89bE0A0D09504C2f4Aaa4833F6ABe';

  // Who are we trying to send this token to?
  var destAddress = '0x906876E2A593A41651cD3eB8380376Ce73F61d90';

  // If your token is divisible to 8 decimal places, 42 = 0.00000042 of your token
  var transferAmount = 100;

  // Determine the nonce
  var count = await web3.eth.getTransactionCount(myAddress);
  console.log(`num transactions so far: ${count}`);

  // This is the address of the contract which created the ERC20 token
  var contractAddress = '0x66f77D2ec409544E440806CC9C3CFfb14ebDc52b';
  var contract = new web3.eth.Contract(abiArray, contractAddress, {
    from: myAddress,
  });

  // How many tokens do I have before sending?
  var balanceBefore = await contract.methods.balanceOf(myAddress).call();
  console.log(`Balance before send: ${balanceBefore}`);

  // I chose gas price and gas limit based on what ethereum wallet was recommending for a similar transaction. You may need to change the gas price!
  var rawTransaction = {
    from: myAddress,
    nonce: '0x' + count.toString(16),
    gasPrice: '0x003B9ACA00',
    gasLimit: '0x250CA',
    to: contractAddress,
    value: '0x0',
    data: contract.methods.transfer(destAddress, transferAmount).encodeABI(),
    chainId: 0x01,
  };

  var privKey = Buffer.from(
    '89de10b661496b24f44b58aac17f7ee0e6cae042f9e8484096841da664dc4642',
    'hex'
  );

  var tx = new Tx(rawTransaction, {
    chain: 'ropsten',
    hardfork: 'petersburg',
  });

  tx.sign(privKey);
  var serializedTx = tx.serialize();

  // Comment out these three lines if you don't really want to send the TX right now
  console.log(`Attempting to send signed tx:  ${serializedTx.toString('hex')}`);
  var receipt = await web3.eth.sendSignedTransaction(
    '0x' + serializedTx.toString('hex')
  );
  console.log(`Receipt info:  ${JSON.stringify(receipt, null, '\t')}`);

  // The balance may not be updated yet, but let's check
  var balanceAfter = await contract.methods.balanceOf(myAddress).call();
  console.log(`Balance after send: ${balanceAfter}`);

  res.status(200).json({
    success: true,
    balanceBefore: balanceBefore,
    balanceAfter: balanceAfter,
    myAddress,
    destAddress,
    transferAmount,
    contractAddress,
  });
};

module.exports = transfer;

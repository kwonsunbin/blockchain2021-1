const Tx = require('ethereumjs-tx').Transaction;
const web3 = require('../web3');
const abiArray = require('../data/abi');

const transfer = async (req, res, next) => {
  var walletAddress = '0xcA8CF6b998d89bE0A0D09504C2f4Aaa4833F6ABe';

  var contractAddress = '0xc26918b7b629d5544d19b2f17f9674c30a0e82c1';
  var contract = new web3.eth.Contract(abiArray, contractAddress);

  var count = await web3.eth.getTransactionCount(walletAddress);
  console.log(`num transactions so far: ${count}`);

  var rawTransaction = {
    from: walletAddress,
    nonce: '0x' + count.toString(16),
    gasPrice: '0x003B9ACA00',
    gasLimit: '0x250CA',
    to: contractAddress,
    value: '0x0',
    data: contract.methods.transferOneToken(walletAddress).encodeABI(),
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
  var receipt = await web3.eth.sendSignedTransaction(
    '0x' + serializedTx.toString('hex')
  );

  res.status(200).json({
    success: true,
    contractAddress,
    walletAddress,
  });
};

module.exports = transfer;

const Tx = require('ethereumjs-tx').Transaction;
const web3 = require('../web3');
const abiArray = require('../data/abi');

const transfer = async (req, res, next) => {
  console.log(`web3 version: ${web3.version}`);

  // Who holds the token now?
  var walletAddress = '0xcA8CF6b998d89bE0A0D09504C2f4Aaa4833F6ABe';

  // Determine the nonce
  var count = await web3.eth.getTransactionCount(walletAddress);
  console.log(`num transactions so far: ${count}`);

  // This is the address of the contract which created the ERC20 token
  var contractAddress = '0x66f77D2ec409544E440806CC9C3CFfb14ebDc52b';
  var contract = new web3.eth.Contract(abiArray, contractAddress, {
    from: walletAddress,
  });

  // How many tokens do I have before sending?
  var balance = await contract.methods.balanceOf(walletAddress).call();
  console.log(`Balance of wallet : ${balance}`);

  res.status(200).json({
    success: true,
    balance,
    walletAddress,
    contractAddress,
  });
};

module.exports = transfer;

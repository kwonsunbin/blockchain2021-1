const Tx = require('ethereumjs-tx').Transaction;
const web3 = require('../web3');
const abiArray = require('../data/abi');

const balance = async (req, res, next) => {
  var walletAddress = '0xcA8CF6b998d89bE0A0D09504C2f4Aaa4833F6ABe';
  var contractAddress = '0xc26918b7b629d5544d19b2f17f9674c30a0e82c1';
  var contract = new web3.eth.Contract(abiArray, contractAddress);

  var balance = await contract.methods.balanceOf(walletAddress).call();
  console.log(`Balance of wallet : ${balance}`);
  res.status(200).json({
    success: true,
    balance,
    walletAddress,
    contractAddress,
  });
};

module.exports = balance;

const Web3 = require('web3');

const web3 = new Web3();

web3.setProvider(
  new web3.providers.HttpProvider(
    'https://ropsten.infura.io/v3/67371233f2174ca98752e3bf71efb4cd'
  )
);

module.exports = web3;

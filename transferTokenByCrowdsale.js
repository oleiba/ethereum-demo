/**
 * This script will send a transaction to the CROWDSALE contract and activate its default payable method.
 */
var config = require('./config')
var Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider(config.get('web3Provider')))
var async = require('async')
var from = '0x4a1824c9c7e8ded9facae4dbc573d50a164ef33b'
var contractAddress = '0x4edB414c89Bd34390009CA957877cC694129d061'
var value = '500000000000000000'  // 0.5 ether (0.5*10^18 wei)

async.waterfall([
  function (cb) {
    web3.eth.estimateGas({
      from: from,
      to: contractAddress,
      value: value
    }, cb)
  },
  function (gas, cb) {
    web3.eth.sendTransaction({
      from: from,
      to: contractAddress,
      gas: gas,
      value: value,
      gasPrice: 30000000    // 20 GWei
    }, cb)
  }
],
function (err, result) {
  console.log('err =', err, 'result =', result)
})

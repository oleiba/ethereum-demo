/**
 * This script will send a simple ether transfer transaction
 */
var config = require('./config')
var Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider(config.get('web3Provider')))
var debug = require('debug')('etheruem-demo:transferEther')
var async = require('async')
var argv = require('yargs').argv
if (!argv.to || !argv.value) {
  throw new Error('Must specify "to" and "value" as command line arguments')
}
var from = argv.from
var to = argv.to
var value = web3.utils.toWei(argv.value, 'ether')
var gas
var gasPrice

async.auto({
  getFromAddress: function (cb) {
    if (from) return cb(null, from)
    web3.eth.getCoinbase(cb)
  },
  estimateGas: ['getFromAddress', function (results, cb) {
    from = results.getFromAddress
    debug('from =', from)
    web3.eth.estimateGas({
      from: from,
      to: to,
      value: value  // 2 ether (10^18 wei)
    }, cb)
  }],
  getGasPrice: function (cb) {
    web3.eth.getGasPrice(cb)
  },
  sendTransaction: ['getFromAddress', 'estimateGas', 'getGasPrice', function (results, cb) {
    gas = results.estimateGas
    gasPrice = results.getGasPrice
    debug('gas =', gas)
    debug('gasPrice =', gasPrice)
    web3.eth.sendTransaction({
      from: from,
      to: to,
      gas: gas,
      value: value,
      gasPrice: gasPrice
    }, cb)
  }]
},
function (err, results) {
  if (err) return console.error('err =', err)
  console.log('Success! sent ' + web3.utils.fromWei(value) + ' ETH from ' + from + ' to ' + to + ', txid =', results.sendTransaction)
})

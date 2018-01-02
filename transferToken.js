/**
 * This script will send tokens from one address to another.
 */
var config = require('./config')
var Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider(config.get('web3Provider')))
var debug = require('debug')('etheruem-demo:transferToken')
var async = require('async')
var argv = require('yargs').argv
if (!argv.to || !argv.tokenAddress || !argv.amount) {
  throw new Error('Must specify "to", "tokenAddress" and "amount" as command line arguments')
}

var from = argv.from
var to = argv.to
var tokenAddress = argv.tokenAddress
var amount = parseInt(argv.amount)
debug('from', from, 'to', to, 'amount', amount)

// here I hard coded the ABI of the 'myToken.sol' contract
var jsonInterface = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"}],"name":"burnFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"initialSupply","type":"uint256"},{"name":"tokenName","type":"string"},{"name":"decimalUnits","type":"uint8"},{"name":"tokenSymbol","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"}]
var myContract = new web3.eth.Contract(jsonInterface);
var data = myContract.methods.transfer(to, amount).encodeABI()
debug('data =', data)

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
      to: tokenAddress,
      data: data
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
      to: tokenAddress,
      gas: gas,
      data: data,
      gasPrice: gasPrice
    }, cb)
  }]
},
function (err, results) {
  if (err) return console.error('err =', err)
  console.log('Success! sent ' + amount + ' tokens of token at ' + tokenAddress + ' from ' + from + ' to ' + to + ', txid =', results.sendTransaction)
})

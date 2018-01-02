var config = require('./config')
var Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider(config.get('web3Provider')))
var debug = require('debug')('ethereum-demo:deployTokenContract')
var solc = require('solc')
var async = require('async')
var fs = require('fs')
var argv = require('yargs').argv

var contract = fs.readFileSync(__dirname + '/solidity/myToken.sol', 'utf8')
var contractCompiled = solc.compile(contract, 1)
debug(solc.version())
var contractObj = contractCompiled.contracts[':LeibaToken']
var jsonInterface = JSON.parse(contractObj.interface)
var data = '0x' + contractObj.bytecode
/* Deploy your contract */
var myContract = new web3.eth.Contract(jsonInterface);
var from = argv.from
var deployTransactionObj
async.auto({
  getFromAddress: function (cb) {
    if (from) return cb(null, from)
    web3.eth.getCoinbase(cb)
  },
  getGasPrice: web3.eth.getGasPrice,
  estimateGas: function (cb) {
    var deployObj = {
      data: data,
      // uint256 initialSupply,
      // string tokenName,
      // uint8 decimalUnits,
      // string tokenSymbol
      arguments: ['2100000000000000', 'LeibaToken', 8, 'LBT']
    }
    deployTransactionObj = myContract.deploy(deployObj)
    deployTransactionObj.estimateGas(cb)
  },
  sendTransaction: ['getFromAddress', 'getGasPrice', 'estimateGas', function (results, cb) {
    from = results.getFromAddress
    gas = results.estimateGas
    gasPrice = results.getGasPrice
    debug('from', from)
    debug('gas', gas)
    debug('gasPrice', gasPrice)
    deployTransactionObj.send({
      from,
      gas,
      gasPrice
    }, cb)
  }]
}, function (err, results) {
  if (err) return console.error('err =', err)
  console.log('Success! transactionHash =', results.sendTransaction)
})

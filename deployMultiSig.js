var config = require('./config')
var Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider(config.get('web3Provider')))
var debug = require('debug')('ethereum-demo:deployMultiSig')
var solc = require('solc')
var async = require('async')
var fs = require('fs')
var argv = require('yargs').argv
if (!argv.owners || !argv.required) {
  throw new Error('Must have "owners" and "required" as command line arguments')
}
var owners = argv.owners.split(',')
var required = parseInt(argv.required)
debug('owners =', owners)
debug('required =', required)

var contract = fs.readFileSync(__dirname + '/solidity/multisig.sol', 'utf8')
/* Deploy your contract */
var from = argv.from
var deployTransactionObj
var data
var myContract
var constructorArguments = [owners, required]
async.auto({
  getFromAddress: function (cb) {
    if (from) return cb(null, from)
    web3.eth.getCoinbase(cb)
  },
  loadCompilerVersion: function (cb) {
    solc.loadRemoteVersion('v0.4.15+commit.bbb8e64f', cb)
  },
  getGasPrice: web3.eth.getGasPrice,
  estimateGas: ['loadCompilerVersion', function (results, cb) {
    var solcSnapshot = results.loadCompilerVersion
    var contractCompiled = solcSnapshot.compile(contract, 1)
    // debug('contractCompiled =', contractCompiled)
    var contractObj = contractCompiled.contracts[':MultiSigWallet']
    var jsonInterface = JSON.parse(contractObj.interface)
    myContract = new web3.eth.Contract(jsonInterface);
    data = '0x' + contractObj.bytecode
    var deployObj = {
      data: data,
        // address[] _owners, uint _required
      arguments: constructorArguments
    }
    deployTransactionObj = myContract.deploy(deployObj)
    deployTransactionObj.estimateGas(cb)
  }],
  sendTransaction: ['getFromAddress', 'getGasPrice', 'estimateGas', function (results, cb) {
    var from = results.getFromAddress
    var gas = results.estimateGas
    var gasPrice = results.getGasPrice
    debug('from =', from)
    debug('gas =', gas)
    debug('gasPrice =', gasPrice)
    deployTransactionObj.send({
      from,
      gas,
      gasPrice
    }, cb)
  }],
}, function (err, results) {
  if (err) return console.error('err =', err)
  console.log('Success! transactionHash =', results.sendTransaction)
})

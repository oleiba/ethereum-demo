var config = require('./config')
var Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider(config.get('web3Provider')))
var solc = require('solc')
var async = require('async')
var fs = require('fs')
// console.log(solc.version())
var contract = fs.readFileSync(__dirname + '/solidity/crowdsale.sol', 'utf8')
var contractCompiled = solc.compile(contract, 1)
var contractObj = contractCompiled.contracts[':LeibaCrowdsale']
var jsonInterface = JSON.parse(contractObj.interface)
var code = '0x' + contractObj.bytecode
/* Deploy your contract */
var myContract = new web3.eth.Contract(jsonInterface);
var coinbaseAddress
var deployTransactionObj
async.waterfall([
  web3.eth.getCoinbase,
  function (_coinbaseAddress, cb) {
    coinbaseAddress = _coinbaseAddress
    var deployObj = {
      data: code,
        // address ifSuccessfulSendTo,
        // uint fundingGoalInEthers,
        // uint durationInMinutes,
        // uint etherCostOfEachToken,
        // token addressOfTokenUsedAsReward
      arguments: [coinbaseAddress, 5, 4320, 100, '0x1A2f01A43b4AD0278e77Afd8bA2B26c695397b7F']
    }
    deployTransactionObj = myContract.deploy(deployObj)
    deployTransactionObj.estimateGas(cb)
  },
  function (gas, cb) {
    deployTransactionObj.send({
      from: coinbaseAddress,
      gas: gas,
      gasPrice: '20000000000'
    }, cb)
  }
], function (err, transactionHash) {
  if (err) return console.error('err =', err)
  console.log('Success! transactionHash =', transactionHash)
})

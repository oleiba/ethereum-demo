var config = require('./config')
var Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider(config.get('web3Provider')))
var async = require('async')
var request = require('request')
var argv = require('yargs').argv
var debug = require('debug')('ethereum-demo:checkBalance')
var network = argv.network || 'ropsten'
debug('network', network)
if (network !== 'mainnet' && network !== 'ropsten') {
  throw new Error('network must be "mainnet" or "ropsten"')
}
var etherscanUrl = (network === 'mainnet' && 'https://api.etherscan.io') || (network === 'ropsten' && 'https://ropsten.etherscan.io')
debug('etherscanUrl', etherscanUrl)
var address = argv.address
var apiKey = config.get('etherscanApiKey')

request(etherscanUrl + '/api?module=account&action=balance&address=' + address + '&tag=latest&apikey=' + apiKey, (err, response, body) => {
  if (err) return console.error(err)
  body = JSON.parse(body)
  var etherBalance = (body && body.result && web3.utils.fromWei(body.result)) || 0
  console.log('Balance (ETH) at ' + address + ': ' + etherBalance)
})

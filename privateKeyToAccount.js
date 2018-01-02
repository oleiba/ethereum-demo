var config = require('./config')
var Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider(config.get('web3Provider')))
console.log(web3.eth.accounts.privateKeyToAccount('3a1076bf45ab87712ad64ccb3b10217737f7faacbf2872e88fdd9a537d8fe266'))
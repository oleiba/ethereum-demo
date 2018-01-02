var defaults ={
  web3Provider: 'https://ropsten.colu.com',
  etherscanApiKey: '5HX5Z25IG7PGQ7BGCY3DTJ11MS2VE4Y1MK'
}

module.exports = {
  get: function (key) {
    return defaults[key]
  }
}

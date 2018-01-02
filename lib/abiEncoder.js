var abi = require('ethereumjs-abi')
// returns the encoded binary (as a Buffer) data to be sent
  // uint256 initialSupply,
  // string tokenName,
  // uint8 decimalUnits,
  // string tokenSymbol
  // arguments: ['2100000000000000', 'LeibaToken', 8, 'LBT']
var encoded = abi.rawEncode([ 'uint256', 'string', 'uint8', 'string' ], ['2100000000000000', 'LeibaToken', 8, 'LBT'])
// address ifSuccessfulSendTo,
// uint fundingGoalInEthers,
// uint durationInMinutes,
// uint finneyCostOfEachToken,
// token addressOfTokenUsedAsReward
var encoded = abi.rawEncode(['address', 'uint', 'uint', 'uint', 'address'], ['0xdf3142f435ad8a718b398acbee4a982a2787bd61', 5, 4320, 100, '0x1A2f01A43b4AD0278e77Afd8bA2B26c695397b7F'])
var encoded = abi.rawEncode(['string', 'uint'], ['Oded Leiba', 932])
console.log('encoded =', encoded.toString('hex'))
// //  address[] _owners, uint _required
// var encoded = abi.rawEncode(['address[]', 'uint'], [["0x3aCCF610998C2aA0a6C6452B6Da0bF75A172f955", "0xA1018fEDe70680732c2464Ea689FE9dEE09E2E32", "0x9F8eCfa57fcC33d1855065A38f31a04e9BB6e2Da"], 2])
// console.log('encoded =', encoded.toString('hex'))
// var decoded = abi.rawDecode('0xc6427474000000000000000000000000a1018fede70680732c2464ea689fe9dee09e2e320000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000737b2276616c7565223a2230222c22746f223a22307843374433383962613536373044343066396336323337303843413861313635303733373037303337222c2266726f6d223a22307833614343463631303939384332614130613643363435324236446130624637354131373266393535227d00000000000000000000000000')
// console.log('decoded =', decoded)
// address[] _owners, uint256 _required, uint256 _daylimit)
var decoded = abi.rawDecode(['address[]', 'uint256', 'uint256'], new Buffer('0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000ae7168deb525862f4fee37d987a971b385b96952', 'hex'))
console.log('decoded =', decoded)
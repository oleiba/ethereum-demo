# Ethereum demo
    
Web3 & solidity Proofs-of-concept for various use cases.

## Usage

### `transferEther`
```sh
npm run transferEther -- --from=0xDf3142F435Ad8A718b398ACBEe4a982A2787Bd61 --to=0x4a1824c9c7e8ded9facae4dbc573d50a164ef33b --value=0.0036
```

### `transferToken`
```sh
npm run transferToken -- --from=0x4A1824C9C7e8DeD9facAe4dbc573d50A164Ef33B --to=0xDf3142F435Ad8A718b398ACBEe4a982A2787Bd61 --tokenAddress=0xd597f3a370dc3c4774d76ffc450af8a435ccc579 --amount=3
```

### `deployMultiSig`
```sh
npm run deployMultiSig -- --owners=0x3aCCF610998C2aA0a6C6452B6Da0bF75A172f955,0xA1018fEDe70680732c2464Ea689FE9dEE09E2E32,0x9F8eCfa57fcC33d1855065A38f31a04e9BB6e2Da --required=2
```

### `deployTokenContract`
```sh
npm run deployTokenContract -- --from=0x3aCCF610998C2aA0a6C6452B6Da0bF75A172f955
```

**Note:** In these APIs you might get an error:
```
authentication needed: password or unlock
```
in that case you need to connect to your web3 provider (Colu's Ropsten node by default) and unlock the account (using `personal.unlockAccount`).

### `checkBalance`
```sh
npm run checkBalance -- --network=ropsten --address=0x4a1824c9c7e8ded9facae4dbc573d50a164ef33b
```

Other scripts are available as well, but values are hard-coded (Pull-Requests are welcome :) )


require('dotenv').config()
const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");
const URL = "https://api.baobab.klaytn.net:8651";

//니모닉코드를 넣어서 모든 계정을 accounts에 담아서 사용했다.

module.exports = {


  networks: {
   
    development: {
     host: "127.0.0.1",     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },
    baobab: {
      provider: () => {
        return  new HDWalletProvider(process.env.MNE, URL)
      },
			network_id: '1001',
      gas: '8500000',
      gasPrice: null
		},
    
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.10",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  },

  
};

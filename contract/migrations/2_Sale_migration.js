const Sale = artifacts.require("Sale");
const AngelNFT = artifacts.require("AngelNFT");


module.exports = function (deployer) {
  deployer.deploy(Sale,AngelNFT.address);
};

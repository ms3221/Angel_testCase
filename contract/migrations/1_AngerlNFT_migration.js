const AngelNFT = artifacts.require("AngelNFT");

module.exports = function (deployer) {
  deployer.deploy(AngelNFT);
};

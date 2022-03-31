// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;


import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


// import "../@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "../@openzeppelin/contracts/utils/Counters.sol";
// import "../@openzeppelin/contracts/access/Ownable.sol";
// import "../@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


/*
address payable addr3 = address(uint160(addr1)); // Correct since Solidity >= 0.5.0
address payable addr4 = payable(addr1); // Correct since Solidity >= 0.6.0
*/

contract AngelNFT is ERC721URIStorage, Ownable{


        using Counters for Counters.Counter;
        Counters.Counter private _tokenIds;
        constructor() ERC721("AngelNFT", "angel") {}


 //2. public mint 진행 
        function mintNFT(string memory tokenURI) public returns (uint256) {
            _tokenIds.increment();
            uint256 newItemId = _tokenIds.current();
            _mint(msg.sender, newItemId);
            _setTokenURI(newItemId, tokenURI); 
            return newItemId;
        }

   
    
}

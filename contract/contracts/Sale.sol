// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;



import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";




contract Sale{
   

    mapping (uint256 => uint256) public tokenPrice;
    ERC721URIStorage public nftAddress;

    constructor(address _tokenAddress) {
          nftAddress =  ERC721URIStorage(_tokenAddress);
    }
     


    function setForSale(uint256 _tokenId, uint256 _price) public {

        //토큰의 소유자 계정만 판매하도록 만드는 함수
        address tokenOwner = nftAddress.ownerOf(_tokenId);
        require(tokenOwner == msg.sender, 'caller is not owner');
        require(_price > 0,'price is zero than lower');
        require(nftAddress.getApproved(_tokenId) == address(this),'token owner did not approve contractAddresss');  
        tokenPrice[_tokenId] = _price;
    }

    
    function purchaseToken(uint256 _tokenId) public payable{
        //토큰을 구매하기 위해서 이함수로 돈을 보내는 것이기 때문에 payable을 사용해야합니다.
        uint256 price = tokenPrice[_tokenId];
        address tokenSeller = nftAddress.ownerOf(_tokenId);
        require(msg.value >= price, "caller klay token seller");
        require(msg.sender != tokenSeller,"caller is token seller");  //본인은 구매를 못함 
        address payable payableTokenSeller = payable(tokenSeller);

        // 이과정이 끝나면 판매자 계쩡으로 클레이를 전송할 수 있습니다. 
        payableTokenSeller.transfer(msg.value);
        //토큰셀러계쩡에서 이함수를 호출한 구매자 ㄱㅖ정으로 토큰을 전송합니다. 
        nftAddress.safeTransferFrom(tokenSeller, msg.sender, _tokenId);
        tokenPrice[_tokenId] = 0;  
    }
    
}

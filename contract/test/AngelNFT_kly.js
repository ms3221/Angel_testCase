
const Caver = require('caver-js')
const caver = new Caver('https://api.baobab.klaytn.net:8651')

const AngelNFT = artifacts.require("AngelNFT");
const Sale = artifacts.require("Sale");

contract("AngelNFT", function (accounts) {

    let nft;
    let sale;
    let walletA = accounts[0]
    let walletB = accounts[1];
    let NFTCA;
    let SALECA;
    let tx;
    let tokenId;


    before( async () => {
        nft = await AngelNFT.deployed();
        sale = await Sale.deployed();
        tx = await nft.mintNFT('https://angel.com', { from: accounts[0] })
        NFTCA = nft.address;
        SALECA = sale.address;
        //tokenId value 1
        tokenId = tx.logs[0].args[2].toNumber();
       
    });
     

    describe("TestCase1 : 스마트컨트랙트가 정상적으로 생성되었는지 점검",() => {
        it('symbol이 angel인가?', async () => {
            const symbol = await nft.symbol();
            assert.equal(symbol, "angel");
        });
        it('name이 AngelNFT인가?', async () => {
            const name = await nft.name();
            assert.equal(name, "AngelNFT");
     }); 
    })

    describe("TestCase2 : NFT 민팅 (tokenId 1) > wallet address #1",() => {
        it('민팅후 토큰아이디 값이 1이 맞는지 확인', async () => {
            assert.equal(tokenId, 1)
        });

        it('민팅된 토큰의 소유자가 walltA가 맞는지 확인', async () => {
            const owner = await nft.ownerOf(tokenId)
            assert.equal(owner,walletA);
        }); 
    })
   
    describe("TestCase3 : 민팅된 NFT의 transfer approve || 민팅된 NFT의 거래 컨트랙트 판매 등록 ",() => {
        it('tokenId 1값이 approv됬다면 해당되는 주소는 sale CA인가?', async () => {
            await nft.approve(SALECA,tokenId)
            const approvedAddress = await nft.getApproved(tokenId);
            assert.equal(approvedAddress,SALECA);
        });

        it('tokenId 1값을 2klay로 설정하기', async () => {
            const price = caver.utils.toPeb("2", 'KLAY')
            await nft.approve(sale.address,tokenId)
            await sale.setForSale(tokenId, price);
            const rawTokenPrice = await sale.tokenPrice(tokenId);
            assert.equal(price,rawTokenPrice.toString());
        });
    })
 
    describe("TestCase4 : wallet address #2의 구매 || tokenId의 소유자 확인",() => {
        it('walletB 주소로 tokenId 1을 구매하기', async () => {
            
            const price = caver.utils.toPeb("2", 'KLAY')
            await sale.purchaseToken(tokenId, { from: walletB, value: price });
            const owner = await nft.ownerOf(tokenId)
            assert.equal(owner,walletB);
        });
    })

   
});
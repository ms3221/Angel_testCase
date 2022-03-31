import React, { useState,useEffect } from "react"; 
import { ethers } from "ethers";
import Caver from 'caver-js'
import { contractABI, contractAddress } from "../lib/constant";


export const Web3Context = React.createContext();


let kly;




if (typeof window.klaytn !== "undefined") {
    try {
        kly = window.klaytn;
    } catch (e) {
        console.log(e);
    }
     
}



export const Provider = ({ children }) => {

    const [CurrentAccount, setAccount] = useState("");
    const [testCase, setTest] = useState("test");
    const [showModal, setShowModal] = useState(false);
    const [network, setNetwork] = useState(null);
    const caver = new Caver(kly);
    let tx;

    const [storageNetwork, setStorageNetwork] = useState("")
    

    useEffect(() => {
        CheckAccount(localStorage.getItem("network"));
    }, [CurrentAccount])
   

    const ConnectWallet = async (wallet) => {
       
       
         if (wallet === 'kly') {
            const accounts = await window.klaytn.enable()
            localStorage.setItem("network", wallet)
            // DB에서 accounts[0] === 디스코드ID 
            // true 
            setAccount(accounts[0]);
            // false 
            // accounts[0] === 디스코드아이디 DB저장해주자.
        }
       
      }
    
    const logoutWallet = async () => {
      
        setStorageNetwork(localStorage.setItem("network", ""));
        setAccount(null)
       
      }
      
    const CheckAccount = async (wallet = network) => {
      
       
         if (wallet === 'kly') {
            const accounts = await window.klaytn.enable()
            localStorage.setItem("network", wallet)
            setAccount(accounts[0]);
        }
        return;
       
    }
    
    const sendTransaction = async () => {
        try {
            // if (!eth) return alert('Please install metamask');
            // const CA = getEthereumContract(provider);
            // console.log(CA);
            //const balance = await provider.getBalance("ovadix.eth")
           // console.log(ethers.utils.formatEther(balance)); ens를 사용해서 가능!
            
           
          
            // const tx = {
            //     to: contractAddress,
            //     data : CA.setVal('jun12'),
            //     nonce: await provider.getTransactionCount("latest"),
            //     gasLimit: ethers.utils.hexlify(10000),
            //     gasPrice: ethers.utils.hexlify(parseInt(await provider.getGasPrice())),
            // }
            
            // const txHash = await sendTransaction(tx);
            // console.log(txHash);
        
            // eth.request({
            //     method: 'eth_sendTransaction',
            //     to: contractAddress,
            //     gas: '0x7EF40', //52000Gwei
            //     data : CA.setVal('jun12'),
            //     value : 0,
            // })


            // const tx = await signer.sendTransaction({
            //     to: "0xdB41F06dde2AFAD8670ad926499ec2D05da433ce",
            //     data :transactionContract.setVal("jun1"),
            //     value: ethers.utils.parseEther("1.0")
            // });
          
            
        } catch (e) {
            console.log(e);
        }
    }
 
    window.klaytn.on('accountsChanged',
        () => { CheckAccount('kly') }
    )
   
    
   

   

    return (
        <Web3Context.Provider
            value={{
                ConnectWallet,
                CurrentAccount,
                CheckAccount,
                setShowModal,
                showModal,
                setNetwork,
                logoutWallet,
                sendTransaction
            }}
        >
        {children}
        </Web3Context.Provider>
    )
}
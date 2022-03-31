

import react,{useContext, useEffect } from 'react';
import styled from 'styled-components';
import { BsWallet } from 'react-icons/bs';
import { Web3Context } from '../context/ProviderContext';
import { useState } from 'react/cjs/react.development';
import Modal from './Modal'

const Head = styled.div`
  position: fixed;
  top:0;
  width:100%;
  height: 100px;
  display : flex;
  align-items: center;
  z-index: 999;
  background: #c2e59c;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #64b3f4, #c2e59c);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #64b3f4, #c2e59c); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const Container = styled.div`
 

  display : flex;
  height: 100%;
  align-items: center;
  justify-content:space-between;
  width: 1200px;
  padding : 0 30px;
  margin : 0 auto;
  font-size : 30px;
`;

const Button = styled.button`
background: #00d2ff;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #928DAB, #00d2ff);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #928DAB, #00d2ff); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
border: none;
padding : 15px 20px;
border-radius: 10px;
color: white;
font-weight: bold;
text-transform: uppercase;
margin-left:10px;
cursor: pointer;
transition: all 0.1s ease-in-out;
 &:hover {
         transform: translateY(-3px);
     }
 &:active {
 background: #B24592;  /* fallback for old browsers */
 background: -webkit-linear-gradient(to right, #F15F79, #B24592);  /* Chrome 10-25, Safari 5.1-6 */
 background: linear-gradient(to right, #F15F79, #B24592); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
 }    
`;

const Col = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
   p {
    font-size :15px;
    margin-left: 10px;
    font-weight: bold;
    color: whitesmoke;
   }
`;


const Header = () => {
     
    const [account, setAccount] = useState(null);
   
    const { ConnectWallet, CurrentAccount, CheckAccount,setShowModal,showModal,logoutWallet, sendTransaction } = useContext(Web3Context)
   
    async function transaction() {
        await sendTransaction();
    }
  
    useEffect(() => {
        
        if (!CurrentAccount) {
            setAccount('');
            return;
        }
        setAccount(`${CurrentAccount.slice(0, 7)} ... ${CurrentAccount.slice(35)}`)
    }, [CurrentAccount,account])
    
    
   
   
  
    return(
        <Head>
            <Container>
                <Col>
                   <h1>LOGO</h1>
                </Col>
                <Col>
                    <p>Education</p>
                </Col>
                <Col>
                    <BsWallet />
                    <p>
                    {account}
                    </p>
                    {
                     CurrentAccount ? 
                 <Button onClick={logoutWallet}>
                     LogOut
                 </Button> :
                 <Button onClick={() => {
                      setShowModal(true);
                    }}>Connect Wallet</Button> 
                   
                    }
                    { showModal ? <Modal /> : null}
                    {/* <Button onClick={transaction}>
                         TEST sendTransaction
                    </Button> */}
                </Col> 
            </Container>
        </Head>
    );

}

export default Header;
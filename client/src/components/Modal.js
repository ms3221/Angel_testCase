import styled from "styled-components"
import react,{useContext, useEffect } from 'react';
import { Web3Context } from '../context/ProviderContext';
import klip from '../assets/klip-logo.svg';
import kaikas from '../assets/kaikas-logo.svg';
import metamask from '../assets/metamask.svg';

const ModalWrapper = styled.div`
  position: fixed;
  top:0;
  left:0;
  width: 100%;
  height: 100vh;
  display : flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.7);
  z-index : 9999;
  transition: all 0.2s ease-in-out;
`;


const ModalContainer = styled.div`
   width: 600px;
   background-color: white;
   padding: 40px 50px;
   border-radius: 20px;
   background-color: gray;
   display: flex;
   flex-direction: column;
   justify-content: center;
`;

const ModalHeader = styled.header`
   display : flex;
   justify-content : space-between;
   align-items : center;
   margin-bottom: 20px;
`;

const ModalContent = styled.div`
   display : flex;
   justify-content: space-between;
  
`;

const ModalCard = styled.div`
  background: linear-gradient(to right, #928DAB, #00d2ff); 
  width : 270px;
  height: 180px;
  border-radius : 10px;
  display : flex;
  justify-content: center;
  align-items : center;
  flex-direction:column;
  box-shadow: 4px 12px 30px 6px rgb(0 0 0 / 9%);
  transition: all 0.3s ease-in-out;
  cursor : pointer;
  h5{
      margin-top: 20px;
      font-size: 18px;
  }
  &:hover {
    transform: translateY(-3px);
    box-shadow: 4px 12px 20px 6px rgb(0 0 0 / 18%);
}
`;




const Modal = () => {

    const { setShowModal, setNetwork,ConnectWallet } = useContext(Web3Context)


    function selectNetwork(network) {
   
    setNetwork(network)
    ConnectWallet(network);
    setShowModal(false);
        
        
}

    return (
        <ModalWrapper>
            <ModalContainer>
                <ModalHeader>
                    <h4>Connet Wallet</h4>
                    <button onClick={() => { setShowModal(false) } }>x</button>
                </ModalHeader>
                <ModalContent>
                    {/* <ModalCard onClick={() => {selectNetwork("eth")} }>
                        <img src={metamask} />
                        <h5>Connect to metamask Wallet</h5>
                    </ModalCard> */}
                    <ModalCard onClick={() => { selectNetwork("kly")}}>
                        <img src={kaikas} />
                        <h5>Connect to KaiKas Wallet</h5>
                    </ModalCard>
   
                </ModalContent>
           </ModalContainer>
        </ModalWrapper>
    )

}

export default Modal;
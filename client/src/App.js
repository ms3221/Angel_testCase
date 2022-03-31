import logo from './logo.svg';
import { useContext, useEffect, useState } from 'react'
import Caver from 'caver-js'
import { Web3Context } from './context/ProviderContext';
import styled from 'styled-components';
import { Routes, Route } from 'react-router';
import Header from './components/Header';

// syled.componets create

const Container = styled.div`

   background-color: beige;
`




function App() {

  return (
    <Container>
      <Header />
      <Routes>
       
      </Routes>
      {/* <div className="main">
      <div className="connectWallet">
        <button onClick={EthConnectWallet}>Ethereum</button>
          <button onClick={KlayConnectWallet}>KaiKas</button>
      </div>
      
      <div>
          Ethereum 여기는 주소를 연결하는 공간이 될거에요!
          <p>{CurrentAccount}</p>
      </div>

      <div>
          KaiKas여기는 주소를 연결하는 공간이 될거에요!
          <p>{KlayCurrentAccount}</p>
        </div>
        </div> */}
  </Container>
  );
}

export default App;

import React from 'react';
import styled from 'styled-components';
import { ContractsProvider } from 'src/context/contracts/EthereumProvider';
import { EthereumProvider } from 'src/context/ethereum/EthereumProvider';
import { FiatTokenProvider } from 'src/context/fiat-token/FiatTokenProvider';
import { WrappedTokenProvider } from 'src/context/wrapped-token/WrappedTokenProvider';
import { Home } from 'src/pages/Home';

function App() {
  return (
    <EthereumProvider>
      <ContractsProvider>
        <FiatTokenProvider>
          <WrappedTokenProvider>
            <Wrapper>
              <Home />
            </Wrapper>
          </WrappedTokenProvider>
        </FiatTokenProvider>
      </ContractsProvider>
    </EthereumProvider>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100vh;
  background-color: var(--color-background-primary);
`;

export default App;

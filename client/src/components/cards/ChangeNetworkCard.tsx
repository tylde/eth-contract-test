import React from 'react';
import styled from 'styled-components';
import { Button } from 'src/_lib/components/Button';
import { Card } from 'src/_lib/components/Card';
import { MediumRegular } from 'src/_lib/styles/Fonts';
import { Cell12 } from 'src/components/Layout/Grid';
import { useEthereum } from 'src/context/ethereum/EthereumProvider';
import { ChainType } from 'src/types/ChainType';

export function ChangeNetworkCard() {
  const { switchChain } = useEthereum();

  return (
    <Cell12>
      <Card>
        <Content>
          <Stretch>
            <MediumRegular ml={2} mr={2} mt={5} mb={5} align="center">
              Only Rinkeby and Ropsten networks are available.
            </MediumRegular>
            <Switch>
              <Chain>
                <Button onClick={() => switchChain(ChainType.Rinkeby)} width="100%">
                  Switch To Rinkeby
                </Button>
              </Chain>
              <Chain>
                <Button onClick={() => switchChain(ChainType.Ropsten)} width="100%">
                  Switch To Ropsten
                </Button>
              </Chain>
            </Switch>
          </Stretch>
        </Content>
      </Card>
    </Cell12>
  );
}

const Content = styled.div`
  height: 100%;
  padding: 16px;
`;

const Stretch = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-content: space-between;
`;

const Switch = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const Chain = styled.div`
  grid-column: span 1;

  @media only screen and (max-width: 800px) {
    grid-column: span 2;
  }
`;

import React from 'react';
import styled from 'styled-components';
import { Button } from 'src/_lib/components/Button';
import { Card } from 'src/_lib/components/Card';
import { useContracts } from 'src/context/contracts/EthereumProvider';
import { useEthereum } from 'src/context/ethereum/EthereumProvider';
import { ChainType } from 'src/types/ChainType';

export function SeeContractCard() {
  const { chainType } = useEthereum();
  const { fiatTokenAddress, wrappedTokenAddress } = useContracts();

  return (
    <Cell>
      <Card>
        <Content>
          <Stretch>
            <Switch>
              <Chain>
                <a href={getEtherScanLink(chainType, fiatTokenAddress)} target="_blank" rel="noreferrer noopener">
                  <Button width="100%" buttonType="secondary">
                    See Fiat Token Contract
                  </Button>
                </a>
              </Chain>
              <Chain>
                <a href={getEtherScanLink(chainType, wrappedTokenAddress)} target="_blank" rel="noreferrer noopener">
                  <Button width="100%" buttonType="secondary">
                    See Wrapped Token Contract
                  </Button>
                </a>
              </Chain>
            </Switch>
          </Stretch>
        </Content>
      </Card>
    </Cell>
  );
}

function getEtherScanLink(chainType: ChainType, tokenAddress: string) {
  switch (chainType) {
    case ChainType.Rinkeby:
      return `https://rinkeby.etherscan.io/address/${tokenAddress}`;
    case ChainType.Ropsten:
      return `https://ropsten.etherscan.io/address/${tokenAddress}`;
    default:
      return `https://etherscan.io/address/${tokenAddress}`;
  }
}

export const Cell = styled.div`
  grid-column: span 12;
`;

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

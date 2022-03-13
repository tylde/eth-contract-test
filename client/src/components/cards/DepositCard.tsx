import React from 'react';
import styled from 'styled-components';
import { Card } from 'src/_lib/components/Card';
import { MediumRegular } from 'src/_lib/styles/Fonts';
import { Cell6 } from 'src/components/Layout/Grid';
import { DepositTokens } from 'src/components/buttons/DepositTokens';
import { useEthereum } from 'src/context/ethereum/EthereumProvider';

export function DepositCard() {
  const { hasMetamask } = useEthereum();

  const isMetamask = hasMetamask();

  return (
    <Cell6>
      <Card>
        <Content>
          {isMetamask && (
            <Stretch>
              <MediumRegular ml={2} mr={2} mt={5} align="center">
                You can deposit your Fiat tokens in exchange for Wrapped Tokens.
              </MediumRegular>
              <DepositTokens />
            </Stretch>
          )}
        </Content>
      </Card>
    </Cell6>
  );
}

const Content = styled.div`
  height: 100%;
  min-height: 200px;
  padding: 16px;
`;

const Stretch = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-content: space-between;
`;

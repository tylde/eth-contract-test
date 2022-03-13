import React from 'react';
import styled from 'styled-components';
import { Card } from 'src/_lib/components/Card';
import { MediumRegular } from 'src/_lib/styles/Fonts';
import { Cell6 } from 'src/components/Layout/Grid';
import { RequestFiatTokens } from 'src/components/buttons/RequestFiatTokens';
import { useEthereum } from 'src/context/ethereum/EthereumProvider';

export function RequestTokensCard() {
  const { hasMetamask } = useEthereum();

  const isMetamask = hasMetamask();

  return (
    <Cell6>
      <Card>
        <Content>
          {isMetamask && (
            <Stretch>
              <MediumRegular ml={2} mr={2} mt={5} align="center">
                Every wallet is allowed to request 10 fiat tokens once.
              </MediumRegular>
              <RequestFiatTokens />
            </Stretch>
          )}
        </Content>
      </Card>
    </Cell6>
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

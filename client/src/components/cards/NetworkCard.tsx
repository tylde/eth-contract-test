import { UilServerNetwork } from '@iconscout/react-unicons';
import React from 'react';
import styled from 'styled-components';
import { Card } from 'src/_lib/components/Card';
import { H2, MediumRegular } from 'src/_lib/styles/Fonts';
import { Cell6 } from 'src/components/Layout/Grid';
import { useEthereum } from 'src/context/ethereum/EthereumProvider';
import { getNetworkName } from 'src/types/ChainType';

export function NetworkCard() {
  const { chainType } = useEthereum();

  return (
    <Cell6>
      <Card>
        <Content>
          <Stretch>
            <Center>
              <UilServerNetwork size={32} />
              <MediumRegular mt={2}>Connected Network:</MediumRegular>
              <H2 mt={2}>{getNetworkName(chainType)}</H2>
            </Center>
          </Stretch>
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

const Center = styled.div`
  padding-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

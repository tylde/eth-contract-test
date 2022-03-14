import React from 'react';
import styled from 'styled-components';
import { H3 } from 'src/_lib/styles/Fonts';
import { Content } from 'src/components/Layout/Content';
import { Grid } from 'src/components/Layout/Grid';
import { Header } from 'src/components/Layout/Header';
import { ChangeNetworkCard } from 'src/components/cards/ChangeNetworkCard';
import { ConnectionCard } from 'src/components/cards/ConnectionCard';
import { DepositCard } from 'src/components/cards/DepositCard';
import { NetworkCard } from 'src/components/cards/NetworkCard';
import { PortfolioCard } from 'src/components/cards/PortfolioCard';
import { RequestTokensCard } from 'src/components/cards/RequestTokensCard';
import { SeeContractCard } from 'src/components/cards/SeeContractCard';
import { WithdrawCard } from 'src/components/cards/WithdrawCard';
import { useEthereum } from 'src/context/ethereum/EthereumProvider';

export function Home() {
  const { checkConnection, isValidNetwork, hasMetamask } = useEthereum();

  const isConnected = checkConnection();
  const isMetamask = hasMetamask();

  return (
    <>
      <Header>
        <H3 color="white">Contract Flow Test</H3>
      </Header>
      <Content>
        <HomeContent>
          <Grid>
            <ConnectionCard />
            <NetworkCard />
            {isMetamask && !isValidNetwork && <ChangeNetworkCard />}
            {isMetamask && isConnected && isValidNetwork && (
              <>
                <PortfolioCard />
                <RequestTokensCard />
                <DepositCard />
                <WithdrawCard />
                <SeeContractCard />
              </>
            )}
          </Grid>
        </HomeContent>
      </Content>
    </>
  );
}

const HomeContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  max-width: 1080px;
  margin: 0 auto;
`;

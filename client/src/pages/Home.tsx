import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from 'src/_lib/components/Button';
import { Card } from 'src/_lib/components/Card';
import { H3 } from 'src/_lib/styles/Fonts';
import { InstallMetamask } from 'src/components/InstallMetamask';
import { Content } from 'src/components/Layout/Content';
import { Header } from 'src/components/Layout/Header';
import { NetworkType } from 'src/components/NetworkType';
import { SelectedWallet } from 'src/components/SelectedWallet';
import { WalletBalance } from 'src/components/WalletBalance';
import { ChainType } from 'src/types/ChainType';

const hasMetamask = () => !!window.ethereum?.isMetaMask;

export function Home() {
  const [account, setAccount] = useState<string | undefined>();
  const [chainType, setChainType] = useState<ChainType>(ChainType.Unknown);

  const getChainType = (chainId?: string): ChainType => {
    if (chainId === ChainType.Mainnet) {
      return ChainType.Mainnet;
    }
    if (chainId === ChainType.Ropsten) {
      return ChainType.Ropsten;
    }
    if (chainId === ChainType.Rinkeby) {
      return ChainType.Rinkeby;
    }
    if (chainId === ChainType.Goerli) {
      return ChainType.Goerli;
    }
    if (chainId === ChainType.Kovan) {
      return ChainType.Kovan;
    }
    return ChainType.Unknown;
  };

  const getChainId = async () => {
    const chainId = await window.ethereum?.request({ method: 'eth_chainId' });
    setChainType(getChainType(chainId));
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on?.('connect', (connectInfo) => setChainType(getChainType(connectInfo.chainId)));
      window.ethereum.on?.('disconnect', (error) => console.info({ error }));
      window.ethereum.on?.('accountsChanged', ([account]) => setAccount(account));
      window.ethereum.on?.('chainChanged', (chainId) => setChainType(getChainType(chainId)));
      window.ethereum.on?.('message', (message) => console.info({ message }));

      void getChainId();
    }
  }, [window.ethereum]);

  const connectMetamask = async () => {
    if (!window.ethereum) {
      return;
    }

    const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(account);
  };

  const disconnectMetamask = () => {
    setAccount(undefined);
  };

  return (
    <>
      <Header>
        <H3 color="white">Contract Flow Test</H3>

        <HeaderContent>
          {!hasMetamask() ? (
            <InstallMetamask />
          ) : !account ? (
            <Button onClick={connectMetamask}>Connect Wallet</Button>
          ) : (
            <Button onClick={disconnectMetamask}>Disconnect Wallet</Button>
          )}
          {<NetworkType chainType={chainType} />}
        </HeaderContent>
      </Header>
      <Content>
        <HomeContent>
          {account && (
            <Card>
              <CardContent>
                <SelectedWallet account={account} />
              </CardContent>
            </Card>
          )}
          {account && (
            <Card>
              <CardContent>
                <WalletBalance account={account} />
              </CardContent>
            </Card>
          )}
        </HomeContent>
      </Content>
    </>
  );
}

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: var(--color-white);
`;

const HomeContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CardContent = styled.div`
  padding: 16px;
`;

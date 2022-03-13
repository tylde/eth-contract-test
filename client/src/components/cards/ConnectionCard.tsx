import React from 'react';
import styled from 'styled-components';
import { Card } from 'src/_lib/components/Card';
import { MediumRegular, RegularRegular } from 'src/_lib/styles/Fonts';
import AccountIcon from 'src/components/AccountIcon';
import { Cell6 } from 'src/components/Layout/Grid';
import { ConnectWallet } from 'src/components/buttons/ConnectWallet';
import { DisconnectWallet } from 'src/components/buttons/DisconnectWallet';
import { InstallMetamask } from 'src/components/buttons/InstallMetamask';
import { useEthereum } from 'src/context/ethereum/EthereumProvider';

export function ConnectionCard() {
  const { account, hasMetamask } = useEthereum();

  const isMetamask = hasMetamask();

  return (
    <Cell6>
      <Card>
        <Content>
          {!isMetamask && (
            <Stretch>
              <Center>
                <RegularRegular ml={2} mr={2} mt={5}>
                  Install Metamask to get access to website all features.
                </RegularRegular>
              </Center>
              <InstallMetamask />
            </Stretch>
          )}
          {isMetamask && account && (
            <Stretch>
              <Center>
                <IconWrapper>
                  <AccountIcon />
                </IconWrapper>
                <MediumRegular mt={2}>{`${account.substring(0, 6)}...${account.slice(-4)}`}</MediumRegular>
              </Center>
              <DisconnectWallet />
            </Stretch>
          )}
          {isMetamask && !account && (
            <Stretch>
              <Center>
                <MediumRegular ml={2} mr={2} mt={5} align="center">
                  Connect wallet to get access to website all features.
                </MediumRegular>
              </Center>
              <ConnectWallet />
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

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconWrapper = styled.span`
  padding-top: 24px;
`;

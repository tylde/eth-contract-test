import React from 'react';
import styled from 'styled-components';
import { Card } from 'src/_lib/components/Card';
import { H2, RegularRegular } from 'src/_lib/styles/Fonts';
import { Cell6 } from 'src/components/Layout/Grid';
import { useEthereum } from 'src/context/ethereum/EthereumProvider';
import { useFiatToken } from 'src/context/fiat-token/FiatTokenProvider';
import { useWrappedToken } from 'src/context/wrapped-token/WrappedTokenProvider';
import { ReactComponent as EthereumSvg } from 'src/svg/ethereum.svg';
import { ReactComponent as FiatTokenSvg } from 'src/svg/fiat-token.svg';
import { ReactComponent as WrappedTokenSvg } from 'src/svg/wrapped-token.svg';
import { formatUSNumberString } from 'src/utils/number';

export function PortfolioCard() {
  const { balance: etherBalance, hasMetamask } = useEthereum();
  const { balance: fiatTokenBalance } = useFiatToken();
  const { balance: wrappedTokenBalance } = useWrappedToken();

  const isMetamask = hasMetamask();

  return (
    <Cell6>
      <Card>
        <Content>
          {isMetamask && (
            <Portfolio>
              <H2 mb={1} align="center">
                Portfolio
              </H2>
              <Asset>
                <AssetName>
                  <EthereumSvg width={28} height={28} />
                  <RegularRegular ml={1}>Ether </RegularRegular>
                </AssetName>
                <AssetValue>{formatBalance(etherBalance)} ETH</AssetValue>
              </Asset>
              <Asset>
                <AssetName>
                  <FiatTokenSvg width={28} height={28} />
                  <RegularRegular ml={1}>Fiat Token </RegularRegular>
                </AssetName>
                <AssetValue>{formatBalance(fiatTokenBalance)} FTK</AssetValue>
              </Asset>
              <Asset>
                <AssetName>
                  <WrappedTokenSvg width={28} height={28} />
                  <RegularRegular ml={1}>Wrapped Token </RegularRegular>
                </AssetName>
                <AssetValue>{formatBalance(wrappedTokenBalance)} wTK</AssetValue>
              </Asset>
            </Portfolio>
          )}
        </Content>
      </Card>
    </Cell6>
  );
}

function formatBalance(number: string) {
  if (!number || number === '-') {
    return number;
  }
  return formatUSNumberString(number);
}

const Content = styled.div`
  height: 100%;
  padding: 16px;
`;

const Portfolio = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Asset = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AssetName = styled.span`
  display: inline-flex;
  align-items: center;
`;

const AssetValue = styled.span``;

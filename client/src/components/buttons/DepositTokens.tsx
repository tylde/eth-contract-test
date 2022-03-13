import React from 'react';
import styled from 'styled-components';
import { Button } from 'src/_lib/components/Button';
import { useEthereum } from 'src/context/ethereum/EthereumProvider';
import { useWrappedToken } from 'src/context/wrapped-token/WrappedTokenProvider';

export function DepositTokens() {
  const { account } = useEthereum();
  const { deposit, isDepositing } = useWrappedToken();

  if (!account) {
    return null;
  }

  return (
    <Wrapper>
      <Button onClick={() => deposit(account, 10e5)} isLoading={isDepositing} width="100%">
        Deposit 1 Token
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

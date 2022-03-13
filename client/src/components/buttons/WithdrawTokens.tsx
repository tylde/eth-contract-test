import React from 'react';
import styled from 'styled-components';
import { Button } from 'src/_lib/components/Button';
import { useEthereum } from 'src/context/ethereum/EthereumProvider';
import { useWrappedToken } from 'src/context/wrapped-token/WrappedTokenProvider';

export function WithdrawTokens() {
  const { account } = useEthereum();
  const { withdraw, isWithdrawing } = useWrappedToken();

  if (!account) {
    return null;
  }

  return (
    <Wrapper>
      <Button onClick={() => withdraw(account, 10e5)} isLoading={isWithdrawing} width="100%">
        Withdraw 1 Token
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

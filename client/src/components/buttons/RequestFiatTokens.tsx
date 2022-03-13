import React from 'react';
import { Button } from 'src/_lib/components/Button';
import { useFiatToken } from 'src/context/fiat-token/FiatTokenProvider';

export function RequestFiatTokens() {
  const { isRequestingToken, requestSome, isAlreadyRequested, isCheckingAlreadyRequested } = useFiatToken();

  return (
    <Button
      onClick={requestSome}
      buttonType="secondary"
      isLoading={isRequestingToken || isCheckingAlreadyRequested}
      isDisabled={isAlreadyRequested}
      width="100%"
    >
      Request Some Fiat Tokens
    </Button>
  );
}

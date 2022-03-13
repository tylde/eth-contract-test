import React from 'react';
import { Button } from 'src/_lib/components/Button';
import { useEthereum } from 'src/context/ethereum/EthereumProvider';

export function DisconnectWallet() {
  const { disconnectMetamask } = useEthereum();

  return (
    <Button onClick={disconnectMetamask} buttonType="secondary" width="100%">
      Disconnect Wallet
    </Button>
  );
}

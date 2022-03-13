import React from 'react';
import { Button } from 'src/_lib/components/Button';
import { useEthereum } from 'src/context/ethereum/EthereumProvider';

export function ConnectWallet() {
  const { connectMetamask } = useEthereum();

  return (
    <Button onClick={connectMetamask} width="100%">
      Connect Wallet
    </Button>
  );
}

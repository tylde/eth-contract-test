import { Web3Provider } from '@ethersproject/providers';
import { ExternalProvider } from '@ethersproject/providers/src.ts/web3-provider';
import { formatEther } from '@ethersproject/units';
import React, { useEffect, useState } from 'react';
import { RegularRegular } from 'src/_lib/styles/Fonts';

type Props = { account?: string };

export function WalletBalance({ account }: Props) {
  const [balance, setBalance] = useState<string>('-');

  const getBalance = async (account?: string) => {
    if (!window.ethereum || !account) {
      return '-';
    }

    const provider = new Web3Provider(window.ethereum as unknown as ExternalProvider);
    const balance = await provider.getBalance(account);
    setBalance(formatEther(balance));
  };

  useEffect(() => {
    void getBalance(account);
  }, [account]);

  return <RegularRegular>Balance: {balance}</RegularRegular>;
}

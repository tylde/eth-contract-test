import React from 'react';
import { RegularRegular } from 'src/_lib/styles/Fonts';

type Props = {
  account: string;
};

export function SelectedWallet({ account }: Props) {
  return <RegularRegular>Wallet: {account}</RegularRegular>;
}

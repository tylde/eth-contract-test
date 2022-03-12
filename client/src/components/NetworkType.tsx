import React from 'react';
import { RegularRegular } from 'src/_lib/styles/Fonts';
import { ChainType, getNetworkName } from 'src/types/ChainType';

type Props = {
  chainType: ChainType;
};

export function NetworkType({ chainType }: Props) {
  return <RegularRegular>Network: {getNetworkName(chainType)}</RegularRegular>;
}

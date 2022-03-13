import React from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import styled from 'styled-components';
import { useEthereum } from 'src/context/ethereum/EthereumProvider';

type Props = {
  size?: number;
};

export default function AccountIcon({ size = 32 }: Props) {
  const { account } = useEthereum();

  if (!account) {
    return null;
  }

  return (
    <Wrapper $size={size}>
      <Jazzicon diameter={size} seed={jsNumberForAddress(account)} />
    </Wrapper>
  );
}

const Wrapper = styled.div<{ $size: number }>`
  display: inline-flex;
  height: ${(props) => `${props.$size}px`};
  width: ${(props) => `${props.$size}px`};
  border-radius: 1.125rem;
`;

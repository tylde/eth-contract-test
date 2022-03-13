import { UilSync } from '@iconscout/react-unicons';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { IconWrapper } from './IconWrapper';

type Props = {
  size?: number;
};

export const LoadingIcon = ({ size = 24 }: Props) => (
  <StyledSpinner $size={size}>
    <UilSync size={size} />
  </StyledSpinner>
);

const spin = keyframes`
  from {
    transform: rotate(360deg)
  }
  to {
    transform: rotate(0deg)
  }
`;

const StyledSpinner = styled(IconWrapper)<{ $size: number }>`
  width: ${(props) => `${props.$size}px`};
  height: ${(props) => `${props.$size}px`};
  animation-name: ${spin};
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

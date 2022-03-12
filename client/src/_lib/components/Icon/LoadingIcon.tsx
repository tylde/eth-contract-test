import { UilSpinner } from '@iconscout/react-unicons';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { IconWrapper } from './IconWrapper';

export const LoadingIcon = () => (
  <StyledSpinner>
    <UilSpinner size={28} />
  </StyledSpinner>
);

const spin = keyframes`
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }
`;

const StyledSpinner = styled(IconWrapper)`
  width: 28px;
  height: 28px;
  animation-name: ${spin};
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

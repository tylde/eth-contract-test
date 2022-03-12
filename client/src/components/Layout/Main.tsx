import React from 'react';
import styled from 'styled-components';

type Props = {
  children: React.ReactNode;
};

export function Main({ children }: Props) {
  return <StyledMain>{children}</StyledMain>;
}

const StyledMain = styled.main`
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow-y: initial;
`;

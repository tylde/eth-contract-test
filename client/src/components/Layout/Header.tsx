import React from 'react';
import styled from 'styled-components';

export function Header({ children }: React.ComponentPropsWithoutRef<typeof Wrapper>) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.header`
  width: 100%;
  height: 80px;
  padding: 0 24px;
  background-color: var(--color-sidebar);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

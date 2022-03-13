import React from 'react';
import styled from 'styled-components';

export function Card({ children, ...props }: React.ComponentPropsWithoutRef<typeof Wrapper>) {
  return <Wrapper {...props}>{children}</Wrapper>;
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-color: var(--color-white);
  box-shadow: 0 4px 8px 0 var(--color-shadow);
`;

import React from 'react';
import styled from 'styled-components';
import { Input } from './Input';

type Props = React.ComponentProps<typeof Input> & { icon?: React.ReactNode };

export function InputWIthIcon({ icon, ...props }: Props) {
  return (
    <Wrapper>
      <StyledInput {...props} />
      {icon && <IconWrapper>{icon}</IconWrapper>}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 45px;
  max-height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledInput = styled(Input)`
  padding-left: 38px;
`;

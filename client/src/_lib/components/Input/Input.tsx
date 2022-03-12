import React from 'react';
import styled, { css } from 'styled-components';
import { margins, WithMargins } from '../../styles/Base';
import { mediumRegular } from '../../styles/Fonts';

type State = { isInvalid?: boolean; isDisabled?: boolean };

type InputProps = React.ComponentPropsWithRef<typeof Wrapper> & WithMargins & State;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ children, isLoading, isDisabled, ...restProps }, ref) => {
    return <Wrapper disabled={isLoading || isDisabled} {...restProps} ref={ref} />;
  },
);

const validInput = css`
  border: 2px solid var(--color-border-input);

  &:focus {
    border: 2px solid var(--color-primary);
    outline: 4px solid var(--color-primary-20);
  }
`;

const invalidInput = css`
  border: 2px solid var(--color-danger);

  &:focus {
    border: 2px solid var(--color-danger);
    outline: 4px solid var(--color-danger-20);
  }
`;

const Wrapper = styled.input<WithMargins & State>`
  height: 45px;
  width: 100%;

  border-radius: var(--border-radius-input);
  background: var(--color-white);
  padding: 0 12px;

  color: var(--color-font-secondary);

  ${margins}
  ${mediumRegular};

  &::placeholder {
    color: var(--color-font-tertiary);
  }

  ${({ isInvalid }) => (isInvalid ? invalidInput : validInput)}

  &:disabled {
    background-color: var(--color-background-primary);
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
`;

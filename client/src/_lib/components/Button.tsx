import React from 'react';
import styled, { css } from 'styled-components';
import { margins, WithMargins } from '../styles/Base';
import { mediumRegular } from '../styles/Fonts';
import { LoadingIcon } from './Icon/LoadingIcon';

type State = { isLoading?: boolean; isDisabled?: boolean };

type ButtonType = { buttonType?: 'primary' | 'secondary' | 'danger' | 'flat' };

type ButtonProps = React.ComponentPropsWithRef<typeof Wrapper> & WithMargins & ButtonType & State;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, isLoading, isDisabled, buttonType = 'primary', ...restProps }, ref) => {
    return (
      <Wrapper disabled={isLoading || isDisabled} buttonType={buttonType} {...restProps} ref={ref}>
        {isLoading && (
          <LoadingWrapper>
            <LoadingIcon />
          </LoadingWrapper>
        )}
        <Content isLoading={isLoading}>{children}</Content>
      </Wrapper>
    );
  },
);

const stylesPrimary = css`
  background-color: var(--color-primary);
  color: var(--color-white);
  border: 2px solid var(--color-primary);

  &:enabled {
    &:hover {
      border-color: var(--color-primary-dark);
      background-color: var(--color-primary-dark);
    }
    &:focus {
      outline: 4px solid var(--color-primary-20);
    }
  }
`;

const stylesSecondary = css`
  background-color: transparent;
  color: var(--color-font-primary);
  border: 2px solid var(--color-primary);

  &:enabled {
    &:hover {
      background-color: var(--color-primary);
      color: var(--color-white);
    }
    &:focus {
      outline: 4px solid var(--color-primary-20);
    }
  }
`;

const stylesDanger = css`
  background-color: var(--color-danger);
  color: var(--color-white);
  border: 2px solid var(--color-danger);

  &:enabled {
    &:hover {
      border-color: var(--color-danger-dark);
      background-color: var(--color-danger-dark);
    }
    &:focus {
      outline: 4px solid var(--color-danger-20);
    }
  }
`;

const stylesFlat = css`
  background-color: transparent;
  color: var(--color-font-primary);

  &:enabled {
    &:hover {
      background-color: var(--color-primary-10);
    }
    &:focus {
      outline: 4px solid var(--color-primary-20);
    }
  }
`;

const buttonType = css<ButtonType>`
  ${(props) => props.buttonType === 'primary' && stylesPrimary}
  ${(props) => props.buttonType === 'secondary' && stylesSecondary}
  ${(props) => props.buttonType === 'danger' && stylesDanger}
  ${(props) => props.buttonType === 'flat' && stylesFlat}
`;

const Wrapper = styled.button<WithMargins & ButtonType & State>`
  position: relative;
  display: inline-block;

  border-radius: var(--border-radius-button);
  cursor: pointer;
  user-select: none;

  padding: 10px 24px;

  ${margins};
  ${mediumRegular};
  ${buttonType};

  transition: background-color 0.15s ease-out, border-color 0.15s ease-out;

  &:disabled {
    opacity: 0.75;
    cursor: initial;
  }
`;

const Content = styled.span<State>`
  position: relative;
  display: inline-flex;
  width: 100%;
  height: 100%;
  white-space: nowrap;
  justify-content: center;
  align-items: center;

  visibility: ${(props) => (props.isLoading ? 'hidden' : 'initial')};
`;

const LoadingWrapper = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

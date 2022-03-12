import styled, { css } from 'styled-components';
import { margins, WithMargins } from './Base';
import { Color } from './Color';

type Coloured = { color?: Color };
const coloured = css<Coloured>`
  ${({ color }) => color && `color: var(--color-${color});`}
`;

type Aligned = { align?: 'left' | 'center' | 'right' | 'justify' };
const aligned = css<Aligned>`
  ${({ align }) => align && `text-align: ${align};`}
`;

type Modifiers = Coloured & Aligned & WithMargins;
const styledText = css`
  ${coloured}
  ${margins}
  ${aligned}
`;

export const Text = styled.span<Modifiers>`
  ${styledText}
`;

// Header

export const h1 = css`
  font-size: var(--h1-font-size);
  font-weight: 600;
`;
export const H1 = styled.p<Modifiers>`
  ${h1}
  ${styledText}
`;

export const h2 = css`
  font-size: var(--h2-font-size);
  font-weight: 600;
`;
export const H2 = styled.p<Modifiers>`
  ${h2}
  ${styledText}
`;

export const h3 = css`
  font-size: var(--h3-font-size);
  font-weight: 500;
`;
export const H3 = styled.p<Modifiers>`
  ${h3}
  ${styledText}
`;

// Regular

export const smallRegular = css`
  font-size: var(--small-font-size);
  font-weight: 400;
`;

export const SmallRegular = styled.p<Modifiers>`
  ${smallRegular}
  ${styledText}
`;

export const regularRegular = css`
  font-size: var(--regular-font-size);
  font-weight: 400;
`;

export const RegularRegular = styled.p<Modifiers>`
  ${regularRegular}
  ${styledText}
`;

export const mediumRegular = css`
  font-size: var(--medium-font-size);
  font-weight: 400;
`;

export const MediumRegular = styled.p<Modifiers>`
  ${mediumRegular}
  ${styledText}
`;

// Medium

export const regularMedium = css`
  font-size: var(--regular-font-size);
  font-weight: 500;
`;

export const RegularMedium = styled.p<Modifiers>`
  ${regularMedium}
  ${styledText}
`;

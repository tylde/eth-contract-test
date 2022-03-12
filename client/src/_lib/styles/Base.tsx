import { css } from 'styled-components';

export type WithMargins = { mb?: number; mt?: number; mr?: number; ml?: number; margin?: number };

export const margins = css<WithMargins>`
  ${({ mb }) => mb && `margin-bottom: ${calcMargin(mb)}px;`}
  ${({ mt }) => mt && `margin-top: ${calcMargin(mt)}px;`}
  ${({ mr }) => mr && `margin-right: ${calcMargin(mr)}px;`}
  ${({ ml }) => ml && `margin-left: ${calcMargin(ml)}px;`}
  ${({ margin }) => margin && `margin: ${calcMargin(margin)}px;`}
`;

const multiplier = 8;

function calcMargin(units: number) {
  return units * multiplier;
}

import styled, { css } from 'styled-components';

export const Grid = styled.div`
  display: grid;

  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 200px;
  gap: 16px;
`;

const cellCss = `
  min-height: 204px;
`;

const mobileCss = css`
  @media only screen and (max-width: 800px) {
    grid-column: span 12;
  }
`;

export const Cell4 = styled.div`
  grid-column: span 4;
  ${cellCss};
  ${mobileCss};
`;

export const Cell6 = styled.div`
  grid-column: span 6;
  ${cellCss};
  ${mobileCss};
`;

export const Cell12 = styled.div`
  grid-column: span 12;
  ${cellCss};
  ${mobileCss};
`;

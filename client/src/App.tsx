import React from 'react';
import styled from 'styled-components';
import { Home } from 'src/pages/Home';

function App() {
  return (
    <Wrapper>
      <Home />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100vh;
  background-color: var(--color-background-primary);
`;

export default App;

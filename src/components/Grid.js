import React from 'react'
import styled from 'styled-components/macro'

export default function Grid({ children }) {
  return <AppGrid>{children}</AppGrid>
}

const AppGrid = styled.div`
  display: grid;
  max-width: 380px;
  margin: 0 auto;
  grid-template-rows: 60px auto 48px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100vh;
  background: rgb(255, 247, 237);
  background: linear-gradient(
    176deg,
    rgba(255, 247, 237, 1) 1%,
    rgba(255, 255, 255, 1) 77%,
    rgba(255, 255, 255, 1) 98%
  );
`

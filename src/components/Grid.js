import React from 'react'
import styled from 'styled-components/macro'

export default function Grid({ children }) {
  return <AppGrid>{children}</AppGrid>
}

const AppGrid = styled.div`
  display: grid;
  grid-template-rows: 60px auto;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 375px;
  margin: 0 auto;
  height: 100vh;
  background-image: linear-gradient(to top, #fddb92 0%, #d1fdff 100%);
`

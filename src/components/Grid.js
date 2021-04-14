import styled from 'styled-components/macro'

export default function Grid({ children }) {
  return <AppGrid>{children}</AppGrid>
}

const AppGrid = styled.div`
  display: grid;
  position: relative;
  margin: 0 auto;
  grid-template-rows: 60px auto 50px;
  position: fixed;
  max-width: 375px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100vh;
  background: var(--color-beige);
  background: var(--gradient-beige);
`

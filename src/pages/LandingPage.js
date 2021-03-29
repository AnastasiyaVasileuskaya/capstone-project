import anime from 'animejs'
import { useState } from 'react'
import styled from 'styled-components/macro'

export default function LandingPage({ isLoaded }) {
  const [hidePage, setHidePage] = useState(false)

  setTimeout(() => {
    setHidePage(true)
  }, 6500)

  return (
    <Page
      finishedLoading={isLoaded}
      hidePage={hidePage}
      className={isLoaded && 'fadeOut'}
    >
      <h1 class="ml2">Cook ideas</h1>
    </Page>
  )
}

const Page = styled.main`
  display: ${props => (props.hidePage ? 'none' : 'flex')};
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100vw;
  height: 100vh;
  opacity: 1;
  z-index: 1;
  background-image: linear-gradient(
    120deg,
    var(--color-green) 0%,
    var(--color-darkgreen) 100%
  );
  &.fadeOut {
    opacity: 0;
    transition: all 2s;
  }
`

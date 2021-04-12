import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import Icon from 'supercons'
import Button from './Button/Button'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(
    () =>
      document
        .getElementsByTagName('main')[0]
        .addEventListener('scroll', toggleVisible),
    []
  )

  const toggleVisible = e => {
    const scrolled = document.getElementsByTagName('main')[0].scrollTop
    if (scrolled > 1425) {
      setVisible(true)
    } else if (scrolled <= 1425) {
      setVisible(false)
    }
  }

  const scrollToTop = () => {
    document.getElementsByTagName('main')[0].scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <IconWrapper>
      <ScrollButton
        onClick={scrollToTop}
        style={{ display: visible ? 'inline-flex' : 'none' }}
        data-testid="scroll-to-top-button"
      >
        <Icon glyph="up-caret" size={33} />
      </ScrollButton>
    </IconWrapper>
  )
}

const ScrollButton = styled(Button)`
  position: fixed;
  place-items: center;
  height: 45px;
  width: 45px;
  border-radius: 50%;
  z-index: 15;
  cursor: pointer;
  color: black;
  background: var(--gradient-orange);
`
const IconWrapper = styled.div`
  padding: 10px;
`

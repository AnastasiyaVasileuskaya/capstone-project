import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import Button from './Button/Button'
import Icon from 'supercons'

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
    <IconWrapper
      onClick={scrollToTop}
      style={{ display: visible ? 'inline-flex' : 'none' }}
      data-testid="scroll-to-top"
    >
      <Icon glyph="up-caret" size={33} />
    </IconWrapper>
  )
}

const IconWrapper = styled(Button)`
  position: fixed;
  place-items: center;
  right: 5%;
  height: 45px;
  width: 45px;
  border-radius: 50%;
  z-index: 1;
  cursor: pointer;
  color: black;
  background: var(--gradient-orange);
`

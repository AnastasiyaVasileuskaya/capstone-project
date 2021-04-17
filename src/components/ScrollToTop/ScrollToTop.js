import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import Icon from 'supercons'
import Button from '../Button/Button'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const pageLayout = document.getElementsByTagName('main')[0]

  useEffect(() => pageLayout.addEventListener('scroll', toggleVisible), [])

  function toggleVisible(event) {
    const scrolled = pageLayout.scrollTop
    if (scrolled > 1100) {
      setVisible(true)
    } else if (scrolled <= 1100) {
      setVisible(false)
    }
  }

  function scrollToTop() {
    pageLayout.scrollTo({
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

const IconWrapper = styled.div`
  position: absolute;
  top: 92.5%;
  right: 4%;
`

const ScrollButton = styled(Button)`
  position: fixed;
  margin-left: -50px;
  bottom: 10%;
  place-items: center;
  height: 45px;
  width: 45px;
  border-radius: 50%;
  z-index: 15;
  cursor: pointer;
  color: black;
`

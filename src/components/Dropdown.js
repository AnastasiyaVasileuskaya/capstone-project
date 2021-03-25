import Button from './Button/Button'
import styled from 'styled-components/macro'
import { useState } from 'react'
import Icon from 'supercons'

export default function Dropdown() {
  const [isDropdownContentVisible, setIsDropdownContentVisible] = useState(
    false
  )
  return (
    <DropdownWrapper>
      <Button
        onClick={event => {
          event.stopPropagation()
          setIsDropdownContentVisible(!isDropdownContentVisible)
        }}
      >
        <IconWrapper>
          Sort
          <Icon
            glyph={isDropdownContentVisible ? 'up-caret' : 'down-caret'}
            size={25}
          />
        </IconWrapper>
      </Button>
      {isDropdownContentVisible && (
        <DropdownContent>
          <DropdownButton>
            <span>Rate: Low To High</span>
          </DropdownButton>
          <DropdownButton>
            <span>Rate: High To Low</span>
          </DropdownButton>
          <DropdownButton>
            <span>Rate date: Newest first</span>
          </DropdownButton>
          <DropdownButton>
            <span>Rate date: Oldest first</span>
          </DropdownButton>
        </DropdownContent>
      )}
    </DropdownWrapper>
  )
}

const DropdownWrapper = styled.span`
  position: relative;
  display: grid;
`
const DropdownContent = styled.span`
  display: grid;
  position: absolute;
  z-index: 1;
  width: 100%;
  top: 100%;
`

const DropdownButton = styled.button`
  color: black;
  padding: 10px;
`
const IconWrapper = styled.span`
  display: flex;
  justify-content: space-evenly;
  place-items: center;
`

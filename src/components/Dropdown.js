import Button from './Button/Button'
import styled from 'styled-components/macro'
import { useState } from 'react'
import Icon from 'supercons'

export default function Dropdown({ selectedSorting, onSelectionChanged }) {
  const [isDropdownContentVisible, setIsDropdownContentVisible] = useState(
    false
  )

  function onDropdownSelectionChanged(e) {
    let selection = e.currentTarget.textContent
    onSelectionChanged(selection)
    setIsDropdownContentVisible(false)
  }
  return (
    <DropdownWrapper>
      <Button
        onClick={event => {
          event.stopPropagation()
          setIsDropdownContentVisible(!isDropdownContentVisible)
        }}
      >
        <IconWrapper>
          {selectedSorting}
          <Icon
            glyph={isDropdownContentVisible ? 'up-caret' : 'down-caret'}
            size={25}
          />
        </IconWrapper>
      </Button>
      {isDropdownContentVisible && (
        <DropdownContent>
          <DropdownButton onClick={onDropdownSelectionChanged}>
            <span>Rate: Low To High</span>
          </DropdownButton>
          <DropdownButton onClick={onDropdownSelectionChanged}>
            <span>Rate: High To Low</span>
          </DropdownButton>
          <DropdownButton onClick={onDropdownSelectionChanged}>
            <span>Rate date: Newest first</span>
          </DropdownButton>
          <DropdownButton onClick={onDropdownSelectionChanged}>
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

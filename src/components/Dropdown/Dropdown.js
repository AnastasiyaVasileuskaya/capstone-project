import Button from '../Button/Button'
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
      <SortButton
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
      </SortButton>
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
  box-shadow: 7px 6px 28px 1px rgba(0, 0, 0, 0.24);
`
const DropdownButton = styled(Button)`
  color: black;
  padding: 10px;
  background: ${props =>
    props.active ? 'var(--gradient-orange)' : 'rgb(255, 247, 237)'};
  border: 1px solid orange;
  box-shadow: 7px 6px 28px 1px rgba(0, 0, 0, 0.24);
  cursor: pointer;
  outline: none;
  transition: 0.2s all;
  &:active {
    transform: scale(0.98);
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  }
`
const IconWrapper = styled.span`
  display: flex;
  justify-content: space-between;
  place-items: center;
`
const SortButton = styled(Button)`
  display: flex;
  place-items: center;
  justify-content: space-evenly;
  box-shadow: 7px 6px 28px 1px rgba(0, 0, 0, 0.24);
  cursor: pointer;
  outline: none;
  transition: 0.2s all;
  &:active {
    transform: scale(0.98);
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  }
`

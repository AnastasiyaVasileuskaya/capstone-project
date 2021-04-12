import { useState } from 'react'
import styled from 'styled-components/macro'
import Icon from 'supercons'
import PropTypes from 'prop-types'
import Button from '../Button/Button'

export default function Dropdown({ selectedSorting, onSelectionChanged }) {
  const [isDropdownContentVisible, setIsDropdownContentVisible] = useState(
    false
  )

  Dropdown.propTypes = {
    selectedSorting: PropTypes.string,
    onSelectionChanged: PropTypes.func,
  }

  function onDropdownSelectionChanged(event) {
    let selection = event.currentTarget.textContent
    onSelectionChanged(selection)
    setIsDropdownContentVisible(false)
  }

  return (
    <DropdownWrapper>
      <SortButton
        data-testid="dropdown"
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
          <DropdownButton
            data-testid="dropdown-low-to-high"
            onClick={onDropdownSelectionChanged}
          >
            <span>Rate: Low To High</span>
          </DropdownButton>
          <DropdownButton onClick={onDropdownSelectionChanged}>
            <span>Rate: High To Low</span>
          </DropdownButton>
          <DropdownButton
            data-testid="dropdown-newest-first"
            onClick={onDropdownSelectionChanged}
          >
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

const SortButton = styled(Button)`
  display: flex;
  place-items: center;
  justify-content: space-evenly;
  box-shadow: var(--box-shadow-middle);
  cursor: pointer;
  outline: none;
  transition: 0.2s all;
  &:active {
    transform: scale(0.98);
    box-shadow: var(--box-shadow-active);
  }
`

const IconWrapper = styled.span`
  display: flex;
  justify-content: space-between;
  place-items: center;
`

const DropdownContent = styled.span`
  display: grid;
  position: absolute;
  z-index: 5;
  width: 100%;
  top: 100%;
  box-shadow: var(--box-shadow-middle);
`

const DropdownButton = styled(Button)`
  color: black;
  background: ${props =>
    props.active ? 'var(--gradient-orange)' : 'var(--color-beige)'};
  border: 1px solid orange;
  cursor: pointer;
`

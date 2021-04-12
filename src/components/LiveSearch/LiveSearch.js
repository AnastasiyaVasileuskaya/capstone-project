import styled from 'styled-components/macro'
import { IconContext } from 'react-icons'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import PropTypes from 'prop-types'

export default function LiveSearch({ userInput, setUserInput }) {
  LiveSearch.propTypes = {
    userInput: PropTypes.string,
    setUserInput: PropTypes.func,
  }

  return (
    <SearchWrapper>
      <Input
        data-testid="search-input"
        placeholder="Search recipe..."
        value={userInput}
        onChange={event => setUserInput(event.target.value)}
        type="search"
        maxLength={30}
        autocomplete="off"
      />
      <IconContext.Provider value={{ size: '25px', color: 'grey' }}>
        <DeleteButtonWrapper
          data-testid="delete-button"
          isVisible={userInput.length >= 1}
        >
          <AiOutlineCloseCircle onClick={event => setUserInput('')} />
        </DeleteButtonWrapper>
      </IconContext.Provider>
    </SearchWrapper>
  )
}

const Input = styled.input`
  border: 2px solid var(--color-lightorange);
  padding-right: 16px;
  box-shadow: var(--box-shadow-middle);
`
const DeleteButtonWrapper = styled.span`
  position: absolute;
  top: 7px;
  right: 20px;
  width: 15px;
  height: 15px;
  cursor: pointer;
  display: ${props => (props.isVisible ? 'block' : 'none')};
`

const SearchWrapper = styled.form`
  position: relative;
  input[type='search']::-webkit-search-cancel-button {
    -webkit-appearance: none;
    width: 15px;
    height: 15px;
  }
`

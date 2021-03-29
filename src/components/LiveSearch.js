import styled from 'styled-components/macro'
import { IconContext } from 'react-icons'
import { AiOutlineCloseCircle } from 'react-icons/ai'

export default function LiveSearch({ userInput, setUserInput }) {
  return (
    <SearchWrapper>
      <Input
        placeholder="Search recipe..."
        value={userInput}
        onChange={e => setUserInput(e.target.value)}
        type="search"
      />
      <IconContext.Provider value={{ size: '25px', color: 'grey' }}>
        <DeleteButtonWrapper isVisible={userInput.length >= 1}>
          <AiOutlineCloseCircle onClick={e => setUserInput('')} />
        </DeleteButtonWrapper>
      </IconContext.Provider>
    </SearchWrapper>
  )
}

const Input = styled.input`
  border: 2px solid var(--color-lightorange);
  border-radius: 0;
  position: relative;
  padding-right: 16px;
  box-sizing: border-box;
`
const DeleteButtonWrapper = styled.span`
  position: absolute;
  top: 7px;
  right: 20px;
  width: 16px;
  height: 16px;
  cursor: pointer;
  display: ${props => (props.isVisible ? 'block' : 'none')};
`

const SearchWrapper = styled.form`
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;
  input[type='search']::-webkit-search-cancel-button {
    -webkit-appearance: none;
    width: 10px;
    height: 16px;
  }
`

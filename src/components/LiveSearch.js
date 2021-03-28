import styled from 'styled-components/macro'
import { IconContext } from 'react-icons'
import { AiOutlineCloseCircle } from 'react-icons/ai'

export default function CharacterSearch({ userInput, setUserInput }) {
  return (
    <>
      <Input
        placeholder="Search recipe..."
        value={userInput}
        onChange={e => setUserInput(e.target.value)}
      />
      <IconContext.Provider value={{ size: '25px', color: 'grey' }}>
        <DeleteButtonWrapper isVisible={userInput.length >= 1}>
          <AiOutlineCloseCircle onClick={e => setUserInput('')} />
        </DeleteButtonWrapper>
      </IconContext.Provider>
    </>
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
  top: 87px;
  right: 40px;
  width: 16px;
  height: 16px;
  cursor: pointer;
  display: ${props => (props.isVisible ? 'block' : 'none')};
`

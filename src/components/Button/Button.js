import styled from 'styled-components/macro'

export default styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  box-shadow: var(--box-shadow-middle);
  cursor: pointer;
  outline: none;
  transition: 0.2s all;
  &:active {
    transform: scale(0.98);
    box-shadow: var(--box-shadow-active);
  }
  background: ${props =>
    props.disabled ? 'var(--color-lightgrey)' : 'var(--gradient-orange)'};
  color: ${props => (props.disabled ? 'black' : 'white')};
  cursor: pointer;
  font-weight: 500;
`

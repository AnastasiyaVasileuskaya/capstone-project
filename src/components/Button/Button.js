import styled from 'styled-components/macro'

export default styled.button`
  padding: 10px;
  border: none;
  box-shadow: var(--box-shadow-middle);
  cursor: pointer;
  transition: 0.2s all;
  &:active {
    transform: scale(0.98);
    box-shadow: var(--box-shadow-active);
  }
  background: ${props =>
    props.disabled ? 'var(--color-lightgrey)' : 'var(--gradient-orange)'};
  color: ${props => (props.disabled ? 'black' : 'white')};
`

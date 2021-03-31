import styled from 'styled-components/macro'

export default styled.button`
  padding: 10px;
  border: none;
  background: ${props =>
    props.disabled ? 'var(--color-lightgrey)' : 'var(--gradient-orange)'};
  color: ${props => (props.disabled ? 'black' : 'white')};
  cursor: pointer;
  font-weight: 500;
`

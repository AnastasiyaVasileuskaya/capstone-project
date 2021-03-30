import styled from 'styled-components/macro'

export default styled.button`
  padding: 5px;
  border: none;
  background: ${props =>
    props.disabled ? 'var(--color-lightgrey)' : 'var(--gradient-orange)'};
  color: white;
  cursor: pointer;
  font-weight: 500;
`

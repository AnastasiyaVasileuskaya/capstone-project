import styled from 'styled-components/macro'

export default styled.button`
  padding: 5px;
  border: none;
  background-color: ${props =>
    props.disabled ? 'lightgrey' : 'var(--color-orange)'};
  color: white;
`

import styled from 'styled-components/macro'

export default styled.button`
  padding: 5px;
  border: none;
  background-color: ${props =>
    props.bgColor ? props.bgColor : 'var(--color-orange)'};
  color: white;
`

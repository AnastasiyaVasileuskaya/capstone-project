import styled from 'styled-components/macro'

export default styled.button`
  padding: 5px;
  border: 1px solid black;
  background-color: ${props => (props.bgColor ? props.bgColor : 'lightgrey')};
  color: ${props => (props.color ? props.color : 'black')};
`

import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

export default function Header({ title }) {
  return (
    <HeaderContainer data-testid="header">
      <h1>{title}</h1>
    </HeaderContainer>
  )
}

Header.propTypes = {
  title: PropTypes.string,
}

const HeaderContainer = styled.header`
  text-align: center;
  font-family: 'Lobster', cursive;
  background: rgb(255, 247, 237);
  background: linear-gradient(
    176deg,
    rgba(255, 247, 237, 1) 1%,
    rgba(255, 255, 255, 1) 77%,
    rgba(255, 255, 255, 1) 98%
  );
  box-shadow: 2px 4px 6px 1px rgba(0, 0, 0, 0.24);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  h1 {
    background-color: var(--color-orange);
    background-image: var(--gradient-orange);
    background-size: 100%;
    background-repeat: repeat;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
  }
`
const LinkWrapperAll = styled(Link)`
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 0.8em;
  text-decoration: none;
  color: orange;
  justify-items: center;
  position: absolute;
  left: 20px;
  top: 4px;
  &:active {
    color: lightblue;
  }
  display: ${props => (props.visible === 'true' ? 'grid' : 'none')};
`
const LinkWrapperSaved = styled(Link)`
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 0.8em;
  text-decoration: none;
  color: orange;
  justify-items: center;
  position: absolute;
  right: 20px;
  top: 4px;
  &:active {
    color: lightblue;
  }
  display: ${props => (props.visible === 'true' ? 'grid' : 'none')};
`

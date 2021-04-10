import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import Icon from 'supercons'

export default function Header({ title, isVisibleAll, isVisibleSaved }) {
  return (
    <HeaderContainer data-testid="header">
      <LinkWrapperAll
        data-testid="all-recipes"
        visible={isVisibleAll.toString()}
        to={'/'}
      >
        <Icon glyph="home" size={33} /> All
      </LinkWrapperAll>
      <h1>{title}</h1>
      <LinkWrapperSaved
        data-testid="saved-recipes"
        visible={isVisibleSaved.toString()}
        to={'/saved'}
      >
        <Icon glyph="checkmark" size={33} /> Saved
      </LinkWrapperSaved>
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

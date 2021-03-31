import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import Icon from 'supercons'

export default function Header({ title, isVisibleAll, isVisibleSaved }) {
  return (
    <HeaderContainer>
      <LinkWrapperAll visible={isVisibleAll.toString()} to={'/'}>
        <Icon glyph="home" size={33} /> All
      </LinkWrapperAll>
      <h1>{title}</h1>
      <LinkWrapperSaved visible={isVisibleSaved.toString()} to={'/saved'}>
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
  color: white;
  font-family: 'Lobster', cursive;
  background: var(--color-orange);
  background: var(--gradient-orange);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  h1 {
    text-shadow: 3px 6px 3px #ce5937;
  }
`
const LinkWrapperAll = styled(Link)`
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 0.8em;
  text-decoration: none;
  color: black;
  display: grid;
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
  color: black;
  display: grid;
  justify-items: center;
  position: absolute;
  right: 20px;
  top: 4px;
  &:active {
    color: lightblue;
  }
  display: ${props => (props.visible === 'true' ? 'grid' : 'none')};
`

import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import Icon from 'supercons'
import { Link } from 'react-router-dom'

export default function Header({ title, isVisibleAll, isVisibleSaved }) {
  return (
    <HeaderContainer>
      <LinkWrapperAll isVisibleAll={isVisibleAll} to={'/'}>
        <Icon glyph="home" size={30} /> All
      </LinkWrapperAll>
      <h1>{title}</h1>
      <LinkWrapperSaved isVisibleSaved={isVisibleSaved} to={'/saved'}>
        <Icon glyph="checkmark" size={30} /> Saved
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
`
const LinkWrapperAll = styled(Link)`
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-size: 0.7em;
  text-decoration: none;
  color: black;
  display: grid;
  justify-items: center;
  position: absolute;
  left: 20px;
  top: 4px;
  &:hover {
    color: lightblue;
  }
  display: ${props => (props.isVisibleAll ? 'grid' : 'none')};
`
const LinkWrapperSaved = styled(Link)`
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-size: 0.7em;
  text-decoration: none;
  color: black;
  display: grid;
  justify-items: center;
  position: absolute;
  right: 20px;
  top: 4px;
  &:hover {
    color: lightblue;
  }
  display: ${props => (props.isVisibleSaved ? 'grid' : 'none')};
`

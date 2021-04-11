import styled from 'styled-components/macro'
import Icon from 'supercons'
import { NavLink } from 'react-router-dom'

export default function Navigation() {
  return (
    <Nav>
      <NavButton
        aria-label="home"
        as={NavLink}
        exact
        to="/"
        style={{ color: '#909090' }}
        activeStyle={{
          color: 'var(--color-orange)',
        }}
      >
        <Icon glyph="home" size={30} />
        Home
      </NavButton>
      <NavButton
        aria-label="recipes"
        as={NavLink}
        to="/recipes"
        style={{ color: '#909090' }}
        activeStyle={{
          color: 'var(--color-orange)',
        }}
      >
        <Icon glyph="docs" size={30} />
        Recipes
      </NavButton>
      <NavButton
        aria-label="saved"
        as={NavLink}
        to="/saved"
        style={{ color: '#909090' }}
        activeStyle={{
          color: 'var(--color-orange)',
        }}
      >
        <Icon glyph="checkmark" size={30} />
        Saved
      </NavButton>
    </Nav>
  )
}

const Nav = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background: rgb(255, 247, 237);
  background: linear-gradient(
    176deg,
    rgba(255, 247, 237, 1) 1%,
    rgba(255, 255, 255, 1) 77%,
    rgba(255, 255, 255, 1) 98%
  );
  box-shadow: 2px -4px 6px 1px rgba(0, 0, 0, 0.24);
`

const NavButton = styled.button`
  display: grid;
  justify-items: center;
  font-weight: 400;
  font-size: 0.7em;
  text-decoration: none;
`

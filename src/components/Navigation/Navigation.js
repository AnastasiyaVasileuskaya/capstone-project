import styled from 'styled-components/macro'
import Icon from 'supercons'
import { NavLink } from 'react-router-dom'

export default function Navigation() {
  return (
    <NavigationWrapper>
      <NavigationButton
        data-testid="home"
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
      </NavigationButton>
      <NavigationButton
        data-testid="all-recipes"
        as={NavLink}
        to="/recipes"
        style={{ color: '#909090' }}
        activeStyle={{
          color: 'var(--color-orange)',
        }}
      >
        <Icon glyph="docs" size={30} />
        Recipes
      </NavigationButton>
      <NavigationButton
        data-testid="saved"
        as={NavLink}
        to="/saved"
        style={{ color: '#909090' }}
        activeStyle={{
          color: 'var(--color-orange)',
        }}
      >
        <Icon glyph="checkmark" size={30} />
        Saved
      </NavigationButton>
    </NavigationWrapper>
  )
}

const NavigationWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background: var(--color-beige);
  background: var(--gradient-beige);
  box-shadow: 2px -4px 6px 1px rgba(0, 0, 0, 0.24);
`

const NavigationButton = styled.button`
  display: grid;
  justify-items: center;
  font-size: 0.7em;
  text-decoration: none;
`

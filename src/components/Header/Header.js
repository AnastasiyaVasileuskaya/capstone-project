import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

export default function Header({ title }) {
  Header.propTypes = {
    title: PropTypes.string,
  }

  return (
    <HeaderContainer data-testid="header">
      <h1>{title}</h1>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
  font-family: 'Lobster', cursive;
  background: var(--color-beige);
  background: var(--gradient-beige);
  box-shadow: var(--box-shadow-small);
  display: flex;
  align-items: center;
  justify-content: center;
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

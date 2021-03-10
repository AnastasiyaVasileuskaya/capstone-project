import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

export default function Header({ children }) {
  return (
    <HeaderContainer>
      <h1>{children}</h1>
    </HeaderContainer>
  )
}

Header.propTypes = {
  children: PropTypes.string,
}

const HeaderContainer = styled.header`
  text-align: center;
  color: white;
  font-family: 'Lobster', cursive;
  background: var(--color-orange);
  background: var(--gradient-orange);
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
`

import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
export default function Alert({ children }) {
  return (
    <AlertContainer>
      <AlertMessage>{children}</AlertMessage>
    </AlertContainer>
  )
}

Alert.propTypes = {
  children: PropTypes.string,
}

const AlertContainer = styled.section`
  display: flex;
  background-color: #ff8888;
  color: #8b0f0f;
  justify-content: center;
  align-items: center;
  height: 40px;
`

const AlertMessage = styled.p`
  text-align: center;
`

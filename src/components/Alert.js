import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
export default function Alert({ text }) {
  return (
    <Container>
      <Message>{text}</Message>
    </Container>
  )
}

Alert.propTypes = {
  text: PropTypes.string,
}

const Container = styled.section`
  display: flex;
  background-color: #ff8888;
  color: #8b0f0f;
  justify-content: center;
  align-items: center;
  height: 40px;
`

const Message = styled.p`
  text-align: center;
`

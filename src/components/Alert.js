import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
export default function Alert({ text }) {
  return (
    <Container visible={text !== ''}>
      <Message>{text}</Message>
    </Container>
  )
}

Alert.propTypes = {
  text: PropTypes.string,
}

const Container = styled.section`
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  background-color: #ff8888;
  color: #8b0f0f;
  justify-content: center;
  align-items: center;
  height: 40px;
`

const Message = styled.p`
  text-align: center;
`

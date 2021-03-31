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
  display: ${props => (props.visible ? 'block' : 'none')};
`

const Message = styled.p`
  text-align: center;
  padding: 5px;
  color: orange;
`

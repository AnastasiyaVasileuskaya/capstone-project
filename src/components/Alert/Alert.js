import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

export default function Alert({ text }) {
  Alert.propTypes = {
    text: PropTypes.string,
  }

  return (
    <Container visible={text !== ''}>
      <Message>{text}</Message>
    </Container>
  )
}

const Container = styled.section`
  display: ${props => (props.visible ? 'block' : 'none')};
`

const Message = styled.div`
  font-weight: 500;
  background-color: var(--color-orange);
  background-image: var(--gradient-orange);
  background-size: 100%;
  background-repeat: repeat;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
`

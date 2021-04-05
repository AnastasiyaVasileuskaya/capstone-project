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

const Message = styled.div`
  display: grid;
  padding: 10px;
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

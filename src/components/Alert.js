import styled from 'styled-components/macro'
export default function Alert({ children }) {
  return (
    <AlertContainer>
      <AlertMessage>{children}</AlertMessage>
    </AlertContainer>
  )
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

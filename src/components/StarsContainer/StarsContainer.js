import { IconContext } from 'react-icons'
import { AiOutlineStar } from 'react-icons/ai'
import { AiFillStar } from 'react-icons/ai'
import styled from 'styled-components/macro'

export default function StarsContainer({ selectedStars, onClick }) {
  return (
    <IconContext.Provider value={{ color: 'orange', size: '35px' }}>
      <IconWrapper>
        {[...Array(5).keys()].map(index => {
          let starNumber = index + 1
          let testId = 'star-' + starNumber
          if (starNumber <= selectedStars) {
            return (
              <AiFillStar
                data-testid={testId}
                key={index}
                onClick={e => onClick(e, starNumber)}
              />
            )
          } else {
            return (
              <AiOutlineStar
                data-testid={testId}
                key={index}
                onClick={e => onClick(e, starNumber)}
              />
            )
          }
        })}
      </IconWrapper>
    </IconContext.Provider>
  )
}

const IconWrapper = styled.span`
  display: flex;
  justify-content: space-evenly;
`

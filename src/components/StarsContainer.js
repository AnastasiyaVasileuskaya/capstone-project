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
          if (starNumber <= selectedStars) {
            return (
              <AiFillStar key={index} onClick={e => onClick(e, starNumber)} />
            )
          } else {
            return (
              <AiOutlineStar
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

import { IconContext } from 'react-icons'
import { AiOutlineStar } from 'react-icons/ai'
import { AiFillStar } from 'react-icons/ai'
import styled from 'styled-components/macro'

export default function StarsContainer({ selectedStars, onClick }) {
  return (
    <IconContext.Provider value={{ color: 'orange', size: '35px' }}>
      <IconWrapper data-testid="stars-container">
        {[...Array(5).keys()].map(index => {
          let starNumber = index + 1
          let testId = 'star-' + starNumber
          if (starNumber <= selectedStars) {
            return (
              <AiFillStar
                className="fillstar"
                data-testid={testId}
                key={index}
                onClick={e => onClick(e, starNumber)}
              />
            )
          } else {
            return (
              <AiOutlineStar
                className="outlinestar"
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
  .fillstar {
    svg {
      box-shadow: 7px 6px 28px 1px rgba(0, 0, 0, 0.24);
      cursor: pointer;
      outline: none;
      transition: 0.2s all;
      &:active {
        transform: scale(0.98);
        box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
      }
    }
  }
  .outlinestar {
    svg {
      box-shadow: 7px 6px 28px 1px rgba(0, 0, 0, 0.24);
      cursor: pointer;
      outline: none;
      transition: 0.2s all;
      &:active {
        transform: scale(0.98);
        box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
      }
    }
  }
`

import { IconContext } from 'react-icons'
import { AiOutlineStar } from 'react-icons/ai'
import { AiFillStar } from 'react-icons/ai'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

export default function StarsContainer({ selectedStars, onClick }) {
  StarsContainer.propTypes = {
    selectedStars: PropTypes.number,
    onClick: PropTypes.func,
  }

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
                onClick={event => onClick(event, starNumber)}
              />
            )
          } else {
            return (
              <AiOutlineStar
                className="outlinestar"
                data-testid={testId}
                key={index}
                onClick={event => onClick(event, starNumber)}
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

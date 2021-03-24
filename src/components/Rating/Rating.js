import { IconContext } from 'react-icons'
import styled from 'styled-components/macro'
import StarsContainer from '../StarsContainer'

export default function Rating({ selectedStars, date, comment }) {
  return (
    <IconContext.Provider value={{ size: '35px' }}>
      <RatingWrapper>
        <h2>Recipe rating</h2>
        <StarWrapper>
          <StarsContainer
            selectedStars={selectedStars}
            onClick={e => e.preventDefault()}
          />
          <DateWrapper>{new Date(date).toLocaleDateString()}</DateWrapper>
        </StarWrapper>
        {comment}
      </RatingWrapper>
    </IconContext.Provider>
  )
}

const StarWrapper = styled.div`
  display: flex;
`
const RatingWrapper = styled.div`
  display: grid;
  gap: 10px;
  h2 {
    margin-top: 0;
    margin-bottom: 0;
  }
`
const DateWrapper = styled.div`
  margin-top: 3px;
  margin-left: 15px;
`

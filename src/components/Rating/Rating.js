import { IconContext } from 'react-icons'
import styled from 'styled-components/macro'
import StarsContainer from '../StarsContainer'

export default function Rating({ selectedStars, date, comment }) {
  return (
    <IconContext.Provider value={{ size: '35px' }}>
      <StarWrapper>
        <StarsContainer
          selectedStars={selectedStars}
          onClick={e => e.preventDefault()}
        />
        {new Date(date).toLocaleDateString()}
      </StarWrapper>
      {comment}
    </IconContext.Provider>
  )
}

const StarWrapper = styled.div`
  display: flex;
`

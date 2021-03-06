import styled from 'styled-components/macro'
import { IconContext } from 'react-icons'
import { BsPencil } from 'react-icons/bs'
import PropTypes from 'prop-types'
import StarsContainer from '../StarsContainer/StarsContainer'

export default function Rating({
  selectedStars,
  date,
  comment,
  onRatingChange,
}) {
  Rating.propTypes = {
    selectedStars: PropTypes.number,
    date: PropTypes.instanceOf(Date),
    comment: PropTypes.string,
    onRatingChange: PropTypes.func,
  }

  return (
    <IconContext.Provider value={{ size: '35px' }}>
      <RatingWrapper data-testid="recipe-rating">
        <h2>Recipe rating</h2>
        <StarWrapper>
          <StarsContainer
            selectedStars={selectedStars}
            onClick={e => e.preventDefault()}
          />
          <DateWrapper data-testid="rating-date">
            {new Date(date).toLocaleDateString()}
          </DateWrapper>
          <IconContext.Provider value={{ size: '25px' }}>
            <EditWrapper>
              <BsPencil data-testid="edit" onClick={onRatingChange} />
            </EditWrapper>
          </IconContext.Provider>
        </StarWrapper>
        {comment}
      </RatingWrapper>
    </IconContext.Provider>
  )
}

const RatingWrapper = styled.div`
  display: grid;
  gap: 10px;
  h2 {
    margin-top: 0;
    margin-bottom: 0;
  }
`

const StarWrapper = styled.div`
  display: flex;
  padding-bottom: 5px;
`

const DateWrapper = styled.div`
  margin-top: 3px;
  margin-left: 15px;
`

const EditWrapper = styled.div`
  margin-left: 20px;
`

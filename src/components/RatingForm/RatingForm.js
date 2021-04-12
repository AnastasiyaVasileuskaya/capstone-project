import { useState } from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
import StarsContainer from '../StarsContainer/StarsContainer'

export default function RatingForm({
  ratingStars,
  ratingComment,
  onAddComment,
}) {
  const [selectedStars, setSelectedStars] = useState(ratingStars)
  const [comment, setComment] = useState(ratingComment)

  RatingForm.propTypes = {
    ratingStars: PropTypes.number,
    ratingComment: PropTypes.string,
    onAddComment: PropTypes.func,
  }

  function rateRecipe(event, index) {
    event.stopPropagation()
    setSelectedStars(index)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.target
    const textarea = form.elements.comment
    const comment = textarea.value
    onAddComment(comment, selectedStars)
    form.reset()
    textarea.focus()
  }

  return (
    <RatingWrapper data-testid="rating-form">
      <h2>Leave the rating for recipe</h2>
      <Form className="rating" onSubmit={handleSubmit}>
        <StarsContainerWrapper>
          <StarsContainer onClick={rateRecipe} selectedStars={selectedStars} />
        </StarsContainerWrapper>
        <label>
          Your comment:
          <Textarea
            data-testid="comment-textarea"
            onChange={e => setComment(e.target.value)}
            placeholder="Your comment..."
            name="comment"
            type="textarea"
            rows={5}
            cols={5}
            value={comment}
          />
        </label>
        <Button data-testid="rate-button">Rate</Button>
      </Form>
    </RatingWrapper>
  )
}

const RatingWrapper = styled.div`
  h2 {
    margin-top: 0;
    margin-bottom: 15px;
  }
`

const Form = styled.form`
  display: grid;
  gap: 10px;
`

const StarsContainerWrapper = styled.span`
  padding-bottom: 5px;
`

const Textarea = styled.textarea`
  border: 2px solid #bbb;
  margin-top: 15px;
  margin-bottom: 5px;
  width: 100%;
`

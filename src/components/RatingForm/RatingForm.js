import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components/macro'
import Icon from 'supercons'
import Button from '../Button/Button'
import StarsContainer from '../StarsContainer/StarsContainer'

export default function RatingForm({
  ratingStars,
  ratingComment,
  onAddComment,
}) {
  const titleRef = useRef()
  const [isRatingFormVisible, setIsRatingFormVisible] = useState(false)
  const [selectedStars, setSelectedStars] = useState(ratingStars)
  const [comment, setComment] = useState(ratingComment)

  useEffect(() => scrollToBottom(), [isRatingFormVisible])

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
    setIsRatingFormVisible(false)
  }

  function scrollToBottom() {
    if (isRatingFormVisible && titleRef.current) {
      titleRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }
  return (
    <RatingWrapper data-testid="rating-form">
      <h2>Leave the rating for recipe</h2>
      <Form className="rating" onSubmit={handleSubmit}>
        <StarsContainerWrapper>
          <StarsContainer onClick={rateRecipe} selectedStars={selectedStars} />
        </StarsContainerWrapper>
        <Comment>
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
        </Comment>
        <Button data-testid="rate-button" ref={titleRef}>
          Rate
        </Button>
      </Form>
    </RatingWrapper>
  )
}

const Form = styled.form`
  display: grid;
  gap: 10px;
  margin-top: 20px;
`
const Textarea = styled.textarea`
  border: 2px solid #bbb;
  display: block;
  margin-top: 15px;
  margin-bottom: 10px;
  width: 100%;
`
const RatingWrapper = styled.div`
  display: grid;
  h2 {
    margin-top: 0;
    margin-bottom: 0;
  }
`
const Comment = styled.div`
  display: grid;
  gap: 20px;
`
const StarsContainerWrapper = styled.span`
  padding-bottom: 5px;
`

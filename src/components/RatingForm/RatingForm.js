import { useState } from 'react'
import styled from 'styled-components/macro'
import Icon from 'supercons'
import Button from '../Button/Button'
import StarsContainer from '../StarsContainer/StarsContainer'

export default function RatingForm({
  ratingStars,
  ratingComment,
  onAddComment,
}) {
  const [isRatingFormVisible, setIsRatingFormVisible] = useState(false)
  const [selectedStars, setSelectedStars] = useState(ratingStars)
  const [comment, setComment] = useState(ratingComment)

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
  return (
    <RatingWrapper>
      <RatingButton
        onClick={event => {
          setIsRatingFormVisible(!isRatingFormVisible)
        }}
      >
        <ButtonWrapper>
          Leave the rating for recipe
          <Icon
            glyph={isRatingFormVisible ? 'up-caret' : 'down-caret'}
            size={25}
          />
        </ButtonWrapper>
      </RatingButton>
      {isRatingFormVisible && (
        <Form className="rating" onSubmit={handleSubmit}>
          <StarsContainer
            testID="stars"
            onClick={rateRecipe}
            selectedStars={selectedStars}
          />
          <Comment>
            <label>
              Your comment:
              <Textarea
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
          <Button>Rate</Button>
        </Form>
      )}
    </RatingWrapper>
  )
}

const Form = styled.form`
  display: grid;
  gap: 10px;
  margin-top: 20px;
`
const ButtonWrapper = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Textarea = styled.textarea`
  border: 2px solid #bbb;
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
`
const RatingWrapper = styled.div`
  display: grid;
`
const RatingButton = styled(Button)`
  display: flex;
  place-items: center;
  justify-content: space-evenly;
  height: 40px;
`
const Comment = styled.div`
  display: grid;
  gap: 20px;
`

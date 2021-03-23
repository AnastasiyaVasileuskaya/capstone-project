import { useState } from 'react'
import styled from 'styled-components/macro'
import Icon from 'supercons'
import Button from '../Button/Button'
import { IconContext } from 'react-icons'
import { AiOutlineStar } from 'react-icons/ai'
import { AiFillStar } from 'react-icons/ai'

export default function RatingForm() {
  const [isRatingFormVisible, setIsRatingFormVisible] = useState(false)
  const [selectedStars, setSelectedStars] = useState(0)

  function rateRecipe(starNumber) {
    setSelectedStars(starNumber)
  }
  function handleSubmit(e) {
    setIsRatingFormVisible(false)
  }
  return (
    <RatingWrapper>
      <RatingButton
        onClick={event => {
          event.stopPropagation()
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
        <Form>
          <IconContext.Provider value={{ size: '35px' }}>
            <IconWrapper>
              <AiOutlineStar
                role="button"
                icon={selectedStars > 0 ? <AiFillStar /> : <AiOutlineStar />}
                starNumber="1"
                onClick={event => {
                  event.stopPropagation()
                  rateRecipe()
                }}
              />
              <AiOutlineStar
                role="button"
                icon={selectedStars > 1 ? <AiFillStar /> : <AiOutlineStar />}
                starNumber="1"
                onClick={event => {
                  event.stopPropagation()
                  rateRecipe()
                }}
              />
              <AiOutlineStar
                role="button"
                icon={selectedStars > 2 ? <AiFillStar /> : <AiOutlineStar />}
                starNumber="1"
                onClick={event => {
                  event.stopPropagation()
                  rateRecipe()
                }}
              />
              <AiOutlineStar
                role="button"
                icon={selectedStars > 3 ? <AiFillStar /> : <AiOutlineStar />}
                starNumber="1"
                onClick={event => {
                  event.stopPropagation()
                  rateRecipe()
                }}
              />
              <AiOutlineStar
                role="button"
                icon={selectedStars > 4 ? <AiFillStar /> : <AiOutlineStar />}
                starNumber="1"
                onClick={event => {
                  event.stopPropagation()
                  rateRecipe()
                }}
              />
            </IconWrapper>
            <Comment>
              <label>
                <span>Your comment:</span>
                <Textarea
                  placeholder="Your comment..."
                  name="comment"
                  type="textarea"
                  rows={5}
                  cols={5}
                />
              </label>
            </Comment>
            <Button onClick={handleSubmit}>Rate</Button>
          </IconContext.Provider>
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
const IconWrapper = styled.span`
  display: flex;
  justify-content: space-evenly;
  svg:hover {
    fill: yellow;
  }
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

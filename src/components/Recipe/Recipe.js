import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import Icon from 'supercons'
import getRecipeIndexFromString from '../../services/getRecipeIndexFromString'
import StarsContainer from '../StarsContainer/StarsContainer'
export default function Recipe({
  recipe,
  selectedStars,
  comment,
  date,
  isVisible,
  onDeleteButtonClick,
}) {
  const { image, calories, label: title, yield: servings } = recipe
  const recipeId = getRecipeIndexFromString(recipe.uri)
  const ingredients = recipe.ingredientLines.length

  Recipe.propTypes = {
    title: PropTypes.string,
    image: PropTypes.string,
    calories: PropTypes.string,
    ingredients: PropTypes.string,
    servings: PropTypes.string,
    recipeId: PropTypes.string,
    selectedStars: PropTypes.number,
    comment: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    isVisible: PropTypes.bool,
    onDeleteButtonClick: PropTypes.func,
  }

  function handleClick(event) {
    event.preventDefault()
    onDeleteButtonClick(recipeId)
  }

  return (
    <RecipeContainer
      as={Link}
      to={{
        pathname: `/recipes/${recipeId}`,
      }}
    >
      <IconWrapper
        data-testid="recipe-delete"
        isVisible={isVisible}
        onClick={handleClick}
      >
        <Icon glyph="view-close" size={33} />
      </IconWrapper>
      <Img src={image} alt="recipe" width="200" />
      <Titlewrapper>{title}</Titlewrapper>
      <InfoWrapper>
        <Amount>
          <div>{Math.floor(calories / servings)} kcal</div> Calories/Serving
        </Amount>
        <Amount>
          <div>{ingredients}</div>
          Ingredients
        </Amount>
      </InfoWrapper>
      <RatingWrapper>
        {selectedStars > 0 && (
          <StarsContainerWrapper>
            <StarsContainer
              selectedStars={selectedStars}
              onClick={event => event.preventDefault()}
            />
          </StarsContainerWrapper>
        )}
        {(comment.length > 0 || selectedStars > 0) && (
          <DateWrapper data-testid="rating-date">
            {new Date(date).toLocaleDateString()}
          </DateWrapper>
        )}
      </RatingWrapper>
    </RecipeContainer>
  )
}

const RecipeContainer = styled.div`
  display: grid;
  place-items: center;
  background-color: var(--color-lightorange);
  text-align: center;
  border-radius: 5px;
  box-shadow: var(--box-shadow-small);
  text-decoration: none;
  color: black;
  h2 {
    margin-top: 10px;
    margin-bottom: 0;
  }
  position: relative;
`

const IconWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 2px;
  display: ${props => (props.isVisible ? 'block' : 'none')};
`

const Img = styled.img`
  padding-top: 20px;
`

const Titlewrapper = styled.h2`
  padding-right: 10px;
  padding-left: 10px;
`

const InfoWrapper = styled.div`
  padding-top: 10px;
  display: flex;
  justify-content: space-evenly;
`
const Amount = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  div {
    color: var(--color-orange);
    font-weight: 700;
  }
`

const RatingWrapper = styled.span`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`

const StarsContainerWrapper = styled.div`
  margin-top: 15px;
`

const DateWrapper = styled.div`
  margin-top: 18px;
  margin-left: 15px;
`

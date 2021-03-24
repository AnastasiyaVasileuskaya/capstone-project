import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Icon from 'supercons'
import getRecipeIndexFromString from '../../services/getRecipeIndexFromString'
export default function Recipe({ recipe, isVisible, onDeleteButtonClick }) {
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
    isVisible: PropTypes.bool,
    onDeleteButtonClick: PropTypes.func,
  }

  function handleClick(e) {
    e.preventDefault()
    onDeleteButtonClick(recipeId)
  }

  return (
    <RecipeContainer
      as={Link}
      exact
      to={{
        pathname: `/recipes/${recipeId}`,
      }}
    >
      <IconWrapper isVisible={isVisible} to={'/'} onClick={handleClick}>
        <Icon glyph="view-close" size={30} />
      </IconWrapper>
      <Img src={image} alt="recipe" width="200" />
      <h2>{title}</h2>
      <InfoWrapper>
        <p>
          <CaloriesNumber>
            {Math.floor(calories / servings)} kcal
          </CaloriesNumber>
          <br />
          Calories/Serving
        </p>
        <p>
          <IngredientsNumber>{ingredients}</IngredientsNumber>
          <br /> Ingredients
        </p>
      </InfoWrapper>
    </RecipeContainer>
  )
}

const RecipeContainer = styled.span`
  background-color: var(--color-lightorange);
  text-align: center;
  border-radius: 20px;
  box-shadow: 3px 3px 3px #eee;
  text-decoration: none;
  color: black;
  h2 {
    margin-top: 5px;
    margin-bottom: 0;
  }
  position: relative;
`

const Img = styled.img`
  padding-top: 20px;
`

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  font-weight: 300;
  margin-bottom: 20px;
`

const CaloriesNumber = styled.span`
  color: var(--color-orange);
  font-weight: 500;
`

const IngredientsNumber = styled.span`
  color: var(--color-orange);
  font-weight: 500;
`
const IconWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 2px;
  display: ${props => (props.isVisible ? 'block' : 'none')};
`

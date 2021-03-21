import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import Icon from 'supercons'
export default function Recipe({ recipe, isVisible, onDeleteButtonClick }) {
  const {
    image,
    calories,
    label: title,
    yield: servings,
    id: recipeId,
  } = recipe
  const ingredients = recipe.ingredientLines.length

  function handleClick(e) {
    e.preventDefault()
    onDeleteButtonClick(recipeId)
  }

  return (
    <RecipeContainer
      as={NavLink}
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

Recipe.propTypes = {
  title: PropTypes.string,
  img: PropTypes.string,
  calories: PropTypes.string,
  ingredients: PropTypes.string,
}

const RecipeContainer = styled.span`
  background-color: #fff2e4;
  text-align: center;
  border-radius: 20px;
  box-shadow: 3px 3px 3px #eee;
  text-decoration: none;
  color: black;
  h2 {
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
  display: ${props => (props.isVisible ? 'block' : 'none')};
`

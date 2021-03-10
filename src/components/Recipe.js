import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
export default function Recipe({
  image,
  title,
  calories,
  ingredients,
  servings,
}) {
  return (
    <RecipeContainer>
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
/*
Recipe.propTypes = {
  title: PropTypes.string,
  img: PropTypes.string,
  calories: PropTypes.string,
  ingredients: PropTypes.string,
}
*/

const RecipeContainer = styled.section`
  background-color: var(--color-lightorange);
  text-align: center;
  border-radius: 20px;
  box-shadow: 3px 3px 3px #eee;
  h2 {
    margin-bottom: 0;
  }
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

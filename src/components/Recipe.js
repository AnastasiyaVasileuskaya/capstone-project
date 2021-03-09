import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
export default function Recipe({ image, title, calories, ingredients }) {
  return (
    <RecipeContainer>
      <Img src={image} alt="recipe" width="200" />
      <h2>{title}</h2>
      <InfoWrapper>
        <p>
          <CaloriesNumber>{Math.floor(calories)} kcal</CaloriesNumber> Caloreis
        </p>
        <p>
          <IngredientsNumber>{ingredients}</IngredientsNumber> Ingredients
        </p>
      </InfoWrapper>
    </RecipeContainer>
  )
}

Recipe.propTypes = {
  title: PropTypes.string,
  img: PropTypes.string,
  calories: PropTypes.number,
  ingredients: PropTypes.number,
}

const RecipeContainer = styled.section`
  background-color: var(--color-lightorange);
  text-align: center;
  border-radius: 20px;
  box-shadow: 3px 3px 3px #eee;
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

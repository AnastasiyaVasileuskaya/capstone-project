import styled from 'styled-components/macro'
import Icon from 'supercons'
import { Link } from 'react-router-dom'
import Button from '../../components/Button/Button'
import RatingForm from '../../components/RatingForm/RatingForm'
import Rating from '../../components/Rating/Rating'
import getRecipeIndexFromString from '../../services/getRecipeIndexFromString'
import createUrlQueryByRecipeIds from '../../services/createUrlQueryByRecipeIds'
import useRatingFromLocalStorage from '../../hooks/useRatingFromLocalStorage'
import createRating from '../../services/createRating'
import { useState, useEffect, useLayoutEffect } from 'react'
import fadeIn from '../../lib/fadeIn'
import { useHistory } from 'react-router'

export default function DetailPage({ recipeId, backUrlParams }) {
  const history = useHistory()
  const [rating, setRating] = useRatingFromLocalStorage(recipeId)
  const [recipe, setRecipe] = useState(null)
  const [isRatingChanging, setIsRatingChanging] = useState(false)

  const isRecipeSaved = !!rating
  const totalDaily = recipe ? recipe.totalDaily : null
  const totalNutrients = recipe ? recipe.totalNutrients : null

  useEffect(() => {
    setRecipe(null)
    setIsRatingChanging(false)
    fetchRecipe()
  }, [recipeId])

  useLayoutEffect(() => {
    fadeIn()
  }, [recipe])

  async function fetchRecipe() {
    const response = await fetch(createUrlQueryByRecipeIds([recipeId]))
    const data = await response.json()
    setRecipe(data[0])
  }

  function saveRecipe(event) {
    setRating(createRating(0, ''))
  }

  function onSaveRating(comment, selectedStars) {
    setIsRatingChanging(false)
    setRating(createRating(selectedStars, comment))
  }

  function onRatingChange(event) {
    setIsRatingChanging(true)
  }

  if (!recipe) {
    let text = ''
    return <TextWrapper>{text}</TextWrapper>
  }

  function onBackButtonClick(event) {
    if (backUrlParams?.query !== '') {
      history.goBack()
    } else {
      history.replace('/')
    }
  }

  return (
    <PageLayout data-testid="recipe-information">
      <TitleWrapper>
        <BackButton onClick={onBackButtonClick}>
          <Icon glyph="view-back" size={33} />
        </BackButton>
        <RecipeTitle>{recipe.label}</RecipeTitle>
      </TitleWrapper>
      <ImageWrapper>
        <img src={recipe.image} alt="recipe" />
      </ImageWrapper>
      <CaloriesWrapper>
        <span>
          <AmountWrapper>{Math.floor(recipe.calories)} kcal </AmountWrapper>
          calories
        </span>
        <span>
          <AmountWrapper>{recipe.yield}</AmountWrapper> servings
        </span>
      </CaloriesWrapper>
      <IngredientsWrapper>
        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>
              <span>•</span>
              <p>{ingredient.text}</p>
            </li>
          ))}
        </ul>
      </IngredientsWrapper>
      <Button
        data-testid="save-recipe-button"
        onClick={saveRecipe}
        disabled={isRecipeSaved}
      >
        {isRecipeSaved ? 'Recipe saved' : 'Save recipe'}
      </Button>
      <PreparationWrapper>
        <h2>Preparation</h2>
        You can see full recipe on
        <PreparationLink>{recipe.source}</PreparationLink>
      </PreparationWrapper>
      <Button
        data-testid="full-instruction-button"
        onClick={() => {
          window.open(recipe.url)
        }}
      >
        Instructions
      </Button>
      <NutritionWrapper>
        <h2>Nutrition</h2>
        <table>
          <tbody>
            <TableHeader>
              <td>Nutrients</td>
              <td>Total/serving</td>
              <td>Daily/serving</td>
            </TableHeader>
            <tr>
              <TableCellLabel>{totalNutrients.CHOCDF.label}</TableCellLabel>
              <TableCell>
                {Math.floor(totalNutrients.CHOCDF.quantity / recipe.yield)}{' '}
                {totalNutrients.CHOCDF.unit}
              </TableCell>
              <TableCell>
                {Math.floor(totalDaily.CHOCDF.quantity / recipe.yield)}{' '}
                {totalDaily.CHOCDF.unit}
              </TableCell>
            </tr>
            <tr>
              <TableCellLabel>{totalNutrients.FAT.label}</TableCellLabel>
              <TableCell>
                {Math.floor(totalNutrients.FAT.quantity / recipe.yield)}{' '}
                {totalNutrients.FAT.unit}
              </TableCell>
              <TableCell>
                {Math.floor(totalDaily.FAT.quantity / recipe.yield)}{' '}
                {totalDaily.FAT.unit}
              </TableCell>
            </tr>
            <tr>
              <TableCellLabel>{totalNutrients.PROCNT.label}</TableCellLabel>
              <TableCell>
                {Math.floor(totalNutrients.PROCNT.quantity / recipe.yield)}{' '}
                {totalNutrients.PROCNT.unit}
              </TableCell>
              <TableCell>
                {Math.floor(totalDaily.PROCNT.quantity / recipe.yield)}{' '}
                {totalDaily.PROCNT.unit}
              </TableCell>
            </tr>
            <tr>
              <TableCellLabel>{totalNutrients.ZN.label}</TableCellLabel>
              <TableCell>
                {Math.floor(totalNutrients.ZN.quantity / recipe.yield)}{' '}
                {totalNutrients.ZN.unit}
              </TableCell>
              <TableCell>
                {Math.floor(totalDaily.ZN.quantity / recipe.yield)}{' '}
                {totalDaily.ZN.unit}
              </TableCell>
            </tr>
            <tr>
              <TableCellLabel>{totalNutrients.MG.label}</TableCellLabel>
              <TableCell>
                {Math.floor(totalNutrients.MG.quantity / recipe.yield)}{' '}
                {totalNutrients.MG.unit}
              </TableCell>
              <TableCell>
                {Math.floor(totalDaily.MG.quantity / recipe.yield)}{' '}
                {totalDaily.MG.unit}
              </TableCell>
            </tr>
            <tr>
              <TableCellLabel>{totalNutrients.CA.label}</TableCellLabel>
              <TableCell>
                {Math.floor(totalNutrients.CA.quantity / recipe.yield)}{' '}
                {totalNutrients.CA.unit}
              </TableCell>
              <TableCell>
                {Math.floor(totalDaily.CA.quantity / recipe.yield)}{' '}
                {totalDaily.CA.unit}
              </TableCell>
            </tr>
            <tr>
              <TableCellLabel>{totalNutrients.VITA_RAE.label}</TableCellLabel>
              <TableCell>
                {Math.floor(totalNutrients.VITA_RAE.quantity / recipe.yield)}{' '}
                {totalNutrients.VITA_RAE.unit}
              </TableCell>
              <TableCell>
                {Math.floor(totalDaily.VITA_RAE.quantity / recipe.yield)}{' '}
                {totalDaily.VITA_RAE.unit}
              </TableCell>
            </tr>
            <tr>
              <TableCellLabel>{totalNutrients.VITC.label}</TableCellLabel>
              <TableCell>
                {Math.floor(totalNutrients.VITC.quantity / recipe.yield)}{' '}
                {totalNutrients.VITC.unit}
              </TableCell>
              <TableCell>
                {Math.floor(totalDaily.VITC.quantity / recipe.yield)}{' '}
                {totalDaily.VITC.unit}
              </TableCell>
            </tr>
            <tr>
              <TableCellLabel>{totalNutrients.VITD.label}</TableCellLabel>
              <TableCell>
                {Math.floor(totalNutrients.VITD.quantity / recipe.yield)}{' '}
                {totalNutrients.VITD.unit}
              </TableCell>
              <TableCell>
                {Math.floor(totalDaily.VITD.quantity / recipe.yield)}{' '}
                {totalDaily.VITD.unit}
              </TableCell>
            </tr>
          </tbody>
        </table>
      </NutritionWrapper>
      {rating && rating.selectedStars > 0 && !isRatingChanging && (
        <Rating
          selectedStars={rating.selectedStars}
          comment={rating.comment}
          date={rating.date}
          onRatingChange={onRatingChange}
        />
      )}
      {((isRecipeSaved && (!rating || rating.selectedStars === 0)) ||
        isRatingChanging) && (
        <RatingForm
          onAddComment={onSaveRating}
          ratingStars={rating.selectedStars}
          ratingComment={rating.comment}
          ratingFormVisible={isRatingChanging}
        />
      )}
    </PageLayout>
  )
}

const PageLayout = styled.main`
  display: grid;
  gap: 20px;
  overflow-y: scroll;
  padding: 20px;
  grid-auto-rows: min-content;
  &:after {
    content: '';
    height: 2px;
  }
`
const TitleWrapper = styled.div`
  display: flex;
  place-items: center;
`
const BackButton = styled(Button)`
  display: flex;
  place-items: center;
  margin-right: 20px;
  height: 45px;
  width: 45px;
  border-radius: 50%;
  cursor: pointer;
  color: black;
`
const RecipeTitle = styled.h2`
  margin-bottom: 0;
  margin-top: 0;
`
const ImageWrapper = styled.div`
  display: grid;
  place-items: center;
`
const CaloriesWrapper = styled.span`
  display: flex;
  justify-content: space-evenly;
`
const AmountWrapper = styled.span`
  color: var(--color-orange);
  font-weight: 700;
  margin-right: 5px;
`
const IngredientsWrapper = styled.span`
  h2 {
    margin-bottom: 0;
    margin-top: 0;
  }
  li {
    display: table;
    line-height: 120%;
  }
  li p {
    margin: 5px;
  }
  li span {
    font-size: 30px;
    width: 30px;
    color: orange;
    display: table-cell;
    text-align: center;
    vertical-align: middle;
  }
  ul {
    margin-top: 10px;
    margin-bottom: 0;
    padding-left: 0;
  }
`
const PreparationWrapper = styled.span`
  h2 {
    margin-top: 0;
    margin-bottom: 10px;
  }
`
const PreparationLink = styled.span`
  text-decoration: none;
  color: var(--color-orange);
  margin-left: 5px;
  font-weight: 700;
`
const NutritionWrapper = styled.span`
  h2 {
    margin-top: 0;
    margin-bottom: 10px;
  }
`
const TableHeader = styled.tr`
  font-weight: 700;
  color: var(--color-orange);
  td {
    padding-bottom: 10px;
  }
`
const TableCell = styled.td`
  text-align: left;
  padding-left: 35px;
`
const TableCellLabel = styled.td`
  text-align: left;
  padding-left: 10px;
`
const TextWrapper = styled.span`
  padding: 10px;
`

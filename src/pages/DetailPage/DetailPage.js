import styled from 'styled-components/macro'
import Header from '../../components/Header/Header'
import Button from '../../components/Button/Button'
import RatingForm from '../../components/RatingForm/RatingForm'
import Rating from '../../components/Rating/Rating'
import getRecipeIndexFromString from '../../services/getRecipeIndexFromString'
import createUrlQueryByRecipeIds from '../../services/createUrlQueryByRecipeIds'
import useRatingFromLocalStorage from '../../hooks/useRatingFromLocalStorage'
import createRating from '../../services/createRating'
import { useState } from 'react'
import { useEffect } from 'react'

export default function DetailPage() {
  const recipeId = getRecipeIndexFromString(window.location.pathname)
  const [rating, setRating] = useRatingFromLocalStorage(recipeId)
  const [recipe, setRecipe] = useState(null)
  const [isRatingChanging, setIsRatingChanging] = useState(false)
  const isRecipeSaved = !!rating

  const totalDaily = recipe ? recipe.totalDaily : null
  const totalNutrients = recipe ? recipe.totalNutrients : null

  async function fetchRecipe() {
    const response = await fetch(createUrlQueryByRecipeIds([recipeId]))
    const data = await response.json()
    setRecipe(data[0])
  }
  useEffect(() => {
    !recipe && fetchRecipe()
  }, [recipe])

  if (!recipe) {
    return (
      <>
        <Header title="CookIdeas" isVisibleAll={true} isVisibleSaved={true} />
        <TextWrapper>Loading...</TextWrapper>
      </>
    )
  }

  function onSaveRating(comment, selectedStars) {
    setIsRatingChanging(false)
    setRating(createRating(selectedStars, comment))
  }
  function saveRecipe(e) {
    setRating(createRating(0, ''))
  }
  function onRatingChange(e) {
    setIsRatingChanging(true)
  }
  return (
    <>
      <Header title="CookIdeas" isVisibleAll={true} isVisibleSaved={true} />
      <PageLayout>
        <RecipeTitle>{recipe.label}</RecipeTitle>
        <ImageWrapper>
          <img src={recipe.image} alt="recipe" />
        </ImageWrapper>
        <CaloriesWrapper>
          <span>
            <CaloriesNumber>{Math.floor(recipe.calories)} kcal </CaloriesNumber>
            calories
          </span>
          <span>
            <ServingsNumber>{recipe.yield}</ServingsNumber> servings
          </span>
        </CaloriesWrapper>
        <IngredientsWrapper>
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                <span>{ingredient.text}</span>
              </li>
            ))}
          </ul>
        </IngredientsWrapper>
        <Button onClick={saveRecipe} disabled={isRecipeSaved}>
          {isRecipeSaved ? 'Recipe saved' : 'Save recipe'}
        </Button>
        <PreparationWrapper>
          <h2>Preparation</h2>
          You can see full recipe on
          <PreparationLink
            onClick={() => {
              window.open(recipe.url)
            }}
          >
            {recipe.source}
          </PreparationLink>
        </PreparationWrapper>
        <Button
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
                <td>{totalNutrients.CHOCDF.label}</td>
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
                <td>{totalNutrients.FAT.label}</td>
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
                <td>{totalNutrients.PROCNT.label}</td>
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
                <td>{totalNutrients.ZN.label}</td>
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
                <td>{totalNutrients.MG.label}</td>
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
                <td>{totalNutrients.CA.label}</td>
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
                <td>{totalNutrients.VITA_RAE.label}</td>
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
                <td>{totalNutrients.VITC.label}</td>
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
                <td>{totalNutrients.VITD.label}</td>
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
    </>
  )
}

const PageLayout = styled.main`
  display: grid;
  gap: 20px;
  overflow-y: scroll;
  padding: 20px;
  margin-bottom: 30px;
  font-weight: 300;
  grid-auto-rows: min-content;
`
const ImageWrapper = styled.div`
  display: grid;
  place-items: center;
`
const CaloriesWrapper = styled.span`
  display: flex;
  justify-content: space-evenly;
`
const IngredientsWrapper = styled.span`
  display: grid;
  h2 {
    margin-bottom: 0;
    margin-top: 0;
  }
  li {
    color: orange;
  }
  li span {
    color: black;
  }
`
const PreparationLink = styled.span`
  text-decoration: none;
  color: var(--color-orange);
  margin-left: 5px;
  font-weight: 500;
`
const PreparationWrapper = styled.span`
  h2 {
    margin-top: 0;
    margin-bottom: 10px;
  }
`
const NutritionWrapper = styled.span`
  display: grid;
  h2 {
    margin-top: 0;
    margin-bottom: 10px;
  }
`
const CaloriesNumber = styled.span`
  color: var(--color-orange);
  font-weight: 500;
`
const ServingsNumber = styled.span`
  color: var(--color-orange);
  font-weight: 500;
`
const RecipeTitle = styled.h2`
  margin-bottom: 0;
  margin-top: 0;
`
const TableHeader = styled.tr`
  font-weight: 500;
  td {
    padding-bottom: 10px;
  }
`

const TableCell = styled.td`
  text-align: center;
`
const TextWrapper = styled.div`
  display: grid;
  padding: 20px;
`

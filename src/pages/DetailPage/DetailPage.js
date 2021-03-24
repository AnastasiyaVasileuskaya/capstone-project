import styled from 'styled-components/macro'
import Header from '../../components/Header/Header'
import Button from '../../components/Button/Button'
import loadFromLocal from '../../lib/loadFromLocal'
import saveToLocal from '../../lib/saveToLocal'
import { useEffect, useState } from 'react'
import RatingForm from '../../components/RatingForm/RatingForm'
import Rating from '../../components/Rating/Rating'
export default function DetailPage({ externalRecipe }) {
  const [recipe, setRecipe] = useState(externalRecipe)
  const [isRecipeSaved, setIsRecipeSaved] = useState(
    recipe && loadFromLocal('savedRecipes').has(recipe.id)
  )
  useEffect(() => {
    setIsRecipeSaved(recipe && loadFromLocal('savedRecipes').has(recipe.id))
    saveToVisited()
  }, [recipe])

  if (!recipe) {
    let receipeId = window.location.pathname.substr(
      window.location.pathname.indexOf('recipe_'),
      window.location.pathname.length - 1
    )
    let visitedRecipes = loadFromLocal('visitedRecipes')
    let localStorageRecipe = visitedRecipes.get(receipeId)
    localStorageRecipe && setRecipe(localStorageRecipe)
  }

  if (!recipe) {
    return (
      <>
        <Header title="CookIdeas" isVisibleAll={true} isVisibleSaved={true} />
        <TextWrapper>Loading...</TextWrapper>
      </>
    )
  }

  const { totalDaily, totalNutrients } = recipe

  function saveRecipe() {
    let recipes = loadFromLocal('savedRecipes')
    recipes.set(recipe.id, recipe)
    saveToLocal('savedRecipes', recipes)
    setIsRecipeSaved(true)
  }

  function saveToVisited() {
    if (recipe) {
      let recipes = loadFromLocal('visitedRecipes')
      recipes.set(recipe.id, recipe)
      saveToLocal('visitedRecipes', recipes)
    }
  }

  function onSaveRating(comment, selectedStars) {
    let rating = {}
    rating.selectedStars = selectedStars
    rating.comment = comment
    rating.date = new Date()
    let newRecipe = { ...recipe }
    newRecipe.rating = rating
    setRecipe(newRecipe)
    saveRecipe()
  }
  function getRecipeById(id) {
    return recipes.find(recipe => recipe.id === id)
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
        {recipe.rating && (
          <Rating
            selectedStars={recipe.rating.selectedStars}
            comment={recipe.rating.comment}
            date={recipe.rating.date}
          />
        )}
        {isRecipeSaved && !recipe.rating && (
          <RatingForm onAddComment={onSaveRating} />
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

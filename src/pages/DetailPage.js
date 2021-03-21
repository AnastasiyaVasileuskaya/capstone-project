import styled from 'styled-components/macro'
import Header from '../components/Header/Header'
import Icon from 'supercons'
import { Link } from 'react-router-dom'
import Button from '../components/Button/Button'
import getRecipesFromLocalStorage from '../lib/getRecipesFromLocalStorage'
import saveRecipes from '../lib/saveRecipes'
import { useState } from 'react'
export default function DetailPage({ recipe }) {
  const [isRecipeSaved, setIsRecipeSaved] = useState(
    recipe && getRecipesFromLocalStorage('savedRecipes').has(recipe.id)
  )
  if (!recipe) {
    let receipeId = window.location.pathname.substr(
      window.location.pathname.indexOf('recipe_'),
      window.location.pathname.length - 1
    )
    let visitedRecipes = getRecipesFromLocalStorage('visitedRecipes')
    recipe = visitedRecipes.get(receipeId)
  }

  if (!recipe) {
    return (
      <>
        <Header title="CookIdeas" />
        <div>Loading...</div>
      </>
    )
  }

  const { totalDaily, totalNutrients } = recipe

  function saveRecipe() {
    let recipes = getRecipesFromLocalStorage('savedRecipes')
    recipes.set(recipe.id, recipe)
    saveRecipes('savedRecipes', recipes)
    setIsRecipeSaved(true)
  }

  return (
    <>
      <Header title="CookIdeas" />
      <PageLayout>
        <Navigation>
          <LinkWrapper to={'/'}>
            <Icon glyph="back" size={25} /> Back to recipes
          </LinkWrapper>
          <LinkWrapper to={'/saved'}>Saved recipes</LinkWrapper>
        </Navigation>
        <ImageWrapper>
          <h2>{recipe.label}</h2>
          <img src={recipe.image} alt="recipe" />
        </ImageWrapper>
        <CaloriesWrapper>
          <span>{Math.floor(recipe.calories)} kcal calories</span>
          <span>{recipe.yield} servings</span>
        </CaloriesWrapper>
        <IngredientsWrapper>
          <h2>Ingredients</h2>
          <ol>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient.text}</li>
            ))}
          </ol>
        </IngredientsWrapper>
        <Button onClick={saveRecipe} disabled={isRecipeSaved}>
          {isRecipeSaved ? 'Recipe saved' : 'Save recipe'}
        </Button>
        <PreparationWrapper>
          <h2>Preparation</h2>
          <p>
            <span>You can see full recipe on</span>
            <PreparationLink
              onClick={() => {
                window.open(recipe.url)
              }}
            >
              {recipe.source}
            </PreparationLink>
          </p>
        </PreparationWrapper>
        <Button
          onClick={() => {
            window.open(recipe.url)
          }}
        >
          Instructions
        </Button>
        <h2>Nutrition</h2>
        <table>
          <tbody>
            <tr>
              <td>{totalNutrients.CHOCDF.label}</td>
              <td>
                {Math.floor(totalNutrients.CHOCDF.quantity)}{' '}
                {totalNutrients.CHOCDF.unit}
              </td>
              <td>
                {Math.floor(totalDaily.CHOCDF.quantity)}{' '}
                {totalDaily.CHOCDF.unit}
              </td>
            </tr>
            <tr>
              <td>{totalNutrients.FAT.label}</td>
              <td>
                {Math.floor(totalNutrients.FAT.quantity)}{' '}
                {totalNutrients.FAT.unit}
              </td>
              <td>
                {Math.floor(totalDaily.FAT.quantity)} {totalDaily.FAT.unit}
              </td>
            </tr>
            <tr>
              <td>{totalNutrients.PROCNT.label}</td>
              <td>
                {Math.floor(totalNutrients.PROCNT.quantity)}{' '}
                {totalNutrients.PROCNT.unit}
              </td>
              <td>
                {Math.floor(totalDaily.PROCNT.quantity)}{' '}
                {totalDaily.PROCNT.unit}
              </td>
            </tr>
            <tr>
              <td>{totalNutrients.ZN.label}</td>
              <td>
                {Math.floor(totalNutrients.ZN.quantity)}{' '}
                {totalNutrients.ZN.unit}
              </td>
              <td>
                {Math.floor(totalDaily.ZN.quantity)} {totalDaily.ZN.unit}
              </td>
            </tr>
            <tr>
              <td>{totalNutrients.MG.label}</td>
              <td>
                {Math.floor(totalNutrients.MG.quantity)}{' '}
                {totalNutrients.MG.unit}
              </td>
              <td>
                {Math.floor(totalDaily.MG.quantity)} {totalDaily.MG.unit}
              </td>
            </tr>
            <tr>
              <td>{totalNutrients.CA.label}</td>
              <td>
                {Math.floor(totalNutrients.CA.quantity)}{' '}
                {totalNutrients.CA.unit}
              </td>
              <td>
                {Math.floor(totalDaily.CA.quantity)} {totalDaily.CA.unit}
              </td>
            </tr>
            <tr>
              <td>{totalNutrients.VITA_RAE.label}</td>
              <td>
                {Math.floor(totalNutrients.VITA_RAE.quantity)}{' '}
                {totalNutrients.VITA_RAE.unit}
              </td>
              <td>
                {Math.floor(totalDaily.VITA_RAE.quantity)}{' '}
                {totalDaily.VITA_RAE.unit}
              </td>
            </tr>
            <tr>
              <td>{totalNutrients.VITC.label}</td>
              <td>
                {Math.floor(totalNutrients.VITC.quantity)}{' '}
                {totalNutrients.VITC.unit}
              </td>
              <td>
                {Math.floor(totalDaily.VITC.quantity)} {totalDaily.VITC.unit}
              </td>
            </tr>
            <tr>
              <td>{totalNutrients.VITD.label}</td>
              <td>
                {Math.floor(totalNutrients.VITD.quantity)}{' '}
                {totalNutrients.VITD.unit}
              </td>
              <td>
                {Math.floor(totalDaily.VITD.quantity)} {totalDaily.VITD.unit}
              </td>
            </tr>
          </tbody>
        </table>
      </PageLayout>
    </>
  )
}

const PageLayout = styled.main`
  display: grid;
  gap: 20px;
  overflow-y: scroll;
  padding: 20px;
`
const ImageWrapper = styled.div`
  display: grid;
  justify-content: center;
  h2 {
    margin-top: 0;
  }
`
const LinkWrapper = styled(Link)`
  text-decoration: none;
  color: black;
  background-color: lightgray;
  width: auto;
  height: 35px;
  display: flex;
  padding: 5px;
  align-items: center;
  justify-content: center;
`
const CaloriesWrapper = styled.span`
  display: flex;
  justify-content: space-evenly;
`
const IngredientsWrapper = styled.span`
  display: grid;
  justify-content: center;
  h2 {
    margin-bottom: 0;
    margin-top: 0;
  }
  ol {
    list-style: none;
    list-style-type: disc;
  }
`
const PreparationLink = styled.span`
  text-decoration: none;
  color: var(--color-orange);
`
const PreparationWrapper = styled.span`
  h2 {
    margin-bottom: 0;
    margin-top: 0;
  }
`
const Navigation = styled.div`
  display: flex;
  justify-content: space-evenly;
`

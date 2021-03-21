import styled from 'styled-components/macro'
import Header from '../components/Header/Header'
import Recipe from '../components/Recipe/Recipe'
import getRecipesFromLocalStorage from '../lib/getRecipesFromLocalStorage'
import Icon from 'supercons'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import saveRecipes from '../lib/saveRecipes'

export default function SavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState(
    getRecipesFromLocalStorage('savedRecipes')
  )

  function handleClick(clickedRecipeId) {
    let updatedRecipes = new Map()
    savedRecipes.forEach((recipe, recipeId) => {
      if (recipeId !== clickedRecipeId) {
        updatedRecipes.set(recipeId, recipe)
      }
    })
    setSavedRecipes(updatedRecipes)
    saveRecipes('savedRecipes', updatedRecipes)
  }

  if (savedRecipes.size > 0) {
    return (
      <PageLayout>
        <LinkWrapper to={'/'}>
          <Icon glyph="back" size={25} /> Back to recipes
        </LinkWrapper>
        {Array.from(savedRecipes, ([recipeId, recipe]) => (
          <Recipe
            onDeleteButtonClick={handleClick}
            isVisible={true}
            key={recipeId}
            recipe={recipe}
          />
        ))}
      </PageLayout>
    )
  }
  return (
    <>
      <Header title="CookIdeas" />
      <LinkWrapper to={'/'}>
        <Icon glyph="back" size={25} /> Back to recipes
      </LinkWrapper>
      <div>You haven't saved recipes yet.</div>
    </>
  )
}

const PageLayout = styled.main`
  display: grid;
  gap: 20px;
  overflow-y: scroll;
  padding: 20px;
`

const LinkWrapper = styled(Link)`
  text-decoration: none;
  color: black;
  background-color: lightgray;
  width: 180px;
  height: 35px;
  display: flex;
  padding: 5px;
  align-items: center;
  justify-content: center;
`

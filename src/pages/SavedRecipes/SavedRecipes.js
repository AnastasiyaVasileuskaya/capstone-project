import styled from 'styled-components/macro'
import Recipe from '../../components/Recipe/Recipe'
import loadFromLocal from '../../lib/loadFromLocal'
import { useState } from 'react'
import saveToLocal from '../../lib/saveToLocal'
import Header from '../../components/Header/Header'

export default function SavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState(
    loadFromLocal('savedRecipes')
  )

  function handleClick(clickedRecipeId) {
    let updatedRecipes = new Map()
    savedRecipes.forEach((recipe, recipeId) => {
      if (recipeId !== clickedRecipeId) {
        updatedRecipes.set(recipeId, recipe)
      }
    })
    setSavedRecipes(updatedRecipes)
    saveToLocal('savedRecipes', updatedRecipes)
  }

  if (savedRecipes.size > 0) {
    return (
      <>
        <Header title="CookIdeas" isVisibleAll={true} />
        <PageLayout>
          {Array.from(savedRecipes, ([recipeId, recipe]) => (
            <Recipe
              onDeleteButtonClick={handleClick}
              isVisible={true}
              key={recipeId}
              recipe={recipe}
            />
          ))}
          <CardFinal></CardFinal>
        </PageLayout>
      </>
    )
  }
  return (
    <>
      <Header title="CookIdeas" isVisibleAll={true} />
      <TextWrapper>You haven't saved recipes yet.</TextWrapper>
    </>
  )
}

const PageLayout = styled.main`
  display: grid;
  gap: 20px;
  overflow-y: scroll;
  padding: 20px;
  grid-auto-rows: min-content;
`
const TextWrapper = styled.div`
  display: grid;
  padding: 20px;
`
const CardFinal = styled.div`
  padding-bottom: 5px;
`

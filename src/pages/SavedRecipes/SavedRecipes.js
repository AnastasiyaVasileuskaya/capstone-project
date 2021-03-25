import styled from 'styled-components/macro'
import Recipe from '../../components/Recipe/Recipe'
import loadFromLocal from '../../hooks/useMapFromLocalStorage'
import { useState } from 'react'
import saveToLocal from '../../lib/saveToLocal'
import Header from '../../components/Header/Header'
import useMapFromLocalStorage from '../../hooks/useMapFromLocalStorage'
import createUrlQueryByRecipeIds from '../../services/createUrlQueryByRecipeIds'
import copyMapRemovingKey from '../../lib/copyMapRemovingKey'
import { useEffect } from 'react'
import convertRecipesArrayToMap from '../../services/convertRecipesArrayToMap'
import getRecipeIndexFromString from '../../services/getRecipeIndexFromString'
import SearchBar from '../../components/SearchBar/SearchBar'
import Dropdown from '../../components/Dropdown'

export default function SavedRecipes() {
  const [savedRecipesMap, setSavedRecipesMap] = useMapFromLocalStorage(
    'savedRecipes'
  )
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    recipes.length === 0 && savedRecipesMap.size > 0 && getRecipes()
  }, [])

  async function getRecipes() {
    let recipeIds = Array.from(savedRecipesMap.keys())
    const response = await fetch(createUrlQueryByRecipeIds(recipeIds))
    const data = await response.json()
    setRecipes(data)
  }

  function handleOnRecipeDeleteButtonClick(clickedRecipeId) {
    let newRecipes = []
    recipes.forEach(recipe => {
      if (getRecipeIndexFromString(recipe.uri) !== clickedRecipeId) {
        newRecipes.push(recipe)
      }
    })
    setRecipes(newRecipes)
    setSavedRecipesMap(copyMapRemovingKey(savedRecipesMap, clickedRecipeId))
  }
  if (recipes.length === 0) {
    let text = '...Loading'
    if (savedRecipesMap.size === 0) {
      text = "You haven't saved recipes yet."
    }
    return (
      <>
        <Header title="CookIdeas" isVisibleAll={true} />
        <TextWrapper>{text}</TextWrapper>
      </>
    )
  }

  return (
    <>
      <Header title="CookIdeas" isVisibleAll={true} />
      <PageLayout>
        <input></input>
        <Dropdown />
        {recipes.map(recipe => (
          <Recipe
            onDeleteButtonClick={handleOnRecipeDeleteButtonClick}
            isVisible={true}
            key={getRecipeIndexFromString(recipe.uri)}
            recipe={recipe}
            selectedStars={
              savedRecipesMap.get(getRecipeIndexFromString(recipe.uri))
                .selectedStars
            }
          />
        ))}
        <CardFinal></CardFinal>
      </PageLayout>
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

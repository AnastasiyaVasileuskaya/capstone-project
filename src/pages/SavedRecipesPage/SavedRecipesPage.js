import styled from 'styled-components/macro'
import { useEffect, useState, useLayoutEffect } from 'react'
import useMapFromLocalStorage from '../../hooks/useMapFromLocalStorage'
import useLocalStorage from '../../hooks/useLocalStorage'
import copyMapRemovingKey from '../../lib/copyMapRemovingKey'
import fadeIn from '../../lib/fadeIn'
import createUrlQueryByRecipeIds from '../../services/createUrlQueryByRecipeIds'
import getRecipeIndexFromString from '../../services/getRecipeIndexFromString'
import Recipe from '../../components/Recipe/Recipe'
import Dropdown from '../../components/Dropdown/Dropdown'
import LiveSearch from '../../components/LiveSearch/LiveSearch'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'

export default function SavedRecipesPage() {
  const [savedRecipesMap, setSavedRecipesMap] = useMapFromLocalStorage(
    'savedRecipes'
  )
  const [recipes, setRecipes] = useState([])
  const [selectedSorting, setSelectedSorting] = useLocalStorage(
    'selectedSorting',
    'Rate: High To Low'
  )
  const [userInput, setUserInput] = useState('')

  useEffect(() => {
    recipes.length === 0 && savedRecipesMap.size > 0 && getRecipes()
  }, [])

  useLayoutEffect(() => {
    fadeIn()
  }, [])

  async function getRecipes() {
    let recipeIds = Array.from(savedRecipesMap.keys())
    const response = await fetch(createUrlQueryByRecipeIds(recipeIds))
    const data = await response.json()
    let unsortedRecipes = data.map(recipe => {
      let id = getRecipeIndexFromString(recipe.uri)
      return {
        ...recipe,
        id: id,
        rating: savedRecipesMap.get(id),
      }
    })
    sortArray(unsortedRecipes, selectedSorting)
    setRecipes(unsortedRecipes)
  }

  function sortArray(array, selection) {
    array.sort((recipe1, recipe2) => {
      switch (selection) {
        case 'Rate: Low To High':
          return recipe1.rating.selectedStars - recipe2.rating.selectedStars
        case 'Rate: High To Low':
        default:
          return recipe2.rating.selectedStars - recipe1.rating.selectedStars
        case 'Rate date: Oldest first':
          return (
            new Date(recipe1.rating.date).getTime() -
            new Date(recipe2.rating.date).getTime()
          )
        case 'Rate date: Newest first':
          return (
            new Date(recipe2.rating.date).getTime() -
            new Date(recipe1.rating.date).getTime()
          )
      }
    })
  }

  function sortSavedRecipes(selection) {
    let newArray = recipes.slice()
    sortArray(newArray, selection)
    setRecipes(newArray)
    setSelectedSorting(selection)
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
    let text = ''
    if (savedRecipesMap.size === 0) {
      text = "You haven't saved recipes yet."
    }

    return <TextWrapper data-testid="saved-recipes-text">{text}</TextWrapper>
  }

  return (
    <PageLayout data-testid="saved-recipes-wrapper">
      <LiveSearch userInput={userInput} setUserInput={setUserInput} />
      <Dropdown
        onSelectionChanged={sortSavedRecipes}
        selectedSorting={selectedSorting}
      />
      {recipes
        .filter(recipe =>
          recipe.label.toLowerCase().includes(userInput.toLowerCase())
        )
        .map(recipe => (
          <Recipe
            onDeleteButtonClick={handleOnRecipeDeleteButtonClick}
            isVisible={true}
            key={getRecipeIndexFromString(recipe.uri)}
            recipe={recipe}
            selectedStars={
              savedRecipesMap.get(getRecipeIndexFromString(recipe.uri))
                .selectedStars
            }
            date={
              savedRecipesMap.get(getRecipeIndexFromString(recipe.uri)).date
            }
            comment={
              savedRecipesMap.get(getRecipeIndexFromString(recipe.uri)).comment
            }
          />
        ))}
      <ScrollToTop />
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
const TextWrapper = styled.div`
  padding: 20px;
  font-weight: 500;
  background-color: var(--color-orange);
  background-image: var(--gradient-orange);
  background-size: 100%;
  background-repeat: repeat;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
`

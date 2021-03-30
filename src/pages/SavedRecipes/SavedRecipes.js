import styled from 'styled-components/macro'
import Recipe from '../../components/Recipe/Recipe'
import Header from '../../components/Header/Header'
import useMapFromLocalStorage from '../../hooks/useMapFromLocalStorage'
import createUrlQueryByRecipeIds from '../../services/createUrlQueryByRecipeIds'
import copyMapRemovingKey from '../../lib/copyMapRemovingKey'
import { useEffect, useState, useLayoutEffect } from 'react'
import getRecipeIndexFromString from '../../services/getRecipeIndexFromString'
import Dropdown from '../../components/Dropdown/Dropdown'
import useLocalStorage from '../../hooks/useLocalStorage'
import LiveSearch from '../../components/LiveSearch/LiveSearch'
import anime from 'animejs'

export default function SavedRecipes() {
  const [savedRecipesMap, setSavedRecipesMap] = useMapFromLocalStorage(
    'savedRecipes'
  )
  const [recipes, setRecipes] = useState([])
  const [selectedSorting, setSelectedSorting] = useLocalStorage(
    'selectedSorting',
    'Rate: High To Low'
  )
  const [userInput, setUserInput] = useState('')
  const fadeIn = () => {
    const fadeIn = anime.timeline()
    fadeIn.add({
      targets: 'main',
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeInOutQuad',
    })
  }

  useLayoutEffect(() => {
    fadeIn()
  }, [recipes])
  useEffect(() => {
    recipes.length === 0 && savedRecipesMap.size > 0 && getRecipes()
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

    return (
      <>
        <Header title="CookIdeas" isVisibleAll={true} isVisibleSaved={false} />
        <TextWrapper>{text}</TextWrapper>
      </>
    )
  }

  return (
    <>
      <Header title="CookIdeas" isVisibleAll={true} isVisibleSaved={false} />
      <PageLayout>
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
                savedRecipesMap.get(getRecipeIndexFromString(recipe.uri))
                  .comment
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
  padding-bottom: 20px;
`

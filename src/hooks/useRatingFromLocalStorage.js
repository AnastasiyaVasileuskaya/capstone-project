import { useEffect } from 'react'
import { useState } from 'react'
import loadFromLocal from '../lib/loadFromLocal'
import saveToLocal from '../lib/saveToLocal'

export default function useRatingFromLocalStorage(recipeId) {
  const [rating, setRating] = useState(
    getRecipeMapFromLocalStorage().get(recipeId)
  )
  useEffect(() => {
    rating && saveRatingToLocalStorage(recipeId, rating)
  }, [rating])
  return [rating, setRating]
}
function saveRatingToLocalStorage(recipeId, rating) {
  let map = getRecipeMapFromLocalStorage()
  map.set(recipeId, rating)
  saveToLocal('savedRecipes', Object.fromEntries(map))
}
function getRecipeMapFromLocalStorage() {
  let data = loadFromLocal('savedRecipes')
  if (data) {
    let map = new Map(Object.entries(data))
    return map
  }
  return new Map()
}

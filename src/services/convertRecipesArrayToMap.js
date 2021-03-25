import getRecipeIndexFromString from './getRecipeIndexFromString'

export default function convertRecipesArrayToMap(recipes) {
  let map = new Map()
  recipes.forEach(recipe =>
    map.set(getRecipeIndexFromString(recipe.uri), recipe)
  )
  return map
}

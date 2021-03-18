import Recipe from '../components/Recipe/Recipe'
import getRecipesFromLocalStorage from '../lib/getRecipesFromLocalStorage'

export default function SavedRecipes() {
  let recipes = getRecipesFromLocalStorage('savedRecipes')

  return Array.from(recipes, ([recipeId, recipe]) => (
    <Recipe key={recipeId} recipe={recipe} />
  ))
}

import Header from '../components/Header/Header'
import Recipe from '../components/Recipe/Recipe'
import getRecipesFromLocalStorage from '../lib/getRecipesFromLocalStorage'

export default function SavedRecipes() {
  let recipes = getRecipesFromLocalStorage('savedRecipes')
  if (recipes) {
    return Array.from(recipes, ([recipeId, recipe]) => (
      <Recipe key={recipeId} recipe={recipe} />
    ))
  }
  return (
    <>
      <Header title="CookIdeas" />
      <div>You haven't saved recipes yet.</div>
    </>
  )
}

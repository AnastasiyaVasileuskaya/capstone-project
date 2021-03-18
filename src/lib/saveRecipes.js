export default function saveRecipes(recipeType, recipes) {
  localStorage.setItem(recipeType, JSON.stringify(Object.fromEntries(recipes)))
}

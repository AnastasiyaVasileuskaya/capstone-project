export default function saveToLocal(recipeType, recipes) {
  localStorage.setItem(recipeType, JSON.stringify(Object.fromEntries(recipes)))
}

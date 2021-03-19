export default function getRecipesFromLocalStorage(recipeType) {
  const jsonString = localStorage.getItem(recipeType)
  try {
    if (jsonString) {
      return new Map(Object.entries(JSON.parse(jsonString)))
    }
    return new Map()
  } catch (error) {
    console.error(error)
  }
}

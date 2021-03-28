export default function createUrlQueryByRecipeIds(recipeIds) {
  let result = `https://api.edamam.com/search?app_id=${process.env.REACT_APP_EDAMAM_API_ID}&app_key=${process.env.REACT_APP_EDAMAM_API_KEY}`
  recipeIds.forEach(
    id =>
      (result += `&r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23${id}`)
  )
  return result
}

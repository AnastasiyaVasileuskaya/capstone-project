export default function getRecipeIndexFromString(stringWithRecipeId) {
  return stringWithRecipeId.substr(
    stringWithRecipeId.indexOf('recipe_'),
    stringWithRecipeId.length - 1
  )
}

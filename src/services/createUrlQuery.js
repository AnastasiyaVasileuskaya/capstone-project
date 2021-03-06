export default function createUrlQuery(urlParams) {
  const {
    caloriesRangeFrom,
    caloriesRangeTo,
    query,
    healthLabels,
    dishTypes,
  } = urlParams
  let result = `https://api.edamam.com/search?q=${query}&app_id=${process.env.REACT_APP_EDAMAM_API_ID}&app_key=${process.env.REACT_APP_EDAMAM_API_KEY}&from=0&to=30`
  if (healthLabels.length > 0) {
    result +=
      '&health=' + healthLabels.map(hl => hl.toLowerCase()).join('&health=')
  }
  if (dishTypes.length > 0) {
    result += '&cuisineType=' + dishTypes.join('&cuisineType=')
  }
  if (caloriesRangeFrom.length > 0 && caloriesRangeTo.length > 0) {
    result += '&calories=' + caloriesRangeFrom + '-' + caloriesRangeTo
  } else if (caloriesRangeFrom.length > 0) {
    result += '&calories=' + caloriesRangeFrom + '%2B'
  } else if (caloriesRangeTo.length > 0) {
    result += '&calories=' + caloriesRangeTo
  }
  return result
}

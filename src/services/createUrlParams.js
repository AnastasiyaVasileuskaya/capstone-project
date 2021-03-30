export default function createUrlParams(
  query,
  caloriesRangeFrom,
  caloriesRangeTo,
  healthLabels,
  dishTypes
) {
  return {
    query: query,
    caloriesRangeFrom: caloriesRangeFrom,
    caloriesRangeTo: caloriesRangeTo,
    healthLabels: healthLabels,
    dishTypes: dishTypes,
  }
}

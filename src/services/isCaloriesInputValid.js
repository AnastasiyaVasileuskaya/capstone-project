export default function isCaloriesInputValid(filters) {
  return (
    (filters.caloriesRangeFrom === '' && filters.caloriesRangeTo === '') ||
    (filters.caloriesRangeFrom !== '' && filters.caloriesRangeTo === '') ||
    (filters.caloriesRangeFrom === '' && filters.caloriesRangeTo !== '') ||
    (filters.caloriesRangeFrom !== '' &&
      filters.caloriesRangeTo !== '' &&
      parseInt(filters.caloriesRangeFrom) <= parseInt(filters.caloriesRangeTo))
  )
}

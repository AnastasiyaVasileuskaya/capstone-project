export default function createRating(selectedStars, comment) {
  return {
    selectedStars: selectedStars,
    comment: comment,
    date: new Date(),
  }
}

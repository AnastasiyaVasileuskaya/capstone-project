export default function Recipe({ image, title, calories }) {
  return (
    <div>
      <img src={image} alt="recipe" />
      <h1>{title}</h1>
      <p>{calories}</p>
    </div>
  )
}

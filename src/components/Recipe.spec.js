import Recipe from './Recipe'
import { render, screen } from '@testing-library/react'

describe('Recipe', () => {
  it('renders a card with title, image, number of calories and ingredients of recipe', () => {
    render(
      <Recipe
        title="Chicken"
        calories="300"
        ingredients="7"
        servings="4"
        img="https://www.edamam.com/web-img/e42/e42f9119813e890af34c259785ae1cfb.jpg"
      />
    )
    expect(screen.getByText('Chicken')).toBeInTheDocument()
    expect(screen.getByText('75 kcal')).toBeInTheDocument()
    expect(screen.getByText('7')).toBeInTheDocument()
    expect(screen.getByRole('img')).toBeInTheDocument()
  })
})

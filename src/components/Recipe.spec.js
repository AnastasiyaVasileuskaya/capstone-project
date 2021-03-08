import Recipe from './Recipe'
import { render, screen } from '@testing-library/react'

describe('Recipe', () => {
  it('renders title, image and calories of recipe', () => {
    render(<Recipe title="Chicken" calories="200" image="./image.png" />)
    expect(screen.getByText('Chicken')).toBeInTheDocument()
    expect(screen.getByDisplayValue('200')).toBeInTheDocument()
    expect(screen.getByAltText('recipe')).toBeInTheDocument()
  })
})

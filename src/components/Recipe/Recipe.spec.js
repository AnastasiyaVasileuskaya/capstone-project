import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom.min'
import Recipe from './Recipe'

describe('Recipe', () => {
  const recipe = {
    calories: '4000',
    image:
      'https://www.edamam.com/web-img/e42/e42f9119813e890af34c259785ae1cfb.jpg',
    ingredientLines: ['1/2 cup olive oil'],
    uri:
      'http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_9b5945e03f05acbf9d69625138385408',
    label: 'Chicken Vesuvio',
    yield: '4',
    url:
      'http://www.seriouseats.com/recipes/2011/12/chicken-vesuvio-recipe.html',
    id: 'f23df',
  }

  it('renders a card with title, image, number of calories and ingredients of recipe', () => {
    const onDeleteButtonClickCallback = jest.fn()
    render(
      <Recipe
        recipe={recipe}
        isVisible={true}
        onDeleteButtonClick={onDeleteButtonClickCallback}
        comment={'Very tasty'}
      />,
      {
        wrapper: MemoryRouter,
      }
    )
    expect(screen.getByText('Chicken Vesuvio')).toBeInTheDocument()
    expect(screen.getByText('1000 kcal')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByRole('img')).toBeInTheDocument()
  })
})

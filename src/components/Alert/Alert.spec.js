import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom.min'
import HomePage from '../../pages/HomePage/HomePage'

describe('Alert', () => {
  it('does not renders the Alert component if Alert text=""', () => {
    const recipes = [
      {
        calories: '234 kcal',
        image:
          'https://www.edamam.com/web-img/e42/e42f9119813e890af34c259785ae1cfb.jpg',
        ingredientLines: ['1/2 cup olive oil'],
        label: 'Chicken Vesuvio',
        yield: '4',
        url:
          'http://www.seriouseats.com/recipes/2011/12/chicken-vesuvio-recipe.html',
        id: 'f23df',
      },
    ]
    const callback = jest.fn()
    render(
      <HomePage
        onRecipeSearch={callback}
        text=""
        dietLabels={['vegan']}
        allergiesLabels={['egg-free']}
        cuisineTypes={['mexican']}
        onFindClicked={callback}
        recipes={recipes}
      />,
      {
        wrapper: MemoryRouter,
      }
    )
    expect(screen.queryByText(/alert/i)).not.toBeInTheDocument()
  })
})

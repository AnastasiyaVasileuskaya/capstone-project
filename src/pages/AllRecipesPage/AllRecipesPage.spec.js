import AllRecipesPage from './AllRecipesPage'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom.min'

describe('AllRecipesPage', () => {
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
  it('renders a link with path /saved and multiply recipecards', () => {
    const callback = jest.fn()
    render(
      <AllRecipesPage
        onFindClicked={callback}
        dietLabels={['vegan']}
        allergiesLabels={['egg-free']}
        cuisineTypes={['mexican']}
        title={'CookIdeas'}
        onRecipeSearch={callback}
        isVisibleSaved={true}
        recipes={recipes}
      />,
      {
        wrapper: MemoryRouter,
      }
    )
    expect(screen.getByText(/saved/i)).toHaveAttribute('href', '/saved')
  })
})

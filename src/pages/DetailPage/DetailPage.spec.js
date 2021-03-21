import DetailPage from './DetailPage'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom.min'

describe('DetailPage', () => {
  const recipe = {
    calories: '234',
    totalNutrients: {
      CA: { label: 'Calcium', quantity: '400', unit: 'mg' },
      MG: { label: 'Magnesium', quantity: '400', unit: 'mg' },
      ZN: { label: 'Zinc', quantity: '400', unit: 'mg' },
      VITA_RAE: { label: 'Vitamin A', quantity: '400', unit: 'µg' },
      VITC: { label: 'Vitamin C', quantity: '400', unit: 'mg' },
      VITD: { label: 'Vitamin D', quantity: '400', unit: 'µg' },
      CHOCDF: { label: 'Carbs', quantity: '400', unit: 'g' },
      FAT: { label: 'Fat', quantity: '400', unit: 'g' },
      PROCNT: { label: 'Protein', quantity: '400', unit: 'g' },
    },
    totalDaily: {
      CA: { label: 'Calcium', quantity: '400', unit: 'mg' },
      MG: { label: 'Magnesium', quantity: '400', unit: 'mg' },
      ZN: { label: 'Zinc', quantity: '400', unit: 'mg' },
      VITA_RAE: { label: 'Vitamin A', quantity: '400', unit: 'µg' },
      VITC: { label: 'Vitamin C', quantity: '400', unit: 'mg' },
      VITD: { label: 'Vitamin D', quantity: '400', unit: 'µg' },
      CHOCDF: { label: 'Carbs', quantity: '400', unit: 'g' },
      FAT: { label: 'Fat', quantity: '400', unit: 'g' },
      PROCNT: { label: 'Protein', quantity: '400', unit: 'g' },
    },
    image:
      'https://www.edamam.com/web-img/e42/e42f9119813e890af34c259785ae1cfb.jpg',
    ingredients: [{ text: '1/2 cup olive oil' }],
    label: 'Chicken Vesuvio',
    source: 'Serious Eats',
    yield: '4',
    url:
      'http://www.seriouseats.com/recipes/2011/12/chicken-vesuvio-recipe.html',
  }

  it('has a link with path /', () => {
    render(<DetailPage recipe={recipe} />, {
      wrapper: MemoryRouter,
    })
    expect(screen.getByText(/all/i)).toHaveAttribute('href', '/')
  })

  it('has a link with path /saved', () => {
    render(<DetailPage recipe={recipe} />, {
      wrapper: MemoryRouter,
    })
    expect(screen.getByText(/saved/i)).toHaveAttribute('href', '/saved')
  })

  it('has button that links to another pages', () => {
    render(<DetailPage recipe={recipe} />, {
      wrapper: MemoryRouter,
    })
    expect(
      screen.getByRole('button', { name: /instructions/i })
    ).toBeInTheDocument()
    expect(screen.getByText(/instructions/i)).toHaveAttribute(
      'href',
      '/{recipe.url}'
    )
  })
})

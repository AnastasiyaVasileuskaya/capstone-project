import SavedRecipes from './SavedRecipes'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom.min'

describe('SavedRecipes', () => {
  it('renders a link with path /', () => {
    render(<SavedRecipes />, {
      wrapper: MemoryRouter,
    })
    expect(screen.getByText(/all/i)).toHaveAttribute('href', '/')
  })
})

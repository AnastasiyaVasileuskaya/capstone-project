import SavedRecipesPage from './SavedRecipesPage'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom.min'

describe('SavedRecipesPage', () => {
  it('renders a link with path /', () => {
    render(<SavedRecipesPage isVisibleAll={true} />, {
      wrapper: MemoryRouter,
    })
    expect(screen.getByText(/all/i)).toHaveAttribute('href', '/')
  })
})

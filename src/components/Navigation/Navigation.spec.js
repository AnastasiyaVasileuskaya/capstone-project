import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navigation from './Navigation'

describe('Navigation', () => {
  it('renders links to "Home","Recipes" and "Saved" page', () => {
    render(<Navigation />, { wrapper: MemoryRouter })
    expect(screen.getByText(/home/i)).toBeInTheDocument()
    expect(screen.getByText(/recipes/i)).toBeInTheDocument()
    expect(screen.getByText(/saved/i)).toBeInTheDocument()
  })
})

import { render, screen } from '@testing-library/react'
import Header from './Header'

describe('Header', () => {
  it('renders a header', () => {
    render(<Header title="CookIdeas" />)
    expect(screen.getByText('CookIdeas')).toBeInTheDocument()
  })
})

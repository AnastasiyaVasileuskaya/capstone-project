import { render, screen } from '@testing-library/react'
import Header from './Header'

describe('Header', () => {
  it('should render a component from props', () => {
    render(<Header title="CookIdeas" />)
    expect(screen.getByText('CookIdeas')).toBeInTheDocument()
  })
})

import LiveSearch from './LiveSearch'
import { render, screen } from '@testing-library/react'

describe('LiveSearch', () => {
  it('renders an input', () => {
    render(<LiveSearch />)
    expect(screen.getByPlaceholderText(/Search recipe/i)).toBeInTheDocument()
  })
})

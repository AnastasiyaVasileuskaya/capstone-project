import { render, screen } from '@testing-library/react'
import ScrollToTop from './ScrollToTop'

describe('ScrollToTop', () => {
  it('renders scroll to top button', () => {
    render(<ScrollToTop />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})

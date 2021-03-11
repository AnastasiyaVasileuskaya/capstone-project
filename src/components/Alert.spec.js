import { render, screen } from '@testing-library/react'
import App from './App'

it('does not renders the Alert component', () => {
  render(<App />)
  expect(screen.queryByText(/alert/i)).not.toBeInTheDocument()
})

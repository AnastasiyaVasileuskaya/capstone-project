import { render, screen } from '@testing-library/react'
import App from './App'

it('renders the Alert component', () => {
  render(<App />)
  expect(screen.queryByText(/alert/i)).not.toBeInTheDocument()
})

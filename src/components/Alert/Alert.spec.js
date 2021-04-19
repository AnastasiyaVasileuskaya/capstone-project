import { render, screen } from '@testing-library/react'
import Alert from './Alert'

describe('Alert', () => {
  it('renders the alert', () => {
    render(<Alert text="alert" />)
    expect(screen.getByTestId('alert')).toBeInTheDocument()
  })
})

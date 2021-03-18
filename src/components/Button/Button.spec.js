import { render, screen } from '@testing-library/react'
import Button from './Button'

it('renders a Button', () => {
  render(<Button />)
  expect(screen.getByRole('button')).toBeVisible()
})

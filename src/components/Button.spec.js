import { userEvent, render, screen } from '@testing-library/react'
import Button from './Button'

it('renders a Button', () => {
  render(<Button />)
  expect(screen.getByRole('button')).toBeVisible()
})

it('calls onClick prop when clicked', () => {
  const handleClick = jest.fn()
  render(<Button onClick={handleClick} />)
  userEvent.click(screen.getByText('Search'))
  expect(handleClick).toHaveBeenCalledTimes(1)
})

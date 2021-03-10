import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchFilter from './SearchFilter'

describe('SearchFilter', () => {
  it('renders a form with a input and a button', () => {
    render(<SearchFilter />)
    expect(screen.getByPlaceholderText('e.g chicken')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('calls onSubmit-callback with form data', () => {
    const callback = jest.fn()
    render(<SearchFilter onRecipeSearch={callback} />)
    userEvent.type(screen.getByPlaceholderText('e.g chicken'), 'chicken')

    userEvent.click(screen.getByRole('button'))
    expect(callback).toHaveBeenCalledWith('chicken')
  })
})

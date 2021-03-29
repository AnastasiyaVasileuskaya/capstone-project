import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from './SearchBar'

describe('SearchBar', () => {
  it('renders a form with a input and a button', () => {
    render(<SearchBar />)
    expect(screen.getByPlaceholderText('Search recipe...')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('calls onSubmit-callback with form data', () => {
    const callback = jest.fn()
    render(<SearchBar onRecipeSearch={callback} />)
    userEvent.type(screen.getByPlaceholderText('Search recipe...'), 'chicken')

    userEvent.click(screen.getByRole('button'))
    expect(callback).toHaveBeenCalledWith('chicken')
  })
})

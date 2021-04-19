import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from './SearchBar'

describe('SearchBar', () => {
  it('renders a form with a input and a button', () => {
    const onRecipeSearchCallback = jest.fn()
    const onChangeCallback = jest.fn()
    render(
      <SearchBar
        query={''}
        onRecipeSearch={onRecipeSearchCallback}
        onChange={onChangeCallback}
      />
    )
    expect(screen.getByPlaceholderText('Search recipe...')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('calls onChangeCallback with selected query', () => {
    const onRecipeSearchCallback = jest.fn()
    const onChangeCallback = jest.fn()
    render(
      <SearchBar
        query={'chi'}
        onRecipeSearch={onRecipeSearchCallback}
        onChange={onChangeCallback}
      />
    )
    userEvent.type(screen.getByTestId('searchbar'), 'k')
    expect(onChangeCallback).toHaveBeenCalledWith('chik')
  })

  it('calls onSubmit-callback with form data', () => {
    const onRecipeSearchCallback = jest.fn()
    const onChangeCallback = jest.fn()
    render(
      <SearchBar
        query={'chicken'}
        onRecipeSearch={onRecipeSearchCallback}
        onChange={onChangeCallback}
      />
    )
    userEvent.click(screen.getByRole('button'))
    expect(onRecipeSearchCallback).toHaveBeenCalledWith('chicken')
  })
})

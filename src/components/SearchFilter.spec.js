import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchFilter from './SearchFilter'

describe('SearchFilter', () => {
  it('renders a form with a input and a button', () => {
    render(<SearchFilter />)
    expect(
      screen.getByPlaceholderText('e.g chocolate,bean')
    ).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('calls onSubmit-callback with form data', () => {
    const callback1 = jest.fn()
    const callback2 = jest.fn()
    const inputValue = 'chocolate'
    render(
      <SearchFilter
        onSearch={callback1}
        onUpdateSearch={callback2}
        search={inputValue}
      />
    )
    /*
    userEvent.type(
      screen.getByPlaceholderText('e.g chocolate,bean'),
      inputValue
    )
*/
    userEvent.click(screen.getByRole('button'))
    expect(callback1).toHaveBeenCalledWith(inputValue)
  })
})

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Dropdown from './Dropdown'

describe('Dropdown', () => {
  it('renders a button and not select buttons', () => {
    render(<Dropdown isDropdownContentVisible={false} />)
    expect(
      screen.queryByRole('button', {
        name: 'Rate: Low To High',
      })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', {
        name: 'Rate: High To Low',
      })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', {
        name: 'Rate date: Newest first',
      })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', {
        name: 'Rate date: Oldest first',
      })
    ).not.toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: 'Leave the rating for recipe down-caret',
      })
    ).toBeInTheDocument()
  })

  it('calls setIsDropdownContentVisible on button click', () => {
    const onSelectionChangedCallback = jest.fn()
    render(
      <Dropdown
        selectedSorting={'Rate: High To Low'}
        onSelectionChanged={onSelectionChangedCallback}
      />
    )
    const button = screen.getByRole('button', {
      name: 'Rate: High To Low',
    })
    userEvent.click(button)
    expect(onSelectionChangedCallback).not.toHaveBeenCalled()
    expect(
      screen.getByRole('button', {
        name: 'Rate: Low To High',
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: 'Rate: High To Low',
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: 'Rate date: Newest first',
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: 'Rate date: Oldest first',
      })
    ).toBeInTheDocument()
  })

  it('calls onSelectionChangedCallback with form data', () => {
    const onSelectionChangedCallback = jest.fn()
    render(
      <Dropdown
        selectedSorting={'Rate: High To Low'}
        onSelectionChanged={onSelectionChangedCallback}
      />
    )
    const button = screen.getByRole('button', {
      name: 'Rate: High To Low',
    })
    userEvent.click(button)
    userEvent.click(
      screen.getByRole('button', { name: 'Rate date: Newest first' })
    )
    expect(onSelectionChangedCallback).toHaveBeenCalled()
  })
})

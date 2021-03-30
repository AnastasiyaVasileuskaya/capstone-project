import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Dropdown from './Dropdown'

describe('Dropdown', () => {
  const onSelectionChangedCallback = jest.fn()
  it('renders selected dropdown item as a button and not other dropdown items', () => {
    render(
      <Dropdown
        isDropdownContentVisible={false}
        selectedSorting={'Rate: High To Low'}
        onSelectionChanged={onSelectionChangedCallback}
      />
    )
    expect(
      screen.queryByRole('button', {
        name: 'Rate: Low To High',
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
        name: 'Rate: High To Low down-caret',
      })
    ).toBeInTheDocument()
  })

  it('dropdown items on button click', () => {
    const onSelectionChangedCallback = jest.fn()
    render(
      <Dropdown
        selectedSorting={'Rate: High To Low'}
        onSelectionChanged={onSelectionChangedCallback}
      />
    )
    const button = screen.getByRole('button', {
      name: 'Rate: High To Low down-caret',
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
      name: 'Rate: High To Low down-caret',
    })
    userEvent.click(button)
    userEvent.click(
      screen.getByRole('button', { name: 'Rate date: Newest first' })
    )
    expect(onSelectionChangedCallback).toHaveBeenCalled()
  })
})

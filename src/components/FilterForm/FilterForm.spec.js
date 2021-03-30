import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FilterForm from './FilterForm'

describe('FilterForm', () => {
  const filters = {
    caloriesRangeFrom: '',
    caloriesRangeTo: '',
    healthLabels: [],
    dishTypes: [],
  }

  it('renders a button and not a form with inputs, checkboxes and two buttons', () => {
    render(<FilterForm filters={filters} isFilterFormVisible={false} />)
    expect(screen.queryByLabelText('calories')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('checkbox')).not.toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Refine your search down-caret' })
    ).toBeInTheDocument()
  })

  it('open filter form on button click', () => {
    const onFindClickedCallback = jest.fn()
    render(
      <FilterForm onFindClicked={onFindClickedCallback} filters={filters} />
    )
    const button = screen.getByRole('button', {
      name: 'Refine your search down-caret',
    })
    userEvent.click(button)
    expect(onFindClickedCallback).not.toHaveBeenCalled()
    expect(screen.getByText('Vegan')).toBeInTheDocument()
    expect(screen.getByText('Egg-free')).toBeInTheDocument()
    expect(screen.getByText('Mexican')).toBeInTheDocument()
  })

  it('set checkbox on checked by click', () => {
    const onFindClickedCallback = jest.fn()
    render(
      <FilterForm onFindClicked={onFindClickedCallback} filters={filters} />
    )
    const button = screen.getByRole('button', {
      name: 'Refine your search down-caret',
    })
    userEvent.click(button)
    expect(onFindClickedCallback).not.toHaveBeenCalled()
    userEvent.click(screen.getByLabelText('Vegan'))
    expect(screen.getByLabelText('Vegan')).toBeChecked()
    userEvent.click(screen.getByLabelText('Egg-free'))
    expect(screen.getByLabelText('Egg-free')).toBeChecked()
    userEvent.click(screen.getByLabelText('Mexican'))
    expect(screen.getByLabelText('Mexican')).toBeChecked()
  })

  it('calls onSubmit-callback with form data', () => {
    const onFindClickedCallback = jest.fn()
    render(
      <FilterForm onFindClicked={onFindClickedCallback} filters={filters} />
    )
    const button = screen.getByRole('button', {
      name: 'Refine your search down-caret',
    })
    userEvent.click(button)
    userEvent.type(screen.getByLabelText('From'), '235')
    userEvent.type(screen.getByLabelText('To'), '353')
    userEvent.click(screen.getByLabelText('Vegan'))
    userEvent.click(screen.getByLabelText('Mexican'))
    userEvent.click(screen.getByLabelText('Egg-free'))
    userEvent.click(screen.getByRole('button', { name: 'Find' }))
    expect(onFindClickedCallback).toHaveBeenCalledWith(
      '235',
      '353',
      ['Vegan', 'Egg-free'],
      ['Mexican']
    )
  })
})

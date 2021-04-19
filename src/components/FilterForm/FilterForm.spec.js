import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FilterForm from './FilterForm'

describe('FilterForm', () => {
  let filters = {
    caloriesRangeFrom: '',
    caloriesRangeTo: '',
    healthLabels: [],
    dishTypes: [],
  }

  it('renders a button and not a form with inputs, checkboxes and two buttons', () => {
    render(<FilterForm filters={filters} isFilterFormVisible={false} />)
    expect(screen.queryByRole('input')).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Clear' })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Find' })
    ).not.toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Refine your search down-caret' })
    ).toBeInTheDocument()
  })

  it('open filter form on button click', () => {
    const onFindClickedCallback = jest.fn()
    const onChangeCallback = jest.fn()
    render(
      <FilterForm
        onFindClicked={onFindClickedCallback}
        onChange={onChangeCallback}
        filters={filters}
      />
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

  it('calls onChangeCallback with selected filters', () => {
    const onFindClickedCallback = jest.fn()
    const onChangeCallback = jest.fn()
    render(
      <FilterForm
        onFindClicked={onFindClickedCallback}
        onChange={onChangeCallback}
        filters={filters}
      />
    )
    const button = screen.getByRole('button', {
      name: 'Refine your search down-caret',
    })
    userEvent.click(button)
    expect(onFindClickedCallback).not.toHaveBeenCalled()
    userEvent.click(screen.getByLabelText('Mexican'))
    expect(onChangeCallback).toHaveBeenCalledWith({
      caloriesRangeFrom: '',
      caloriesRangeTo: '',
      dishTypes: ['Mexican'],
      healthLabels: [],
    })
  })

  it('calls onSubmit-callback with filter form data', () => {
    const onFindClickedCallback = jest.fn()
    const onChangeCallback = jest.fn()
    const filters = {
      caloriesRangeFrom: '235',
      caloriesRangeTo: '353',
      healthLabels: ['Vegan', 'Egg-free'],
      dishTypes: ['Mexican'],
    }
    render(
      <FilterForm
        onFindClicked={onFindClickedCallback}
        onChange={onChangeCallback}
        filters={filters}
      />
    )
    const button = screen.getByRole('button', {
      name: 'Refine your search down-caret',
    })
    userEvent.click(button)
    userEvent.click(screen.getByRole('button', { name: 'Find' }))
    expect(onFindClickedCallback).toHaveBeenCalledWith({
      caloriesRangeFrom: '235',
      caloriesRangeTo: '353',
      dishTypes: ['Mexican'],
      healthLabels: ['Vegan', 'Egg-free'],
    })
  })
})

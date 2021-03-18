import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FilterForm from './FilterForm'

describe('FilterForm', () => {
  it('renders a button and not a form with inputs, checkboxes and two buttons', () => {
    render(<FilterForm isFilterFormVisible={false} />)
    expect(screen.queryByLabelText('calories')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('checkbox')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Refine your search down-caret' })).toBeInTheDocument()
  })

  it('calls setIsFilterFormVisible on button click', () => {
    const onFindClickedCallback = jest.fn()
    render(<FilterForm onFindClicked={onFindClickedCallback} dietLabels={['vegan']}
    allergiesLabels={['egg-free']} cuisineTypes={['mexican']} />)
    const button = screen.getByRole('button', { name: 'Refine your search down-caret' })
    userEvent.click(button)
    expect(onFindClickedCallback).not.toHaveBeenCalled()
    expect(screen.getByText('vegan')).toBeInTheDocument()
    expect(screen.getByText('egg-free')).toBeInTheDocument()
    expect(screen.getByText('mexican')).toBeInTheDocument()

  })
  it('set checkbox on checked by click', () => {
    const onFindClickedCallback = jest.fn()
    render(<FilterForm onFindClicked={onFindClickedCallback} dietLabels={['vegan']}
    allergiesLabels={['egg-free']} cuisineTypes={['mexican']} />)
    const button = screen.getByRole('button', { name: 'Refine your search down-caret' })
    userEvent.click(button)
    expect(onFindClickedCallback).not.toHaveBeenCalled()
    userEvent.click(screen.getByLabelText('vegan'))
    expect(screen.getByLabelText('vegan')).toBeChecked()
    userEvent.click(screen.getByLabelText('egg-free'))
    expect(screen.getByLabelText('egg-free')).toBeChecked()
    userEvent.click(screen.getByLabelText('mexican'))
    expect(screen.getByLabelText('mexican')).toBeChecked()
  })

  it('calls onSubmit-callback with form data', () => {
    const onFindClickedCallback = jest.fn()
    render(<FilterForm onFindClicked={onFindClickedCallback} dietLabels={['vegan']}
    allergiesLabels={['egg-free']} cuisineTypes={['mexican']} />)
    const button = screen.getByRole('button', { name: 'Refine your search down-caret' })
    userEvent.click(button)
    userEvent.type(screen.getByLabelText('From'), '253')
    userEvent.type(screen.getByLabelText('To'), '353')
    userEvent.click(screen.getByLabelText('vegan'))
    userEvent.click(screen.getByLabelText('mexican'))
    userEvent.click(screen.getByRole('button', {name:'Find'}))
    expect(onFindClickedCallback).toHaveBeenCalledWith(
      '253',
      '353',
      ['vegan'], 
      ['mexican'],
    )
  })

})

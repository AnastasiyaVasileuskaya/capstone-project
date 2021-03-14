import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FilterForm from './FilterForm'

describe('FilterForm', () => {
  it('renders a button and not a form with inputs, checkboxes and two buttons', () => {
    render(<FilterForm />)
    expect(screen.getByLabelText('calories')).not.toBeInTheDocument()
    expect(screen.getByLabelText('checkbox')).not.toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('renders the filter form, if isFilterFormVisible is true', () => {
    render(<FilterForm isFilterFormVisible />)
    expect(screen.getByLabelText('calories')).toBeInTheDocument()
    expect(screen.getByLabelText('checkbox')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('set checkbox on checked by click', () => {
    render(<FilterForm isFilterFormVisible />)
    userEvent.click(screen.getByLabelText('checkbox'))
    expect(screen.getByLabelText('checkbox')).toBeChecked()
  })

  it('set checkbox on not checked by double click', () => {
    const callback = jest.fn()
    render(<FilterForm isFilterFormVisible onChange={callback} />)
    userEvent.dblClick(screen.getByLabelText('checkbox'))
    expect(callback).toHaveBeenCalledTimes(2)
    expect(screen.getByLabelText('checkbox')).not.toBeChecked()
  })

  it('calls onSubmit-callback with form data', () => {
    const callback = jest.fn()
    render(<FilterForm isFilterFormVisible onFindClicked={callback} />)
    userEvent.type(screen.getByLabelText('calories'), '253')

    userEvent.click(screen.getByRole('button'))
    expect(callback).toHaveBeenCalledWith('253')
  })
})

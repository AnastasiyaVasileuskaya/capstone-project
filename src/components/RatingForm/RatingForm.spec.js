import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RatingForm from './RatingForm'

describe('RatingForm', () => {
  it('renders a button and not a stars container and textarea', () => {
    render(<RatingForm isRatingFormVisible={false} />)
    expect(screen.queryByLabelText('Your comment:')).not.toBeInTheDocument()
    expect(screen.queryByTestId('stars')).not.toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: 'Leave the rating for recipe down-caret',
      })
    ).toBeInTheDocument()
  })

  it('calls setIsRatingFormVisible on button click', () => {
    const onAddCommentCallback = jest.fn()
    render(
      <RatingForm
        onAddComment={onAddCommentCallback}
        ratingStars={3}
        ratingComment={'Very tasty'}
      />
    )
    const button = screen.getByRole('button', {
      name: 'Leave the rating for recipe down-caret',
    })
    userEvent.click(button)
    expect(onAddCommentCallback).not.toHaveBeenCalled()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('Very tasty')).toBeInTheDocument()
  })

  it('calls onSubmit-callback with form data', () => {
    const onAddCommentCallback = jest.fn()
    render(
      <RatingForm
        onAddComment={onAddCommentCallback}
        ratingStars={3}
        ratingComment={'Very tasty'}
      />
    )
    const button = screen.getByRole('button', {
      name: 'Leave the rating for recipe down-caret',
    })
    userEvent.click(button)
    userEvent.click(screen.getByTestId('stars'), '3')
    userEvent.type(screen.getByLabelText('Your comment:'), 'Very tasty')
    userEvent.click(screen.getByRole('button', { name: 'Rate' }))
    expect(onAddCommentCallback).toHaveBeenCalledWith('3', 'Very tasty')
  })
})

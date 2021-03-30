import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RatingForm from './RatingForm'

describe('RatingForm', () => {
  it('renders a button and not a stars container and textarea', () => {
    render(<RatingForm isRatingFormVisible={false} />)
    expect(screen.queryByLabelText('Your comment:')).not.toBeInTheDocument()
    expect(screen.queryByTestId('star-1')).not.toBeInTheDocument()
    expect(screen.queryByTestId('star-2')).not.toBeInTheDocument()
    expect(screen.queryByTestId('star-3')).not.toBeInTheDocument()
    expect(screen.queryByTestId('star-4')).not.toBeInTheDocument()
    expect(screen.queryByTestId('star-5')).not.toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: 'Leave the rating for recipe down-caret',
      })
    ).toBeInTheDocument()
  })

  it('open the rating form on button click', () => {
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
    expect(screen.queryByTestId('star-1')).toBeInTheDocument()
    expect(screen.queryByTestId('star-2')).toBeInTheDocument()
    expect(screen.queryByTestId('star-3')).toBeInTheDocument()
    expect(screen.queryByTestId('star-4')).toBeInTheDocument()
    expect(screen.queryByTestId('star-5')).toBeInTheDocument()
    expect(screen.getByText('Very tasty')).toBeInTheDocument()
  })

  it('calls onSubmit-callback with form data', () => {
    const onAddCommentCallback = jest.fn()
    render(
      <RatingForm
        onAddComment={onAddCommentCallback}
        ratingStars={3}
        ratingComment={''}
      />
    )
    const button = screen.getByRole('button', {
      name: 'Leave the rating for recipe down-caret',
    })
    userEvent.click(button)
    let star5 = screen.getByTestId('star-5')
    userEvent.click(star5)
    userEvent.type(screen.getByLabelText('Your comment:'), 'Very tasty')
    userEvent.click(screen.getByRole('button', { name: 'Rate' }))
    expect(onAddCommentCallback).toHaveBeenCalledWith('Very tasty', 5)
  })
})

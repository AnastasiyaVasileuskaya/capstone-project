import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RatingForm from './RatingForm'

describe('RatingForm', () => {
  it('renders the rating form with textarea and stars container', () => {
    const onAddCommentCallback = jest.fn()
    render(
      <RatingForm
        ratingStars={3}
        ratingComment={'Very tasty'}
        onAddComment={onAddCommentCallback}
      />
    )
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
    let star5 = screen.getByTestId('star-5')
    userEvent.click(star5)
    userEvent.type(screen.getByLabelText('Your comment:'), 'Very tasty')
    userEvent.click(screen.getByRole('button', { name: 'Rate' }))
    expect(onAddCommentCallback).toHaveBeenCalledWith('Very tasty', 5)
  })
})

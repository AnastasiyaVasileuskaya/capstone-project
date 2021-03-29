import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom.min'
import Rating from './Rating'

describe('Rating', () => {
  it('renders a card with title, image, number of calories and ingredients of recipe', () => {
    const onRatingChangeCallback = jest.fn()
    render(
      <Rating
        selectedStars={3}
        date="26.3.2021"
        comment="Very tasty"
        onRatingChange={onRatingChangeCallback}
      />,
      {
        wrapper: MemoryRouter,
      }
    )
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('26.3.2021')).toBeInTheDocument()
    expect(screen.getByText('Very tasty')).toBeInTheDocument()
    userEvent.click(screen.getByTestId('edit'))
    expect(onRatingChangeCallback).toHaveBeenCalled()
  })
})

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom.min'
import StarsContainer from './StarsContainer'

describe('StarsContainer', () => {
  it('renders a card with title, image, number of calories and ingredients of recipe', () => {
    const onClickCallback = jest.fn()
    render(<StarsContainer selectedStars={3} onClick={onClickCallback} />, {
      wrapper: MemoryRouter,
    })
    expect(screen.getByText('3')).toBeInTheDocument()
    userEvent.click(screen.getByTestId('star'))
    expect(onClickCallback).toHaveBeenCalled()
  })
})

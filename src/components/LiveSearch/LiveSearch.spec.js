import LiveSearch from './LiveSearch'
import { render, screen } from '@testing-library/react'

describe('LiveSearch', () => {
  const setUserInputCallback = jest.fn()
  it('renders an input', () => {
    render(
      <LiveSearch userInput={'chicken'} setUserInput={setUserInputCallback} />
    )
    expect(screen.getByPlaceholderText(/Search recipe/i)).toBeInTheDocument()
  })
})

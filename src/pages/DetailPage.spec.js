import DetailPage from './DetailPage'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom.min'

describe('DetailPage', () => {
  it('has a button that links to the music page on click', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <WorkoutCard workout={workout} />
      </MemoryRouter>
    )
    expect(screen.getByText(/select/i)).toBeInTheDocument()
  })
})

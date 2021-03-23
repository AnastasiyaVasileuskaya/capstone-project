import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom.min'
import Header from './Header'

describe('Header', () => {
  it('should render a component from props', () => {
    render(
      <Header title="CookIdeas" isVisibleAll={false} isVisibleSaved={false} />,
      {
        wrapper: MemoryRouter,
      }
    )
    expect(screen.getByText('CookIdeas')).toBeInTheDocument()
  })
})

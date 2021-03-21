import HomePage from './HomePage'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom.min'
import userEvent from '@testing-library/user-event'

describe('HomePage', () => {
  it('renders a link with path /saved and multiply recipecards', () => {
    const callback = jest.fn()
    render(
      <HomePage
        onFindClicked={callback}
        dietLabels={['vegan']}
        allergiesLabels={['egg-free']}
        cuisineTypes={['mexican']}
        text={'CookIdeas'}
        recipes={['chicken']}
        onRecipeSearch={callback}
      />,
      {
        wrapper: MemoryRouter,
      }
    )
    expect(screen.getByText(/saved/i)).toHaveAttribute('href', '/saved')
    expect(screen.getByText('Chicken Vesuvio')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const callback = jest.fn()
    render(
      <HomePage
        onFindClicked={callback}
        dietLabels={['vegan']}
        allergiesLabels={['egg-free']}
        cuisineTypes={['mexican']}
        text={'CookIdeas'}
        recipes={['chicken']}
        onRecipeSearch={callback}
      />,
      {
        wrapper: MemoryRouter,
      }
    )
    userEvent(screen.getByText(/saved/i))
    expect(callback).toHaveBeenCalledTimes(1)
  })
})

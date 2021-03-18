import { render, screen } from '@testing-library/react'
import HomePage from '../../pages/HomePage'

it('does not renders the Alert component', () => {
  const callback = jest.fn()
  render(
    <HomePage
      onRecipeSearch={callback}
      text="Alert"
      dietLabels={['vegan']}
      allergiesLabels={['egg-free']}
      cuisineTypes={['mexican']}
      onFindClicked={callback}
      recipes={['chicken']}
    />
  )
  expect(screen.queryByText(/alert/i)).not.toBeInTheDocument()
})

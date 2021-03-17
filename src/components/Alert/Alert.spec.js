import { render, screen } from '@testing-library/react'
import HomePage from '../../pages/HomePage'

it('does not renders the Alert component', () => {
  const Callback = jest.fn()
  render(
    <HomePage
      onRecipeSearch={Callback}
      text="Alert"
      dietLabels={['vegan']}
      allergiesLabels={['egg-free']}
      cuisineTypes={['mexican']}
      onFindClicked={Callback}
      recipes={['chicken']}
    />
  )
  expect(screen.queryByText(/alert/i)).not.toBeInTheDocument()
})

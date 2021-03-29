import { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import DetailPage from '../pages/DetailPage/DetailPage'
import HomePage from '../pages/HomePage/HomePage'
import SavedRecipes from '../pages/SavedRecipes/SavedRecipes'
import Grid from './Grid'
import LandingPage from '../components/LandingPage'

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  window.setTimeout(() => {
    setIsLoaded(true)
  }, 5000)
  return (
    <Switch>
      <Grid>
        <LandingPage isLoaded={isLoaded} />
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/saved">
          <SavedRecipes />
        </Route>
        <Route path="/recipes/:recipeId">
          <DetailPage />
        </Route>
      </Grid>
    </Switch>
  )
}

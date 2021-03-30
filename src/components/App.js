import { Route, Switch } from 'react-router-dom'
import DetailPage from '../pages/DetailPage/DetailPage'
import HomePage from '../pages/HomePage/HomePage'
import SavedRecipes from '../pages/SavedRecipes/SavedRecipes'
import Grid from './Grid'

export default function App() {
  return (
    <Switch>
      <Grid>
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

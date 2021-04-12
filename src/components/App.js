import { Route, Switch } from 'react-router-dom'
import AllRecipesPage from '../pages/AllRecipesPage/AllRecipesPage'
import DetailPage from '../pages/DetailPage/DetailPage'
import HomePage from '../pages/HomePage/HomePage'
import SavedRecipes from '../pages/SavedRecipesPage/SavedRecipesPage'
import Grid from './Grid'
import Header from './Header/Header'
import Navigation from './Navigation/Navigation'

export default function App() {
  return (
    <Grid>
      <Switch>
        <Route exact path="/">
          <Header title="CookIdeas" />
          <HomePage />
        </Route>
        <Route exact path="/recipes">
          <Header title="CookIdeas" />
          <AllRecipesPage />
        </Route>
        <Route exact path="/saved">
          <Header title="CookIdeas" />
          <SavedRecipes />
        </Route>
        <Route path="/recipes/:recipeId">
          <Header title="CookIdeas" />
          <DetailPage />
        </Route>
      </Switch>
      <Navigation />
    </Grid>
  )
}

import { Route, Switch } from 'react-router-dom'
import DetailPage from '../pages/DetailPage/DetailPage'
import HomePage from '../pages/HomePage/HomePage'
import SavedRecipes from '../pages/SavedRecipes/SavedRecipes'
import Grid from './Grid'
import Header from './Header/Header'

export default function App() {
  return (
    <Grid>
      <Switch>
        <Route exact path="/">
          <Header
            title="CookIdeas"
            isVisibleSaved={true}
            isVisibleAll={false}
          />
          <HomePage />
        </Route>
        <Route exact path="/saved">
          <Header
            title="CookIdeas"
            isVisibleAll={true}
            isVisibleSaved={false}
          />
          <SavedRecipes />
        </Route>
        <Route path="/recipes/:recipeId">
          <Header title="CookIdeas" isVisibleAll={true} isVisibleSaved={true} />
          <DetailPage />
        </Route>
      </Switch>
    </Grid>
  )
}

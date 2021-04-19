import { Route, Switch } from 'react-router-dom'
import AllRecipesPage from '../pages/AllRecipesPage/AllRecipesPage'
import DetailPage from '../pages/DetailPage/DetailPage'
import HomePage from '../pages/HomePage/HomePage'
import SavedRecipes from '../pages/SavedRecipesPage/SavedRecipesPage'
import createUrlParams from '../services/createUrlParams'
import createUrlParamsFromString from '../services/createUrlParamsFromString'
import Grid from './Grid'
import Header from './Header/Header'
import Navigation from './Navigation/Navigation'

export default function App() {
  let lastKnownUrlParams = createUrlParams('', '', '', [], [])

  function getUrlParams(urlParamsString) {
    if (urlParamsString === '') {
      return lastKnownUrlParams
    }
    let result = createUrlParamsFromString(urlParamsString)
    lastKnownUrlParams = result
    return result
  }

  return (
    <Grid>
      <Switch>
        <Route exact path="/">
          <Header title="CookIdeas" />
          <HomePage />
        </Route>
        <Route
          exact
          path="/recipes"
          render={props => {
            const queryUrlParams = getUrlParams(props.location.search)
            return (
              <>
                <Header title="CookIdeas" />
                <AllRecipesPage urlParams={queryUrlParams} />
              </>
            )
          }}
        ></Route>
        <Route exact path="/saved">
          <Header title="CookIdeas" />
          <SavedRecipes />
        </Route>
        <Route
          path="/recipes/:recipeId"
          render={props => {
            return (
              <>
                <Header title="CookIdeas" />
                <DetailPage
                  recipeId={props.match.params.recipeId}
                  backUrlParams={lastKnownUrlParams}
                />
              </>
            )
          }}
        ></Route>
      </Switch>
      <Navigation />
    </Grid>
  )
}

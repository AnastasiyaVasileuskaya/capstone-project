import { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import DetailPage from '../pages/DetailPage/DetailPage'
import HomePage from '../pages/HomePage/HomePage'
import createUrlQuery from '../services/createUrlQuery'
import getFilters from '../services/getFilters'
import SavedRecipes from '../pages/SavedRecipes/SavedRecipes'
import saveToLocal from '../lib/saveToLocal'
import loadFromLocal from '../lib/loadFromLocal'
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
        <Route
          path="/recipes/:recipeId"
          render={props => (
            <DetailPage
              externalRecipe={getRecipeById(props.match.params.recipeId)}
            />
          )}
        />
      </Grid>
    </Switch>
  )
}

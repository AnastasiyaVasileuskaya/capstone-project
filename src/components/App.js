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
  const [recipes, setRecipes] = useState([])
  const [alert, setAlert] = useState('')
  const [query, setQuery] = useState('chicken')
  const [caloriesRangeFrom, setCaloriesRangeFrom] = useState('')
  const [caloriesRangeTo, setCaloriesRangeTo] = useState('')
  const [healthLabels, setHealthLabels] = useState([])
  const [dishTypes, setDishTypes] = useState([])
  const [url, setUrl] = useState(
    createUrlQuery(
      caloriesRangeFrom,
      caloriesRangeTo,
      query,
      healthLabels,
      dishTypes
    )
  )

  function saveVisitedRecipes() {
    let recipesFromLocalStorage = loadFromLocal('visitedRecipes')
    recipes.forEach(recipe => recipesFromLocalStorage.set(recipe.id, recipe))
    saveToLocal('visitedRecipes', recipesFromLocalStorage)
  }

  async function getRecipes() {
    if (query !== '' && window.location.pathname === '/') {
      let url = createUrlQuery(
        caloriesRangeFrom,
        caloriesRangeTo,
        query,
        healthLabels,
        dishTypes
      )
      const response = await fetch(url)
      const data = await response.json()
      if (data.more && data.hits) {
        setAlert('')
        setRecipes(
          data.hits.map(item => {
            return {
              ...item.recipe,
              id: item.recipe.uri.substr(
                item.recipe.uri.indexOf('#') + 1,
                item.recipe.uri.length - 1
              ),
            }
          })
        )
      } else {
        setAlert('Cannot find such recipe')
        setRecipes([])
      }
    } else {
      setAlert('Please fill the Search Bar')
      setRecipes([])
    }
  }

  useEffect(() => {
    setUrl(
      createUrlQuery(
        caloriesRangeFrom,
        caloriesRangeTo,
        query,
        healthLabels,
        dishTypes
      )
    )
  }, [query, caloriesRangeFrom, caloriesRangeTo, healthLabels, dishTypes])

  useEffect(() => {
    getRecipes()
  }, [url])

  useEffect(() => {
    saveVisitedRecipes()
  }, [recipes])

  function handeFiltersChanged(
    caloriesRangeFrom,
    caloriesRangeTo,
    healthLabels,
    dishTypes
  ) {
    setCaloriesRangeFrom(caloriesRangeFrom)
    setCaloriesRangeTo(caloriesRangeTo)
    setHealthLabels(healthLabels)
    setDishTypes(dishTypes)
  }

  function getRecipeById(id) {
    return recipes.find(recipe => recipe.id === id)
  }
  const { dietLabels, allergiesLabels, cuisineTypes } = getFilters()
  return (
    <Grid>
      <Switch>
        <Route exact path="/">
          <HomePage
            onRecipeSearch={setQuery}
            text={alert}
            dietLabels={dietLabels}
            allergiesLabels={allergiesLabels}
            cuisineTypes={cuisineTypes}
            onFindClicked={handeFiltersChanged}
            recipes={recipes}
          />
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
      </Switch>
    </Grid>
  )
}

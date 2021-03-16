import { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './Header'
import styled from 'styled-components/macro'
import DetailPage from '../pages/DetailPage'
import HomePage from '../pages/HomePage'
import creatUrlQuery from '../services/createUrlQuery'
import getFilters from '../services/getFilters'
require('dotenv').config()

export default function App() {
  const [recipes, setRecipes] = useState([])
  const [alert, setAlert] = useState('')
  const [query, setQuery] = useState('chicken')
  const [caloriesRangeFrom, setCaloriesRangeFrom] = useState('')
  const [caloriesRangeTo, setCaloriesRangeTo] = useState('')
  const [healthLabels, setHealthLabels] = useState([])
  const [dishTypes, setDishTypes] = useState([])
  const [url, setUrl] = useState(
    creatUrlQuery(
      caloriesRangeFrom,
      caloriesRangeTo,
      query,
      healthLabels,
      dishTypes
    )
  )

  async function getRecipes() {
    if (query !== '') {
      let url = creatUrlQuery(
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
      creatUrlQuery(
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
    <>
      <AppGrid>
        <Switch>
          <Route exact path="/">
            <Header title="CookIdeas" />
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
          <Route
            path="/recipes/:recipeId"
            render={props => (
              <DetailPage recipe={getRecipeById(props.match.params.recipeId)} />
            )}
          />
        </Switch>
      </AppGrid>
    </>
  )
}

const AppGrid = styled.div`
  display: grid;
  gap: 20px;
  overflow-y: scroll;
  padding: 20px;
`

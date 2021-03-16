import { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './Header'
import styled from 'styled-components/macro'
import DetailPage from '../pages/DetailPage'
import HomePage from '../pages/HomePage'
require('dotenv').config()

export default function App() {
  const [recipes, setRecipes] = useState([])
  const [alert, setAlert] = useState('')

  const [query, setQuery] = useState('chicken')
  const [caloriesRangeFrom, setCaloriesRangeFrom] = useState('')
  const [caloriesRangeTo, setCaloriesRangeTo] = useState('')
  const [healthLabels, setHealthLabels] = useState([])
  const [dishTypes, setDishTypes] = useState([])

  const [url, setUrl] = useState(creatUrlQuery())

  async function getRecipes() {
    if (query !== '') {
      let url = creatUrlQuery()
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)

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
    setUrl(creatUrlQuery())
  }, [query, caloriesRangeFrom, caloriesRangeTo, healthLabels, dishTypes])

  useEffect(() => {
    getRecipes()
  }, [url])

  function creatUrlQuery() {
    let result = `https://api.edamam.com/search?q=${query}&app_id=${process.env.REACT_APP_EDAMAM_API_ID}&app_key=${process.env.REACT_APP_EDAMAM_API_KEY}&from=0&to=30`
    if (healthLabels.length > 0) {
      result +=
        '&health=' + healthLabels.map(hl => hl.toLowerCase()).join('&health=')
    }
    if (dishTypes.length > 0) {
      result += '&cuisineType=' + dishTypes.join('&cuisineType=')
    }
    if (caloriesRangeFrom.length > 0 && caloriesRangeTo.length > 0) {
      result += '&calories=' + caloriesRangeFrom + '-' + caloriesRangeTo
    }
    return result
  }

  const dietLabels = ['Vegan', 'Vegetarian', 'Low-Sugar']
  const allergiesLabels = [
    'Gluten-free',
    'Egg-free',
    'Dairy-free',
    'Peanut-free',
    'Tree-nut-free',
    'Wheat-free',
  ]
  const cuisineTypes = [
    'Italian',
    'Asian',
    'Mexican',
    'Chinese',
    'French',
    'Indian',
    'Mediterranean',
  ]

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

import { useEffect, useState } from 'react'
import Recipe from './Recipe'
import Header from './Header'
import styled from 'styled-components/macro'
import SearchFilter from './SearchFilter'
import Alert from './Alert'
import CheckboxFilter from './CheckboxFilter'
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

      if (data.more && data.hits) {
        setAlert('')
      } else {
        setAlert('Cannot find recipe with such ingredient')
      }
      setRecipes(data.hits.map(item => item.recipe))
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
      result += '&health=' + healthLabels.join('&health=')
    }
    if (dishTypes.length > 0) {
      result += '&health=' + healthLabels.join('&health=')
    }
    //TODO
    //create a queryString from Data
    return result
  }

  const dietLabels = ['vegan', 'vegetarian', 'low-sugar']
  const allergiesLabels = [
    'gluten-free',
    'egg-free',
    'dairy-free',
    'peanut-free',
    'tree-nut-free',
    'wheat-free',
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

  return (
    <>
      <Header>CookIdeas</Header>
      <AppGrid>
        <SearchFilter onRecipeSearch={setQuery} />
        {alert !== '' && <Alert text={alert} />}
        <CheckboxFilter
          dietLabels={dietLabels}
          allergiesLabels={allergiesLabels}
          cuisineTypes={cuisineTypes}
          onFindClicked={handeFiltersChanged}
        />

        {recipes.map((recipe, index) => (
          <Recipe
            key={index}
            image={recipe.image}
            title={recipe.label}
            calories={recipe.calories}
            servings={recipe.yield}
            ingredients={recipe.ingredientLines.length}
          />
        ))}
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

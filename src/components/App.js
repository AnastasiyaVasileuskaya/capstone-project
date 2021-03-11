import { useEffect, useState } from 'react'
import Recipe from './Recipe'
import Header from './Header'
import styled from 'styled-components/macro'
import SearchFilter from './SearchFilter'
import Alert from './Alert'
require('dotenv').config()

export default function App() {
  const [recipes, setRecipes] = useState([])
  const [alert, setAlert] = useState('')
  const [query, setQuery] = useState('chicken')
  //const [healthLabels, setHealthLabels] = useState('vegan')

  const [healthLabels, setHealthLabels] = useState([])

  useEffect(() => {
    getRecipes()
  }, [query, healthLabels])

  async function getRecipes() {
    if (query !== '') {
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${process.env.REACT_APP_EDAMAM_API_ID}&app_key=${process.env.REACT_APP_EDAMAM_API_KEY}&from=0&to=30` +
          createHealthFilterUrlQuery()
      )
      const data = await response.json()
      if (data.more) {
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

  function createHealthFilterUrlQuery() {
    if (healthLabels.length > 0) {
      return '&health=' + healthLabels.join('&health=')
    }
    return ''
  }

  function handleClick(e) {
    const clickedFilter = e.target.value
    const isFilterChecked = e.target.checked

    let newArray
    if (!isFilterChecked) {
      newArray = []
      healthLabels.forEach(e => {
        if (e !== clickedFilter) {
          newArray.push(e)
        }
      })
    } else {
      newArray = healthLabels.slice()
      newArray.push(clickedFilter)
    }
    setHealthLabels(newArray)
  }

  return (
    <>
      <Header>CookIdeas</Header>
      <AppGrid>
        <SearchFilter onRecipeSearch={setQuery} />
        {alert !== '' && <Alert text={alert} />}
        <label for="diet">Choose a diet:</label>
        <select
          name="diet"
          id="diet"
          onChange={e => setHealthLabels(e.target.value)}
        >
          <option value="vegan">Vegan</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="low-sugar">Low-Sugar</option>
          <option value="wheat-free">wheat-free</option>
          <option value="tree-nut-free">tree-nut-free</option>
          <option value="peanut-free">peanut-free</option>
          <option value="gluten-free">gluten-free</option>
          <option value="egg-free"> egg-free</option>
          <option value="dairy-free">dairy-free</option>
        </select>

        <label>
          <input type="checkbox" value="low-sugar" onClick={handleClick} />
          Low-Sugar
        </label>
        <label>
          <input type="checkbox" value="egg-free" onClick={handleClick} />
          egg-free
        </label>
        <label>
          <input type="checkbox" value="vegetarian" onClick={handleClick} />
          Vegetarian
        </label>
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

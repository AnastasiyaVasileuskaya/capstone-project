import { useEffect, useState } from 'react'
import Recipe from './Recipe'
import Header from './Header'
import styled from 'styled-components/macro'
import SearchFilter from './SearchFilter'
import Alert from './Alert'
require('dotenv').config()

export default function App() {
  const [recipes, setRecipes] = useState([])
  const [query, setQuery] = useState('chicken')
  const [alert, setAlert] = useState('')

  function handleSearch(searchQuery) {
    setQuery(searchQuery)
  }

  useEffect(() => {
    getRecipes()
  }, [query])

  async function getRecipes() {
    if (query !== '') {
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${process.env.REACT_APP_EDAMAM_API_ID}&app_key=${process.env.REACT_APP_EDAMAM_API_KEY}&from=0&to=30`
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

  return (
    <>
      <Header>CookIdeas</Header>
      <AppGrid>
        <SearchFilter onRecipeSearch={handleSearch} />
        {alert !== '' && <Alert alert={alert} />}
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

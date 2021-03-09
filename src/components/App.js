import { useEffect, useState } from 'react'
import Recipe from './Recipe'
import Header from './Header'
import styled from 'styled-components/macro'
require('dotenv').config()

export default function App() {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    getRecipes()
  }, [])

  async function getRecipes() {
    const response = await fetch(
      `https://api.edamam.com/search?q=chicken&app_id=${process.env.REACT_APP_EDAMAM_API_ID}&app_key=${process.env.REACT_APP_EDAMAM_API_KEY}&from=0&to=30`
    )
    const data = await response.json()
    setRecipes(data.hits.map(item => item.recipe))
  }

  return (
    <>
      <Header>CookIdeas</Header>
      <AppGrid>
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

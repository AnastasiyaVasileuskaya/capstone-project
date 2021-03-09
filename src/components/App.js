import { useEffect, useState } from 'react'
import Recipe from './Recipe'
import Header from './Header'
import styled from 'styled-components/macro'
const { REACT_APP_EDAMAM_API_ID } = process.env
const { REACT_APP_EDAMAM_API_KEY } = process.env
require('dotenv').config()

export default function App() {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    getRecipes()
  }, [])

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=chicken&app_id=${REACT_APP_EDAMAM_API_ID}&app_key=${REACT_APP_EDAMAM_API_KEY}&from=0&to=30`
    )
    const data = await response.json()
    console.log(data)
    setRecipes(data.hits)
  }

  return (
    <>
      <Header>CookIdeas</Header>
      <AppGrid>
        {recipes.map((recipe, index) => (
          <Recipe
            key={index}
            image={recipe.recipe.image}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            ingredients={recipe.recipe.ingredientLines.length}
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

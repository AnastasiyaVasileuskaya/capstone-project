import { useEffect, useState } from 'react'
import chickenrecipes from '../chickenrecipes'
import Recipe from './Recipe'
import styled from 'styled-components/macro'

export default function App() {
  //const APP_ID = '6479597c'
  //const APP_KEY = 'a0fa79a5ef5eb647c54dc8ba7a520691'

  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    getRecipes()
  }, [])

  const getRecipes = () => {
    const data = chickenrecipes()
    console.log(data.hits)
    setRecipes(data.hits)
  }

  /*
 const getRecipes = async () => {
   const response = await fetch(
     `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`
   )
   const data = await response.json()
   setRecipes(data.hits);
 }
 */
  return (
    <>
      <AppGrid>
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label}
            image={recipe.recipe.image}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
          />
        ))}
      </AppGrid>
    </>
  )
}

const AppGrid = styled.div`
  display: grid;
  gap: 20px;
  padding: 20px;
`

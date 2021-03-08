import { useEffect, useState } from 'react'
import recipes from './recipes'
import Recipe from './Recipe'

function App() {
  //const APP_ID = '6479597c'
  //const APP_KEY = 'a0fa79a5ef5eb647c54dc8ba7a520691'

  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    getRecipes()
  }, [])

  const getRecipes = () => {
    const data = recipes()
    //createModel(data)
    console.log(data)
  }

  /*
 const getRecipes = async () => {
   const response = await fetch(
     `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`
   )
   const data = await response.json()
   console.log(data)
   createModel(data);
 }
 */
  return <div className="App"></div>
}
function createModel(data) {}
export default App

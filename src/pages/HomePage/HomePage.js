import styled from 'styled-components/macro'
import Alert from '../../components/Alert/Alert'
import FilterForm from '../../components/FilterForm/FilterForm'
import Header from '../../components/Header/Header'
import Recipe from '../../components/Recipe/Recipe'
import SearchBar from '../../components/SearchBar/SearchBar'

export default function HomePage({
  onRecipeSearch,
  text,
  dietLabels,
  allergiesLabels,
  cuisineTypes,
  onFindClicked,
  recipes,
}) {
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

  const { dietLabels, allergiesLabels, cuisineTypes } = getFilters()
  return (
    <>
      <Header title="CookIdeas" isVisibleSaved={true} />
      <PageLayout>
        <SearchBar onRecipeSearch={onRecipeSearch} />
        <Alert text={text} />
        <FilterForm
          dietLabels={dietLabels}
          allergiesLabels={allergiesLabels}
          cuisineTypes={cuisineTypes}
          onFindClicked={onFindClicked}
        />
        {recipes.map(recipe => (
          <Recipe key={recipe.id} recipe={recipe} />
        ))}
        <CardFinal></CardFinal>
      </PageLayout>
    </>
  )
}

const PageLayout = styled.main`
  display: grid;
  gap: 20px;
  overflow-y: scroll;
  padding: 20px;
  grid-auto-rows: min-content;
`
const CardFinal = styled.div`
  padding-bottom: 5px;
`

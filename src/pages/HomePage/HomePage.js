import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import Alert from '../../components/Alert/Alert'
import FilterForm from '../../components/FilterForm/FilterForm'
import Header from '../../components/Header/Header'
import Recipe from '../../components/Recipe/Recipe'
import SearchBar from '../../components/SearchBar/SearchBar'
import useLocalStorage from '../../hooks/useLocalStorage'
import createInitialUrlParams from '../../services/createInitialUrlParams'
import createUrlParams from '../../services/createUrlParams'
import createUrlQuery from '../../services/createUrlQuery'

export default function HomePage() {
  const [recipes, setRecipes] = useState([])
  const [alert, setAlert] = useState('')
  const [urlParams, setUrlParams] = useLocalStorage(
    'cookIdeasUrlParams',
    createInitialUrlParams()
  )
  const [url, setUrl] = useState(createUrlQuery(urlParams))

  useEffect(() => {
    setUrl(createUrlQuery(urlParams))
  }, [urlParams])

  useEffect(() => {
    getRecipes()
  }, [url])

  if (recipes.length === 0) {
    return (
      <>
        <Header title="CookIdeas" isVisibleAll={true} isVisibleSaved={true} />
        <TextWrapper>Loading...</TextWrapper>
      </>
    )
  }

  async function getRecipes() {
    if (urlParams.query !== '') {
      const response = await fetch(url)
      const data = await response.json()
      if (data.more && data.hits) {
        setAlert('')
        setRecipes(data.hits.map(item => item.recipe))
      } else {
        setAlert('Cannot find such recipe')
        setRecipes([])
      }
    } else {
      setAlert('Please fill the Search Bar')
      setRecipes([])
    }
  }

  function handeFiltersChanged(
    caloriesRangeFrom,
    caloriesRangeTo,
    healthLabels,
    dishTypes
  ) {
    setUrlParams(
      createUrlParams(
        urlParams.query,
        caloriesRangeFrom,
        caloriesRangeTo,
        healthLabels,
        dishTypes
      )
    )
  }

  function handleQueryChange(query) {
    setUrlParams(
      createUrlParams(
        query,
        urlParams.caloriesRangeFrom,
        urlParams.caloriesRangeTo,
        urlParams.healthLabels,
        urlParams.dishTypes
      )
    )
  }

  return (
    <>
      <Header title="CookIdeas" isVisibleSaved={true} />
      <PageLayout>
        <SearchBar
          initialQuery={urlParams.query}
          onRecipeSearch={handleQueryChange}
        />
        <Alert text={alert} />
        <FilterForm filters={urlParams} onFindClicked={handeFiltersChanged} />
        {recipes.map(recipe => (
          <Recipe key={recipe.uri} recipe={recipe} />
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
const TextWrapper = styled.div`
  display: grid;
  padding: 20px;
`

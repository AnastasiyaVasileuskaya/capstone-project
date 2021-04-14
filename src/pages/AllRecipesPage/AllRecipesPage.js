import { useEffect, useState, useLayoutEffect } from 'react'
import styled from 'styled-components/macro'
import useLocalStorage from '../../hooks/useLocalStorage'
import fadeIn from '../../lib/fadeIn'
import createInitialUrlParams from '../../services/createInitialUrlParams'
import createUrlParams from '../../services/createUrlParams'
import createUrlQuery from '../../services/createUrlQuery'
import Alert from '../../components/Alert/Alert'
import FilterForm from '../../components/FilterForm/FilterForm'
import Recipe from '../../components/Recipe/Recipe'
import SearchBar from '../../components/SearchBar/SearchBar'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'
import loadFromLocal from '../../lib/loadFromLocal'
import { useHistory } from 'react-router'

export default function AllRecipesPage() {
  const history = useHistory()
  const [recipes, setRecipes] = useState([])
  const [alert, setAlert] = useState('')
  /*const [urlParams, setUrlParams] = useLocalStorage(
    'cookIdeasUrlParams',
    getUrlParams()
  )*/
  const [urlParams, setUrlParams] = useState(getUrlParams())
  const [url, setUrl] = useState(createUrlQuery(urlParams))

  useLayoutEffect(() => {
    fadeIn()
  }, [])

  useEffect(() => {
    getRecipes()
  }, [url])

  async function getRecipes() {
    if (urlParams.query !== '') {
      const response = await fetch(url)
      const data = await response.json()
      if (data.more && data.hits) {
        setAlert('')
        setRecipes(data.hits.map(item => item.recipe))
      } else {
        setAlert(
          'Cannot find such recipe!Try changing search query or/and filters.'
        )
        setRecipes([])
      }
    }
  }

  function getUrlParams() {
    if (history.location.state?.urlParams) {
      return history.location.state?.urlParams
    }
    if (history.location.search) {
      const urlParams = new URLSearchParams(history.location.search)
      const query = urlParams.get('query')
      if (query) {
        return createUrlParams(query, '', '', [], [])
      }
    }
    return createInitialUrlParams()
  }

  function getUrlParams1() {
    if (history.location.state?.urlParams) {
      return history.location.state?.urlParams
    }
    const localStorageUrlParams = loadFromLocal('cookIdeasUrlParams')
    if (history.location.search) {
      const urlParams = new URLSearchParams(history.location.search)
      const query = urlParams.get('query')
      if (query === localStorageUrlParams?.query) {
        return localStorageUrlParams
      }
      return createUrlParams(query, '', '', [], [])
    }
    return localStorageUrlParams ?? createInitialUrlParams()
  }

  function handleFiltersChanged(filtersParams) {
    setUrlParams(
      createUrlParams(
        urlParams.query,
        filtersParams.caloriesRangeFrom,
        filtersParams.caloriesRangeTo,
        filtersParams.healthLabels,
        filtersParams.dishTypes
      )
    )
  }

  function handleQueryChange_old(query) {
    if (query !== urlParams.query) {
      setUrlParams(createUrlParams(query, '', '', [], []))
    } else {
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
    setUrl(createUrlQuery(urlParams))
  }

  function handleQueryChange(query) {
    if (query !== urlParams.query) {
      history.push(history.location.pathname, {
        urlParams: createUrlParams(query, '', '', [], []),
      })
    } else {
      history.push(history.location.pathname, {
        urlParams: createUrlParams(
          query,
          urlParams.caloriesRangeFrom,
          urlParams.caloriesRangeTo,
          urlParams.healthLabels,
          urlParams.dishTypes
        ),
      })
    }
  }

  function handleFindClick(e) {
    const newUrlParams = {
      ...urlParams,
      ...{ query: document.getElementsByName('query')[0].value },
    }

    history.push(history.location.pathname, { urlParams: newUrlParams })
    //setUrl(createUrlQuery(urlParams))
  }

  return (
    <PageLayout data-testid="recipes">
      <SearchBar
        initialQuery={urlParams.query}
        onRecipeSearch={handleQueryChange}
        data-testid="searchbar"
      />
      <FilterForm
        filters={urlParams}
        onFindClicked={handleFindClick}
        onFiltersChanged={handleFiltersChanged}
      />
      <Alert text={alert} />
      {recipes.map(recipe => (
        <Recipe
          className="recipe"
          selectedStars={0}
          comment={''}
          key={recipe.uri}
          recipe={recipe}
        />
      ))}
      <ScrollToTop />
    </PageLayout>
  )
}

const PageLayout = styled.main`
  display: grid;
  gap: 20px;
  overflow-y: scroll;
  padding: 20px;
  grid-auto-rows: min-content;
  &:after {
    content: '';
    height: 2px;
  }
`

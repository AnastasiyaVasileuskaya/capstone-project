import { useEffect, useState, useLayoutEffect } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components/macro'
import fadeIn from '../../lib/fadeIn'
import createUrlParams from '../../services/createUrlParams'
import createUrlQuery from '../../services/createUrlQuery'
import Alert from '../../components/Alert/Alert'
import FilterForm from '../../components/FilterForm/FilterForm'
import Recipe from '../../components/Recipe/Recipe'
import SearchBar from '../../components/SearchBar/SearchBar'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'
import isCaloriesInputValid from '../../services/isCaloriesInputValid'

export default function AllRecipesPage({ urlParams }) {
  const history = useHistory()
  const [recipes, setRecipes] = useState([])
  const [alert, setAlert] = useState('')
  const [query, setQuery] = useState(urlParams.query)
  const [filters, setFilters] = useState(urlParams)

  useEffect(() => {
    setQuery(urlParams.query)
    setFilters(urlParams)
    getRecipes()
  }, [urlParams])

  useLayoutEffect(() => {
    fadeIn()
  }, [])

  async function getRecipes() {
    if (!isCaloriesInputValid(urlParams)) {
      setAlert('Your calories input is not valid')
    } else {
      const url = createUrlQuery(urlParams)
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

  function parseUrlParamsToString(urlParams) {
    for (let param in urlParams) {
      if (
        !urlParams[param] ||
        (Array.isArray(urlParams[param]) && urlParams[param].length === 0)
      ) {
        delete urlParams[param]
      }
    }
    return '?' + new URLSearchParams(urlParams).toString()
  }

  function handleSearch() {
    if (query === '') {
      setAlert('Your searchbar is empty')
    } else if (query !== urlParams.query) {
      history.push(history.location.pathname + '?query=' + query)
    } else if (!isCaloriesInputValid(filters)) {
      setAlert('Your calories input is not valid')
    } else {
      const updatedUrlParams = createUrlParams(
        query,
        filters.caloriesRangeFrom,
        filters.caloriesRangeTo,
        filters.healthLabels,
        filters.dishTypes
      )
      history.push(
        history.location.pathname + parseUrlParamsToString(updatedUrlParams)
      )
    }
  }

  return (
    <PageLayout data-testid="recipes">
      <SearchBar
        query={query}
        onChange={query => setQuery(query)}
        onRecipeSearch={handleSearch}
        data-testid="searchbar"
      />
      <FilterForm
        filters={filters}
        onChange={filters => setFilters(filters)}
        onFindClicked={handleSearch}
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

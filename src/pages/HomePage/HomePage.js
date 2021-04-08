import { useEffect, useState, useLayoutEffect, useRef } from 'react'
import styled from 'styled-components/macro'
import Alert from '../../components/Alert/Alert'
import FilterForm from '../../components/FilterForm/FilterForm'
import Recipe from '../../components/Recipe/Recipe'
import SearchBar from '../../components/SearchBar/SearchBar'
import useLocalStorage from '../../hooks/useLocalStorage'
import createInitialUrlParams from '../../services/createInitialUrlParams'
import createUrlParams from '../../services/createUrlParams'
import createUrlQuery from '../../services/createUrlQuery'
import anime from 'animejs'
import ScrollToTop from '../../components/ScrollToTop'

export default function HomePage() {
  const titleRef = useRef()
  const [recipes, setRecipes] = useState([])
  const [alert, setAlert] = useState('')
  const [urlParams, setUrlParams] = useLocalStorage(
    'cookIdeasUrlParams',
    createInitialUrlParams()
  )
  const [url, setUrl] = useState(createUrlQuery(urlParams))
  const fadeIn = () => {
    const fadeIn = anime.timeline()
    fadeIn.add({
      targets: 'main',
      opacity: [0, 1],
      duration: 200,
      easing: 'easeInOutQuad',
    })
  }

  useLayoutEffect(() => {
    fadeIn()
  }, [])
  useEffect(() => {
    setUrl(createUrlQuery(urlParams))
  }, [urlParams])

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
    <PageLayout data-testid="recipeWrapper">
      <SearchBar
        initialQuery={urlParams.query}
        onRecipeSearch={handleQueryChange}
        className="search"
        data-testid="searchbar"
      />
      <FilterForm
        filters={urlParams}
        onFindClicked={handeFiltersChanged}
        ref={titleRef}
        className="filter"
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
      <ScrollToTop className="scrollTop" />
    </PageLayout>
  )
}

const PageLayout = styled.main`
  position: relative;
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

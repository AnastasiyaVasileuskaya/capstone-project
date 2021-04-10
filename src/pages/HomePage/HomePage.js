import { useEffect, useState, useLayoutEffect } from 'react'
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
import recipebook from '../../assets/recipe-book.svg'
import recipe from '../../assets/recipe.svg'
import cooking from '../../assets/cooking.svg'

export default function HomePage() {
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

  if (recipes.length === 0 && urlParams.query === '') {
    return (
      <PageLayout>
        <SearchBar
          initialQuery={urlParams.query}
          onRecipeSearch={handleQueryChange}
          className="search"
          data-testid="searchbar"
        />
        <FilterForm
          filters={urlParams}
          onFindClicked={handeFiltersChanged}
          className="filter"
        />
        <Alert text={alert} />
        <ContentWrapper>
          <h2>Welcome to CookIdeas.</h2>
          Tired of the frozen pizza? With CookIdeas you can get inspiration for
          the new dishes that you can cook.
          <h2>How it works</h2>
          <div>
            <HeaderWrapper>
              <h3>Search by recipe</h3>
              <img src={recipebook} alt="" />
            </HeaderWrapper>
            Just type the recipe name in searchbar, e.g., Chicken Vesuvio, Bean
            soup, and choose a recipe.
          </div>
          <div>
            <HeaderWrapper>
              <h3>Search by ingredients</h3>
              <img src={cooking} alt="" />
            </HeaderWrapper>
            Just type the ingredients in searchbar, e.g., chocolate, eggs, and
            see what comes up.
          </div>
          <div>
            <HeaderWrapper>
              <h3>Filter recipes</h3>
              <img src={recipe} alt="" />
            </HeaderWrapper>
            You can also refine your search by Calories- ,Diet- ,Allergies- and
            Cuisinetypesfilters.
          </div>
        </ContentWrapper>
      </PageLayout>
    )
  }

  return (
    <PageLayout data-testid="recipes">
      <SearchBar
        initialQuery={urlParams.query}
        onRecipeSearch={handleQueryChange}
        className="search"
        data-testid="searchbar"
      />
      <FilterForm
        filters={urlParams}
        onFindClicked={handeFiltersChanged}
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
const ContentWrapper = styled.span`
  h3 {
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: var(--color-orange);
    background-image: var(--gradient-orange);
    background-size: 100%;
    background-repeat: repeat;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
  }
  h2 {
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: var(--color-orange);
    background-image: var(--gradient-orange);
    background-size: 100%;
    background-repeat: repeat;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
  }
  div {
    border: 2px solid lightgrey;
    box-shadow: 7px 6px 28px 1px rgba(0, 0, 0, 0.24);
    margin-bottom: 10px;
    padding: 10px;
  }
`
const HeaderWrapper = styled.span`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
  }
`

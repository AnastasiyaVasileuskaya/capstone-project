import { useState } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components/macro'
import recipebook from '../../assets/recipe-book.svg'
import recipe from '../../assets/recipe.svg'
import cooking from '../../assets/cooking.svg'
import SearchBar from '../../components/SearchBar/SearchBar'

export default function HomePage() {
  const history = useHistory()
  const [query, setQuery] = useState('')

  function handleSearch() {
    history.push('/recipes?query=' + query)
  }

  return (
    <PageLayout>
      <SearchBar
        query={query}
        onRecipeSearch={handleSearch}
        onChange={query => setQuery(query)}
        className="search"
        data-testid="searchbar"
      />
      <ContentWrapper data-testid="content">
        <h2>Welcome to CookIdeas.</h2>
        Tired of the frozen pizza? With CookIdeas you can get inspiration for
        the new dishes that you can cook.
        <h2>How it works</h2>
        <div>
          <HeaderWrapper>
            <h3>Search by recipe</h3>
            <img src={recipebook} alt="recipebook" />
          </HeaderWrapper>
          Just type the recipe name in searchbar, e.g., Chicken Vesuvio, Bean
          soup, and choose a recipe.
        </div>
        <div>
          <HeaderWrapper>
            <h3>Search by ingredients</h3>
            <img src={cooking} alt="cooking" />
          </HeaderWrapper>
          Just type the ingredients in searchbar, e.g., chocolate, eggs, and see
          what comes up.
        </div>
        <div>
          <HeaderWrapper>
            <h3>Filter recipes</h3>
            <img src={recipe} alt="recipe" />
          </HeaderWrapper>
          You can also refine your search by Calories- ,Diet- ,Allergies- and
          Cuisinetypesfilters.
        </div>
      </ContentWrapper>
    </PageLayout>
  )
}

const PageLayout = styled.main`
  display: grid;
  gap: 5px;
  overflow-y: scroll;
  padding: 20px;
  grid-auto-rows: min-content;
  &:after {
    content: '';
    height: 2px;
  }
`
const ContentWrapper = styled.span`
  h2,
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
  div {
    border: 2px solid lightgrey;
    box-shadow: var(--box-shadow-middle);
    margin-bottom: 15px;
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

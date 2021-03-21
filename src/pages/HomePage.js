import styled from 'styled-components/macro'
import Alert from '../components/Alert/Alert'
import FilterForm from '../components/FilterForm/FilterForm'
import Recipe from '../components/Recipe/Recipe'
import SearchBar from '../components/SearchBar/SearchBar'
import { Link } from 'react-router-dom'
import Header from '../components/Header/Header'

export default function HomePage({
  onRecipeSearch,
  text,
  dietLabels,
  allergiesLabels,
  cuisineTypes,
  onFindClicked,
  recipes,
}) {
  return (
    <PageLayout>
      <SearchBar onRecipeSearch={onRecipeSearch} />
      <Alert text={text} />
      <LinkWrapper to={'/saved'}>Saved Recipes</LinkWrapper>
      <FilterForm
        dietLabels={dietLabels}
        allergiesLabels={allergiesLabels}
        cuisineTypes={cuisineTypes}
        onFindClicked={onFindClicked}
      />
      {recipes.map(recipe => (
        <Recipe key={recipe.id} recipe={recipe} />
      ))}
    </PageLayout>
  )
}

const PageLayout = styled.main`
  display: grid;
  gap: 20px;
  overflow-y: scroll;
  padding: 20px;
`
const LinkWrapper = styled(Link)`
  text-decoration: none;
`

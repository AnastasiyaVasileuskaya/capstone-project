import styled from 'styled-components/macro'
import Alert from '../components/Alert'
import FilterForm from '../components/FilterForm'
import Recipe from '../components/Recipe'
import SearchBar from '../components/SearchBar'

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
    <>
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
      </PageLayout>
    </>
  )
}

const PageLayout = styled.div`
  display: grid;
  gap: 20px;
  overflow-y: scroll;
  padding: 20px;
`

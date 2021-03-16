import styled from 'styled-components/macro'
import Alert from '../components/Alert'
import FilterForm from '../components/FilterForm'
import Recipe from '../components/Recipe'
import SearchBar from '../components/SearchBar'
import { NavLink } from 'react-router-dom'

export default function HomePage(props) {
  const {
    detailId,
    onRecipeSearch,
    text,
    dietLabels,
    allergiesLabels,
    cuisineTypes,
    onFindClicked,
    recipes,
  } = props.recipe
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

        {recipes.map((recipe, index) => (
          <Recipe
            as={NavLink}
            exact
            to={{
              pathname: `/${detailId}`,
              recipe: props.recipe,
            }}
            key={index}
            image={recipe.image}
            title={recipe.label}
            calories={recipe.calories}
            servings={recipe.yield}
            ingredients={recipe.ingredientLines.length}
          />
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

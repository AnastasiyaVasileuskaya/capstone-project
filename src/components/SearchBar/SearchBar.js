import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import Icon from 'supercons'
import Button from '../Button/Button'

export default function SearchBar({ onRecipeSearch }) {
  SearchBar.propTypes = {
    onRecipeSearch: PropTypes.func,
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        placeholder="enter ingredient,e.g. chicken"
        name="recipe"
        maxlength="30"
        autocomplete="off"
      />
      <SearchButton>
        <Icon glyph="search" size={33} />
      </SearchButton>
    </Form>
  )

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.target
    const input = form.elements.recipe
    const recipe = input.value
    onRecipeSearch(recipe)
  }
}

const SearchButton = styled(Button)`
  display: grid;
  place-items: center;
  width: 60px;
  height: 40px;
  border-radius: 0;
`
const Form = styled.form`
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;
`

const Input = styled.input`
  border: 2px solid var(--color-lightorange);
  display: block;
  border-radius: 0;
`

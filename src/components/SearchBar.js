import Button from './Button'
import styled from 'styled-components/macro'
import Icon from 'supercons'

export default function SearchBar({ onRecipeSearch }) {
  return (
    <Form onSubmit={handleSubmit}>
      <Input
        placeholder="enter ingredient,e.g. chicken"
        name="recipe"
        maxlength="30"
        autocomplete="off"
      />
      <SearchButton>
        <Icon glyph="search" size={25} />
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
`

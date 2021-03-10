import Button from './Button'
import styled from 'styled-components/macro'

export default function SearchFilter({ onRecipeSearch }) {
  return (
    <Form onSubmit={handleSubmit}>
      <Input
        placeholder="e.g chicken"
        name="recipe"
        type="text"
        maxlength="30"
        autocomplete="off"
      />
      <Button type="submit">Search</Button>
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

const Form = styled.form`
  display: flex;
  justify-content: center;
`

const Input = styled.input`
  border: 2px solid var(--color-lightorange);
`

import Button from './Button'
import styled from 'styled-components/macro'

export default function SearchFilter({ onSearch, search, onUpdateSearch }) {
  return (
    <Form onSubmit={onSearch}>
      <Input
        placeholderText="e.g chocolate,bean,banana"
        name="recipe"
        value={search}
        onChange={onUpdateSearch}
        type="text"
      />
      <Button type="submit">Search</Button>
    </Form>
  )
}

const Form = styled.form`
  display: flex;
  justify-content: center;
`

const Input = styled.input`
  border: 2px solid #bbb;
`

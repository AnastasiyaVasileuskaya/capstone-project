import PropTypes from 'prop-types'
import { useState } from 'react'
import styled from 'styled-components/macro'
import Icon from 'supercons'
import Button from '../Button/Button'
import { IconContext } from 'react-icons'
import { AiOutlineCloseCircle } from 'react-icons/ai'

export default function SearchBar({ initialQuery, onRecipeSearch }) {
  const [query, setQuery] = useState(initialQuery)
  SearchBar.propTypes = {
    onRecipeSearch: PropTypes.func,
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        placeholder="enter ingredient"
        name="query"
        maxLength="30"
        type="search"
        autocomplete="off"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <IconContext.Provider value={{ size: '25px', color: 'grey' }}>
        <DeleteButtonWrapper isVisible={query.length >= 1}>
          <AiOutlineCloseCircle onClick={e => setQuery('')} />
        </DeleteButtonWrapper>
      </IconContext.Provider>
      <SearchButton>
        <Icon glyph="search" size={33} />
      </SearchButton>
    </Form>
  )

  function handleSubmit(event) {
    event.preventDefault()
    onRecipeSearch(query)
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
  input[type='search']::-webkit-search-cancel-button {
    -webkit-appearance: none;
    width: 10px;
    height: 16px;
  }
`

const Input = styled.input`
  border: 2px solid var(--color-lightorange);
  border-radius: 0;
  position: relative;
  padding-right: 16px;
  box-sizing: border-box;
`
const DeleteButtonWrapper = styled.span`
  position: absolute;
  top: 7px;
  right: 65px;
  width: 16px;
  height: 16px;
  cursor: pointer;
  display: ${props => (props.isVisible ? 'block' : 'none')};
`

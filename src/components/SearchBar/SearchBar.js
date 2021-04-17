import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import Icon from 'supercons'
import { IconContext } from 'react-icons'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import Button from '../Button/Button'

export default function SearchBar({ initialQuery, onRecipeSearch, onChange }) {
  const [isError, setIsError] = useState(false)
  const [query, setQuery] = useState(initialQuery ?? '')

  SearchBar.propTypes = {
    initialQuery: PropTypes.string,
    onRecipeSearch: PropTypes.func,
  }

  useEffect(() => {
    setQuery(initialQuery ?? '')
  }, [initialQuery])

  function handleSubmit(event) {
    event.preventDefault()
    if (query === '') {
      setIsError(true)
    } else {
      onRecipeSearch(query)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        placeholder="Search recipe..."
        name="query"
        maxLength="30"
        type="search"
        autoComplete="off"
        value={query}
        onChange={event => setQuery(event.target.value)}
        className={isError ? 'error' : ''}
        onChange={event => onChange(event.target.value)}
        required
        data-testid="searchbar"
      />
      <IconContext.Provider value={{ size: '25px', color: 'grey' }}>
        <DeleteButtonWrapper
          isVisible={query.length >= 1}
          data-testid="delete-searchquery"
        >
          <AiOutlineCloseCircle onClick={event => setQuery('')} />
        </DeleteButtonWrapper>
      </IconContext.Provider>
      <SearchButton data-testid="search">
        <Icon className="search" glyph="search" size={33} />
      </SearchButton>
    </Form>
  )
}

const Form = styled.form`
  display: flex;
  position: relative;
  input[type='search']::-webkit-search-cancel-button {
    -webkit-appearance: none;
    width: 15px;
    height: 15px;
  }
`

const Input = styled.input`
  border: 2px solid var(--color-lightorange);
  padding-right: 16px;
  box-shadow: var(--box-shadow-middle);
  .error {
    border: 2px solid red;
  }
`

const DeleteButtonWrapper = styled.span`
  position: absolute;
  top: 7px;
  right: 70px;
  width: 15px;
  height: 15px;
  cursor: pointer;
  display: ${props => (props.isVisible ? 'block' : 'none')};
`

const SearchButton = styled(Button)`
  width: 60px;
  border-radius: 0;
  .search {
    position: absolute;
    top: 3px;
    right: 12px;
  }
`

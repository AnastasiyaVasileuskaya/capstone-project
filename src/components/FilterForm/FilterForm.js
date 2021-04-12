import { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import Icon from 'supercons'
import getFilters from '../../services/getFilters'
import scrollToTop from '../../lib/scrollToTop'
import Button from '../Button/Button'
import Alert from '../Alert/Alert'

export default function FilterForm({
  filters,
  onFiltersChanged,
  onFindClicked,
}) {
  const [alert, setAlert] = useState('')
  const [isFilterFormVisible, setIsFilterFormVisible] = useState(false)

  const { dietLabels, allergiesLabels, cuisineTypes } = getFilters()

  FilterForm.propTypes = {
    dietLabels: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    allergiesLabels: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    cuisineTypes: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    onFindClicked: PropTypes.func,
  }

  function createFiltersParams(
    caloriesRangeFrom,
    caloriesRangeTo,
    healthLabels,
    dishTypes
  ) {
    return {
      caloriesRangeFrom: caloriesRangeFrom,
      caloriesRangeTo: caloriesRangeTo,
      healthLabels: healthLabels,
      dishTypes: dishTypes,
    }
  }

  function isCaloriesStateValid() {
    return (
      (filters.caloriesRangeFrom === '' && filters.caloriesRangeTo === '') ||
      (filters.caloriesRangeFrom !== '' && filters.caloriesRangeTo === '') ||
      (filters.caloriesRangeFrom === '' && filters.caloriesRangeTo !== '') ||
      (filters.caloriesRangeFrom !== '' &&
        filters.caloriesRangeTo !== '' &&
        filters.caloriesRangeFrom <= filters.caloriesRangeTo)
    )
  }

  function onFormChanged(event) {
    let filtersParams = createFiltersParams('', '', [], [])
    let formElements = event.target.form.elements
    let formElementsArray = Array.from(formElements)
    formElementsArray.forEach(element => {
      if (element.type === 'checkbox' || element.type === 'number') {
        if (element.name === 'caloriesRangeFrom') {
          filtersParams.caloriesRangeFrom = element.value
        } else if (element.name === 'caloriesRangeTo') {
          filtersParams.caloriesRangeTo = element.value
        } else if (
          element.getAttribute('filter-type') === 'health-labels' &&
          element.checked
        ) {
          filtersParams.healthLabels.push(element.value)
        } else if (
          element.getAttribute('filter-type') === 'cuisine-types' &&
          element.checked
        ) {
          filtersParams.dishTypes.push(element.value)
        }
      }
    })
    onFiltersChanged(filtersParams)
  }

  function handleSubmit(event) {
    if (isCaloriesStateValid()) {
      onFindClicked()
      setIsFilterFormVisible(false)
      scrollToTop()
    } else {
      setAlert('Your calories input is not valid')
      scrollToTop()
    }
  }

  function resetState() {
    onFiltersChanged(createFiltersParams('', '', [], []))
    setAlert('')
  }

  return (
    <FilterContainer>
      <FilterButton
        onClick={event => {
          event.stopPropagation()
          setIsFilterFormVisible(!isFilterFormVisible)
        }}
        data-testid="filter-button"
      >
        Refine your search
        <Icon
          glyph={isFilterFormVisible ? 'up-caret' : 'down-caret'}
          size={25}
        />
      </FilterButton>
      {isFilterFormVisible && (
        <FilterWrapper data-testid="filter-form">
          <AlertWrapper>
            <Alert text={alert} />
          </AlertWrapper>
          <LabelWrapper>Calories</LabelWrapper>
          <CaloriesContainer>
            <label>
              From
              <input
                name="caloriesRangeFrom"
                type="number"
                maxLength="4"
                placeholder="100"
                autoComplete="off"
                value={filters.caloriesRangeFrom}
                onChange={onFormChanged}
              />
            </label>
            <label>
              To
              <input
                name="caloriesRangeTo"
                type="number"
                maxLength="4"
                placeholder="300"
                autoComplete="off"
                value={filters.caloriesRangeTo}
                onChange={onFormChanged}
              />
            </label>
          </CaloriesContainer>
          <LabelWrapper>Diet</LabelWrapper>
          <CheckboxContainer>
            {dietLabels.map((item, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  value={item}
                  filter-type="health-labels"
                  checked={filters.healthLabels.includes(item)}
                  onChange={onFormChanged}
                />
                <CheckboxLabel>{item}</CheckboxLabel>
              </label>
            ))}
          </CheckboxContainer>
          <LabelWrapper>Allergies</LabelWrapper>
          <CheckboxContainer>
            {allergiesLabels.map((item, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  filter-type="health-labels"
                  value={item}
                  checked={filters.healthLabels.includes(item)}
                  onChange={onFormChanged}
                />
                <CheckboxLabel>{item}</CheckboxLabel>
              </label>
            ))}
          </CheckboxContainer>
          <LabelWrapper>Cuisine</LabelWrapper>
          <CheckboxContainer>
            {cuisineTypes.map((item, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  filter-type="cuisine-types"
                  value={item}
                  checked={filters.dishTypes.includes(item)}
                  onChange={onFormChanged}
                />
                <CheckboxLabel>{item}</CheckboxLabel>
              </label>
            ))}
          </CheckboxContainer>
          <ButtonWrapper>
            <ClearButton
              type="button"
              onClick={resetState}
              data-testid="clear-button"
            >
              Clear
            </ClearButton>
            <Button onClick={handleSubmit} data-testid="find-button">
              Find
            </Button>
          </ButtonWrapper>
        </FilterWrapper>
      )}
    </FilterContainer>
  )
}

const FilterContainer = styled.span`
  display: grid;
  position: relative;
`

const FilterButton = styled(Button)`
  display: flex;
  place-items: center;
  justify-content: center;
`

const FilterWrapper = styled.form`
  transition: all 0.5s;
  box-shadow: var(--box-shadow-middle);
  background: var(--color-beige);
  border-radius: 5px;
  padding-top: 15px;
  padding-left: 15px;
  position: absolute;
  z-index: 15;
  width: 100%;
  top: 100%;
`

//Proverit
const AlertWrapper = styled.span`
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
`

const LabelWrapper = styled.span`
  font-weight: 500;
  font-size: 1.1em;
  padding-left: 10px;
  color: var(--color-orange);
`

const CaloriesContainer = styled.span`
  display: flex;
  justify-content: space-evenly;
  margin-left: -16px;
  margin-top: 10px;
  margin-bottom: 10px;
  input {
    margin-left: 10px;
    width: 53px;
    height: 30px;
    border: 2px solid var(--color-warmorange);
    ::placeholder {
      color: #c2c2c2;
      opacity: 1;
    }
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

const CheckboxContainer = styled.span`
  position: relative;
  display: grid;
  gap: 15px;
  padding: 10px;
  input[type='checkbox'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    display: inline-block;
    width: 30px;
    height: 30px;
    padding: 6px;
    background-clip: content-box;
    border: 2px solid var(--color-warmorange);
    border-radius: 6px;
    background-color: var(--color-grey);
    margin-left: 15px;
    margin-right: 15px;
    &:checked {
      background-color: var(--color-orange);
    }
  }
`

const CheckboxLabel = styled.span`
  position: absolute;
  margin-top: 5px;
`

const ButtonWrapper = styled.span`
  display: grid;
  gap: 20px;
  margin: 10px 15px 30px 15px;
`

const ClearButton = styled(Button)`
  color: black;
  background: var(--color-lightgrey);
`

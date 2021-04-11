import { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import Icon from 'supercons'
import Button from '../Button/Button'
import Alert from '../Alert/Alert'
import getFilters from '../../services/getFilters'

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

  function resetState() {
    onFiltersChanged(createFiltersParams('', '', [], []))
    setAlert('')
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

  function onFormChanged(e) {
    let filtersParams = createFiltersParams('', '', [], [])
    let formElements = e.target.form.elements
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

  function scrollToTop() {
    document.getElementsByTagName('main')[0].scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  function handleSubmit(e) {
    if (isCaloriesStateValid()) {
      onFindClicked()
      setIsFilterFormVisible(false)
      scrollToTop()
    } else {
      setAlert('Your calories input is not valid')
      scrollToTop()
    }
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
        <IconWrapper>
          Refine your search
          <Icon
            glyph={isFilterFormVisible ? 'up-caret' : 'down-caret'}
            size={25}
          />
        </IconWrapper>
      </FilterButton>
      {isFilterFormVisible && (
        <FilterWrapper data-testid="filter-form">
          <AlertWrapper>
            <Alert text={alert} />
          </AlertWrapper>
          <Checkboxwrapper>
            <LabelWrapper>Calories</LabelWrapper>
            <CaloriesContainer>
              <div>
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
              </div>
              <div>
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
              </div>
            </CaloriesContainer>
            <LabelWrapper>Diet</LabelWrapper>
            <Container>
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
            </Container>
            <LabelWrapper>Allergies</LabelWrapper>
            <Container>
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
            </Container>
            <LabelWrapper>Cuisine</LabelWrapper>
            <Container>
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
            </Container>
          </Checkboxwrapper>
          <ButtonWrapper>
            <ClearButton
              type="button"
              onClick={resetState}
              data-testid="clear-button"
            >
              Clear
            </ClearButton>
            <FindButton onClick={handleSubmit} data-testid="find-button">
              Find
            </FindButton>
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
const IconWrapper = styled.span`
  display: flex;
  justify-content: space-between;
  place-items: center;
`
const FilterButton = styled(Button)`
  display: flex;
  place-items: center;
  justify-content: space-evenly;
  height: 40px;
  background: var(--gradient-orange);
  border-radius: 5px;
  box-shadow: 7px 6px 28px 1px rgba(0, 0, 0, 0.24);
  cursor: pointer;
  outline: none;
  transition: 0.2s all;
  &:active {
    transform: scale(0.98);
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  }
`
const ClearButton = styled(Button)`
  display: grid;
  place-items: center;
  color: black;
  background: var(--color-lightgrey);
  border-radius: 5px;
  box-shadow: 7px 6px 28px 1px rgba(0, 0, 0, 0.24);
  cursor: pointer;
  outline: none;
  transition: 0.2s all;
  &:active {
    transform: scale(0.98);
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  }
`
const FindButton = styled(Button)`
  display: grid;
  place-items: center;
  text-decoration: none;
  border: none;
  color: #fff;
  border-radius: 5px;
  box-shadow: 7px 6px 28px 1px rgba(0, 0, 0, 0.24);
  cursor: pointer;
  outline: none;
  transition: 0.2s all;
  &:active {
    transform: scale(0.98);
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  }
`
const FilterWrapper = styled.form`
  box-shadow: 7px 6px 28px 1px rgba(0, 0, 0, 0.24);
  background: rgb(255, 247, 237);
  display: grid;
  gap: 10px;
  border-radius: 5px;
  padding-top: 5px;
  input {
    margin-right: 20px;
    height: 20px;
    width: 20px;
  }
  position: absolute;
  z-index: 100;
  width: 100%;
  top: 100%;
`
const CaloriesContainer = styled.div`
  font-weight: 400;
  display: flex;
  justify-content: space-evenly;
  input {
    margin-left: 10px;
    width: 53px;
    height: 30px;
    border: 2px solid #ffe5c3;
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
const ButtonWrapper = styled.span`
  display: grid;
  gap: 20px;
  margin: 0 15px 30px 15px;
`
const Container = styled.span`
  position: relative;
  font-weight: 400;
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
    border: 2px solid #ffe5c3;
    border-radius: 6px;
    background-color: #bbbbbb;
    margin-left: 15px;
    margin-right: 15px;
    &:checked {
      background-color: var(--color-orange);
    }
  }
`
const AlertWrapper = styled.span`
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
`
const Checkboxwrapper = styled.div`
  display: grid;
  gap: 10px;
  margin-left: 15px;
`
const CheckboxLabel = styled.span`
  position: absolute;
  margin-top: 5px;
`
const LabelWrapper = styled.span`
  font-weight: 500;
  font-size: 1.1em;
  padding-left: 10px;
  color: var(--color-orange);
`

import { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import Icon from 'supercons'
import Button from '../Button/Button'
import Alert from '../Alert/Alert'
import getFilters from '../../services/getFilters'
export default function FilterForm({ filters, onFindClicked }) {
  const [alert, setAlert] = useState('')
  const [isFilterFormVisible, setIsFilterFormVisible] = useState(false)
  const [caloriesRangeFrom, setCaloriesRangeFrom] = useState(
    filters.caloriesRangeFrom ?? ''
  )
  const [caloriesRangeTo, setCaloriesRangeTo] = useState(
    filters.caloriesRangeTo ?? ''
  )
  const [healthLabels, setHealthLabels] = useState(filters.healthLabels ?? [])
  const [dishTypes, setDishTypes] = useState(filters.dishTypes ?? [])

  const { dietLabels, allergiesLabels, cuisineTypes } = getFilters()

  FilterForm.propTypes = {
    dietLabels: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    allergiesLabels: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    cuisineTypes: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    onFindClicked: PropTypes.func,
  }

  function resetState() {
    setCaloriesRangeFrom('')
    setCaloriesRangeTo('')
    setHealthLabels([])
    setDishTypes([])
    setAlert('')
  }

  function handleHealthFilter(e) {
    handleClick(e, healthLabels, setHealthLabels)
  }

  function handleDishFilter(e) {
    handleClick(e, dishTypes, setDishTypes)
  }

  function isCaloriesStateValid() {
    return (
      (caloriesRangeFrom === '' && caloriesRangeTo === '') ||
      (!isNaN(caloriesRangeFrom) &&
        !isNaN(caloriesRangeTo) &&
        caloriesRangeFrom < caloriesRangeTo)
    )
  }

  function handleClick(e, filter, setFilter) {
    const clickedFilter = e.target.value
    const isFilterChecked = e.target.checked

    let newArray
    if (!isFilterChecked) {
      newArray = []
      filter.forEach(e => {
        if (e !== clickedFilter) {
          newArray.push(e)
        }
      })
    } else {
      newArray = filter.slice()
      newArray.push(clickedFilter)
    }
    setFilter(newArray)
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  function handleSubmit(e) {
    if (isCaloriesStateValid()) {
      onFindClicked(caloriesRangeFrom, caloriesRangeTo, healthLabels, dishTypes)
      setIsFilterFormVisible(false)
      scrollToTop()
    } else {
      setAlert('Your calories input is not valid')
    }
  }

  return (
    <FilterContainer>
      <FilterButton
        onClick={event => {
          event.stopPropagation()
          setIsFilterFormVisible(!isFilterFormVisible)
        }}
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
        <FilterWrapper>
          <Checkboxwrapper>
            <span>Calories</span>
            <CaloriesContainer>
              <div>
                <label>
                  From
                  <input
                    name="caloriesRangeFrom"
                    type="number"
                    maxLength="4"
                    placeholder="100"
                    value={caloriesRangeFrom}
                    onChange={e => setCaloriesRangeFrom(e.target.value)}
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
                    value={caloriesRangeTo}
                    onChange={e => setCaloriesRangeTo(e.target.value)}
                  />
                </label>
              </div>
            </CaloriesContainer>
            <span>Diet</span>
            <Container>
              {dietLabels.map((item, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    value={item}
                    filter-type="health-labels"
                    checked={healthLabels.includes(item)}
                    onChange={handleHealthFilter}
                  />
                  <CheckboxLabel>{item}</CheckboxLabel>
                </label>
              ))}
            </Container>
            <span>Allergies</span>
            <Container>
              {allergiesLabels.map((item, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    filter-type="health-labels"
                    value={item}
                    checked={healthLabels.includes(item)}
                    onChange={handleHealthFilter}
                  />
                  <CheckboxLabel>{item}</CheckboxLabel>
                </label>
              ))}
            </Container>
            <span>Cuisine</span>
            <Container>
              {cuisineTypes.map((item, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    filter-type="cuisine-types"
                    value={item}
                    checked={dishTypes.includes(item)}
                    onChange={handleDishFilter}
                  />
                  <CheckboxLabel>{item}</CheckboxLabel>
                </label>
              ))}
            </Container>
          </Checkboxwrapper>
          <AlertWrapper>
            <Alert text={alert} />
          </AlertWrapper>
          <ButtonWrapper>
            <ClearButton onClick={resetState}>Clear</ClearButton>
            <FindButton onClick={handleSubmit}>Find</FindButton>
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
`
const ClearButton = styled(Button)`
  display: grid;
  place-items: center;
  color: black;
  background-color: var(--color-lightgrey);
`
const FindButton = styled(Button)`
  display: grid;
  place-items: center;
  background: var(--gradient-orange);
`
const FilterWrapper = styled.div`
  background-color: #fffae5;
  display: grid;
  gap: 10px;
  padding-top: 10px;
  input {
    margin-right: 20px;
    height: 20px;
    width: 20px;
  }
  position: absolute;
  z-index: 1;
  width: 100%;
  top: 100%;
`
const CaloriesContainer = styled.div`
  font-weight: 300;
  display: flex;
  justify-content: space-evenly;
  input {
    margin-left: 10px;
    width: 70px;
    height: 30px;
  }
`
const ButtonWrapper = styled.span`
  display: grid;
  gap: 20px;
  margin: 0 15px 20px 15px;
`
const Container = styled.span`
  position: relative;
  font-weight: 300;
  display: grid;
  gap: 15px;
  padding: 10px;
  input[type='checkbox'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    /* create custom checkbox appearance */
    display: inline-block;
    width: 30px;
    height: 30px;
    padding: 6px;
    /* background-color only for content */
    background-clip: content-box;
    border: 1.5px solid #bbbbbb;
    border-radius: 6px;
    background-color: #bbbbbb;
    margin-left: 15px;
    margin-right: 15px;
    &:checked {
      background-color: rgb(255, 170, 84);
    }
  }
`
const AlertWrapper = styled.div`
  display: flex;
  justify-content: center;
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

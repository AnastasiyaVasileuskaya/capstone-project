import styled from 'styled-components/macro'
import { useState } from 'react'
import Icon from 'supercons'
import Button from './Button'
import Alert from './Alert'
export default function FilterForm({
  dietLabels,
  allergiesLabels,
  cuisineTypes,
  onFindClicked,
}) {
  const [alert, setAlert] = useState(false)
  const [isFilterFormVisible, setIsFilterFormVisible] = useState(false)
  const [caloriesRangeFrom, setCaloriesRangeFrom] = useState('')
  const [caloriesRangeTo, setCaloriesRangeTo] = useState('')
  const [healthLabels, setHealthLabels] = useState([])
  const [dishTypes, setDishTypes] = useState([])

  function resetState() {
    setCaloriesRangeFrom('')
    setCaloriesRangeTo('')
    setHealthLabels([])
    setDishTypes([])
  }

  function handleHealthFilter(e) {
    handleClick(e, healthLabels, setHealthLabels)
  }

  function handleDishFilter(e) {
    handleClick(e, dishTypes, setDishTypes)
  }

  function validateCaloriesInputs() {
    if (
      isNaN(caloriesRangeFrom) &&
      isNaN(caloriesRangeTo) &&
      caloriesRangeFrom >= caloriesRangeTo
    ) {
      setAlert('Your input is not valid')
    } else {
      setAlert('')
    }
  }

  function isCaloriesStateValid() {
    return (
      !isNaN(caloriesRangeFrom) &&
      !isNaN(caloriesRangeTo) &&
      caloriesRangeFrom < caloriesRangeTo
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

  function handleSubmit(e) {
    let valid
    if (isCaloriesStateValid()) {
      valid =
        !isNaN(caloriesRangeFrom) &&
        !isNaN(caloriesRangeTo) &&
        caloriesRangeFrom < caloriesRangeTo
    }
    if (valid) {
      onFindClicked(caloriesRangeFrom, caloriesRangeTo, healthLabels, dishTypes)
    } else {
      setAlert('YOU INPUT IS NOT VALID')
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
          <span>Refine your search</span>
          <Icon
            glyph={isFilterFormVisible ? 'up-caret' : 'down-caret'}
            size={25}
          />
        </IconWrapper>
      </FilterButton>
      {isFilterFormVisible && (
        <FilterWrapper>
          {alert !== '' && <Alert text={alert} />}
          <span>Calories</span>
          <CaloriesContainer>
            <label htmlFor="calories">From</label>
            <input
              id="calories"
              key="caloriesRangeFrom"
              name="caloriesRangeFrom"
              maxLength="4"
              value={caloriesRangeFrom}
              onChange={e => setCaloriesRangeFrom(e.target.value)}
              onBlur={validateCaloriesInputs}
            />
            <label htmlFor="calories">To</label>
            <input
              id="calories"
              key="caloriesRangeTo"
              name="caloriesRangeTo"
              maxLength="4"
              value={caloriesRangeTo}
              onChange={e => setCaloriesRangeTo(e.target.value)}
              onBlur={validateCaloriesInputs}
            />
          </CaloriesContainer>
          <span>Diet</span>
          <Container>
            {dietLabels.map((item, index) => (
              <label htmlFor="checkbox">
                <input
                  id="checkbox"
                  type="checkbox"
                  key={index}
                  value={item}
                  filter-type="health-labels"
                  checked={healthLabels.includes(item)}
                  onChange={handleHealthFilter}
                />
                {item}
              </label>
            ))}
          </Container>
          <span>Allergies</span>
          <Container>
            {allergiesLabels.map((item, index) => (
              <label htmlFor="checkbox">
                <input
                  id="checkbox"
                  type="checkbox"
                  key={index}
                  filter-type="health-labels"
                  value={item}
                  checked={healthLabels.includes(item)}
                  onChange={handleHealthFilter}
                />
                {item}
              </label>
            ))}
          </Container>
          <span>Cuisine</span>
          <Container>
            {cuisineTypes.map((item, index) => (
              <label htmlFor="checkbox">
                <input
                  id="checkbox"
                  type="checkbox"
                  key={index}
                  filter-type="cuisine-types"
                  value={item}
                  checked={dishTypes.includes(item)}
                  onChange={handleDishFilter}
                />
                {item}
              </label>
            ))}
          </Container>

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
  background-color: #fff2e4;
  border-radius: 15px;
`
const IconWrapper = styled.span`
  display: flex;
  justify-content: space-between;
  span {
    margin-right: 10px;
    font-weight: 500;
  }
`
const FilterButton = styled(Button)`
  display: flex;
  place-items: center;
  justify-content: space-evenly;
  height: 40px;
`
const ClearButton = styled(Button)`
  display: flex;
  place-items: center;
  height: 40px;
  background-color: lightgrey;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
`
const FindButton = styled(Button)`
  display: flex;
  place-items: center;
  height: 40px;
  background-color: var(--color-orange);
  padding: 20px;
  border-radius: 10px;
`
const FilterWrapper = styled.div`
  padding-left: 20px;
  background-color: #fff2e4;
  display: grid;
  width: 100%;
  gap: 10px;
  padding-top: 10px;
  input {
    margin-right: 20px;
    height: 20px;
    width: 20px;
  }
`
const CaloriesContainer = styled.div`
  font-weight: 300;
  display: flex;
  justify-content: space-evenly;
  input {
    width: 60px;
    height: 30px;
  }
`
const ButtonWrapper = styled.span`
  display: flex;
  justify-content: space-evenly;
`
const Container = styled.span`
  font-weight: 300;
  display: grid;
  gap: 15px;
  padding: 10px;
`
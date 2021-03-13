import styled from 'styled-components/macro'
import { useState } from 'react'
import Icon from 'supercons'
import Button from './Button'
export default function CheckboxFilter({
  dietLabels,
  allergiesLabels,
  cuisineTypes,
  onFindClicked,
}) {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false)
  const [caloriesRangeFrom, setCaloriesRangeFrom] = useState('')
  const [caloriesRangeTo, setCaloriesRangeTo] = useState('')
  const [healthLabels, setHealthLabels] = useState([])
  const [dishTypes, setDishTypes] = useState([])

  /*
    const initialFormState = {
    caloriesRangeFrom: '',
    caloriesRangeTo: '',
    healthLabels: [],
    cuisineTypes: [],
  }
  const [formState, setFormState] = useState(initialFormState)
  
  function onFormChanged(e) {
    const newFormState = Object.assign(formState)
    if (e.target.type === 'checkbox') {
      let isChecked = e.target.checked
      let filterType = getFilterByType(e.target.getAttribute('filter-type'))
      let filterValue = e.target.value
      if (isChecked) {
        newFormState[filterType].push(filterValue)
      } else {
        let newArray = []
        newFormState[filterType].forEach(filter => {
          if (filter !== filterValue) {
            newArray.push(filter)
          }
        })
        newFormState[filterType] = newArray
      }
    } else if (e.type !== 'change' && e.target.type === 'text') {
      let filterName = e.target.name
      newFormState[filterName] = e.target.value
    }

    setFormState(newFormState)
  }

    function resetState(e) {
    e.preventDefault()
    setFormState(initialFormState)
  }

    function getFilterByType(filterType) {
    if (filterType === 'cuisine-types') {
      return 'cuisineTypes'
    }
    return 'healthLabels'
  }
*/

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
    /*
      //validate that caloriesRangeFrom is a number
      //validate that caloriesRangeTo is a number
      if (caloriesRangeFrom >= caloriesRangeTo) {
          //set alert text "fdsdfsdf"
          //set alert visible
          //set field red
      } else {
          //set alert invisible
          //set field normal
      }
      */
  }

  function isCaloriesStateValid() {
    //return caloriesRangeFrom is number
    // && caloriesRangeTo is number
    // && caloriesRangeFrom < caloriesRangeTo
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
    let valid = true
    //if (isCaloriesStateValid())
    //let valid = caloriesRangeFrom is number
    // && caloriesRangeTo is number
    // && caloriesRangeFrom < caloriesRangeTo

    if (valid) {
      onFindClicked(caloriesRangeFrom, caloriesRangeTo, healthLabels, dishTypes)
    } else {
      alert('Fuck you!')
    }
  }

  return (
    <FilterContainer>
      <FilterButton
        onClick={event => {
          event.stopPropagation()
          setIsDetailsVisible(!isDetailsVisible)
        }}
      >
        <IconWrapper>
          <span>Refine your search</span>
          <Icon
            glyph={isDetailsVisible ? 'up-caret' : 'down-caret'}
            size={25}
          />
        </IconWrapper>
      </FilterButton>
      {isDetailsVisible && (
        <Form /*onChange={onFormChanged}*/>
          <span>Calories</span>
          <CaloriesContainer>
            <span>From</span>
            <input
              key="caloriesRangeFrom"
              name="caloriesRangeFrom"
              maxlength="4"
              value={caloriesRangeFrom}
              onChange={e => setCaloriesRangeFrom(e.target.value)}
              onBlur={validateCaloriesInputs}
              /*   onChange={e => setCaloriesRangeFrom(e.target.value)}*/
            />
            <span>To</span>
            <input
              key="caloriesRangeTo"
              name="caloriesRangeTo"
              maxlength="4"
              value={caloriesRangeTo}
              onChange={e => setCaloriesRangeTo(e.target.value)}
              /*  onChange={e => setCaloriesRangeTo(e.target.value)}*/
            />
          </CaloriesContainer>
          <span>Diet</span>
          <Container>
            {dietLabels.map((item, index) => (
              <label>
                <input
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
              <label>
                <input
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
              <label>
                <input
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
        </Form>
      )}
    </FilterContainer>
  )
}
/*  function handleSubmit(event) {
    event.preventDefault()
    const form = event.target
    const { caloriesfrom, caloriesto } = form.elements
    onGetCalories(caloriesfrom.value, caloriesto.value)
  }
}

      <FilerArea>
        <FilterButton
          onClick={event => {
            event.stopPropagation()
            setIsDetailsVisible(!isDetailsVisible)
          }}
        >
          <IconWrapper>
            <span>Calories</span>

            <Icon
              glyph={isDetailsVisible ? 'up-caret' : 'down-caret'}
              size={25}
            />
          </IconWrapper>
        </FilterButton>
        {isDetailsVisible && (
          <Container>
            <span>From</span>
            <input />
            <span>To</span>
            <input />
            <ResetButton>Reset</ResetButton>
          </Container>
        )}
      </FilerArea>

      <FilerArea>
        <FilterButton
          onClick={event => {
            event.stopPropagation()
            setIsDetailsVisible(!isDetailsVisible)
          }}
        >
          <IconWrapper>
            <span>Diet</span>

            <Icon
              glyph={isDetailsVisible ? 'up-caret' : 'down-caret'}
              size={25}
            />
          </IconWrapper>
        </FilterButton>
        {isDetailsVisible && (
          <Container>
            {dietLabels.map((item, index) => (
              <label>
                <input
                  type="checkbox"
                  key={index}
                  value={item}
                  onClick={onClick}
                />
                {item}
              </label>
            ))}
            <ResetButton>Reset</ResetButton>
          </Container>
        )}
      </FilerArea>

      <FilerArea>
        <FilterButton
          onClick={event => {
            event.stopPropagation()
            setIsDetailsVisible(!isDetailsVisible)
          }}
        >
          <IconWrapper>
            <span>Allergies</span>

            <Icon
              glyph={isDetailsVisible ? 'up-caret' : 'down-caret'}
              size={25}
            />
          </IconWrapper>
        </FilterButton>
        {isDetailsVisible && (
          <Container>
            {allergiesLabels.map((item, index) => (
              <label>
                <input
                  type="checkbox"
                  key={index}
                  value={item}
                  onClick={onClick}
                />
                {item}
              </label>
            ))}
            <ResetButton>Reset</ResetButton>
          </Container>
        )}
      </FilerArea>

      <FilerArea>
        <FilterButton
          onClick={event => {
            event.stopPropagation()
            setIsDetailsVisible(!isDetailsVisible)
          }}
        >
          <IconWrapper>
            <span>Cuisine</span>

            <Icon
              glyph={isDetailsVisible ? 'up-caret' : 'down-caret'}
              size={25}
            />
          </IconWrapper>
        </FilterButton>
        {isDetailsVisible && (
          <Container>
            {cuisineTypes.map((item, index) => (
              <label>
                <input
                  type="checkbox"
                  key={index}
                  value={item}
                  onClick={onClick}
                />
                {item}
              </label>
            ))}
            <ResetButton>Reset</ResetButton>
          </Container>
        )}
      </FilerArea>
    </>
  )
}

const Container = styled.span`
  display: grid;
  background-color: #fff2e4;
  gap: 10px;
  padding: 10px;
`
const FilerArea = styled.span`
  display: grid;
  background-color: #fff2e4;
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

const ResetButton = styled(Button)`
  display: flex;
  place-items: center;
  justify-content: space-evenly;
  height: 40px;
  background-color: grey;
` */
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
  justify-content: space-evenly;
  height: 40px;
  background-color: lightgrey;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
`
const FindButton = styled(Button)`
  display: flex;
  place-items: center;
  justify-content: space-evenly;
  height: 40px;
  background-color: var(--color-orange);
  padding: 20px;
  border-radius: 10px;
`
const Form = styled.div`
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

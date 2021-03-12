import styled from 'styled-components/macro'
import { useState } from 'react'
import Icon from 'supercons'
import Button from './Button'
export default function CheckboxFilter({
  onClick,
  dietLabels,
  allergiesLabels,
  cuisineTypes,
  onGetCalories,
}) {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false)
  const [caloriesRangeFrom, setCaloriesRangeFrom] = useState('')
  const [caloriesRangeTo, setCaloriesRangeTo] = useState('')
  const [healthLabels, setHealthLabels] = useState([])
  const [dishTypes, setDishTypes] = useState([])

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
        <Form onSubmit={handleSubmit}>
          <span>Calories</span>
          <CaloriesContainer>
            <span>From</span>
            <input
              name="calories-from"
              maxlength="4"
              onChange={e => setCaloriesRangeFrom(e.target.value)}
            />

            <span>To</span>
            <input
              name="calories-to"
              maxlength="4"
              onChange={e => setCaloriesRangeTo(e.target.value)}
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
                  onClick={onClick}
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
                  value={item}
                  onClick={onClick}
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
                  value={item}
                  onClick={onClick}
                />
                {item}
              </label>
            ))}
          </Container>

          <ButtonWrapper>
            <ClearButton>Clear</ClearButton>
            <FindButton>Find</FindButton>
          </ButtonWrapper>
        </Form>
      )}
    </FilterContainer>
  )
  function handleSubmit(event) {
    event.preventDefault()
    const form = event.target
    const { from, to } = form.elements
    onGetCalories(from.value, to.value)
  }
}

/*      <FilerArea>
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
const Form = styled.form`
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

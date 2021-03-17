import styled from 'styled-components/macro'
import Header from '../components/Header/Header'
import Icon from 'supercons'
import { Link } from 'react-router-dom'
import Button from '../components/Button/Button'
export default function DetailPage({ recipe }) {
  const {
    CHOCDF,
    FAT,
    PROCNT,
    VITA_RAE,
    VITC,
    VITD,
    ZN,
    MG,
    CA,
  } = recipe.totalNutrients
  return (
    <>
      <DetailWrapper>
        <Header title="CookIdeas" />
        <LinkWrapper to={'/'}>
          <Icon glyph="back" size={25} /> Back to recipes
        </LinkWrapper>
        <ImageWrapper>
          {' '}
          <h2>{recipe.label}</h2>
          <img src={recipe.image} alt="recipe" />
        </ImageWrapper>
        <CaloriesWrapper>
          <span>{Math.floor(recipe.calories)} kcal calories</span>
          <span>{recipe.yield} servings</span>
        </CaloriesWrapper>
        <IngredientsWrapper>
          <h2>Ingredients</h2>
          <ol>
            {recipe.ingredients.map(ingredient => (
              <li>{ingredient.text}</li>
            ))}
          </ol>
        </IngredientsWrapper>
        <PreparationWrapper>
          <h2>Preparation</h2>
          <p>
            You can see full recipe on{' '}
            <PreparationLink
              onClick={() => {
                window.open(recipe.url)
              }}
            >
              {recipe.source}
            </PreparationLink>
          </p>
        </PreparationWrapper>
        <Button
          onClick={() => {
            window.open(recipe.url)
          }}
        >
          Instructions
        </Button>
        <h2>Nutrition</h2>
        <table>
          <tbody>
            <tr>
              <td>{CHOCDF.label}</td>
              <td>
                {Math.floor(CHOCDF.quantity)} {CHOCDF.unit}
              </td>
              <td>
                {Math.floor(recipe.totalDaily.CHOCDF.quantity)}{' '}
                {recipe.totalDaily.CHOCDF.unit}
              </td>
            </tr>
            <tr>
              <td>{FAT.label}</td>
              <td>
                {Math.floor(FAT.quantity)} {FAT.unit}
              </td>
              <td>
                {Math.floor(recipe.totalDaily.FAT.quantity)}{' '}
                {recipe.totalDaily.FAT.unit}
              </td>
            </tr>
            <tr>
              <td>{PROCNT.label}</td>
              <td>
                {Math.floor(PROCNT.quantity)} {PROCNT.unit}
              </td>
              <td>
                {Math.floor(recipe.totalDaily.PROCNT.quantity)}{' '}
                {recipe.totalDaily.PROCNT.unit}
              </td>
            </tr>
            <tr>
              <td>{ZN.label}</td>
              <td>
                {Math.floor(ZN.quantity)} {ZN.unit}
              </td>
              <td>
                {Math.floor(recipe.totalDaily.ZN.quantity)}{' '}
                {recipe.totalDaily.ZN.unit}
              </td>
            </tr>
            <tr>
              <td>{MG.label}</td>
              <td>
                {Math.floor(MG.quantity)} {MG.unit}
              </td>
              <td>
                {Math.floor(recipe.totalDaily.MG.quantity)}{' '}
                {recipe.totalDaily.MG.unit}
              </td>
            </tr>
            <tr>
              <td>{CA.label}</td>
              <td>
                {Math.floor(CA.quantity)} {CA.unit}
              </td>
              <td>
                {Math.floor(recipe.totalDaily.CA.quantity)}{' '}
                {recipe.totalDaily.CA.unit}
              </td>
            </tr>
            <tr>
              <td>{VITA_RAE.label}</td>
              <td>
                {Math.floor(VITA_RAE.quantity)} {VITA_RAE.unit}
              </td>
              <td>
                {Math.floor(recipe.totalDaily.VITA_RAE.quantity)}{' '}
                {recipe.totalDaily.VITA_RAE.unit}
              </td>
            </tr>
            <tr>
              <td>{VITC.label}</td>
              <td>
                {Math.floor(VITC.quantity)} {VITC.unit}
              </td>
              <td>
                {Math.floor(recipe.totalDaily.VITC.quantity)}{' '}
                {recipe.totalDaily.VITC.unit}
              </td>
            </tr>
            <tr>
              <td>{VITD.label}</td>
              <td>
                {Math.floor(VITD.quantity)} {VITD.unit}
              </td>
              <td>
                {Math.floor(recipe.totalDaily.VITD.quantity)}{' '}
                {recipe.totalDaily.VITD.unit}
              </td>
            </tr>
          </tbody>
        </table>
      </DetailWrapper>
    </>
  )
}

const DetailWrapper = styled.section`
  display: grid;
  gap: 15px;
`
const ImageWrapper = styled.div`
  display: grid;
  justify-content: center;
  h2 {
    margin-top: 0;
  }
`
const LinkWrapper = styled(Link)`
  text-decoration: none;
  color: black;
  background-color: lightgray;
  width: 180px;
  height: 35px;
  display: flex;
  padding: 5px;
  align-items: center;
  justify-content: center;
`
const CaloriesWrapper = styled.span`
  display: flex;
  justify-content: space-evenly;
`
const IngredientsWrapper = styled.span`
  display: grid;
  justify-content: center;
  h2 {
    margin-bottom: 0;
    margin-top: 0;
  }
  ol {
    list-style: none;
    list-style-type: disc;
  }
`
const PreparationLink = styled.span`
  text-decoration: none;
  color: var(--color-orange);
`
const PreparationWrapper = styled.span`
  h2 {
    margin-bottom: 0;
    margin-top: 0;
  }
`

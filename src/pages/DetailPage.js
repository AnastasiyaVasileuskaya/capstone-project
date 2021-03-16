import styled from 'styled-components/macro'
import Header from '../components/Header'
import Icon from 'supercons'
import { Link } from 'react-router-dom'
export default function DetailPage({ recipe }) {
  return (
    <>
      <DetailWrapper>
        <Header title="CookIdeas" />
        <LinkWrapper to={'/'}>
          <Icon glyph="back" size={25} /> Back to recipes
        </LinkWrapper>
        <RecipeImage src={recipe.image} />
      </DetailWrapper>
    </>
  )
}

const DetailWrapper = styled.section`
  display: grid;
  gap: 15px;
`
const RecipeImage = styled.img`
  display: grid;
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

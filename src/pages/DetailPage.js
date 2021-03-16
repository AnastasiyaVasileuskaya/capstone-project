import styled from 'styled-components/macro'
export default function DetailPage({ recipe }) {
  return (
    <DetailWrapper>
      <RecipeImage src={recipe.image} />
    </DetailWrapper>
  )
}

const DetailWrapper = styled.section`
  display: grid;
`
const RecipeImage = styled.img`
  display: grid;
`

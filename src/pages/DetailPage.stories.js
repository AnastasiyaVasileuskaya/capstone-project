import DetailPage from './DetailPage'

export default {
  title: 'DetailPage',
  component: DetailPage,
}

const Template = args => <DetailPage {...args} />

export const Primary = Template.bind({})

Primary.args = {
  recipe: {
    props: {
      label: 'Chicken',
      image:
        'https://www.edamam.com/web-img/e42/e42f9119813e890af34c259785ae1cfb.jpg',
      calories: '300 kcal',
      yield: '7',
      ingredient: 'chicken',
      url:
        'http://www.seriouseats.com/recipes/2011/12/chicken-vesuvio-recipe.html',
      source: 'Serious Eats',
      CHOCDF: 'Magnesium',
    },
    ingredients: [
      {
        text: 'chicken',
      },
    ],
    totalNutrients: {
      CHOCDF: {
        label: 'Calcium',
        quantity: '256',
        unit: 'g',
      },
    },
  },
}

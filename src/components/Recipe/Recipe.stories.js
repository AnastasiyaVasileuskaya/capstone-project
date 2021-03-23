import { action } from '@storybook/addon-actions'
import Recipe from './Recipe'

export default {
  title: 'Recipe',
  component: Recipe,
}

const Template = args => <Recipe {...args} />

export const Primary = Template.bind({})
Primary.args = {
  recipe: {
    calories: '4000',
    image:
      'https://www.edamam.com/web-img/e42/e42f9119813e890af34c259785ae1cfb.jpg',
    ingredientLines: ['1/2 cup olive oil'],
    label: 'Chicken Vesuvio',
    yield: '4',
    url:
      'http://www.seriouseats.com/recipes/2011/12/chicken-vesuvio-recipe.html',
    id: 'f23df',
    isVisible: false,
    onDeleteButtonClick: action('onDeleteButtonClick'),
  },
}

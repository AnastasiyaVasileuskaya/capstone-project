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
    uri:
      'r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_9b5945e03f05acbf9d69625138385408',
  },
  selectedStars: '3',
  comment: 'Very tasty',
  date: '2021-03-28T12:50:15.557Z',
  isVisible: true,
  onDeleteButtonClick: action('onDeleteButtonClick'),
}

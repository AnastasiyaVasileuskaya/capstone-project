import HomePage from './HomePage'
import { action } from '@storybook/addon-actions'

export default {
  title: 'HomePage',
  component: HomePage,
}

const Template = args => <HomePage {...args} />

export const Primary = Template.bind({})

Primary.args = {
  recipes: [
    {
      calories: '234 kcal',
      image:
        'https://www.edamam.com/web-img/e42/e42f9119813e890af34c259785ae1cfb.jpg',
      ingredientLines: ['1/2 cup olive oil'],
      label: 'Chicken Vesuvio',
      yield: '4',
      url:
        'http://www.seriouseats.com/recipes/2011/12/chicken-vesuvio-recipe.html',
      id: 'f23df',
    },
  ],
  text: '',
  isVisibleSaved: true,
  title: 'CookIdeas',
  dietLabels: ['vegan', 'vegetarian'],
  allergiesLabels: ['egg-free', 'gluten-free'],
  cuisineTypes: ['italian', 'mexican'],
  onFindClicked: action('onFindClicked'),
  onRecipeSearch: action('onRecipeSearch'),
}

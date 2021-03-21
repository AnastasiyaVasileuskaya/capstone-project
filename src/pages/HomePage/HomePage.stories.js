import HomePage from './HomePage'
import { action } from '@storybook/addon-actions'

export default {
  title: 'HomePage',
  component: HomePage,
}

const Template = args => <HomePage {...args} />

export const Primary = Template.bind({})

Primary.args = {
  text: 'CookIdeas',
  dietLabels: ['vegan', 'vegetarian'],
  allergiesLabels: ['egg-free', 'gluten-free'],
  cuisineTypes: ['italian', 'mexican'],
  recipes: ['chicken'],
  onFindClicked: action('onFindClicked'),
  onRecipeSearch: action('onRecipeSearch'),
}

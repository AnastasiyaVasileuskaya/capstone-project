import { action } from '@storybook/addon-actions'
import SearchBar from './SearchBar'

export default {
  title: 'SearchBar',
  component: SearchBar,
}

const Template = args => <SearchBar {...args} />

export const Primary = Template.bind({})

Primary.args = {
  initialQuery: 'chocolate',
  onRecipeSearch: action('onRecipeSearch'),
}

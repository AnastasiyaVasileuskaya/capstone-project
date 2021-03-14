import FilterForm from './FilterForm'
import { action } from '@storybook/addon-actions'

export default {
  title: 'FilterForm',
  component: FilterForm,
}

const Template = args => <FilterForm isFilterFormVisible {...args} />

export const Primary = Template.bind({})

Primary.args = {
  dietLabels: ['vegan','vegetarian'],
  allergiesLabels:['egg-free', 'gluten-free'],
  cuisineTypes: ['italian','mexican'],
  onFindClicked: action('onFindClicked'),
}

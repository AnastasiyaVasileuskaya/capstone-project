import FilterForm from './FilterForm'
import { action } from '@storybook/addon-actions'

export default {
  title: 'FilterForm',
  component: FilterForm,
}

const Template = args => <FilterForm isFilterFormVisible {...args} />

export const Primary = Template.bind({})

Primary.args = {
  onFindClicked: action('onFindClicked'),
  filters: {
    caloriesRangeFrom: '235',
    caloriesRangeTo: '353',
    healthLabels: ['egg-free', 'gluten-free'],
    dishTypes: ['italian', 'mexican'],
  },
}

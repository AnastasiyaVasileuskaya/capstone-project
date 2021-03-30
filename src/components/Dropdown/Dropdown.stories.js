import Dropdown from './Dropdown'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Dropdown',
  component: Dropdown,
}

const Template = args => <Dropdown isDropdownContentVisible {...args} />

export const Primary = Template.bind({})

Primary.args = {
  onSelectionChanged: action('onSelectionChanged'),
  selectedSorting: 'Rate: High To Low',
}

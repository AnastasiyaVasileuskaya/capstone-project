import { action } from '@storybook/addon-actions'
import LiveSearch from './LiveSearch'

export default {
  title: 'LiveSearch',
  component: LiveSearch,
}

const Template = args => <LiveSearch {...args} />

export const Primary = Template.bind({})

Primary.args = {
  userInput: 'chicken',
  setUserInput: action('setUserInput'),
}

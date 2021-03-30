import { action } from '@storybook/addon-actions'
import StarsContainer from './StarsContainer'

export default {
  title: 'StarsContainer',
  component: StarsContainer,
}

const Template = args => <StarsContainer {...args} />

export const Primary = Template.bind({})
Primary.args = {
  selectedStars: '3',
  onClick: action('onClick'),
}

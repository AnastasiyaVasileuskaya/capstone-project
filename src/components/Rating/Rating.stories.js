import { action } from '@storybook/addon-actions'
import Rating from './Rating'

export default {
  title: 'Rating',
  component: Rating,
}

const Template = args => <Rating {...args} />

export const Primary = Template.bind({})
Primary.args = {
  selectedStars: '3',
  date: '25.3.2021',
  comment: 'Very tasty',
  onRatingChange: action('onRatingChange'),
}

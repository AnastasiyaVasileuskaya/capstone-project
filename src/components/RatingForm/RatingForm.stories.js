import RatingForm from './RatingForm'
import { action } from '@storybook/addon-actions'

export default {
  title: 'RatingForm',
  component: RatingForm,
}

const Template = args => <RatingForm isRatingFormVisible {...args} />

export const Primary = Template.bind({})

Primary.args = {
  onAddComment: action('onAddComment'),
  ratingStars: '3',
  ratingComment: 'Very tasty',
}

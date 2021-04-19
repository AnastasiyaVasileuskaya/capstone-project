import { action } from '@storybook/addon-actions'
import DetailPage from './DetailPage'

export default {
  title: 'DetailPage',
  component: DetailPage,
}

const Template = args => <DetailPage {...args} />

export const Primary = Template.bind({})

Primary.args = {
  recipeId: 'recipe_95661be6f77a57b4c85c789a3b737ada',
  backUrlParams: {
    caloriesRangeFrom: '',
    caloriesRangeTo: '',
    dishTypes: [],
    healthLabels: [],
    query: '',
  },
}

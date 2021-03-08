import Recipe from './Recipe'

export default {
  title: 'Recipe',
  component: Recipe,
}

const Template = args => <Recipe {...args} />

export const Primary = Template.bind({})

Primary.args = {
  title: 'Chicken',
  calories: '200 cal',
  image: '/image.png',
}

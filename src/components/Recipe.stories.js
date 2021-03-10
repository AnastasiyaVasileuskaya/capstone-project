import Recipe from './Recipe'

export default {
  title: 'Recipe',
  component: Recipe,
}

const Template = args => <Recipe {...args} />

export const Primary = Template.bind({})

Primary.args = {
  title: 'Chicken',
  calories: '300',
  servings: '1',
  image:
    'https://www.edamam.com/web-img/e42/e42f9119813e890af34c259785ae1cfb.jpg',
  ingredients: '7',
}

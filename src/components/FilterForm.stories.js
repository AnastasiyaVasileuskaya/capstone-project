import FilterForm from './FilterForm'

export default {
  title: 'FilterForm',
  component: FilterForm,
}

const Template = args => <FilterForm {...args} />

export const Primary = Template.bind({})

Primary.args = {
  caloriesFrom: '254',
  caloriesTo: '354',
}

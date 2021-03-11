import SearchFilter from './SearchFilter'

export default {
  title: 'SearchFilter',
  component: SearchFilter,
}

const Template = args => <SearchFilter {...args} />

export const Primary = Template.bind({})

Primary.args = {
  search: 'chocolate',
}

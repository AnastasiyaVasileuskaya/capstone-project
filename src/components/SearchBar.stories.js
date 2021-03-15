import SearchBar from './SearchBar'

export default {
  title: 'SearchBar',
  component: SearchBar,
}

const Template = args => <SearchBar {...args} />

export const Primary = Template.bind({})

Primary.args = {
  search: 'chocolate',
}

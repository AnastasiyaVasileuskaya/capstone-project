import Button from './Button'

export default {
  title: 'Button',
  component: Button,
}

const Template = args => <Button {...args}>Search</Button>

export const Primary = Template.bind({})

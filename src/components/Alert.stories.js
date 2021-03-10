import Alert from './Alert'

export default {
  title: 'Alert',
  component: Alert,
}

const Template = args => <Alert {...args} />

export const Primary = Template.bind({})

Primary.args = {
  children: 'Alert message',
}

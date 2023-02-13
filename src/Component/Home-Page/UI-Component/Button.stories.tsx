import { ComponentMeta , ComponentStory } from '@storybook/react'
import Button from './Button'

export default { title : "Button", component : Button } as ComponentMeta<typeof Button>

const Template:ComponentStory<typeof Button> = (args)=>(<Button {...args}>{args.children}</Button>) 

export const MainButton = Template.bind({});

MainButton.args = {
  children:"Himanshu"
}

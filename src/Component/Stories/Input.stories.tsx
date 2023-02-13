import { ComponentMeta, ComponentStory } from "@storybook/react";
import Input from "../Ui-Component/Input/Input";
import '../../index.css'

export default {
  title: "Input",
  component: Input,
  argTypes: {},
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => (
  <Input {...args}></Input>
);

export const InputFirst = Template.bind({});
InputFirst.args = {
  placeholder:""
};


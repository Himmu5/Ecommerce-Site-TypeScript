import { ComponentMeta, ComponentStory } from "@storybook/react";
import Button from "../Ui-Component/Button/Button";
import '../../index.css'

export default {
  title: "Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}></Button>
);

export const ButtonMain = Template.bind({});

ButtonMain.args = {
  children:"Add to Cart",
};

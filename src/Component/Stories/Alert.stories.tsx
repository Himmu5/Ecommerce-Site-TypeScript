import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Alert } from "../AlertStory/Alert";
import '../../index.css'

export default {
  title: "Alert",
  component: Alert,
} as ComponentMeta<typeof Alert>


const Template: ComponentStory<typeof Alert> = (args) => {
  return <Alert {...args} ></Alert>;
};

export const ErrorAlert = Template.bind({ });

ErrorAlert.args = {
  alert: {
    type: "error",
    message: "Invalid Crediential",
  },
};

export const SuccessAlert = Template.bind({ });

SuccessAlert.args = {
  alert: {
    type: "success",
    message: "Logged In Successfull",
  },
};

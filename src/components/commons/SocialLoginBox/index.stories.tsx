import type { Meta, StoryObj } from "@storybook/react";
import SocialLoginBox from ".";

const meta = {
  title: "Components/SocialLoginBox",
  component: SocialLoginBox,
} as Meta<typeof SocialLoginBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Login: Story = {
  args: {
    type: "login",
  },
};

export const Register: Story = {
  args: {
    type: "register",
  },
};

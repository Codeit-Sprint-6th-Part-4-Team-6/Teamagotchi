import type { Meta, StoryObj } from "@storybook/react";
import TextButton from "./TextButton";

const meta: Meta<typeof TextButton> = {
  title: "Components/TextButton",
  component: TextButton,
  argTypes: {
    children: {
      control: "text",
      defaultValue: "버튼",
    },
    icon: {
      control: "text",
    },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Button: Story = {
  args: {
    buttonType: "button",
    children: "생성하기",
    icon: "plus",
  },
};

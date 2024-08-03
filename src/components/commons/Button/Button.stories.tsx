import type { Meta, StoryObj } from "@storybook/react";
import Button from "./index";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    children: {
      control: "text",
      defaultValue: "버튼",
    },
    size: {
      control: "text",
    },
    icon: {
      control: "text",
    },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Floating: Story = {
  args: {
    buttonType: "floating",
    size: "large",
    children: "생성하기",
    icon: "none",
  },
};

export const Large: Story = {
  args: {
    buttonType: "button",
    size: "large",
    children: "생성하기",
    icon: "none",
  },
};
export const Medium: Story = {
  args: {
    buttonType: "button",
    size: "medium",
    children: "생성하기",
    icon: "none",
  },
};

export const Small: Story = {
  args: {
    buttonType: "button",
    size: "small",
    children: "생성하기",
    icon: "none",
  },
};

export const Outlined: Story = {
  args: {
    buttonType: "button",
    buttonStyle: "outlined",
    size: "large",
    children: "생성하기",
    icon: "none",
  },
};

export const OutlinedSecondary: Story = {
  args: {
    buttonType: "button",
    buttonStyle: "outlined-secondary",
    size: "large",
    children: "생성하기",
    icon: "none",
  },
};

export const Danger: Story = {
  args: {
    buttonType: "button",
    buttonStyle: "danger",
    size: "large",
    children: "생성하기",
    icon: "none",
  },
};

export const Transparent: Story = {
  args: {
    buttonType: "button",
    buttonStyle: "transparent",
    size: "large",
    children: "생성하기",
    icon: "none",
  },
};

export const TransparentWhite: Story = {
  args: {
    buttonType: "button",
    buttonStyle: "transparent-white",
    size: "large",
    children: "생성하기",
    icon: "none",
  },
};

export const Disabled: Story = {
  args: {
    buttonType: "button",
    buttonStyle: "default",
    size: "large",
    children: "생성하기",
    icon: "none",
    disabled: true,
  },
};

export const Plus: Story = {
  args: {
    buttonType: "floating",
    size: "large",
    children: "생성하기",
    icon: "plus",
  },
};

export const Check: Story = {
  args: {
    buttonType: "floating",
    buttonStyle: "outlined",
    size: "large",
    children: "생성하기",
    icon: "check",
  },
};

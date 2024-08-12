import type { Meta, StoryObj } from "@storybook/react";
import Spinner from "./index";

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  argTypes: {
    size: {
      control: "text",
    },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Size20: Story = {
  args: {
    size: 20,
    color: "primary",
  },
};

export const Size30: Story = {
  args: {
    size: 30,
    color: "white",
  },
};

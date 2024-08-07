import type { Meta, StoryObj } from "@storybook/react";
import ImageInput from "./index";

const meta: Meta<typeof ImageInput> = {
  title: "Components/ImageInput",
  component: ImageInput,
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof meta>;

export const MyProfile: Story = {
  args: {
    type: "my-profile",
  },
};

export const TeamProfile: Story = {
  args: {
    type: "team-profile",
  },
};

export const Article: Story = {
  args: {
    type: "article",
  },
};

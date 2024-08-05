import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ImageInput from "./index";

const queryClient = new QueryClient();

const meta: Meta<typeof ImageInput> = {
  title: "Components/ImageInput",
  component: ImageInput,
  argTypes: {},
  decorators: [
    (Story) => <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>,
  ],
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

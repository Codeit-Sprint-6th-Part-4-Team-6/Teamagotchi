import type { Meta, StoryObj } from "@storybook/react";
import TaskCommentList from ".";

const meta = {
  title: "Components/TaskCommentList",
  component: TaskCommentList,

  args: {
    taskId: 30,
  },
} as Meta<typeof TaskCommentList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TaskComments: Story = {};

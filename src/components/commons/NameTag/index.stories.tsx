import type { Meta, StoryObj } from "@storybook/react";
import NameTag from ".";

const meta = {
  title: "Components/NameTag",
  component: NameTag,
} as Meta<typeof NameTag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default6: Story = {
  args: {
    type: "default-6",
    image:
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/82/9791191214376.jpg",
    name: "이미서있는임희서ㅁㄴㅇㄹㄴㅇㅁㄹ",
  },
};

export const Default12: Story = {
  args: {
    type: "default-12",
    image:
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/82/9791191214376.jpg",
    name: "이미서있는임희서ㅁㄴㅇㄹㄴㅇㅁㄹ",
  },
};

export const Email: Story = {
  args: {
    type: "email",
    image:
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/82/9791191214376.jpg",
    name: "이미서있는임희서ㅁㄴㅇㄹㄴㅇㅁㄹ",
    email: "limheeseo1@naver.comadsfadsfasdfsasdfasdfasdfasdasdfsdfs",
  },
};

export const Profile: Story = {
  args: {
    type: "profile",
    image:
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/82/9791191214376.jpg",
    name: "이미서있는임희서ㅁㄴㅇㄹㄴㅇㅁㄹ",
    onClick: () => 0,
  },
};

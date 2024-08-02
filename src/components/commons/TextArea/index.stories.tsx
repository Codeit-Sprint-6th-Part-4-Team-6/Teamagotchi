// Storybook의 타입을 가져옵니다.
import type { Meta, StoryObj } from "@storybook/react";
// ButtonEx 컴포넌트를 가져옵니다.
import Textarea from ".";

// Storybook의 메타데이터를 정의합니다.
// 이 메타데이터는 스토리북에서 컴포넌트를 어떻게 문서화할지 설정합니다.
const meta = {
  // 사이드바에서 스토리를 그룹화하는 제목입니다.
  title: "Components/Textarea",

  // 문서화할 컴포넌트입니다.
  component: Textarea,

  // 스토리의 기본 인수입니다.
  // 모든 스토리가 공통적으로 가지는 기본 속성을 설정합니다.
  args: {
    className:
      "block w-full text-text-primary placeholder-text-default font-normal border-solid border-border-primary bg-background-secondary resize-none",
  },
} as Meta<typeof Textarea>; // TypeScript의 타입으로, Button 컴포넌트의 타입에 기반하여 메타데이터 객체의 타입을 정의합니다.

// 기본으로 내보내어 Storybook이 이 메타데이터를 읽고 해당 컴포넌트를 문서화하도록 합니다.
export default meta;

// 스토리 타입을 정의합니다.
// 이 타입은 스토리 객체가 meta 객체의 타입과 일치하도록 합니다.
type Story = StoryObj<typeof meta>;

// Primary라는 이름의 스토리를 정의합니다.
// 이 스토리는 Button 컴포넌트를 렌더링할 때 사용될 인수를 설정합니다.
export const InnerButton: Story = {
  args: {
    type: "innerButton",
  },
};

export const Small: Story = {
  args: {
    type: "small",
  },
};

export const Big: Story = {
  args: {
    type: "big",
  },
};
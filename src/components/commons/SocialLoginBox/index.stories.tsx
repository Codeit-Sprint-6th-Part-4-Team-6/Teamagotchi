// Storybook의 타입을 가져옵니다.
import type { Meta, StoryObj } from "@storybook/react";
//  컴포넌트를 가져옵니다.
import SocialLoginBox from ".";

// Storybook의 메타데이터를 정의합니다.
// 이 메타데이터는 스토리북에서 컴포넌트를 어떻게 문서화할지 설정합니다.
const meta = {
  // 사이드바에서 스토리를 그룹화하는 제목입니다.
  title: "Components/SocialLoginBox",

  // 문서화할 컴포넌트입니다.
  component: SocialLoginBox,

  // 스토리의 기본 인수입니다.
  // 모든 스토리가 공통적으로 가지는 기본 속성을 설정합니다.
  args: {},
} as Meta<typeof SocialLoginBox>;

// 기본으로 내보내어 Storybook이 이 메타데이터를 읽고 해당 컴포넌트를 문서화하도록 합니다.
export default meta;

// 스토리 타입을 정의합니다.
// 이 타입은 스토리 객체가 meta 객체의 타입과 일치하도록 합니다.
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

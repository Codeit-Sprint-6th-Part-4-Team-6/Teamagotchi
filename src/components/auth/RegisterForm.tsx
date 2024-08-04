import React from "react";
import { SignUpRequest } from "@coworkers-types";
import Button from "@components/commons/Button";
import Input from "@components/commons/Input";
import Label from "@components/commons/Label";
import { useAuthForm } from "@hooks/auth/useAuthForm";
import { useRegisterHandler } from "@hooks/auth/useRegisterHandler";

const initialRegisterState: SignUpRequest = {
  email: "",
  nickname: "",
  password: "",
  passwordConfirmation: "",
};

export default function RegisterForm() {
  const { values, handleBlur } = useAuthForm<SignUpRequest>(initialRegisterState);
  const { handleSubmit } = useRegisterHandler(values);

  return (
    <form onSubmit={handleSubmit}>
      <Label type="label" content="이름" htmlFor="nickname" marginBottom={12} />
      <Input
        id="nickname"
        name="nickname"
        value={values.nickname}
        onBlur={handleBlur}
        placeholder="이름을 입력해주세요."
      />

      <Label type="label" content="이메일" htmlFor="email" marginBottom={12} />
      <Input
        id="email"
        name="email"
        value={values.email}
        onBlur={handleBlur}
        placeholder="이메일을 입력해주세요."
      />

      <Label type="label" content="비밀번호" htmlFor="password" marginBottom={12} />
      <Input
        id="password"
        name="password"
        type="password"
        value={values.password}
        onBlur={handleBlur}
        placeholder="비밀번호를 입력해주세요."
      />

      <Label
        type="label"
        content="비밀번호 확인"
        htmlFor="passwordConfirmation"
        marginBottom={12}
      />
      <Input
        id="passwordConfirmation"
        name="passwordConfirmation"
        type="password"
        value={values.passwordConfirmation}
        onBlur={handleBlur}
        placeholder="비밀번호를 다시 한 번 입력해주세요."
      />

      <Button buttonType="button">회원가입</Button>
    </form>
  );
}

import React from "react";
import { LoginRequest } from "@coworkers-types";
import Button from "@components/commons/Button";
import Input from "@components/commons/Input";
import Label from "@components/commons/Label";
import { useAuthForm } from "@hooks/auth/useAuthForm";
import { useLoginHandler } from "@hooks/auth/useLoginHandler";

const initialLoginState: LoginRequest = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const { values, errors, isValid, handleBlur, handleChange } =
    useAuthForm<LoginRequest>(initialLoginState);
  const { handleSubmit } = useLoginHandler(values);

  return (
    <form onSubmit={handleSubmit}>
      <Label type="label" content="이메일" htmlFor="email" marginBottom={12} />
      <Input
        id="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="이메일을 입력해주세요."
        errorMessage={errors.email}
      />

      <Label type="label" content="비밀번호" htmlFor="password" marginBottom={12} />
      <Input
        id="password"
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="비밀번호를 입력해주세요."
        errorMessage={errors.password}
      />

      <Button buttonType="button" disabled={!isValid}>
        로그인
      </Button>
    </form>
  );
}

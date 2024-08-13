import React from "react";
import { LoginRequest } from "@coworkers-types";
import SendMailModal from "@components/auth/SendMailModal";
import Button from "@components/commons/Button";
import TextButton from "@components/commons/Button/TextButton";
import Input from "@components/commons/Input";
import Label from "@components/commons/Label";
import { useAuthForm } from "@hooks/auth/useAuthForm";
import { useAuthHandler } from "@hooks/auth/useAuthHandler";
import { useModal } from "@hooks/useModal";
import { LoginSchema } from "@utils/schemas/auth";

const initialLoginState: LoginRequest = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const { values, errors, isValid, handleChange } = useAuthForm<LoginRequest>(
    initialLoginState,
    LoginSchema
  );
  const { handleSubmit } = useAuthHandler(values);
  const { openModal } = useModal();

  const handleOpenModal = () => {
    openModal("SendMailModal", SendMailModal, {});
  };

  return (
    <form onSubmit={handleSubmit}>
      <Label type="label" content="이메일" htmlFor="email" marginBottom={12} />
      <Input
        id="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder="이메일을 입력해주세요."
        errorMessage={errors.email}
      />
      <div className="mb-12 mt-24">
        <Label type="label" content="비밀번호" htmlFor="password" marginBottom={12} />
        <Input
          id="password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          placeholder="비밀번호를 입력해주세요."
          errorMessage={errors.password}
        />
      </div>

      <div className="text-right">
        <TextButton buttonType="button" textStyle="underline" onClick={handleOpenModal}>
          비밀번호를 잊으셨나요?
        </TextButton>
      </div>

      <Button buttonType="button" disabled={!isValid} type="submit" className="mt-40">
        로그인
      </Button>
    </form>
  );
}

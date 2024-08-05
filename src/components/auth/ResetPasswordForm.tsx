import React from "react";
import { Password } from "@coworkers-types";
import Button from "@components/commons/Button";
import Input from "@components/commons/Input";
import Label from "@components/commons/Label";
import { useAuthForm } from "@hooks/auth/useAuthForm";
import { useResetPasswordHandler } from "@hooks/auth/useResetPasswordHandler";
import { ResetPasswordSchema } from "@utils/schemas/auth";

const initialPasswordState: Password = {
  password: "",
  passwordConfirmation: "",
};

export default function ResetPasswordForm() {
  const { values, errors, isValid, handleBlur, handleChange } = useAuthForm<Password>(
    initialPasswordState,
    ResetPasswordSchema
  );
  const { handleResetPassword } = useResetPasswordHandler(values);

  return (
    <form>
      <div className="mb-24">
        <Label type="label" content="새 비밀번호" htmlFor="password" marginBottom={12} />
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="비밀번호 (영문, 숫자, 특수문자 포함, 12자 이내)를 입력해주세요."
          onChange={handleChange}
          onBlur={handleBlur}
          errorMessage={errors.password}
        />
      </div>
      <div className="mb-40">
        <Label
          type="label"
          content="비밀번호 확인"
          htmlFor="passwordConfirmation"
          marginBottom={12}
        />
        <Input
          type="password"
          name="passwordConfirmation"
          id="passwordConfirmation"
          placeholder="비밀번호를 입력해주세요."
          onChange={handleChange}
          onBlur={handleBlur}
          errorMessage={errors.passwordConfirmation}
        />
      </div>
      <Button buttonType="button" onClick={handleResetPassword} disabled={!isValid}>
        재설정
      </Button>
    </form>
  );
}

import { SignUpRequest } from "@coworkers-types";
import Button from "@components/commons/Button";
import Input from "@components/commons/Input";
import Label from "@components/commons/Label";
import { useAuthForm } from "@hooks/auth/useAuthForm";
import { useAuthHandler } from "@hooks/auth/useAuthHandler";
import { RegisterSchema } from "@utils/schemas/auth";

const initialRegisterState: SignUpRequest = {
  email: "",
  nickname: "",
  password: "",
  passwordConfirmation: "",
};

export default function RegisterForm() {
  const { values, errors, isValid, handleBlur, handleChange } = useAuthForm<SignUpRequest>(
    initialRegisterState,
    RegisterSchema
  );
  const { handleSubmit } = useAuthHandler(values, true);

  return (
    <form onSubmit={handleSubmit}>
      <Label type="label" content="이름" htmlFor="nickname" marginBottom={12} />
      <Input
        id="nickname"
        name="nickname"
        value={values.nickname}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="이름을 입력해주세요."
        errorMessage={errors.nickname}
      />

      <div className="mt-24">
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
      </div>

      <div className="mt-24">
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
      </div>

      <div className="mt-24">
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
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="비밀번호를 다시 한 번 입력해주세요."
          errorMessage={errors.passwordConfirmation}
        />
      </div>

      <Button buttonType="button" disabled={!isValid} type="submit" className="mt-40">
        회원가입
      </Button>
    </form>
  );
}

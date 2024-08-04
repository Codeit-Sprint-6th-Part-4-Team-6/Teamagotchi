import { useState } from "react";
import { SignUpRequest } from "@coworkers-types";
import { useRouter } from "next/router";
import Button from "@components/commons/Button";
import Input from "@components/commons/Input";
import Label from "@components/commons/Label";
import { useAuthStore } from "@store/useAuthStore";
import { setAuth } from "@utils/auth";
import { loginUser, signUpUser } from "../../pages/api/authApi";

export default function RegisterForm() {
  const [values, setValues] = useState<SignUpRequest>({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: "",
  });
  const router = useRouter();
  const { setUser } = useAuthStore();

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    await signUpUser(values);

    const loginData = {
      email: values.email,
      password: values.password,
    };

    const data = await loginUser(loginData);
    setAuth(data);
    setUser(data.user);
    router.push("/team-list");
  };

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
        placeholder="이메일을 다시 한 번 입력해주세요."
      />

      <Button buttonType="button">회원가입</Button>
    </form>
  );
}

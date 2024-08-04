import { useState } from "react";
import { LoginRequest } from "@coworkers-types";
import { useRouter } from "next/router";
import Button from "@components/commons/Button";
import Input from "@components/commons/Input";
import Label from "@components/commons/Label";
import { useAuthStore } from "@store/useAuthStore";
import { setAuth } from "@utils/auth";
import { loginUser } from "../../pages/api/authApi";

export default function LoginForm() {
  const [values, setValues] = useState<LoginRequest>({
    email: "",
    password: "",
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

    const data = await loginUser(values);
    setAuth(data);
    setUser(data.user);
    router.push("/team-list");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Label type="label" content="이메일" htmlFor="email" marginBottom={12} />
      <Input
        id="email"
        name="email"
        value={values.email}
        onBlur={handleBlur}
        placeholder="이메일을 입력해주세요."
      />

      <Label type="label" content="비밀번호" htmlFor="email" marginBottom={12} />
      <Input
        id="password"
        name="password"
        type="password"
        value={values.password}
        onBlur={handleBlur}
        placeholder="비밀번호를 입력해주세요."
      />
      <Button buttonType="button">로그인</Button>
    </form>
  );
}

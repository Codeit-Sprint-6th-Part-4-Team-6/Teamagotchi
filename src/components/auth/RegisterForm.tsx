import { useState } from "react";
import { SignUpRequest } from "@coworkers-types";
import { useRouter } from "next/router";
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

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent) {
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
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="nickname">이름</label>
      <input
        id="nickname"
        name="nickname"
        type="text"
        value={values.nickname}
        onChange={handleChange}
      />

      <label htmlFor="email">이메일</label>
      <input id="email" name="email" type="text" value={values.email} onChange={handleChange} />

      <label htmlFor="password">비밀번호</label>
      <input
        id="password"
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
      />

      <label htmlFor="passwordConfirmation">비밀번호 확인</label>
      <input
        id="passwordConfirmation"
        name="passwordConfirmation"
        type="password"
        value={values.passwordConfirmation}
        onChange={handleChange}
      />

      <button type="submit">회원가입</button>
    </form>
  );
}

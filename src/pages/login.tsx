import { ChangeEvent, FormEvent, useState } from "react";
import { LoginRequest } from "@coworkers-types";
import { useRouter } from "next/router";
import { useAuthStore } from "@store/useAuthStore";
import { setAuth } from "@utils/auth";
import { loginUser } from "./api/authApi";

export default function LoginPage() {
  const [values, setValues] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  const router = useRouter();
  const { setUser } = useAuthStore();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const data = await loginUser(values);
    setAuth(data);
    setUser(data.user);
    router.push("/team-list");
  }

  return (
    <form onSubmit={handleSubmit}>
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

      <button type="submit">로그인</button>
    </form>
  );
}

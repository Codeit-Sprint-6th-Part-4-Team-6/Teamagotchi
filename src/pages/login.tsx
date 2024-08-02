import { ChangeEvent, FormEvent, useEffect, useState } from "react";
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
  const { user, setUser } = useAuthStore();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = await loginUser(values);
    setAuth(data);
    setUser(data.user);
    router.push("/team-list");
  }

  // NOTE: 미들웨어 생성 후 정리될 예정
  useEffect(() => {
    if (user) router.push("team-list");
  }, [user]);

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

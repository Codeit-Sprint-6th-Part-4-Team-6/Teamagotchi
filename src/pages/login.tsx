import { ChangeEvent, FormEvent, useState } from "react";
import { LoginRequest } from "@coworkers-types";
import { useRouter } from "next/router";
import SocialLoginBox from "@components/commons/SocialLoginBox";
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

  const handleGoogleAuth = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = "http://localhost:3000/oauth/google";
    const responseType = "code";
    const scope = process.env.NEXT_PUBLIC_GOOGLE_SCOPE;
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

    window.location.href = url;
  };

  const handleKakaoAuth = () => {
    const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
    const redirectUri = "http://localhost:3000/oauth/kakao";
    const responseType = "code";
    const url = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}`;

    window.location.href = url;
  };

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
      <SocialLoginBox
        type="login"
        onGoogleClick={handleGoogleAuth}
        onKakaoClick={handleKakaoAuth}
      />
    </form>
  );
}

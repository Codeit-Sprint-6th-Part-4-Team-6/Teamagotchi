import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@store/useAuthStore";
import { setAuth } from "@utils/auth";
import { socialLogin } from "../api/authApi";

function OAuthRedirect() {
  const router = useRouter();
  const { provider, code } = router.query;
  const { setUser } = useAuthStore();

  useEffect(() => {
    if (provider === "kakao" || provider === "google") {
      handleRedirect(provider);
    } else {
      router.push("/login");
    }
  }, [provider]);

  const handleRedirect = async (type: string) => {
    if (code) {
      // response가 실행되고 나서 리다이렉트되는 url인데 이부분을 로그인중.. 하는 페이지를 만들어서 거기로 넘겨줘야 할거같아요 아님말고 ㅎ;
      // todo: 배포 하고나서 url 바꿔야됨
      const redirectUri = `http://localhost:3000/oauth/${type}`;
      const config = {
        redirectUri,
        token: code as string,
      };

      const response = await socialLogin(type.toUpperCase(), config);
      setAuth(response);
      setUser(response.user);

      router.push("/");
    }
  };

  return <div>Logging in...</div>;
}

export default OAuthRedirect;

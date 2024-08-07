import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuthStore } from "@store/useAuthStore";
import { setAuth } from "@utils/auth";
import { socialLogin } from "@api/authApi";

function OAuthRedirect() {
  const router = useRouter();
  const { provider, code } = router.query;
  const { setUser } = useAuthStore();

  useEffect(() => {
    if (provider === "google") {
      handleRedirectGoogle(provider);
    } else if (provider === "kakao") {
      handleRedirectKakao(provider);
    } else {
      router.push("/login");
    }
  }, [provider]);

  const handleRedirectGoogle = async (type: string) => {
    if (code) {
      // TODO: 배포 후에 url 수정 필요
      const redirectUri = `http://localhost:3000/oauth/${type}`;
      const googleTokenResponse = await axios.post("https://oauth2.googleapis.com/token", {
        code,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_GOOGLE_SECRET_KEY,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      });

      const token = googleTokenResponse.data.id_token;

      const response = await socialLogin(type.toUpperCase(), {
        redirectUri,
        token,
      });

      setAuth(response);
      setUser(response.user);

      router.push("/");
    }
  };

  const handleRedirectKakao = async (type: string) => {
    if (code) {
      // TODO: 배포 후에 url 수정 필요
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

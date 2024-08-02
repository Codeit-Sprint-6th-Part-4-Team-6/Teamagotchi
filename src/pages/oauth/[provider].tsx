import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@store/useAuthStore";
import { setAuth } from "@utils/auth";
import { socialLogin } from "../api/authApi";

function OAuthRedirect() {
  const router = useRouter();
  const { provider } = router.query;
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    if (provider === "kakao" || provider === "google") {
      handleRedirect(provider);
    }
  }, [provider]);

  const handleRedirect = async (type: string) => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      const redirectUri = `http://localhost:3000/oauth/${type}`;
      const config = {
        redirectUri,
        token: code,
      };

      console.log(type);

      const response = await socialLogin(type.toUpperCase(), config);
      setAuth(response);
      setUser(response.user);

      console.log(user);

      router.push("/login");
    }
  };

  return <div>Logging in...</div>;
}

export default OAuthRedirect;

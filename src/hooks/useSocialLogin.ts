import { useRouter } from "next/router";

const useSocialLogin = () => {
  const router = useRouter();

  const handleGoogleAuth = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL}/oauth/google`;
    const responseType = "code";
    const scope = process.env.NEXT_PUBLIC_GOOGLE_SCOPE;
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

    router.push(url);
  };

  const handleKakaoAuth = () => {
    const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
    const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL}/oauth/kakao`;
    const responseType = "code";
    const url = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}`;

    router.push(url);
  };

  return { handleGoogleAuth, handleKakaoAuth };
};

export default useSocialLogin;

import Head from "next/head";
import { useRouter } from "next/router";
import LoginForm from "@components/auth/LoginForm";
import TextButton from "@components/commons/Button/TextButton";
import SocialLoginBox from "@components/commons/SocialLoginBox";

export default function LoginPage() {
  const router = useRouter();

  const handleGoogleAuth = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL}oauth/google`;
    const responseType = "code";
    const scope = process.env.NEXT_PUBLIC_GOOGLE_SCOPE;
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

    router.push(url);
  };

  const handleKakaoAuth = () => {
    const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
    const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL}oauth/kakao`;
    const responseType = "code";
    const url = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}`;

    router.push(url);
  };

  return (
    <>
      <Head>
        <title>티마고치 | 로그인</title>
        <meta name="description" content="로그인 해볼까요?" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <section className="mx-16 pt-24 md:mx-auto md:w-460 md:pt-100">
        <h2 className="mb-24 text-center text-4xl md:mb-80">로그인</h2>
        <LoginForm />
        <div className="mb-48 mt-24 text-center">
          <span className="mr-12">아직 계정이 없으신가요?</span>
          <TextButton buttonType="link" textStyle="underline" href="/register">
            가입하기
          </TextButton>
        </div>
        <SocialLoginBox
          type="login"
          onGoogleClick={handleGoogleAuth}
          onKakaoClick={handleKakaoAuth}
        />
      </section>
    </>
  );
}

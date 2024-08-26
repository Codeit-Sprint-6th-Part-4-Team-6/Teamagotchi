import Head from "next/head";
import { useRouter } from "next/router";
import LoginForm from "@components/auth/LoginForm";
import TextButton from "@components/commons/Button/TextButton";
import SocialLoginBox from "@components/commons/SocialLoginBox";
import useSocialLogin from "@hooks/useSocialLogin";

export default function LoginPage() {
  const { handleGoogleAuth, handleKakaoAuth } = useSocialLogin();

  return (
    <>
      <Head>
        <title>티마고치 | 로그인</title>
        <meta name="description" content="로그인 해볼까요?" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <section className="mx-16 pb-80 pt-24 md:mx-auto md:w-460 md:pt-80">
        <h1 className="mb-24 text-center text-2xl md:mb-80 md:text-32">로그인</h1>
        <LoginForm />
        <div className="mb-48 mt-24 text-center">
          <span className="mr-12 text-14 md:text-16">아직 계정이 없으신가요?</span>
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

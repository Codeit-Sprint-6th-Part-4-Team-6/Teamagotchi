import Head from "next/head";
import { useRouter } from "next/router";
import RegisterForm from "@components/auth/RegisterForm";
import TextButton from "@components/commons/Button/TextButton";
import SocialLoginBox from "@components/commons/SocialLoginBox";
import useSocialLogin from "@hooks/useSocialLogin";

export default function RegisterPage() {
  const { handleGoogleAuth, handleKakaoAuth } = useSocialLogin();

  return (
    <>
      <Head>
        <title>티마고치 | 회원가입</title>
        <meta name="description" content="회원가입 해볼까요?" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <section className="mx-16 pb-80 pt-24 md:mx-auto md:w-460 md:pt-80">
        <h2 className="mb-24 text-center text-2xl md:mb-80 md:text-4xl">회원가입</h2>
        <RegisterForm />
        <div className="mb-24 mt-24 text-center md:mb-48">
          <span className="mr-12">이미 회원이신가요?</span>
          <TextButton buttonType="link" textStyle="underline" href="/login">
            로그인하기
          </TextButton>
        </div>
        <SocialLoginBox
          type="register"
          onGoogleClick={handleGoogleAuth}
          onKakaoClick={handleKakaoAuth}
        />
      </section>
    </>
  );
}

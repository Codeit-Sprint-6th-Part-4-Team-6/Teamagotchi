import Head from "next/head";
import ResetPasswordForm from "@components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <>
      <Head>
        <title>티마고치 | 비밀번호 재설정</title>
        <meta name="description" content="비밀번호를 재설정해주세요!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <section className="mx-16 pt-24 md:mx-142 md:pt-100 lg:mx-auto lg:w-460">
        <h2 className="mb-80 text-center text-4xl">비밀번호 재설정</h2>
        <ResetPasswordForm />
      </section>
    </>
  );
}

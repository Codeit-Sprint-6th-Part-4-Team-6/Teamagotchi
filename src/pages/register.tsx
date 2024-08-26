import Head from "next/head";
import RegisterForm from "@components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>티마고치 | 회원가입</title>
        <meta name="description" content="회원가입 해볼까요?" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <section className="mx-16 pt-24 md:mx-auto md:w-460 md:pt-100">
        <h1 className="mb-24 text-center text-18 font-medium md:mb-80 md:text-24">회원가입</h1>
        <RegisterForm />
      </section>
    </>
  );
}

import LoginForm from "@components/auth/LoginForm";
import TextButton from "@components/commons/Button/TextButton";

export default function LoginPage() {
  return (
    <section className="mx-16 py-24 md:mx-142 md:py-100 lg:mx-auto lg:w-460">
      <h2 className="mb-24 text-center text-4xl md:mb-80">로그인</h2>
      <LoginForm />
      <div className="mb-48 mt-24 text-center">
        <span className="mr-12">아직 계정이 없으신가요?</span>
        <TextButton buttonType="link" textStyle="underline" href="/register">
          가입하기
        </TextButton>
      </div>
    </section>
  );
}

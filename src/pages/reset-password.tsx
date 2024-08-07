import ResetPasswordForm from "@components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <section className="mx-16 py-100 md:mx-142 lg:mx-auto lg:w-460">
      <h2 className="mb-80 text-center text-4xl">비밀번호 재설정</h2>
      <ResetPasswordForm />
    </section>
  );
}

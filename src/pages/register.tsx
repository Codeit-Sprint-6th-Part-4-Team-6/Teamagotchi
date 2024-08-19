import RegisterForm from "@components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <section className="mx-16 py-24 md:mx-auto md:w-460">
      <h2 className="mb-24 text-center text-4xl md:mb-80">회원가입</h2>
      <RegisterForm />
    </section>
  );
}

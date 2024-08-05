import { useState } from "react";
import { LoginRequest } from "@coworkers-types";
import { useRouter } from "next/router";
import SendMailModal from "@components/auth/SendMailModal";
import TextButton from "@components/commons/Button/TextButton";
import { useModal } from "@hooks/useModal";
import { useAuthStore } from "@store/useAuthStore";
import { setAuth } from "@utils/auth";
import { loginUser } from "./api/authApi";

export default function LoginPage() {
  const [values, setValues] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  const router = useRouter();
  const { setUser } = useAuthStore();
  const { openModal } = useModal();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const data = await loginUser(values);
    setAuth(data);
    setUser(data.user);
    router.push("/team-list");
  }

  const handleOpenModal = () => {
    openModal("SendMailModal", SendMailModal, {});
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">이메일</label>
        <input id="email" name="email" type="text" value={values.email} onChange={handleChange} />

        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
        />
        <button type="submit">로그인</button>
      </form>
      <TextButton buttonType="button" textStyle="underline" onClick={handleOpenModal}>
        비밀번호를 잊으셨나요?
      </TextButton>
    </>
  );
}

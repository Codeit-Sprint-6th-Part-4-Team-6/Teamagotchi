import LoginForm from "@components/auth/LoginForm";
import SendMailModal from "@components/auth/SendMailModal";
import TextButton from "@components/commons/Button/TextButton";
import { useModal } from "@hooks/useModal";

export default function LoginPage() {
  const { openModal } = useModal();

  const handleOpenModal = () => {
    openModal("SendMailModal", SendMailModal, {});
  };

  return (
    <>
      <LoginForm />
      <TextButton buttonType="button" textStyle="underline" onClick={handleOpenModal}>
        비밀번호를 잊으셨나요?
      </TextButton>
    </>
  );
}

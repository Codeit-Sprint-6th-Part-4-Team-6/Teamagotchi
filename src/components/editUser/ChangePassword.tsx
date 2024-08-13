import TextButton from "@components/commons/Button/TextButton";
import { useModal } from "@hooks/useModal";
import ChangePasswordModal from "./ChangePasswordModal";

export default function ChangePassword() {
  const { openModal } = useModal();

  const handleOpenModal = () => {
    openModal("ChangePasswordModal", ChangePasswordModal, {});
  };

  return (
    <TextButton buttonType="button" onClick={handleOpenModal}>
      비밀번호 변경하기
    </TextButton>
  );
}

import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@hooks/auth/useAuth";
import { useModal } from "@hooks/useModal";
import { IconDeleteAccount } from "@utils/icon";
import { deleteUser } from "@api/userApi";
import DeleteAccountModal from "./DeleteAccountModal";

export default function DeleteAccount() {
  const { openModal, closeModal } = useModal();
  const { logout } = useAuth();

  const deleteAccountMutation = useMutation({
    mutationFn: () => deleteUser(),
    onSuccess: () => {
      // TODO: 토스트
      alert("탈퇴가 완료되었습니다.");
      logout();
    },
  });

  const deleteOnConfirm = () => {
    closeModal();
    deleteAccountMutation.mutate();
  };

  const handleOpenModal = () => {
    openModal("DeleteAccountModal", DeleteAccountModal, { onConfirm: deleteOnConfirm });
  };

  return (
    <button
      type="button"
      onClick={handleOpenModal}
      className="flex items-center text-status-danger"
    >
      <IconDeleteAccount className="inline" />
      회원 탈퇴하기
    </button>
  );
}

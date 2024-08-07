import WarnModal from "@components/commons/modal/WarnModal";

export default function DeleteAccountModal({
  onClose,
  onConfirm,
}: {
  onClose?: () => void;
  onConfirm?: () => void;
}) {
  return (
    <WarnModal
      warnIcon
      title="회원 탈퇴를 진행하시겠어요?"
      content={`그룹장으로 있는 그룹은 자동으로 삭제되고,\r\n 모든 그룹에서 나가집니다.`}
      buttonText="회원 탈퇴"
      onConfirm={onConfirm}
      onClose={onClose}
    />
  );
}

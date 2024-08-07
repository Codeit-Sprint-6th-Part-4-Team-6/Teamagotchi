import WarnModal from "@components/commons/modal/WarnModal";

export default function DeleteTeamModal({
  onClose,
  onConfirm,
}: {
  onClose?: () => void;
  onConfirm?: () => void;
}) {
  return (
    <WarnModal
      warnIcon
      title="'팀 삭제하기'"
      description="팀을 정말 삭제하시겠어요?"
      content="삭제 후에는 모든 할일이 삭제되며 되돌릴 수 없습니다."
      buttonText="삭제하기"
      onConfirm={onConfirm}
      onClose={onClose}
    />
  );
}

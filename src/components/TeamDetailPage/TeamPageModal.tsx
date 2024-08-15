import { useRouter } from "next/router";
import ConfirmModal from "@components/commons/modal/ConfirmModal";
import { useInvitation } from "@hooks/useInvitation";

export function InviteMemberModal({ onClose }: { onClose?: () => void }) {
  const router = useRouter();
  const { teamId } = router.query;
  const { handleCopyClick } = useInvitation(Number(teamId));

  return (
    <ConfirmModal
      title="멤버 초대"
      content="그룹에 참여할 수 있는 링크를 복사합니다."
      buttonText="링크 복사하기"
      onConfirm={handleCopyClick}
      onClose={onClose}
    />
  );
}

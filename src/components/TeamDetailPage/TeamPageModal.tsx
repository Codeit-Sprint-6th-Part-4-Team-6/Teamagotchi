import Image from "next/image";
import { useRouter } from "next/router";
import Button from "@components/commons/Button";
import ConfirmModal from "@components/commons/modal/ConfirmModal";
import CustomModal from "@components/commons/modal/CustomModal";
import WarnModal from "@components/commons/modal/WarnModal";
import { useInvitation } from "@hooks/useInvitation";
import { useToast } from "@hooks/useToast";
import { IconCloseSmall, IconMemberLarge } from "@utils/icon";

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

export function UserInfoModal({
  onClose,
  name = "",
  email = "",
  image = null,
}: {
  onClose?: () => void;
  name?: string;
  email?: string;
  image?: string | null;
}) {
  const { toast } = useToast(); // useToast 훅 사용

  // 클립보드 복사 함수
  const copyEmailToClipboard = () => {
    if (email) {
      navigator.clipboard.writeText(email).then(
        () => {
          toast("success", "이메일이 클립보드에 복사되었습니다!");
        },
        (err) => {
          toast("danger", "클립보드 복사 실패: 다시 시도해 주세요.");
          console.error("클립보드 복사 실패: ", err);
        }
      );
    } else {
      toast("warn", "복사할 이메일이 없습니다.");
    }
  };

  return (
    <CustomModal
      content={
        <div className="flex h-186 w-280 flex-col items-center justify-center">
          <div className="flex flex-col items-center">
            <IconCloseSmall className="modal-close-icon" onClick={onClose} />
            {image ? (
              <div className="relative h-40 w-40 rounded-full object-cover">
                <Image
                  className="rounded-full object-cover"
                  fill
                  src={image}
                  alt={`${name}의 프로필 이미지`}
                />
              </div>
            ) : (
              <IconMemberLarge />
            )}
            <p className="mb-10 mt-20 text-md text-text-primary">{name}</p>
            <p className="mb-20 text-xs text-text-secondary">{email}</p>
          </div>
          <Button onClick={copyEmailToClipboard}>이메일 복사하기</Button>
        </div>
      }
    />
  );
}

export function DeleteTaskListModal({
  onClose,
  onConfirm,
}: {
  onClose?: () => void;
  onConfirm?: () => void;
}) {
  return (
    <WarnModal
      warnIcon
      title="할 일 목록 삭제하기"
      description="해당 목록을 정말 삭제하시겠어요?"
      content="해당 목록의 모든 할 일이 삭제되며 되돌릴 수 없습니다."
      buttonText="삭제하기"
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}

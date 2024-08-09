import Button from "../Button";
import CustomModal from "../modal/CustomModal";
import WarnModal from "../modal/WarnModal";

export function DeleteCommentModal({
  onClose,
  onConfirm,
}: {
  onClose?: () => void;
  onConfirm?: () => void;
}) {
  return (
    <WarnModal
      title="댓글을 삭제하시겠어요?"
      warnIcon
      onConfirm={() => {
        if (onConfirm) onConfirm();
        if (onClose) onClose();
      }}
      buttonText="삭제"
      onClose={onClose}
    />
  );
}
export function CancelCommentEditModal({
  onClose,
  onConfirm,
}: {
  onClose?: () => void;
  onConfirm?: () => void;
}) {
  return (
    <WarnModal
      title="수정을 취소 하시겠어요?"
      warnIcon
      onConfirm={() => {
        if (onConfirm) onConfirm();
        if (onClose) onClose();
      }}
      buttonText="예"
      onClose={onClose}
    />
  );
}
export function ConfirmCommentEditModal({
  onClose,
  onConfirm,
}: {
  onClose?: () => void;
  onConfirm?: () => void;
}) {
  return (
    <CustomModal
      content={
        <>
          <p className="modal-title">댓글을 수정하시겠어요?</p>
          <div className="mt-30 flex gap-10">
            <Button buttonStyle="outlined" onClick={onClose} size="medium">
              아니오
            </Button>
            <Button
              onClick={() => {
                if (onConfirm) onConfirm();
                if (onClose) onClose();
              }}
              size="medium"
            >
              예
            </Button>
          </div>
        </>
      }
    />
  );
}

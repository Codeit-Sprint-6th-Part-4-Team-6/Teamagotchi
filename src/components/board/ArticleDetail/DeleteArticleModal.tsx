import WarnModal from "@components/commons/modal/WarnModal";

export default function DeleteArticleModal({
  onClose,
  onConfirm,
}: {
  onClose?: () => void;
  onConfirm?: () => void;
}) {
  return (
    <WarnModal
      title="게시글 삭제"
      warnIcon
      content="정말 게시글을 삭제하시겠어요 ?"
      onConfirm={onConfirm}
      buttonText="삭제"
      onClose={onClose}
    />
  );
}

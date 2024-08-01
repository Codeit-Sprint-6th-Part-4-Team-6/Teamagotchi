import { IconClose } from "@utils/icon";

interface ConfirmModalProps {
  title: string;
  content: string;
  buttonText: string;
  onConfirm: () => void;
  onClose?: () => void;
}
/**
 * 기본 형식의 모달 함수입니다.
 * @param title - 모달의 상단 제목 부분입니다.
 * @param content - 모달의 중간 내용 부분입니다.
 * @param buttonText - 버튼에 들어가는 텍스트입니다.
 * @param onConfirm - 버튼을 눌렀을때 동작하는 함수입니다.
 * @param onClose - 넣어주셔도 작동 안해요!! 이미 Wrapper에서 선언했습니다.
 */
export default function ConfirmModal({
  title,
  content,
  buttonText,
  onConfirm,
  onClose,
}: ConfirmModalProps) {
  return (
    <div className="modal">
      <IconClose className="modal-close-icon" onClick={onClose} />
      <p className="modal-title">{title}</p>
      <p className="modal-content">{content}</p>
      <button
        onClick={onConfirm}
        className="h-47 w-300 rounded-12 bg-[#10B981] text-16 font-[600] text-[#ffffff]"
      >
        {buttonText}
      </button>
    </div>
  );
}

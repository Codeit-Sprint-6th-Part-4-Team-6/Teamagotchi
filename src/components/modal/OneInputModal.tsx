import Input from "@components/commons/Input";
import { IconClose } from "@utils/icon";

interface OneInputModalProps {
  title: string;
  content?: string;
  placeholder: string;
  buttonText: string;
  onConfirm: () => void;
  onClose?: () => void;
  closeButton?: boolean;
}

/**
 * 하나의 인풋이 들어가는 형식의 모달입니다.
 * @param title - 모달의 상단 제목 부분입니다.
 * @param content - 모달의 중간 내용 부분입니다.
 * @param placeholder - 인풋에 들어가는 텍스트입니다.
 * @param buttonText - 버튼에 들어가는 텍스트입니다.
 * @param onConfirm - 버튼을 눌렀을때 동작하는 함수입니다.
 * @param onClose - 넣어주셔도 작동 안해요!! 이미 Wrapper에서 선언했습니다.
 * @param closeButton - 닫기버튼과 X버튼을 위한 props입니다.
 */
export default function OneInputModal({
  title,
  content,
  placeholder,
  buttonText,
  onConfirm,
  onClose,
  closeButton = false,
}: OneInputModalProps) {
  return (
    <div className="modal">
      {!closeButton && <IconClose className="modal-close-icon" onClick={onClose} />}
      <p className="modal-title">{title}</p>
      {content && <p className="modal-content">{content}</p>}
      <Input placeholder={placeholder} />
      {closeButton ? (
        <div className="flex gap-10">
          <button onClick={onClose}>닫기</button>
          <button onClick={onConfirm}>{buttonText}</button>
        </div>
      ) : (
        <button
          onClick={onConfirm}
          className="mt-30 h-47 w-300 rounded-12 bg-[#10B981] text-16 font-[600] text-[#ffffff]"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}

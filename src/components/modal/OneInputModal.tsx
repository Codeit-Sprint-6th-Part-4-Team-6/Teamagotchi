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

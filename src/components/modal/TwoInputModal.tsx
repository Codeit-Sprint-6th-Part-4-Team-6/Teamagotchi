import Input from "@components/commons/Input";
import { IconClose } from "@utils/icon";

interface TwoInputModalProps {
  title: string;
  content?: string;
  firstTitle: string;
  firstPlaceholder: string;
  secondTitle: string;
  secondPlaceholder: string;
  buttonText: string;
  onConfirm: () => void;
  onClose?: () => void;
  closeButton?: boolean;
}

export default function TwoInputModal({
  title,
  content,
  firstTitle,
  firstPlaceholder,
  secondTitle,
  secondPlaceholder,
  buttonText,
  onConfirm,
  onClose,
  closeButton = false,
}: TwoInputModalProps) {
  return (
    <div className="modal">
      {!closeButton && <IconClose className="modal-close-icon" onClick={onClose} />}
      <p className="modal-title">{title}</p>
      {content && <p className="modal-content">{content}</p>}
      <label className="font-16 mb-10 font-[500] text-[#F8FAFC]">{firstTitle}</label>
      <Input placeholder={firstPlaceholder} />
      <label className="font-16 my-10 font-[500] text-[#F8FAFC]">{secondTitle}</label>
      <Input placeholder={secondPlaceholder} />
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

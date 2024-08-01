import { IconClose } from "@utils/icon";

interface ConfirmModalProps {
  title: string;
  content: string;
  buttonText: string;
  onConfirm: () => void;
  onClose?: () => void;
}

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

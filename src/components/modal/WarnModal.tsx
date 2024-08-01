import { IconAlert } from "@utils/icon";

interface WarnModalProps {
  warnIcon?: boolean;
  title: string;
  content?: string;
  buttonText: string;
  onConfirm: () => void;
  onClose: () => void;
}

export default function WarnModal({
  warnIcon = false,
  title,
  content,
  buttonText,
  onConfirm,
  onClose,
}: WarnModalProps) {
  return (
    <div className="modal">
      {warnIcon && <IconAlert className="mb-16" />}
      <p className="modal-title">{title}</p>
      {content && <p className="modal-content">{content}</p>}
      <div className="flex gap-10">
        <button className="h-47 w-130 bg-[#fff]" onClick={onClose}>
          닫기
        </button>
        <button
          onClick={onConfirm}
          className="h-47 w-130 rounded-12 bg-[#EF4444] text-16 font-[600] text-[#ffffff]"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

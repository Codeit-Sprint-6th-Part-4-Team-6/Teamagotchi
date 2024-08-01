import { IconAlert } from "@utils/icon";

interface WarnModalProps {
  warnIcon?: boolean;
  title: string;
  content?: string;
  buttonText: string;
  onConfirm: () => void;
  onClose?: () => void;
}

/**
 * 경고 형식의 모달입니다.
 * @param warnIcon - 경고 아이콘을 위한 props 입니다.
 * @param title - 모달의 상단 제목 부분입니다.
 * @param content - 모달의 중간 내용 부분입니다.
 * @param buttonText - 버튼에 들어가는 텍스트입니다.
 * @param onConfirm - 버튼을 눌렀을때 동작하는 함수입니다.
 * @param onClose - 넣어주셔도 작동 안해요!! 이미 Wrapper에서 선언했습니다.
 */
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

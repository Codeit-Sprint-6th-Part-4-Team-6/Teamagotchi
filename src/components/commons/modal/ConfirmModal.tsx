import { IconClose } from "@utils/icon";
import Button from "../Button";

interface ConfirmModalProps {
  title: string;
  content: string;
  buttonText: string;
  onConfirm: () => void;
  onClose?: () => void;
}
/**
 * 기본 형식의 모달 함수입니다.
 * 자세한 사용방법은 https://github.com/Codeit-Sprint-6th-Part-4-Team-6/coworkers/pull/14 를 참고해주세요.
 * @param title - 모달의 상단 제목 부분입니다.
 * @param content - 모달의 중간 내용 부분입니다.
 * @param buttonText - 버튼에 들어가는 텍스트입니다.
 * @param onConfirm - 버튼을 눌렀을때 동작하는 함수입니다.
 * @param onClose - 닫기버튼을 눌렀을때 동작하는 함수입니다.
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
      <Button onClick={onConfirm}>{buttonText}</Button>
    </div>
  );
}

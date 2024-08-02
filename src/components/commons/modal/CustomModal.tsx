import { IconClose } from "@utils/icon";

interface CustomModalProps {
  content: React.ReactNode;
  closeIcon?: boolean;
  onClose?: () => void;
}

/**
 * 커스텀 모달 창을 띄우는 함수입니다.
 * 자세한 사용방법은 https://github.com/Codeit-Sprint-6th-Part-4-Team-6/coworkers/pull/14 를 참고해주세요.
 * @param content - 모달 안에 들어갈 내용을 받는 props입니다.
 * @param closeIcon - 닫기아이콘을 위한 props입니다.
 * @param onClose - 닫기 기능 함수입니다. closeIcon을 사용할때 꼭 같이 써주세요.
 * @returns
 */
export default function CustomModal({ content, closeIcon = false, onClose }: CustomModalProps) {
  return (
    <div className="modal">
      {closeIcon && <IconClose className="modal-close-icon" onClick={onClose} />}
      {content}
    </div>
  );
}

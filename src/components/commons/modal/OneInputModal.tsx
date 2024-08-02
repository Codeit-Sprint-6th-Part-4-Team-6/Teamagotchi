import Input from "@components/commons/Input";
import Textarea from "@components/commons/TextArea";
import { IconClose } from "@utils/icon";
import Button from "../Button";

interface OneInputModalProps {
  title: string;
  content?: string;
  placeholder: string;
  type?: "input" | "textarea";
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
 * @param type - input인지, textarea인지 확인하는 props입니다.
 * @param buttonText - 버튼에 들어가는 텍스트입니다.
 * @param onConfirm - 버튼을 눌렀을때 동작하는 함수입니다.
 * @param onClose - 닫기버튼을 눌렀을때 동작하는 함수입니다.
 * @param closeButton - 닫기버튼과 X버튼을 위한 props입니다.
 */
export default function OneInputModal({
  title,
  content,
  placeholder,
  type = "input",
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
      {type === "input" ? (
        <Input placeholder={placeholder} />
      ) : (
        <Textarea placeholder={placeholder} type="small" height={80} />
      )}
      {closeButton ? (
        <div className="flex gap-10">
          <Button buttonStyle="outlined" onClick={onClose} className="mt-30" size="medium">
            닫기
          </Button>
          <Button onClick={onConfirm} className="mt-30" size="medium">
            {buttonText}
          </Button>
        </div>
      ) : (
        <Button onClick={onConfirm} className="mt-30">
          {buttonText}
        </Button>
      )}
    </div>
  );
}

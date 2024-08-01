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
/**
 * 두개의 인풋이 들어가는 형식의 모달입니다.
 * @param title - 모달의 상단 제목 부분입니다.
 * @param content - 모달의 중간 내용 부분입니다.
 * @param firstTitle - 첫번째 인풋에 들어가는 텍스트입니다.
 * @param firstPlaceholder - 첫번째 인풋에 들어가는 텍스트입니다.
 * @param secondTitle - 두번째 인풋에 들어가는 텍스트입니다.
 * @param secondPlaceholder - 두번째 인풋에 들어가는 텍스트입니다.
 * @param buttonText - 버튼에 들어가는 텍스트입니다.
 * @param onConfirm - 버튼을 눌렀을때 동작하는 함수입니다.
 * @param onClose - 닫기버튼을 눌렀을때 동작하는 함수입니다.
 * @param closeButton - 닫기버튼과 X버튼을 위한 props입니다.
 */
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
      <div className="flex w-full flex-col">
        <label htmlFor="first" className="font-16 mb-10 font-[500] text-[#F8FAFC]">
          {firstTitle}
        </label>
        <Input id="first" placeholder={firstPlaceholder} />
      </div>
      <div className="flex w-full flex-col">
        <label htmlFor="second" className="font-16 my-10 font-[500] text-[#F8FAFC]">
          {secondTitle}
        </label>
        <Input id="second" placeholder={secondPlaceholder} />
      </div>
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

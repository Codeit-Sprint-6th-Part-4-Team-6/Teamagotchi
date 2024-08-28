import React from "react";
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
  value?: string;
  onConfirm: () => void;
  onClose?: () => void;
  onChange?:
    | ((event: React.ChangeEvent<HTMLInputElement>) => void)
    | ((event: React.ChangeEvent<HTMLTextAreaElement>) => void);
  closeButton?: boolean;
  isPending?: boolean;
  disabled?: boolean;
}

/**
 * 하나의 인풋이 들어가는 형식의 모달입니다.
 * 자세한 사용방법은 https://github.com/Codeit-Sprint-6th-Part-4-Team-6/coworkers/pull/14 를 참고해주세요.
 * @param title - 모달의 상단 제목 부분입니다.
 * @param content - 모달의 중간 내용 부분입니다.
 * @param placeholder - 인풋에 들어가는 텍스트입니다.
 * @param type - input인지, textarea인지 확인하는 props 입니다.
 * @param buttonText - 버튼에 들어가는 텍스트입니다.
 * @param value - input 또는 textarea에 들어가는 value 입니다.
 * @param onConfirm - 버튼을 눌렀을때 동작하는 함수입니다.
 * @param onClose - 닫기버튼을 눌렀을때 동작하는 함수입니다.
 * @param onChange - input 또는 textarea에 들어가는 onChange 함수입니다.
 * @param closeButton - 닫기버튼과 X버튼을 위한 props 입니다.
 * @param isPending - pending 상태를 넣어주세요.
 */
export default function OneInputModal({
  title,
  content,
  placeholder,
  type = "input",
  buttonText,
  value,
  onConfirm,
  onClose,
  onChange,
  closeButton = false,
  isPending = false,
  disabled,
}: OneInputModalProps) {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (value) {
      if (value.length < 1) {
        return;
      }
    } else if (!value) {
      return;
    }
    onConfirm();
  };

  return (
    <form className="modal" onSubmit={handleSubmit}>
      {!closeButton && <IconClose className="modal-close-icon" onClick={onClose} />}
      <p className="modal-title">{title}</p>
      {content && <p className="modal-content" dangerouslySetInnerHTML={{ __html: content }} />}
      {type === "input" ? (
        <Input
          value={value}
          onChange={onChange as (event: React.ChangeEvent<HTMLInputElement>) => void}
          placeholder={placeholder}
        />
      ) : (
        <Textarea
          value={value}
          onChange={onChange as (event: React.ChangeEvent<HTMLTextAreaElement>) => void}
          placeholder={placeholder}
          type="small"
          height={80}
        />
      )}
      {closeButton ? (
        <div className="flex gap-10">
          <Button buttonStyle="outlined" onClick={onClose} className="mt-30" size="medium">
            닫기
          </Button>
          <Button onClick={onConfirm} className="mt-30" size="medium" disabled={disabled}>
            {buttonText}
          </Button>
        </div>
      ) : (
        <Button onClick={onConfirm} className="mt-24" isPending={isPending} disabled={disabled}>
          {buttonText}
        </Button>
      )}
    </form>
  );
}

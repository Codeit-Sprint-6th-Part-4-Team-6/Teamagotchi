import { useRef } from "react";
import classNames from "classnames";

type TextAreaProps = {
  type: "small" | "big" | "innerButton";
  name?: string;
  id?: string;
  placeholder: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  height: number;
};

/**
 * @props type: "small" | "big" | "innerButton"; "small"은 모달 등에 들어가는 작은 폰트를 가지고, "big"은 상대적으로 큰 폰트를 가집니다(자유게시판), "innerButton"은 안쪽에 버튼을 넣는 경우로 오른쪽 패딩값이 설정되어 있습니다.
 * @props name?: string;
 * @props id?: string;
 * @props placeholder: string;
 * @props value?: string;
 * @props onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
 * @props onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
 * @props height: number; Textarea의 높이를 설정합니다. type이 "innerButton일" 경우 설정된 높이값에 따라 자동으로 위 아래 패딩값이 정해집니다.
 */

export default function Textarea({
  type,
  name,
  id,
  placeholder,
  value,
  onChange,
  onBlur,
  height,
}: TextAreaProps) {
  const classnames = classNames(
    "block w-full text-text-primary placeholder-text-default font-normal border-solid border-border-primary resize-none",
    {
      "pr-32 text-md border-y bg-[rgba(0,0,0,0)]": type === "innerButton",
      "py-12 px-16 text-lg": type === "small",
      "px-24 py-16 text-14 leading-26 md:text-16": type === "big",
      "border focus:border-interaction-focus rounded-[12px] bg-background-secondary":
        type === "big" || type === "small",
    }
  );

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(event);
    }
    // textarea 높이 조절
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const { scrollHeight } = textareaRef.current;
      textareaRef.current.style.height = `${scrollHeight}px`;
    }
  };

  return (
    <textarea
      name={name}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={type === "innerButton" ? handleChange : onChange}
      onBlur={onBlur}
      className={classnames}
      style={{
        height: `${height}px`,
        paddingTop: `${type === "innerButton" && (height - 17) / 2}px`,
        paddingBottom: `${type === "innerButton" && (height - 17) / 2}px`,
      }}
      ref={textareaRef}
    />
  );
}

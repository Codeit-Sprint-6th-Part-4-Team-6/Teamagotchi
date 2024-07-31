import { useState } from "react";
import classNames from "classnames";

type InputProps = {
  type?: "text" | "email" | "password" | "search";
  name?: string;
  id?: string;
  placeholder: string;
  value?: string;
  errorMessage?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onDelete?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

/**
 * @props type?: "text" | "email" | "password" | "search";
 * @props name?: string;
 * @props id?: string;
 * @props placeholder: string;
 * @props value?: string;
 * @props errorMessage?: string;
 * @props disabled?: boolean;
 * @props onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
 * @props onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
 * @props onDelete?: (e: React.MouseEvent<HTMLButtonElement>) => void;
 */

export default function Input({
  type = "text",
  name,
  id,
  placeholder,
  value,
  errorMessage,
  disabled,
  onChange,
  onBlur,
  onDelete,
}: InputProps) {
  const [inputType, setInputType] = useState(type === "search" ? "text" : type);

  const handlePasswordViewClick = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  const classnames = classNames(
    "w-full h-full text-md font-normal md:text-lg rounded-[12px] border border-solid text-text-primary placeholder-text-default focus:border-interaction-focus",
    errorMessage ? "!border-status-danger" : "border-border-primary",
    disabled ? "bg-background-tertiary" : "bg-background-secondary",
    type === "password" ? "pl-16 pr-40" : "px-16",
    type === "search" ? "pr-16 pl-44" : ""
  );

  return (
    <div className="relative h-44 w-full md:h-48">
      <input
        type={inputType}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
        className={classnames}
      />
      {type === "password" && (
        <button
          type="button"
          className="absolute right-16 top-10 md:top-12"
          onClick={handlePasswordViewClick}
        >
          <img
            src={
              inputType === "password"
                ? "icons/ic_visibility_off.svg"
                : "icons/ic_visibility_on.svg"
            }
            alt="password_visible_click"
          />
        </button>
      )}
      {type === "search" && (
        <>
          <img
            src="icons/ic_search.svg"
            alt="search"
            className="absolute left-16 top-10 md:top-12"
          />
          {value && (
            <button type="button" className="absolute right-16 top-10 md:top-12" onClick={onDelete}>
              <img src="icons/ic_x.svg" alt="search_x_button" />
            </button>
          )}
        </>
      )}
      {errorMessage && (
        <p className="mt-8 text-md font-medium text-status-danger">{errorMessage}</p>
      )}
    </div>
  );
}

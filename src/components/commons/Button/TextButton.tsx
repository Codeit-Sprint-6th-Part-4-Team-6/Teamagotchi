import classNames from "classnames";
import { motion } from "framer-motion";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { IconBack, IconPlusSmall } from "@utils/icon";

export type ButtonProps = {
  buttonType?: "button" | "link";
  icon?: "none" | "plus" | "back";
  textStyle?: "default" | "underline";
  className?: string;
  onClick?: () => void;
  href?: Url;
  children: React.ReactNode;
};

/**
 * 텍스트 버튼 컴포넌트입니다.
 * @param buttonType - 버튼 타입을 지정합니다. "button" 또는 "link".
 * @param icon - 버튼에 사용할 아이콘을 지정합니다. "none" 또는 "plus" / "back".
 * @param textStyle - 텍스트 스타일을 지정합니다. "default" 또는 "underline".
 * @param className - 추가적인 CSS 클래스 이름을 지정합니다.
 * @param onClick - 버튼 클릭 시 호출될 함수입니다.
 * @param href - 링크 버튼일 때 이동할 주소를 지정합니다.
 * @param children - 버튼의 내용을 지정합니다.
 * @returns 텍스트 버튼 컴포넌트를 렌더링합니다.
 */
export default function TextButton({
  buttonType = "button",
  icon = "none",
  textStyle = "default",
  className,
  children,
  href,
  onClick,
}: ButtonProps): JSX.Element {
  const styleClassName = classNames(
    className,
    "transition-all duration-200 text-brand-primary text-14 md:text-16 text-nowrap",
    {
      "flex items-center": icon === "plus" || icon === "back",
      "": textStyle === "default",
      "underline underline-offset-4": textStyle === "underline",
    }
  );

  if (buttonType === "link" && href) {
    return (
      <motion.button whileTap={{ scale: 0.97 }} type="button" className={styleClassName}>
        <Link href={href} passHref className="flex items-center">
          {icon === "plus" && <IconPlusSmall className="mb-1 mr-2 stroke-brand-primary" />}
          {icon === "back" && <IconBack className="mr-2" />}
          {children}
        </Link>
      </motion.button>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 0.97 }}
      type="button"
      className={styleClassName}
      onClick={onClick}
    >
      {icon === "plus" && <IconPlusSmall className="mb-1 mr-2 stroke-brand-primary" />}
      {children}
    </motion.button>
  );
}

import classNames from "classnames";

// ButtonProps 타입을 정의합니다.
type ButtonProps = {
  variant: "primary" | "white"; // 허용되는 버튼 타입
};

export default function ButtonEx({ variant }: ButtonProps) {
  const buttonClassName = classNames("rounded-lg px-10 py-3", {
    "bg-point-yellow border border-gray-200 text-gray-400 hover:bg-point-purple hover:text-gray-900":
      variant === "primary",
    "bg-point-cyan text-white hover:bg-point-rose disabled:bg-background-primary":
      variant === "white",
  });

  return (
    <button type="button" className={buttonClassName}>
      버튼 예시입니다
    </button>
  );
}

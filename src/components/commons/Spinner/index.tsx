import { ClipLoader } from "react-spinners";

type Props = {
  size?: number;
  color?: "primary" | "white";
  className?: string;
};
/**
 * 로딩 스피너입니다.
 * @param size 기본 20입니다.
 * @param color 기본 primary color입니다. white로 지정 가능합니다.
 * @param className 위치 조정시 클래스네임 지정해주세요.
 * @returns
 */
export default function Spinner({ size = 20, color = "primary", className }: Props) {
  return (
    <div className={`${className} flex h-full w-full items-center justify-center`}>
      <ClipLoader
        size={size}
        color={color === "primary" ? "#10B981" : "#fff"}
        speedMultiplier={0.8}
      />
    </div>
  );
}

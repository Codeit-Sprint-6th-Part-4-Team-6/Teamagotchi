import { ClipLoader } from "react-spinners";

type Props = {
  size?: number;
  color?: "primary" | "white";
  className?: string;
};
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

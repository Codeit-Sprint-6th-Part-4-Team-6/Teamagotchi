import { ClipLoader } from "react-spinners";

type Props = {
  size: number;
  color: string;
};
export default function Spinner({ size, color }: Props) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <ClipLoader size={size} color={color} speedMultiplier={0.8} />
    </div>
  );
}

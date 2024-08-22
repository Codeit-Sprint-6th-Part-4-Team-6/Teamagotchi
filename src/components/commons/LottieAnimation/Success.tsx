import LottieAnimation from ".";

type Props = {
  content: string;
  size?: number;
};

export default function Success({ content, size = 200 }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-20">
      <LottieAnimation type="success" size={size} />
      <span className="text-14 font-medium">{content}</span>
    </div>
  );
}

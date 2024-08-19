import LottieAnimation from "../LottieAnimation";

type Props = {
  type?: "loading" | "success";
  size?: number;
  firstSentence?: string;
  secondSentence?: string;
};

export default function Loading({
  type = "loading",
  size = 400,
  firstSentence = "티마고치가 열심히 일하고 있어요.",
  secondSentence = "곧 준비됩니다!",
}: Props) {
  return (
    <div className="flex flex-col items-center md:mt-140">
      <LottieAnimation type={type} size={size} />
      <div className="relative bottom-100 w-full text-center text-14 font-medium md:text-16">
        <span>{firstSentence}</span>
        <br />
        <span>{secondSentence}</span>
      </div>
    </div>
  );
}

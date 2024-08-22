import LottieAnimation from ".";

export default function Loading() {
  return (
    <div className="flex flex-col items-center md:mt-140">
      <LottieAnimation type="loading" size={400} />
      <div className="relative bottom-100 w-full text-center text-14 font-medium md:text-16">
        <span>티마고치가 열심히 일하고 있어요</span>
        <br />
        <span>곧 준비됩니다!</span>
      </div>
    </div>
  );
}

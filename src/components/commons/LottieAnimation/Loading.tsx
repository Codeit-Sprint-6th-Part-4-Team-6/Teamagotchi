import LottieAnimation from ".";

export default function Loading() {
  return (
    <div className="fixed left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
      <LottieAnimation type="loading" size={400} />
      <div className="relative bottom-100 w-full text-center text-14 font-medium md:text-16">
        <span>티마고치가 열심히 일하고 있어요</span>
        <br />
        <span>곧 준비됩니다!</span>
      </div>
    </div>
  );
}

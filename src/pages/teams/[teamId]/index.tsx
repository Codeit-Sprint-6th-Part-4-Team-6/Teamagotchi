import CircleProgressBar from "@components/TeamDetailPage/CircleProgressBar";

export default function TeamDetailPage() {
  return (
    <div>
      <CircleProgressBar className="w-20" strokeWidth={30} progress={80} />
      <CircleProgressBar
        className="w-200"
        strokeWidth={35}
        progress={80}
        transitionDuration={1}
        background="#334155"
        isGradient
      />
    </div>
  );
}

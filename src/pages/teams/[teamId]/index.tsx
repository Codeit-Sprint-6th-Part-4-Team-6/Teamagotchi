import { useEffect, useState } from "react";
import CircleProgressBar from "@components/TeamDetailPage/CircleProgressBar";

export default function TeamDetailPage() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setProgress(70); // 70%로 설정
    }, 500); // 1초 후에 진행률 설정

    return () => clearTimeout(timeout); // 클린업
  }, []);

  return (
    <div>
      태스크와 리포트, 팀원이 보이는 페이지
      <CircleProgressBar className="w-20" strokeWidth={30} progress={progress} reduction={0} />
      <CircleProgressBar
        className="w-200"
        strokeWidth={30}
        progress={progress}
        transitionDuration={1}
        reduction={2}
        background="#334155"
        isGradient
      />
    </div>
  );
}

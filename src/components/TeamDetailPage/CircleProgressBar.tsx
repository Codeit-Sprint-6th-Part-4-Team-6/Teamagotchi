import React, { useState } from "react";

// Props 타입 정의
interface ProgressProps {
  progress?: number; // 진행률 (0 ~ 100)
  strokeWidth?: number; // 원형 경로의 두께
  ballStrokeWidth?: number; // 끝에 위치하는 공의 두께
  reduction?: number; // 원형의 크기를 줄이는 비율
  transitionDuration?: number; // 애니메이션 지속 시간 (초)
  transitionTimingFunction?: string; // 애니메이션 타이밍 함수
  background?: string; // 배경 원형 색상
  className?: string; // 추가적인 CSS 클래스
  isGradient?: boolean; // 그라데이션 사용 여부
}

// CircleProgressBar 컴포넌트 정의
function CircleProgressBar({
  progress = 0, // 기본 진행률은 0%
  strokeWidth = 4, // 기본 원형 경로의 두께는 4px
  ballStrokeWidth = 16, // 기본 공의 두께는 16px
  reduction = 0.25, // 기본 원형 크기 비율은 0.25
  transitionDuration = 0.5, // 기본 애니메이션 지속 시간은 0.5초
  transitionTimingFunction = "ease", // 기본 애니메이션 타이밍 함수는 "ease"
  background = "#dde2e9", // 기본 배경 원형 색상은 회색
  className, // 사용자 정의 CSS 클래스 적용
  isGradient = false, // 기본적으로 그라데이션은 사용하지 않음
}: ProgressProps) {
  // isGradient가 true일 경우, 기본 그라데이션 색상 배열 설정
  const appliedGradient = isGradient
    ? [
        { stop: 0.0, color: "#10B982" }, // 그라데이션 시작 색상
        { stop: 1, color: "#A3E635" }, // 그라데이션 끝 색상
      ]
    : [
        { stop: 0.0, color: "#10B982" }, // 기본 색상 사용
        { stop: 1, color: "#10B982" }, // 기본 색상 사용
      ];

  const roundedProgress = Math.round(progress * 100) / 100; // 진행률 소수점 두 자리로 반올림
  const width = 200; // SVG의 너비
  const center = width / 2; // SVG의 중심 좌표
  const height = 200 || center + center * Math.cos(reduction * Math.PI); // SVG의 높이 계산
  const [unique] = useState(() => Math.random().toString()); // 유니크한 ID 생성
  const rotate = 90 + 180 * reduction; // 원형의 회전 각도 계산
  const r = center - strokeWidth / 2 - ballStrokeWidth / 2; // 원형의 반지름 계산
  const circumference = Math.PI * r * 2; // 원형의 둘레 계산
  const offset = (circumference * (100 - roundedProgress * (1 - reduction))) / 100; // 진행률에 따른 원형의 오프셋 계산

  return (
    <div className={`relative ${className}`}>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full">
        <defs>
          {/* 그라데이션 정의 */}
          <linearGradient id={`gradient${unique}`} x1="0%" y1="0%" x2="0%" y2="100%">
            {appliedGradient.map(({ stop, color }) => (
              <stop key={stop} offset={`${stop * 100}%`} stopColor={color} />
            ))}
          </linearGradient>
        </defs>
        {/* 배경 원형 경로 */}
        <circle
          transform={`rotate(${rotate} ${center} ${center})`}
          cx={center}
          cy={center}
          r={r}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * reduction}
          fill="none"
          stroke={background}
          strokeLinecap="round"
        />
        {/* 진행률에 따른 원형 경로 */}
        <circle
          style={{
            transition: `stroke-dashoffset ${transitionDuration}s ${transitionTimingFunction}`,
          }}
          transform={`rotate(${rotate} ${center} ${center})`}
          cx={center}
          cy={center}
          r={r}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          fill="none"
          stroke={`url(#gradient${unique})`}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

// React.memo를 사용하여 불필요한 재렌더링을 방지
export default React.memo(CircleProgressBar);

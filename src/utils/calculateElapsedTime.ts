import { formatDate } from "./formatDate";

/**
 * 전달받은 시간이 현 시점으로부터 얼마나 지났는지 계산하는 함수입니다.
 * @param dateString - 날짜 문자열(ex "2024-07-01T07:20:51.162Z")입니다.
 * @returns "방금전", "1분전" ~ "2년전" 까지의 문자열을 리턴하고 3년 이상의 시간이 지났으면 "2024.07.25"와 같은 형식의 문자열을 반환합니다.
 */

export const calculateElapsedTime = (dateString: string) => {
  const timeObject = new Date(dateString);
  const timeInMilliseconds = timeObject.getTime();

  const timeDifference = Date.now() - timeInMilliseconds;

  const seconds = Math.floor(timeDifference / 1000);
  if (seconds < 60) return "방금전";

  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분전`;

  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간전`;

  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일전`;

  const weeks = days / 7;
  if (weeks < 52) return `${Math.floor(weeks)}주전`;

  const years = weeks / 52;
  if (years < 3) return `${Math.floor(years)}년전`;

  return formatDate(dateString);
};
